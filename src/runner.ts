import { globby } from "globby";
import pMap from "p-map";
import fs from "fs";
import * as cheerio from "cheerio";
import { report } from "./reporter.js";
import { htmlChecks, globalChecks } from "./checks/index.js";
import {
  CheckResult,
  CheckOptions,
  FileError,
  CategorizedErrors,
} from "./types.js";

export async function runChecks(options: CheckOptions): Promise<boolean> {
  const basePath = options.basePath || "dist";
  const allFiles = await globby([`${basePath}/**/*.html`]);
  const files = options.limit ? allFiles.slice(0, options.limit) : allFiles;

  if (files.length === 0) {
    console.log("⚠️  No se encontraron archivos HTML para analizar.");
    return false;
  }

  if (!options.json && allFiles.length > files.length) {
    console.log(
      `⚠️  Detectados ${allFiles.length} archivos. Escaneando solo los primeros ${files.length}. Usa --limit para aumentar.`
    );
  }

  let hasErrors = false;
  const categorizedErrors: CategorizedErrors = {};
  const categorySummary: Record<string, number> = {};
  const fileErrors: FileError[] = [];

  await pMap(
    files,
    async (file) => {
      const html = fs.readFileSync(file, "utf8");
      const $ = cheerio.load(html);
      const errors: CheckResult[] = [];

      for (const check of htmlChecks) {
        const result = check($ as cheerio.CheerioAPI);
        if (result.length > 0) {
          errors.push(...result);
        }
      }

      if (errors.length > 0) {
        hasErrors = true;
        fileErrors.push({ file, messages: errors });

        errors.forEach(({ message, category }) => {
          if (!categorizedErrors[category]) categorizedErrors[category] = {};
          categorizedErrors[category][message] =
            (categorizedErrors[category][message] || 0) + 1;
          categorySummary[category] = (categorySummary[category] || 0) + 1;
        });

        if (options.verbose && !options.json) {
          report(file, errors);
        }
      } else if (!options.json && options.verbose) {
        report(file, []);
      }
    },
    { concurrency: 10 }
  );

  for (const check of globalChecks) {
    const results = check(basePath);
    if (results.length > 0) {
      hasErrors = true;
      fileErrors.push({ file: "[global]", messages: results });

      results.forEach(({ message, category }) => {
        if (!categorizedErrors[category]) categorizedErrors[category] = {};
        categorizedErrors[category][message] =
          (categorizedErrors[category][message] || 0) + 1;
        categorySummary[category] = (categorySummary[category] || 0) + 1;
      });

      if (options.verbose && !options.json) {
        report("[global]", results);
      }
    }
  }

  if (options.json) {
    const detailed: Record<string, number> = {};
    Object.values(categorizedErrors).forEach((group) => {
      Object.entries(group).forEach(([msg, count]) => {
        detailed[msg] = (detailed[msg] || 0) + count;
      });
    });

    const output = {
      totalFilesScanned: files.length,
      errors: fileErrors,
      summary: {
        totalByCategory: categorySummary,
        detailed,
      },
    };
    console.log(JSON.stringify(output, null, 2));
  } else {
    console.log("\n📊 Resumen de errores por categoría:\n");

    if (Object.keys(categorySummary).length === 0) {
      console.log("✅ Ningún error encontrado.");
    } else {
      Object.entries(categorySummary).forEach(([cat, count]) => {
        const icon =
          {
            SEO: "🧠",
            Accessibility: "♿",
            Performance: "⚡",
            Structure: "🧱",
          }[cat] || "📄";
        console.log(`${icon} ${cat}: ${count} errores`);
      });

      console.log("\n📉 Resumen detallado:\n");

      for (const [category, messages] of Object.entries(categorizedErrors)) {
        console.log(`🔸 ${category}`);
        for (const [msg, count] of Object.entries(messages)) {
          console.log(`   ❌ ${msg} — ${count} ocurrencias`);
        }
        console.log();
      }
    }
  }

  return hasErrors;
}