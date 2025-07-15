export function checkMetaRobots($) {
    const meta = $('meta[name="robots"]');
    if (meta.length > 0 && meta.attr("content")?.includes("noindex")) {
        return [
            {
                message: "<meta name=\"robots\"> contiene 'noindex'",
                category: "SEO",
            },
        ];
    }
    return [];
}
