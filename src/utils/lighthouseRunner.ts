// Genera recomendaciones automáticas según los resultados de Lighthouse
export function lighthouseRecommendations(metrics: {
  lcp: string | undefined;
  fid: string | undefined;
  cls: string | undefined;
  tbt: string | undefined;
  fcp: string | undefined;
  score: number | null;
}) {
  const recs: string[] = [];

  // LCP
  if (metrics.lcp) {
    const lcpValue = parseFloat(metrics.lcp);
    if (lcpValue > 2.5)
      recs.push(
        "⚠️ LCP alto: Optimiza imágenes y recursos críticos para mejorar el Largest Contentful Paint (<2.5s recomendado)."
      );
  }

  // FID/TBT
  if (metrics.fid) {
    const fidValue = parseFloat(metrics.fid);
    if (fidValue > 100)
      recs.push(
        "⚠️ FID alto: Reduce el JavaScript de terceros y optimiza la interacción inicial (FID <100ms recomendado)."
      );
  } else if (metrics.tbt) {
    const tbtValue = parseFloat((metrics.tbt || "").replace(/[^0-9.]/g, ""));
    if (tbtValue > 200)
      recs.push(
        "⚠️ TBT alto: Minimiza el trabajo del hilo principal y divide el JS en partes más pequeñas (TBT <200ms recomendado)."
      );
  }

  // CLS
  if (metrics.cls) {
    const clsValue = parseFloat(metrics.cls);
    if (clsValue > 0.1)
      recs.push(
        "⚠️ CLS alto: Evita cambios de layout inesperados, reserva espacio para imágenes y fuentes (CLS <0.1 recomendado)."
      );
  }

  // FCP
  if (metrics.fcp) {
    const fcpValue = parseFloat(metrics.fcp);
    if (fcpValue > 1.8)
      recs.push(
        "⚠️ FCP alto: Optimiza el CSS crítico y reduce el tiempo de bloqueo de renderizado (FCP <1.8s recomendado)."
      );
  }

  // Score general
  if (metrics.score !== null && metrics.score < 0.9) {
    recs.push(
      "⚠️ El puntaje de performance es bajo. Revisa las recomendaciones anteriores y considera usar lazy loading, optimización de imágenes y reducción de JS."
    );
  }

  if (recs.length === 0) {
    recs.push(
      "✅ ¡Excelente! Tus métricas Core Web Vitals están dentro de los valores recomendados."
    );
  }

  return recs;
}
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { existsSync } from "fs";

function getChromePath() {
  const candidates = [
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ];
  return candidates.find(existsSync);
}

export async function runLighthouse(url: string) {
  const chromePath = getChromePath();
  if (!chromePath)
    throw new Error("No se encontró Chrome/Chromium en el sistema.");
  const chrome = await launch({
    chromeFlags: ["--headless"],
    chromePath,
  });
  const options = { port: chrome.port, output: "json" as const };
  const runnerResult = await lighthouse(url, options);

  if (!runnerResult || !runnerResult.lhr) {
    await chrome.kill();
    throw new Error("Lighthouse runnerResult or lhr is undefined");
  }

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
