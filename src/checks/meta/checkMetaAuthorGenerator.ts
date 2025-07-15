import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkMetaAuthorGenerator($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  if ($('meta[name="author"]').length === 0) {
    results.push({ message: 'Falta <meta name="author">', category: "SEO" });
  }
  if ($('meta[name="generator"]').length === 0) {
    results.push({ message: 'Falta <meta name="generator">', category: "SEO" });
  }
  return results;
}
