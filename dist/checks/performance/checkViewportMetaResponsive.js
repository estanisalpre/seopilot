export function checkViewportMetaResponsive($) {
    const meta = $('meta[name="viewport"]').attr("content");
    const results = [];
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
