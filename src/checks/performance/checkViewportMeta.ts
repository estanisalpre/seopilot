import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkViewportMeta($: cheerio.CheerioAPI): CheckResult[] {
  if ($('meta[name="viewport"]').length === 0) {
    return [
      {
        message: 'Falta <meta name="viewport">',
        category: "SEO",
      },
    ];
  }
  return [];
}
