import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkImageFormats($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  $("img").each((_, el) => {
    const src = $(el).attr("src") || "";
    if (src && !src.endsWith(".webp") && !src.endsWith(".avif")) {
      results.push({
        message: `Imagen no usa formato moderno (.webp o .avif): ${src}`,
        category: "Performance",
      });
    }
  });
  return results;
}
