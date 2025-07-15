export function checkMetaDescription($) {
    if ($('meta[name="description"]').length === 0) {
        return [
            {
                message: 'Falta <meta name="description">',
                category: "SEO",
            },
        ];
    }
    return [];
}
