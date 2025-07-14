import { globby } from 'globby';
import pMap from 'p-map';
import fs from 'fs';
import * as cheerio from 'cheerio';
export async function runChecks(options) {
    const basePath = options.basePath || 'dist';
    const allFiles = await globby([`${basePath}/**/*.html`]);
    const files = options.limit ? allFiles.slice(0, options.limit) : allFiles;
    if (files.length === 0) {
        console.log('⚠️  No se encontraron archivos HTML para analizar.');
        return false;
    }
    if (!options.json && allFiles.length > files.length) {
        console.log(`⚠️  Detectados ${allFiles.length} archivos. Escaneando solo los primeros ${files.length}. Usa --limit para aumentar.`);
    }
    let hasErrors = false;
    const globalErrors = {};
    const fileErrors = [];
    await pMap(files, async (file) => {
        const html = fs.readFileSync(file, 'utf8');
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
