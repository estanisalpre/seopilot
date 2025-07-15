import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkAnchorTargets($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  $('a[target="_blank"]').each((_, el) => {
    const rel = $(el).attr("rel");
    if (!rel || !rel.includes("noopener")) {
      results.push({
        message: `Enlace externo sin rel=\"noopener\": ${$(el).attr("href")}`,
        category: "SEO",
      });
    }
  });
  return results;
}
