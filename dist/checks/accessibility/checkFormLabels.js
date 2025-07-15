export function checkFormLabels($) {
    const results = [];
    $("input, select, textarea").each((_, el) => {
        const id = $(el).attr("id");
        if (id && $(`label[for="${id}"]`).length === 0) {
            results.push({
                message: `Campo con id=\"${id}\" sin label asociada`,
                category: "Accessibility",
            });
        }
    });
    return results;
}
