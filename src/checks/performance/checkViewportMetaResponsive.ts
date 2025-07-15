import { CheckResult } from "../../types.js";
import * as cheerio from "cheerio";

export function checkViewportMetaResponsive(
  $: cheerio.CheerioAPI
): CheckResult[] {
  const meta = $('meta[name="viewport"]').attr("content");
  const results: CheckResult[] = [];

  if (!meta?.includes("width=device-width")) {
    results.push({
      message: "Viewport meta sin width=device-width",
      category: "Performance",
    });
  }

  if (!meta?.includes("initial-scale=1.0")) {
    results.push({
      message: "Viewport meta sin initial-scale=1.0",
      category: "Performance",
    });
  }

  return results;
}
