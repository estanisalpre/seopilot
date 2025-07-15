export function checkOpenGraph($) {
    const tags = ["og:title", "og:description", "og:image", "og:url"];
    const results = [];
    tags.forEach((tag) => {
        if ($(`meta[property="${tag}"]`).length === 0) {
            results.push({
                message: `Falta meta Open Graph: ${tag}`,
                category: "SEO",
            });
        }
    });
    return results;
}
