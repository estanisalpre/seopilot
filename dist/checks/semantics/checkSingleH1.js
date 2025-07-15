export function checkSingleH1($) {
    const h1s = $("h1");
    if (h1s.length > 1) {
        return [
            {
                message: `Tiene ${h1s.length} <h1>. Solo debe haber uno.`,
                category: "Structure",
            },
        ];
    }
    return [];
}
