export function checkTouchTargets($) {
    const results = [];
    $("button, a").each((_, el) => {
        const width = parseInt($(el).css("width") || "0", 10);
        const height = parseInt($(el).css("height") || "0", 10);
        if (width > 0 || height > 0) {
            if (width < 48) {
                results.push({
                    message: "Elemento táctil con width menor a 48px",
                    category: "Accessibility",
                });
            }
            if (height < 48) {
                results.push({
                    message: "Elemento táctil con height menor a 48px",
                    category: "Accessibility",
                });
            }
        }
    });
    return results;
}
