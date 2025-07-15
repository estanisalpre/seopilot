export function checkLangAttr($) {
    if (!$("html").attr("lang")) {
        return [
            {
                message: "<html> no tiene atributo lang",
                category: "Accessibility",
            },
        ];
    }
    return [];
}
