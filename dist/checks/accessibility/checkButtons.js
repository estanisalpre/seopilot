export function checkButtons($) {
    const results = [];
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
