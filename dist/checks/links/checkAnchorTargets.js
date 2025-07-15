export function checkAnchorTargets($) {
    const results = [];
    $('a[target="_blank"]').each((_, el) => {
        const rel = $(el).attr("rel");
        if (!rel || !rel.includes("noopener")) {
            results.push({
                message: `Enlace externo sin rel=\"noopener\": ${$(el).attr("href")}`,
                category: "SEO",
            });
        }
    });
    return results;
}
