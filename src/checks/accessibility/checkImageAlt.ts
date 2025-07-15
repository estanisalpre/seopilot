import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkImageAlt($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  $("img").each((_, el) => {
    if (!$(el).attr("alt")) {
      results.push({
        message: `Imagen sin alt: ${$(el).attr("src")}`,
        category: "Accessibility",
      });
    }
  });
  return results;
}
