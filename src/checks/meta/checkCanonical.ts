import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkCanonical($: cheerio.CheerioAPI): CheckResult[] {
  const link = $('link[rel="canonical"]');
  if (link.length === 0) {
    return [
      {
        message: 'Falta <link rel="canonical">',
        category: "SEO",
      },
    ];
  }
  return [];
}
