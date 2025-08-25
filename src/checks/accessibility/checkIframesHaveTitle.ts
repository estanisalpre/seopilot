import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkIframesHaveTitle($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  $("iframe").each((_, el) => {
    if (!$(el).attr("title")) {
      results.push({
        message: "Iframe sin atributo title",
        category: "Accessibility",
      });
    }
  });
  return results;
}
