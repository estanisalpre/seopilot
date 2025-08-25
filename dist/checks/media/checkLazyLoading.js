export function checkLazyLoading($) {
    const results = [];
    $("img").each((_, el) => {
        const $img = $(el);
        const loading = $img.attr("loading");
        if ($img.closest("header").length > 0 ||
            $img.closest(".hero, .main-hero, .logo, .above-the-fold").length > 0) {
            return;
        }
        const $main = $img.closest("main");
        if ($main.length > 0) {
            const mainImgs = $main.find("img");
            if (mainImgs.index($img) > -1 && mainImgs.index($img) < 5) {
                return;
            }
        }
        if (!loading || loading !== "lazy") {
            results.push({
                message: `Imagen sin loading=\"lazy\": ${$img.attr("src")}`,
                category: "Performance",
            });
        }
    });
    return results;
}
