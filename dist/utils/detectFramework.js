"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectOutputDir = detectOutputDir;
const fs_1 = __importDefault(require("fs"));
function detectOutputDir() {
    const cwd = process.cwd();
    if (fs_1.default.existsSync(`${cwd}/astro.config.mjs`))
        return 'dist';
    if (fs_1.default.existsSync(`${cwd}/next.config.js`)) {
        if (fs_1.default.existsSync(`${cwd}/out`))
            return 'out'; // SSG export
        return '.next'; // SSR - podríamos advertir que no es soportado aún
    }
    if (fs_1.default.existsSync(`${cwd}/vue.config.js`) || fs_1.default.existsSync(`${cwd}/vite.config.ts`)) {
        if (fs_1.default.existsSync(`${cwd}/dist`))
            return 'dist';
    }
    if (fs_1.default.existsSync(`${cwd}/nuxt.config.js`) || fs_1.default.existsSync(`${cwd}/.output/public`))
        return '.output/public';
    if (fs_1.default.existsSync(`${cwd}/build`))
        return 'build'; // CRA
    // Fallback
    return 'dist';
}
