"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lighthouseRunner_1 = require("./lighthouseRunner");
(async () => {
    const url = process.argv[2] || "https://www.example.com";
    console.log(`Analizando ${url} con Lighthouse...`);
    const metrics = await (0, lighthouseRunner_1.runLighthouse)(url);
    console.log("Core Web Vitals:", metrics);
})();
