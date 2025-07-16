export function checkAnchorTargets($) {
    const results = [];
    $('a[target="_blank"]').each((_, el) => {
        const rel = $(el).attr("rel");
        const href = $(el).attr("href");
        
        if (!rel || !rel.includes("noopener")) {
            results.push({
                message: `Enlace externo sin rel="noopener": ${href} (rel encontrado: "${rel}")`,
                category: "SEO",
            });
        }
    });
    return results;
}
