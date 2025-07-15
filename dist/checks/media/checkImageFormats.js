export function checkImageFormats($) {
    const results = [];
    $("img").each((_, el) => {
        const src = $(el).attr("src") || "";
        if (src && !src.endsWith(".webp") && !src.endsWith(".avif")) {
            results.push({
                message: `Imagen no usa formato moderno (.webp o .avif): ${src}`,
                category: "Performance",
            });
        }
    });
    return results;
}
