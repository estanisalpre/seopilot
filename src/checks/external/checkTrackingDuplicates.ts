import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkTrackingDuplicates($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  const trackers = ["googletagmanager.com/gtag/js", "connect.facebook.net"];

  trackers.forEach((src) => {
    const found = $(`script[src*='${src}']`);
    if (found.length > 1) {
      results.push({
        message: `Script de tracking duplicado: ${src}`,
        category: "SEO",
      });
    }
  });

  return results;
}
