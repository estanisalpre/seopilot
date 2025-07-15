import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkOpenGraph($: cheerio.CheerioAPI): CheckResult[] {
  const tags = ["og:title", "og:description", "og:image", "og:url"];
  const results: CheckResult[] = [];
  tags.forEach((tag) => {
    if ($(`meta[property="${tag}"]`).length === 0) {
      results.push({
        message: `Falta meta Open Graph: ${tag}`,
        category: "SEO",
      });
    }
  });
  return results;
}
