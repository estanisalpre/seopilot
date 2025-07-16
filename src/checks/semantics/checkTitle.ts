import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkTitle($: cheerio.CheerioAPI): CheckResult[] {
  if ($("title").length === 0) {
    return [
      {
        message: "Falta <title>",
        category: "SEO",
      },
    ];
  }
  return [];
}