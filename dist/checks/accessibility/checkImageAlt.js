export function checkImageAlt($) {
    const results = [];
    $("img").each((_, el) => {
        if (!$(el).attr("alt")) {
            results.push({
                message: `Imagen sin alt: ${$(el).attr("src")}`,
                category: "Accessibility",
            });
        }
    });
    return results;
}
