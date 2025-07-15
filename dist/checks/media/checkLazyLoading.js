export function checkLazyLoading($) {
    const results = [];
    $("img").each((_, el) => {
        const loading = $(el).attr("loading");
        if (!loading || loading !== "lazy") {
            results.push({
                message: `Imagen sin loading=\"lazy\": ${$(el).attr("src")}`,
                category: "Performance",
            });
        }
    });
    return results;
}
