import fs from 'fs';

export function detectOutputDir(): string {
  const cwd = process.cwd();

  if (fs.existsSync(`${cwd}/astro.config.mjs`)) return 'dist';
  if (fs.existsSync(`${cwd}/next.config.js`)) {
    if (fs.existsSync(`${cwd}/out`)) return 'out'; // SSG export
    return '.next'; // SSR - podríamos advertir que no es soportado aún
  }
  if (fs.existsSync(`${cwd}/vue.config.js`) || fs.existsSync(`${cwd}/vite.config.ts`)) {
    if (fs.existsSync(`${cwd}/dist`)) return 'dist';
  }
  if (fs.existsSync(`${cwd}/nuxt.config.js`) || fs.existsSync(`${cwd}/.output/public`)) return '.output/public';
  if (fs.existsSync(`${cwd}/build`)) return 'build'; // CRA

  // Fallback
  return 'dist';
}
