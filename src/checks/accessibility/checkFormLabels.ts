import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkFormLabels($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  $("input, select, textarea").each((_, el) => {
    const id = $(el).attr("id");
    if (id && $(`label[for="${id}"]`).length === 0) {
      results.push({
        message: `Campo con id=\"${id}\" sin label asociada`,
        category: "Accessibility",
      });
    }
  });
  return results;
}
