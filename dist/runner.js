"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runChecks = runChecks;
const globby_1 = require("globby");
const p_map_1 = __importDefault(require("p-map"));
const fs_1 = __importDefault(require("fs"));
const cheerio = __importStar(require("cheerio"));
async function runChecks(options) {
    const basePath = options.basePath || 'dist';
    const allFiles = await (0, globby_1.globby)([`${basePath}/**/*.html`]);
    const files = options.limit ? allFiles.slice(0, options.limit) : allFiles;
    if (!options.json && allFiles.length > files.length) {
        console.log(`⚠️  Detectados ${allFiles.length} archivos. Escaneando solo los primeros ${files.length}. Usa --limit para aumentar.`);
    }
    let hasErrors = false;
    const globalErrors = {};
    const fileErrors = [];
    await (0, p_map_1.default)(files, async (file) => {
        const html = fs_1.default.readFileSync(file, 'utf8');
        const $ = cheerio.load(html);
        const errors = [];
        const h1s = $('h1');
        if (h1s.length > 1)
            errors.push(`Tiene ${h1s.length} <h1>. Solo debe haber uno.`);
        $('img').each((_, el) => {
            if (!$(el).attr('alt'))
                errors.push(`Imagen sin alt: ${$(el).attr('src')}`);
        });
        if ($('title').length === 0)
            errors.push(`Falta <title>`);
        if ($('meta[name="description"]').length === 0)
            errors.push(`Falta <meta name="description">`);
        if (!$('html').attr('lang'))
            errors.push(`<html> no tiene atributo lang`);
        if (errors.length > 0) {
            hasErrors = true;
            fileErrors.push({ file, messages: errors });
            // Agrupar errores globales
            errors.forEach((err) => {
                globalErrors[err] = (globalErrors[err] || 0) + 1;
            });
            // Verbose: mostrar errores individuales
            if (options.verbose && !options.json) {
                console.log(`\n📄 ${file}`);
                errors.forEach((err) => console.log(`   ❌ ${err}`));
            }
        }
    }, { concurrency: 10 });
    if (options.json) {
        const output = {
            totalFilesScanned: files.length,
            errors: fileErrors,
            summary: globalErrors,
        };
        console.log(JSON.stringify(output, null, 2));
    }
    else {
        console.log('\n📊 Resumen de errores:\n');
        if (Object.keys(globalErrors).length === 0) {
            console.log('✅ Ningún error encontrado.');
        }
        else {
            Object.entries(globalErrors).forEach(([msg, count]) => {
                console.log(`❌ ${msg} — ${count} ocurrencias`);
            });
        }
    }
    return hasErrors;
}
