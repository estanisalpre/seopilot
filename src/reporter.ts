import chalk from "chalk";
import { CheckResult } from "./types.js";

const categoryIcons: Record<CheckResult["category"], string> = {
  SEO: "🧠",
  Accessibility: "♿",
  Performance: "⚡",
  Structure: "🧱",
};

export function report(file: string, errors: CheckResult[]) {
  if (errors.length === 0) {
    console.log(`${chalk.green("✔")} ${file}`);
  } else {
    console.log(`${chalk.red("✖")} ${file}`);
    errors.forEach(({ message, category }) => {
      const icon = categoryIcons[category] || "📄";
      console.log(`   ${icon} ${chalk.red(message)}`);
    });
  }
}