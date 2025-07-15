export function checkImageFormats($) {
    const results = [];
    $("img").each((_, el) => {
        const src = $(el).attr("src") || "";
        if (src &&
            !src.endsWith(".svg") &&
            !src.endsWith(".webp")) {
            results.push({
                message: `Imagen no usa formato moderno (.svg, .webp): ${src}`,
                category: "Performance",
            });
        }
    });
    return results;
}
