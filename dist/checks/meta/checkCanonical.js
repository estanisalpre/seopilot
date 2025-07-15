export function checkCanonical($) {
    const link = $('link[rel="canonical"]');
    if (link.length === 0) {
        return [
            {
                message: 'Falta <link rel="canonical">',
                category: "SEO",
            },
        ];
    }
    return [];
}
