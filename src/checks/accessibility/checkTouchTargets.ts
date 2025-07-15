import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkTouchTargets($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  $("button, a").each((_, el) => {
    const width = parseInt($(el).css("width") || "0", 10);
    const height = parseInt($(el).css("height") || "0", 10);
    if (width < 48 || height < 48) {
      results.push({
        message: "Elemento táctil menor a 48x48px",
        category: "Accessibility",
      });
    }
  });
  return results;
}
