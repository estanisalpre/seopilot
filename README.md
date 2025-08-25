# ✈️ SEOpilot

> Una herramienta CLI ligera para detectar errores SEO en sitios web estáticos de forma automática, simple y efectiva.

---

## 🚀 ¿Qué es SEOpilot?

**SEOpilot** es un analizador SEO para sitios generados con frameworks como **React**, **Astro**, **Vue**, **Next.js (modo export)**, **Vite**, entre otros. Escanea archivos HTML y te reporta errores comunes de SEO como:

- Múltiples etiquetas `<h1>`
- Falta de `<title>` o `<meta name="description">`
- Imágenes sin atributo `alt`
- Falta de `lang` en la etiqueta `<html>`

Ideal para proyectos estáticos y flujos de CI/CD donde el SEO importa desde el principio.

---

## 🧪 Características

- ✅ Fácil de usar: `npx seopilot`
- ✅ Soporte para `--verbose`, `--json`, `--limit`, `--fail-on-error`
- ✅ Funciona en cualquier framework moderno
- ✅ Puede integrarse en CI (GitHub Actions, etc.)
- ✅ Salida clara y útil para humanos o máquinas

---

## 📦 Instalación

### Opción 1: Uso directo con `npx`

```bash
npx seopilot
```

### Opción 2: Instalar como dependencia

```bash
npm i -D seopilot
```

Luego, en tu `package.json`:

```json
"scripts": {
  "seo": "seopilot"
}
```

---

## 📁 Estructura recomendada

```
📦 tu-proyecto/
├─ dist/                  ← carpeta de salida (HTMLs generados)
├─ src/
├─ .github/workflows/    ← integración con CI
└─ ...
```

---

## 🧰 Comandos y Flags

### 🔍 Análisis básico

```bash
npx seopilot
```

---

### 📍 Especificar carpeta

```bash
npx seopilot --path src/testing
```

---

### 🗣️ Modo verbose (por archivo)

```bash
npx seopilot --verbose
```

---

### 🧪 Modo JSON (para máquinas)

```bash
npx seopilot --json
```

---

### 🛑 Falla si hay errores (para CI)

```bash
npx seopilot --fail-on-error
```

---

### ⏱️ Limitar cantidad de archivos analizados

```bash
npx seopilot --limit 20
```

---

### 🔀 Combinado

```bash
npx seopilot --path src/testing --verbose --limit 10 --fail-on-error
```

---

## ✅ Salida esperada

### ✅ Modo normal

```
📊 Resumen de errores:

❌ Imagen sin alt: hero.jpg — 2 ocurrencias
❌ Falta <meta name="description"> — 1 ocurrencias
```

### ✅ Modo verbose

```
📄 dist/index.html
   ❌ Imagen sin alt: hero.jpg
   ❌ Falta <title>
```

### ✅ Modo JSON

```json
{
  "totalFilesScanned": 5,
  "errors": [
    {
      "file": "dist/index.html",
      "messages": ["Falta <title>", "Imagen sin alt: hero.jpg"]
    }
  ],
  "summary": {
    "Falta <title>": 1,
    "Imagen sin alt: hero.jpg": 2
  }
}
```

---

## 🤖 Integración con GitHub Actions

### `.github/workflows/seo-check.yml`

```yaml
name: SEO Check

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  seo:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Run SEOpilot
        run: npx seopilot --fail-on-error
```

---

## 🧪 Ejemplo de archivos HTML para testeo

Colocá estos archivos en una carpeta `src/testing/` y corré:

```bash
npx seopilot --path src/testing --verbose
```

### 📄 `correct.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Test</title>
    <meta name="description" content="Página correcta">
  </head>
  <body>
    <h1>Hola mundo</h1>
    <img src="logo.png" alt="Logo">
  </body>
</html>
```

### 📄 `no-title.html`

```html
<html lang="es">
  <head></head>
  <body><h1>Falta título</h1></body>
</html>
```

### 📄 `multiple-h1.html`

```html
<html lang="es">
  <head><title>Error</title></head>
  <body>
    <h1>Uno</h1>
    <h1>Dos</h1>
  </body>
</html>
```

---

## 💡 Roadmap

- [x] Soporte CLI completo
- [x] Modo JSON
- [x] CI con GitHub Actions
- [ ] Configuración por archivo `seopilot.config.ts`
- [ ] Reglas personalizadas
- [ ] Modo web/interfaz gráfica
- [ ] Autocorrección básica (opcional)

---

## 💬 Contribuciones

¡Son bienvenidas! Puedes:

- Abrir issues
- Sugerir nuevas reglas SEO
- Proponer mejoras de UX
- Enviar PRs

---

## 🧠 Autor

Creado por [@estanisalpre](https://github.com/estanisalpre) — para que ningún proyecto se quede sin SEO por descuido.

---

## 🧭 Licencia

MIT — Usá, modificá, compartí. Pero no pongas `<h1>` múltiples o SEOpilot te va a encontrar 😈