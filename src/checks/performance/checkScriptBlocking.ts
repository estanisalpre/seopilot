import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkScriptBlocking($: cheerio.CheerioAPI): CheckResult[] {
  const scripts = $("script").filter(
    (_, el) => !$(el).attr("async") && !$(el).attr("defer")
  );
  if (scripts.length > 0) {
    return [
      {
        message: `${scripts.length} <script> sin async o defer`,
        category: "Performance",
      },
    ];
  }
  return [];
}