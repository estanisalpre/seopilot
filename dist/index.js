import { runChecks } from "./runner.js";
import { detectOutputDir } from "./utils/detectFramework.js";
import { runLighthouse, lighthouseRecommendations } from "./utils/lighthouseRunner.js";
const failOnError = process.argv.includes("--fail-on-error");
const urlArg = process.argv.find((arg) => arg.startsWith("http"));
if (urlArg) {
    (async () => {
        console.log(`\n🚦 Ejecutando Lighthouse para ${urlArg}...\n`);
        try {
            const metrics = await runLighthouse(urlArg);
            console.log("Core Web Vitals:", metrics);
            const recomendaciones = lighthouseRecommendations(metrics);
            console.log("\n🔎 Recomendaciones Lighthouse:");
            recomendaciones.forEach((r) => console.log(r));
        }
        catch (e) {
            console.error("Error ejecutando Lighthouse:", e);
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
    console.log(`\n✈️  SEOpilot: Escaneando carpeta: ${basePath}\n`);
    runChecks({
        failOnError,
        basePath,
        limit,
        verbose: isVerbose,
        json: isJson,
    }).then((hasErrors) => {
        if (!isJson) {
            console.log("\n✅ Análisis completo.\n");
        }
        if (failOnError && hasErrors) {
            process.exit(1);
        }
    });
}
