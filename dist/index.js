import { runChecks } from "./runner.js";
import { detectOutputDir } from "./utils/detectFramework.js";
import { runLighthouse, lighthouseRecommendations, } from "./utils/lighthouseRunner.js";
import chalk from "chalk";
import figlet from "figlet";
import ora from "ora";
import boxen from "boxen";
const failOnError = process.argv.includes("--fail-on-error");
console.log(boxen(chalk.cyan(figlet.textSync("SEOpilot", { horizontalLayout: "full" })) +
    "\n" +
    chalk.bold.magenta("La CLI de SEO para sitios modernos 🚀"), {
    padding: 1,
    borderColor: "cyan",
    borderStyle: "round",
    align: "center",
    margin: 1,
}));
const urlArg = process.argv.find((arg) => arg.startsWith("http"));
if (urlArg) {
    (async () => {
        const spinner = ora(chalk.yellow(`Ejecutando Lighthouse para ${urlArg}...`)).start();
        try {
            const metrics = await runLighthouse(urlArg);
            spinner.succeed(chalk.green("Análisis Lighthouse completo."));
            console.log(boxen(chalk.bold.cyan("Core Web Vitals:") +
                "\n" +
                chalk.whiteBright(JSON.stringify(metrics, null, 2)), {
                padding: 1,
                borderColor: "blue",
                borderStyle: "classic",
                align: "left",
                margin: 1,
            }));
            const recomendaciones = lighthouseRecommendations(metrics);
            console.log(boxen(chalk.bold.magenta("🔎 Recomendaciones Lighthouse:") +
                "\n" +
                recomendaciones.map((r) => chalk.yellow(r)).join("\n"), {
                padding: 1,
                borderColor: "magenta",
                borderStyle: "double",
                align: "left",
                margin: 1,
            }));
        }
        catch (e) {
            spinner.fail(chalk.red("Error ejecutando Lighthouse:"));
            console.error(e);
        }
        runLocalChecks();
    })();
}
else {
    runLocalChecks();
}
function runLocalChecks() {
    const pathIndex = process.argv.indexOf("--path");
    const customPath = pathIndex !== -1 ? process.argv[pathIndex + 1] : undefined;
    const basePath = customPath || detectOutputDir();
    const limitIndex = process.argv.indexOf("--limit");
    const limit = limitIndex !== -1 ? parseInt(process.argv[limitIndex + 1]) : 100;
    const isVerbose = process.argv.includes("--verbose");
    const isJson = process.argv.includes("--json");
    console.log(boxen(chalk.bold.blueBright(`✈️  SEOpilot: Escaneando carpeta: ${basePath}`), {
        padding: 1,
        borderColor: "blue",
        borderStyle: "round",
        align: "center",
        margin: 1,
    }));
    runChecks({
        failOnError,
        basePath,
        limit,
        verbose: isVerbose,
        json: isJson,
    }).then((hasErrors) => {
        if (!isJson) {
            console.log(boxen(chalk.green("✅ Análisis completo."), {
                padding: 1,
                borderColor: "green",
                borderStyle: "round",
                align: "center",
                margin: 1,
            }));
        }
        if (failOnError && hasErrors) {
            process.exit(1);
        }
    });
}
