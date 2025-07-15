import chalk from "chalk";
const categoryIcons = {
    SEO: "🧠",
    Accessibility: "♿",
    Performance: "⚡",
    Structure: "🧱",
};
export function report(file, errors) {
    if (errors.length === 0) {
        console.log(`${chalk.green("✔")} ${file}`);
    }
    else {
        console.log(`${chalk.red("✖")} ${file}`);
        errors.forEach(({ message, category }) => {
            const icon = categoryIcons[category] || "📄";
            console.log(`   ${icon} ${chalk.red(message)}`);
        });
    }
}
