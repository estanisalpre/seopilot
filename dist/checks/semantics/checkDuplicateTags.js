export function checkDuplicateTags($) {
    const results = [];
    const tagsToCheck = [
        "title",
        "meta[name='description']",
        "meta[property='og:title']",
    ];
    tagsToCheck.forEach((selector) => {
        if ($(selector).length > 1) {
            results.push({
                message: `Etiqueta duplicada: ${selector}`,
                category: "Structure",
            });
        }
    });
    return results;
}
