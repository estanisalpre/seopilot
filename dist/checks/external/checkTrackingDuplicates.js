export function checkTrackingDuplicates($) {
    const results = [];
    const trackers = ["googletagmanager.com/gtag/js", "connect.facebook.net"];
    trackers.forEach((src) => {
        const found = $(`script[src*='${src}']`);
        if (found.length > 1) {
            results.push({
                message: `Script de tracking duplicado: ${src}`,
                category: "SEO",
            });
        }
    });
    return results;
}
