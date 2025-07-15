import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkGoogleFontDisplaySwap(
  $: cheerio.CheerioAPI
): CheckResult[] {
  const fonts = $("link[href*='fonts.googleapis.com']");
  const results: CheckResult[] = [];
  fonts.each((_, el) => {
    const href = $(el).attr("href") || "";
    if (!href.includes("display=swap")) {
      results.push({
        message: `Google Font sin display=swap: ${href}`,
        category: "Performance",
      });
    }
  });
  return results;
}
