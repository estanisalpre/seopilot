export function checkTitle($) {
    if ($("title").length === 0) {
        return [
            {
                message: "Falta <title>",
                category: "SEO",
            },
        ];
    }
    return [];
}
