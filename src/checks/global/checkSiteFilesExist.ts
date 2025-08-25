import { fileExists } from "../../utils/fs.js";
import { CheckResult } from "../../types.js";

const REQUIRED_FILES = [
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
  "manifest.json",
];

export function checkSiteFilesExist(basePath: string): CheckResult[] {
  const results: CheckResult[] = [];

  for (const file of REQUIRED_FILES) {
    if (!fileExists(basePath, file)) {
      results.push({
        message: `Falta archivo requerido: ${file}`,
        category: "Structure",
      });
    }
  }

  return results;
}