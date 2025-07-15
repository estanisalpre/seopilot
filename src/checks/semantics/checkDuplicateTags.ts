import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkDuplicateTags($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  const tagsToCheck = [
    "title",
    "meta[name='description']",
    "meta[property='og:title']",
  ];
  tagsToCheck.forEach((selector) => {
    if ($(selector).length > 1) {
      results.push({
        message: `Etiqueta duplicada: ${selector}`,
        category: "Structure",
      });
    }
  });
  return results;
}
