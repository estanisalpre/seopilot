import { runLighthouse } from "./lighthouseRunner";
(async () => {
    const url = process.argv[2] || "https://www.google.com";
    console.log(`Analizando ${url} con Lighthouse...`);
    const metrics = await runLighthouse(url);
    console.log("Core Web Vitals:", metrics);
})();
