import { defineConfig } from "tsup";
import { copyFileSync, readFileSync, writeFileSync } from "fs";

const useClientEntry = '"use client";\n';

function prependUseClient() {
  for (const file of ["dist/index.js", "dist/index.cjs"]) {
    const content = readFileSync(file, "utf8");
    writeFileSync(file, useClientEntry + content);
  }
}

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "tailwind-plugin": "src/tailwind-plugin.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  publicDir: "src/theme",
  external: [
    "react",
    "react-dom",
    "framer-motion",
    "tailwindcss",
    "@radix-ui",
  ],
  onSuccess: async () => {
    copyFileSync("src/theme/themes.css", "dist/styles.css");
    prependUseClient();
    console.log("✓ Copied themes.css → dist/styles.css");
    console.log("✓ Prepended 'use client' to dist/index.js");
  },
});
