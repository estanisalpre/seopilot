export function checkGoogleFontDisplaySwap($) {
    const fonts = $("link[href*='fonts.googleapis.com']");
    const results = [];
    fonts.each((_, el) => {
        const href = $(el).attr("href") || "";
        if (!href.includes("display=swap")) {
            results.push({
                message: `Google Font sin display=swap: ${href}`,
                category: "Performance",
            });
        }
    });
    return results;
}
