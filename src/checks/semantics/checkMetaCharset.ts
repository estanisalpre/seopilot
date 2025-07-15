import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkMetaCharset($: cheerio.CheerioAPI): CheckResult[] {
  const metaCharset = $("head > meta[charset]");
  if (metaCharset.length === 0) {
    return [{ message: "Falta <meta charset>", category: "Structure" }];
  }
  const index = $("head meta").index(metaCharset);
  if (index > 0) {
    return [
      {
        message: "<meta charset> debe ser el primer elemento dentro de <head>",
        category: "Structure",
      },
    ];
  }
  return [];
}
