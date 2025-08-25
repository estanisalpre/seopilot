import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkMetaRobots($: cheerio.CheerioAPI): CheckResult[] {
  const meta = $('meta[name="robots"]');
  if (meta.length > 0 && meta.attr("content")?.includes("noindex")) {
    return [
      {
        message: "<meta name=\"robots\"> contiene 'noindex'",
        category: "SEO",
      },
    ];
  }
  return [];
}
