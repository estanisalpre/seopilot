import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkLangAttr($: cheerio.CheerioAPI): CheckResult[] {
  if (!$("html").attr("lang")) {
    return [
      {
        message: "<html> no tiene atributo lang",
        category: "Accessibility",
      },
    ];
  }
  return [];
}
