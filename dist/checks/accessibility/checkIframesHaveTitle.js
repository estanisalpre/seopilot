export function checkIframesHaveTitle($) {
    const results = [];
    $("iframe").each((_, el) => {
        if (!$(el).attr("title")) {
            results.push({
                message: "Iframe sin atributo title",
                category: "Accessibility",
            });
        }
    });
    return results;
}
