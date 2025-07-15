export function checkPreload($) {
    const preload = $('link[rel="preload"]');
    if (preload.length === 0) {
        return [
            {
                message: 'No se encontró ningún recurso con rel="preload"',
                category: "Performance",
            },
        ];
    }
    return [];
}
