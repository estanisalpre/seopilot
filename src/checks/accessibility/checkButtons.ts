import { CheckResult } from "../../types.js";

export function checkButtons($: cheerio.CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];

  $("button").each((_, el) => {
    const aria = $(el).attr("aria-label");

    if (!aria) {
      results.push({
        message: "Botón sin aria-label",
        category: "Accessibility",
      });
    }
  });

  return results;
}
