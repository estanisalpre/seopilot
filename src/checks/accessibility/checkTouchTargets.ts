import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkTouchTargets($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  $("button, a").each((_, el) => {
    const width = parseInt($(el).css("width") || "0", 10);
    const height = parseInt($(el).css("height") || "0", 10);

    if (width > 0 || height > 0) {
      if (width < 48) {
        results.push({
          message: "Elemento táctil con width menor a 48px",
          category: "Accessibility",
        });
      }

      if (height < 48) {
        results.push({
          message: "Elemento táctil con height menor a 48px",
          category: "Accessibility",
        });
      }
    }
  });
  return results;
}
