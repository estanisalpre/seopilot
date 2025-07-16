"use strict";
/* import * as cheerio from "cheerio";
import { CheckResult } from "../../types.js";

export function checkScriptBlocking($: cheerio.CheerioAPI): CheckResult[] {
  const scripts = $("script").filter((_, el) => {
    const $el = $(el);
    const type = $el.attr("type");
    const src = $el.attr("src");

    if (type) {
      return false;
    }

    if (src) {
      const shouldIgnore =
        src.includes("_astro/") || // Astro's scripts
        src.includes("node_modules/") || // node_modules' scripts
        src.includes("/@") || // Vite/dev's scripts (/@vite/)
        src.includes("chunk-") || // Automatic chuncks
        src.includes(".chunk.") || // Chunck variant
        src.startsWith("/_astro/") || // Astro's scripts (variant)
        src.includes("astro:") || // Astro internal scripts
        /\.(hash|[a-f0-9]{8,})\.(js|mjs)$/.test(src); // Scripts with automatic hash

      if (shouldIgnore) {
        return false;
      }
    } else {
      // Para scripts inline, verificar si contienen código de Astro o son muy pequeños
      const scriptContent = $el.html() || "";

      // Ignorar scripts de Astro
      const isAstroScript =
        scriptContent.includes("self.Astro") ||
        scriptContent.includes("window.Astro") ||
        scriptContent.includes("astro:") ||
        /\(\(\)=>\{.*Astro.*\}\)\(\)/.test(scriptContent);

      // Ignorar scripts muy pequeños (probablemente configuración)
      const isSmallScript = scriptContent.replace(/\s/g, "").length < 100;

      // Ignorar scripts de configuración común
      const isConfigScript =
        scriptContent.includes("gtag(") ||
        scriptContent.includes("dataLayer") ||
        scriptContent.includes("fbq(") ||
        scriptContent.includes("ga(") ||
        /window\.\w+\s*=/.test(scriptContent); // Asignaciones a window

      if (isAstroScript || isSmallScript || isConfigScript) {
        return false;
      }
    }

    return !$el.attr("async") && !$el.attr("defer");
  });

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
 */ 
