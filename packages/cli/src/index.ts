#!/usr/bin/env node
/**
 *
 * Scaffold projects, add components, and manage themes from the terminal.
 *
 * Usage:
 *   velora init
 *   velora init --template next --name my-app --theme dark
 *   velora add button card toast
 *   velora theme list
 *   velora theme set dark
 */

import { Command } from "commander";
import { createRequire } from "module";
import readline from "readline";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import {
  scaffoldProject,
  TEMPLATE_LIST,
  THEMES,
  PACKAGE_MANAGERS,
} from "./init/scaffold.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// ─── Types ───────────────────────────────────────────────────────────────────

interface VeloraConfig {
  version: string;
  theme: string;
  components: string[];
  aliases: {
    components: string;
    utils: string;
    hooks: string;
  };
  tailwind: {
    config: string;
    css: string;
  };
}

// ─── Colors ──────────────────────────────────────────────────────────────────

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  violet: "\x1b[35m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
  white: "\x1b[97m",
};

const brand = (s: string) => `${c.violet}${c.bold}${s}${c.reset}`;
const success = (s: string) => `${c.green}✓${c.reset} ${s}`;
const warn = (s: string) => `${c.yellow}⚠${c.reset} ${s}`;
const error = (s: string) => `${c.red}✗${c.reset} ${s}`;
const info = (s: string) => `${c.cyan}→${c.reset} ${s}`;
const dim = (s: string) => `${c.dim}${s}${c.reset}`;

// ─── Prompt helper ───────────────────────────────────────────────────────────

function createPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return {
    ask(question: string): Promise<string> {
      return new Promise((resolve) => {
        rl.question(question, (answer) => {
          resolve(answer.trim());
        });
      });
    },
    choose(question: string, options: string[]): Promise<string> {
      return new Promise((resolve) => {
        console.log(`\n${question}\n`);
        options.forEach((opt, i) => {
          console.log(`  ${c.cyan}${i + 1}${c.reset}) ${opt}`);
        });
        const ask = () => {
          rl.question(`${dim("  Enter number (1-" + options.length + "): ")}`, (answer) => {
            const idx = parseInt(answer, 10) - 1;
            if (idx >= 0 && idx < options.length) {
              resolve(options[idx]!);
            } else {
              console.log(`${c.red}Invalid selection. Please try again.${c.reset}`);
              ask();
            }
          });
        };
        ask();
      });
    },
    confirm(question: string, defaultVal = true): Promise<boolean> {
      return new Promise((resolve) => {
        const hint = defaultVal ? "[Y/n]" : "[y/N]";
        rl.question(`${question} ${dim(hint)} `, (answer) => {
          const val = answer.trim().toLowerCase();
          if (val === "") return resolve(defaultVal);
          resolve(val === "y" || val === "yes");
        });
      });
    },
    close() {
      rl.close();
    },
  };
}

// ─── Available components ────────────────────────────────────────────────────

const COMPONENTS: Record<string, { deps?: string[]; description: string }> = {
  accordion: { description: "Collapsible content sections" },
  avatar: { description: "User profile image with fallback" },
  badge: { description: "Status indicators and labels" },
  button: { description: "Primary interactive element" },
  card: { description: "Content container with variants" },
  checkbox: { description: "Boolean input with label" },
  command: { description: "⌘K command palette" },
  dialog: { description: "Modal overlay dialog", deps: ["button"] },
  dropdown: { description: "Context menu and dropdown" },
  form: { description: "Form with React Hook Form integration", deps: ["input", "textarea"] },
  input: { description: "Text input with validation" },
  navigation: { description: "Top-level navigation menu" },
  popover: { description: "Floating content panel" },
  progress: { description: "Progress bar and circular indicator" },
  "scroll-area": { description: "Custom scrollbar container" },
  select: { description: "Dropdown selection input" },
  separator: { description: "Visual content divider" },
  sidebar: { description: "Collapsible navigation sidebar" },
  skeleton: { description: "Loading state placeholder" },
  spinner: { description: "Loading indicator" },
  switch: { description: "Toggle control" },
  table: { description: "Data table with sorting and selection" },
  tabs: { description: "Tabbed content panels" },
  textarea: { description: "Multi-line text input" },
  toast: { description: "Notification system with useToast hook" },
  tooltip: { description: "Contextual hover information" },
};

// ─── Program ─────────────────────────────────────────────────────────────────

const program = new Command();

program
  .name("velora")
  .description("Velora UI Ecosystem CLI")
  .version("0.3.1");

// ─── Init ────────────────────────────────────────────────────────────────────

