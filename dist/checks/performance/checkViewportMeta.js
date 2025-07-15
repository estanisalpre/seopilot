export function checkViewportMeta($) {
    if ($('meta[name="viewport"]').length === 0) {
        return [
            {
                message: 'Falta <meta name="viewport">',
                category: "SEO",
            },
        ];
    }
    return [];
}
