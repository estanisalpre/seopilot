export function checkButtons($) {
    const results = [];
    $("button").each((_, el) => {
        const text = $(el).text().trim();
        const aria = $(el).attr("aria-label");
        if (!text && !aria) {
            results.push({
                message: "Botón sin texto ni aria-label",
                category: "Accessibility",
            });
        }
    });
    return results;
}