program
  .command("init")
  .description("Scaffold a new project with Velora")
  .option("--template <template>", `Framework template (${TEMPLATE_LIST.map((t) => t.key).join(", ")})`)
  .option("--name <name>", "Project name")
  .option("--theme <theme>", `Default theme (${THEMES.join(", ")})`, "dark")
  .option("--package-manager <pm>", `Package manager (${PACKAGE_MANAGERS.join(", ")})`)
  .option("--no-install", "Skip dependency installation")
  .action(async (opts) => {
    console.log(`\n${brand("Velora")} ${c.dim}— Premium React UI Ecosystem${c.reset}\n`);

    const prompt = createPrompt();

    try {
      // Project name
      let projectName = opts.name;
      if (!projectName) {
        projectName = await prompt.ask(`${info(" Project name: ")}`);
        if (!projectName) {
          console.log(error("Project name is required."));
          process.exit(1);
        }
      }

      // Framework template
      let templateKey = opts.template;
      if (!templateKey) {
        const templateNames = TEMPLATE_LIST.map((t) => t.name);
        const chosen = await prompt.choose("Select a framework:", templateNames);
        const match = TEMPLATE_LIST.find((t) => t.name === chosen);
        templateKey = match!.key;
      }

      // Theme
      let theme = opts.theme;
      if (!opts.template && !opts.theme) {
        // Only prompt if not provided via flags
        const chosen = await prompt.choose("Select a default theme:", THEMES);
        theme = chosen;
      }

      // Package manager
      let pm = opts.packageManager;
      if (pm === undefined && opts.install !== false) {
        pm = await prompt.choose("Package manager:", PACKAGE_MANAGERS);
      }

      // Install deps
      let installDeps = opts.install !== false;
      if (installDeps && !opts.packageManager && !opts.template) {
        installDeps = await prompt.confirm("\nInstall dependencies?", true);
      }

      prompt.close();

      console.log();

      // Scaffold
      await scaffoldProject({
        name: projectName,
        template: templateKey!,
        theme,
        packageManager: pm || "npm",
        installDeps,
      });
    } catch (err) {
      prompt.close();
      console.error(error(`Init failed: ${err}`));
      process.exit(1);
    }
  });

// ─── Add ─────────────────────────────────────────────────────────────────────

program
  .command("add [components...]")
  .description("Add components to your project")
  .option("--all", "Add all available components")
  .option("--overwrite", "Overwrite existing files")
  .option("--dir <dir>", "Component output directory", "components/ui")
  .action(async (components: string[], opts) => {
    const toAdd = opts.all ? Object.keys(COMPONENTS) : components;
    const outDir = opts.dir;

    if (toAdd.length === 0) {
      console.log("\nAvailable components:\n");
      for (const [name, meta] of Object.entries(COMPONENTS)) {
        console.log(
          `  ${c.cyan}${name.padEnd(20)}${c.reset} ${c.dim}${meta.description}${c.reset}`
        );
      }
      console.log(`\n${dim("Usage: velora add button card toast")}\n`);
      return;
    }

    // Find @ui-velora/core source in node_modules
    let pkgSrc: string;
    try {
      const pkgJsonPath = require.resolve("@ui-velora/core/package.json");
      pkgSrc = path.join(path.dirname(pkgJsonPath), "src");
      await fs.access(pkgSrc);
    } catch {
      console.log(error("@ui-velora/core not found. Install it first:"));
      console.log(dim("  npm install @ui-velora/core\n"));
      process.exit(1);
    }

    // Ensure output directory exists
    await fs.mkdir(outDir, { recursive: true });

    // Write local utils if it doesn't exist
    const utilsPath = path.join(outDir, "..", "lib", "utils.ts");
    if (!(await fileExists(utilsPath))) {
      const utilsDir = path.dirname(utilsPath);
      await fs.mkdir(utilsDir, { recursive: true });
      await fs.writeFile(
        utilsPath,
        [
          'import { type ClassValue, clsx } from "clsx";',
          'import { twMerge } from "tailwind-merge";',
          "",
          "export function cn(...inputs: ClassValue[]): string {",
          "  return twMerge(clsx(inputs));",
          "}",
          "",
        ].join("\n")
      );
      console.log(success(`Created ${path.relative(process.cwd(), utilsPath)}`));
    }

    // Resolve dependency tree
    const resolved = new Set<string>();
    const resolve = (name: string) => {
      if (resolved.has(name)) return;
      resolved.add(name);
      const meta = COMPONENTS[name];
      if (meta?.deps) meta.deps.forEach(resolve);
    };

    const invalid: string[] = [];
    toAdd.forEach((c) => {
      if (!COMPONENTS[c]) {
        invalid.push(c);
      } else {
        resolve(c);
      }
    });

    if (invalid.length > 0) {
      for (const name of invalid) {
        console.log(warn(`Unknown component: ${name}`));
      }
    }

    console.log(`\n${info(`Adding ${resolved.size} component(s)…\n`)}`);

    let filesWritten = 0;

    for (const name of resolved) {
      const srcDir = path.join(pkgSrc, "components", name);

      try {
        await fs.access(srcDir);
      } catch {
        console.log(warn(`Source not found for ${name}, skipping`));
        continue;
      }

      const destDir = path.join(outDir, name);
      await fs.mkdir(destDir, { recursive: true });

      const files = await getAllFiles(srcDir);

      for (const file of files) {
        const relativePath = path.relative(srcDir, file);
        const destFile = path.join(destDir, relativePath);
        const destFileRelative = path.relative(process.cwd(), destFile);

        if (!(await fileExists(destFile)) || opts.overwrite) {
          let content = await fs.readFile(file, "utf-8");

          // Rewrite relative imports to use local utils
          // ../../utils → ../lib/utils
          const utilsRelDir = path.relative(
            path.dirname(destFile),
            path.dirname(utilsPath)
          ).replace(/\\/g, "/");
          content = content.replace(
            /from\s+["']\.\.\/(\.\.\/)*utils["']/g,
            `from "${utilsRelDir}/utils"`
          );

          // Remove "use client" from components (user decides)
          content = content.replace(/^"use client";\s*\n/gm, "");

          await fs.writeFile(destFile, content);
          console.log(success(destFileRelative));
          filesWritten++;
        } else {
          console.log(dim(`${destFileRelative} (exists, skipping)`));
        }
      }
    }

    console.log(
      `\n${c.bold}${filesWritten} file(s) written to ${outDir}/${c.reset}\n`
    );

    console.log(`${c.bold}Imports:${c.reset}`);
    for (const name of resolved) {
      const exportName = name
        .split("-")
        .map((p) => p[0]!.toUpperCase() + p.slice(1))
        .join("");
      console.log(
        `  ${dim(`import { ${exportName} } from "@/components/ui/${name}/${exportName}";`)}`
      );
    }
    console.log();
  });

// ─── Helpers for add command ────────────────────────────────────────────────

async function fileExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(full)));
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      files.push(full);
    }
  }
  return files;
}

