import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, copyFileSync, rmSync } from "fs";

// Плагин для копирования ассетов после сборки
function copyAssets() {
  return {
    name: "copy-assets",
    buildStart() {
      // Очищаем dist при первой сборке
      try { rmSync("dist", { recursive: true, force: true }); } catch {}
      mkdirSync("dist", { recursive: true });
    },
    generateBundle() {
      // Копируем manifest
      copyFileSync("src/manifest.json", "dist/manifest.json");

      // Копируем иконки
      if (existsSync("public/icons")) {
        mkdirSync("dist/icons", { recursive: true });
        readdirSync("public/icons").forEach((file) => {
          copyFileSync(`public/icons/${file}`, `dist/icons/${file}`);
        });
      }

      // Копируем popup.html и popup.css
      mkdirSync("dist/popup", { recursive: true });
      copyFileSync("src/popup/popup.html", "dist/popup/popup.html");
      if (existsSync("src/popup/popup.css")) {
        copyFileSync("src/popup/popup.css", "dist/popup/popup.css");
      }
    },
  };
}

// Базовая конфигурация для IIFE
function createConfig(input, output) {
  return {
    input,
    output: {
      file: `dist/${output}.js`,
      format: "iife",
      name: output.replace(/[^a-zA-Z]/g, "_"),
      sourcemap: false,
    },
    plugins: [
      resolve({ browser: true }),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  };
}

// Массив конфигов — Rollup соберёт каждый последовательно
export default [
  {
    ...createConfig("src/background.ts", "background"),
    plugins: [
      ...createConfig("src/background.ts", "background").plugins,
      copyAssets(),
    ],
  },
  createConfig("src/content.ts", "content"),
  createConfig("src/popup/popup.ts", "popup/popup"),
];