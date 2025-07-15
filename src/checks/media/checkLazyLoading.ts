import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkLazyLoading($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  $("img").each((_, el) => {
    const loading = $(el).attr("loading");
    if (!loading || loading !== "lazy") {
      results.push({
        message: `Imagen sin loading=\"lazy\": ${$(el).attr("src")}`,
        category: "Performance",
      });
    }
  });
  return results;
}