// ─── Theme ───────────────────────────────────────────────────────────────────

program
  .command("theme")
  .description("Manage themes")
  .argument("[action]", "list | set | preview")
  .argument("[theme]", "Theme name")
  .action(async (action: string, theme: string) => {
    if (!action || action === "list") {
      console.log(`\n${c.bold}Available themes:${c.reset}\n`);
      for (const t of THEMES) {
        console.log(`  ${c.cyan}•${c.reset} ${t}`);
      }
      console.log(`\n${dim("Usage: velora theme set dark")}\n`);
      return;
    }

    if (action === "set") {
      if (!THEMES.includes(theme)) {
        console.log(error(`Unknown theme: ${theme}`));
        console.log(dim(`Available: ${THEMES.join(", ")}`));
        process.exit(1);
      }

      try {
        const configPath = "velora.config.json";
        const raw = await fs.readFile(configPath, "utf-8");
        const config = JSON.parse(raw) as VeloraConfig;
        config.theme = theme;
        await fs.writeFile(configPath, JSON.stringify(config, null, 2));
        console.log(success(`Theme set to ${c.cyan}${theme}${c.reset}`));
      } catch {
        console.log(
          warn("No velora.config.json found. Run `velora init` first.")
        );
      }
    }
  });

// ─── List ────────────────────────────────────────────────────────────────────

program
  .command("list")
  .description("List all available components")
  .action(() => {
    console.log(`\n${brand("Velora")} ${c.dim}Components${c.reset}\n`);
    for (const [name, meta] of Object.entries(COMPONENTS)) {
      console.log(
        `  ${c.cyan}${name.padEnd(20)}${c.reset} ${c.dim}${meta.description}${c.reset}`
      );
    }
    console.log(`\n  ${Object.keys(COMPONENTS).length} components available\n`);
  });

// ─── Doctor ──────────────────────────────────────────────────────────────────

program
  .command("doctor")
  .description("Check your Velora setup for issues")
  .action(async () => {
    console.log(`\n${brand("Velora")} ${c.dim}Doctor${c.reset}\n`);
    const checks = [
      {
        name: "velora.config.json",
        check: async () => {
          await fs.access("velora.config.json");
          return true;
        },
      },
      {
        name: "package.json exists",
        check: async () => {
          await fs.access("package.json");
          return true;
        },
      },
      {
        name: "@ui-velora/core installed",
        check: async () => {
          const pkg = JSON.parse(
            await fs.readFile("package.json", "utf-8")
          ) as { dependencies?: Record<string, string> };
          return !!pkg.dependencies?.["@ui-velora/core"];
        },
      },
    ];

    let allPassed = true;
    for (const c of checks) {
      try {
        const passed = await c.check();
        if (passed) {
          console.log(success(c.name));
        } else {
          console.log(error(c.name));
          allPassed = false;
        }
      } catch {
        console.log(error(c.name));
        allPassed = false;
      }
    }

    if (allPassed) {
      console.log(`\n${c.green}All checks passed!${c.reset}\n`);
    } else {
      console.log(`\n${c.yellow}Some checks failed. Run ${dim("velora init")} to fix.${c.reset}\n`);
    }
  });

program.parse();
