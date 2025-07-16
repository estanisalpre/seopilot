export function checkScriptBlocking($) {
    const scripts = $("script").filter((_, el) => {
        const $el = $(el);
        const type = $el.attr("type");
        const src = $el.attr("src");
        if (type) {
            return false;
        }
        if (src) {
            const shouldIgnore = src.includes("_astro/") || // Astro's scripts
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
