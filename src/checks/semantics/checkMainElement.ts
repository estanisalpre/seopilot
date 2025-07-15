import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkMainElement($: cheerio.CheerioAPI): CheckResult[] {
  const main = $("main");
  if (main.length === 0)
    return [
      { message: "No se encontró <main> en la página", category: "Structure" },
    ];
  if (main.length > 1)
    return [{ message: "Hay más de un <main>", category: "Structure" }];
  return [];
}
