import { runChecks } from './runner.js';
import { detectOutputDir } from './utils/detectFramework.js';
// Detecta si se debe fallar al encontrar errores
// Si se especifica --fail-on-error, se toma como true
const failOnError = process.argv.includes('--fail-on-error');
// Detecta el directorio de salida
// Si se especifica --path, se toma el valor siguiente
const pathIndex = process.argv.indexOf('--path');
const customPath = pathIndex !== -1 ? process.argv[pathIndex + 1] : undefined;
// Si no se especifica un directorio, se detecta automáticamente
const basePath = customPath || detectOutputDir();
// Si se especifica --limit, se toma el valor siguiente
// Si no, se usa un valor por defecto (por ejemplo, 100)
const limitIndex = process.argv.indexOf('--limit');
const limit = limitIndex !== -1 ? parseInt(process.argv[limitIndex + 1]) : 100; // Límite por defecto de 100 archivos
// Si no se especifica, no hay límite
// Si se especifica --verbose, se toma como true
// Esto podría usarse para mostrar más detalles en la salida
const isVerbose = process.argv.includes('--verbose');
// Si se especifica --json, se toma como true
// Esto podría usarse para generar un reporte en formato JSON
const isJson = process.argv.includes('--json');
console.log(`\n✈️  SEOpilot: Escaneando carpeta: ${basePath}\n`);
runChecks({ failOnError, basePath, limit, verbose: isVerbose, json: isJson }).then((hasErrors) => {
    if (!isJson) {
        console.log('\n✅ Análisis completo.\n');
    }
    if (failOnError && hasErrors) {
        process.exit(1);
    }
});
