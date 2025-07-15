import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkMetaDescription($: cheerio.CheerioAPI): CheckResult[] {
  if ($('meta[name="description"]').length === 0) {
    return [
      {
        message: 'Falta <meta name="description">',
        category: "SEO",
      },
    ];
  }
  return [];
}
