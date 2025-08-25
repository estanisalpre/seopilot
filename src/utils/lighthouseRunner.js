"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runLighthouse = runLighthouse;
const lighthouse_1 = __importDefault(require("lighthouse"));
const chrome_launcher_1 = __importDefault(require("chrome-launcher"));
async function runLighthouse(url) {
    const chrome = await chrome_launcher_1.default.launch({ chromeFlags: ["--headless"] });
    const options = { port: chrome.port, output: "json" };
    const runnerResult = await (0, lighthouse_1.default)(url, options);
    // Extrae métricas Core Web Vitals
    const lhr = runnerResult.lhr;
    const metrics = {
        lcp: lhr.audits["largest-contentful-paint"].displayValue,
        fid: lhr.audits["max-potential-fid"].displayValue,
        cls: lhr.audits["cumulative-layout-shift"].displayValue,
        tbt: lhr.audits["total-blocking-time"].displayValue,
        fcp: lhr.audits["first-contentful-paint"].displayValue,
        score: lhr.categories.performance.score,
    };
    await chrome.kill();
    return metrics;
}
