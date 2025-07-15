export function checkTouchTargets($) {
    const results = [];
    $("button, a").each((_, el) => {
        const width = parseInt($(el).css("width") || "0", 10);
        const height = parseInt($(el).css("height") || "0", 10);
        if (width < 48 || height < 48) {
            results.push({
                message: "Elemento táctil menor a 48x48px",
                category: "Accessibility",
            });
        }
    });
    return results;
}
