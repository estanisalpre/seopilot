export function checkPreload($) {
    const results = [];
    const preloadExact = $('link[rel="preload"]');
    const preloadContains = $('link[rel*="preload"]');
    const allLinks = $("link");
    const totalLinks = allLinks.length;
    if (preloadExact.length === 0 && preloadContains.length === 0) {
        results.push({
            message: `No se encontró ningún recurso con rel="preload" (${totalLinks} links encontrados en total)`,
            category: "Performance",
        });
    }
    return results;
}
