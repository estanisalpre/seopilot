import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkPreload($: cheerio.CheerioAPI): CheckResult[] {
  const preload = $('link[rel="preload"]');
  if (preload.length === 0) {
    return [
      {
        message: 'No se encontró ningún recurso con rel="preload"',
        category: "Performance",
      },
    ];
  }
  return [];
}
