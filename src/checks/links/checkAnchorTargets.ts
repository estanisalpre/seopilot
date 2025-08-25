import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkAnchorTargets($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  $('a[target="_blank"]').each((_, el) => {
    const rel = $(el).attr("rel");
    const href = $(el).attr("href");

    // Debug: mostrar el valor exacto del rel
    // console.log(`Debug - href: ${href}, rel: "${rel}"`);

    if (!rel || !rel.includes("noopener")) {
      results.push({
        message: `Enlace externo sin rel="noopener": ${href} (rel encontrado: "${rel}")`,
        category: "SEO",
      });
    }
  });
  return results;
}
