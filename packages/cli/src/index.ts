#!/usr/bin/env node
/**
 * Velora CLI
 *
 * Scaffold projects, add components, and manage themes from the terminal.
 *
 * Usage:
 *   npx velora init
 *   npx velora add button card toast
 *   npx velora theme list
 *   npx velora theme set dark
 */

import { Command } from "commander";
import { createRequire } from "module";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

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

const THEMES = [
  "light", "dark", "system", "amoled", "glass",
  "luxury", "cyberpunk", "neo-brutalism", "high-contrast", "minimal",
];

// ─── Program ─────────────────────────────────────────────────────────────────

const program = new Command();

program
  .name("velora")
  .description("Velora UI Ecosystem CLI")
  .version("0.1.0");

// ─── Init ────────────────────────────────────────────────────────────────────

program
  .command("init")
  .description("Initialize Velora in your project")
  .option("--theme <theme>", "Default theme", "dark")
  .option("--no-tailwind", "Skip Tailwind configuration")
  .option("--src-dir", "Use src/ directory structure")
  .action(async (opts) => {
    console.log(`\n${brand("Velora")} ${c.dim}— Premium React UI Ecosystem${c.reset}\n`);
    console.log(info("Initializing Velora in your project…\n"));

    const config: VeloraConfig = {
      version: "0.1.0",
      theme: opts.theme,
      components: [],
      aliases: {
        components: "@/components/ui",
        utils: "@/lib/utils",
        hooks: "@/hooks",
      },
      tailwind: {
        config: "tailwind.config.ts",
        css: "src/app/globals.css",
      },
    };

    try {
      // Write velora.config.json
      await fs.writeFile(
        "velora.config.json",
        JSON.stringify(config, null, 2)
      );
      console.log(success("Created velora.config.json"));

      // Create utils file
      await fs.mkdir("lib", { recursive: true });
      await fs.writeFile(
        "lib/utils.ts",
        `import { type ClassValue, clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]): string {\n  return twMerge(clsx(inputs));\n}\n`
      );
      console.log(success("Created lib/utils.ts"));

      // Install instructions
      console.log(`\n${c.bold}Next steps:${c.reset}\n`);
      console.log(
        `  ${c.cyan}1.${c.reset} Install dependencies:\n     ${dim("npm install @ui-velora/core framer-motion class-variance-authority clsx tailwind-merge")}\n`
      );
      console.log(
        `  ${c.cyan}2.${c.reset} Add the ThemeProvider to your root layout:\n     ${dim('import { ThemeProvider } from "@ui-velora/core"')}\n`
      );
      console.log(
        `  ${c.cyan}3.${c.reset} Import the theme CSS:\n     ${dim('import "@ui-velora/core/styles"')}\n`
      );
      console.log(
        `  ${c.cyan}4.${c.reset} Add components:\n     ${dim("npx velora add button card toast")}\n`
      );
    } catch (err) {
      console.error(error(`Failed to initialize: ${err}`));
      process.exit(1);
    }
  });

// ─── Add ─────────────────────────────────────────────────────────────────────

program
  .command("add [components...]")
  .description("Add components to your project")
  .option("--all", "Add all available components")
  .option("--overwrite", "Overwrite existing files")
  .action(async (components: string[], opts) => {
    const toAdd = opts.all ? Object.keys(COMPONENTS) : components;

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

    console.log(`\n${info("Adding components…\n")}`);

    // Resolve deps
    const resolved = new Set<string>();
    const resolve = (name: string) => {
      if (resolved.has(name)) return;
      resolved.add(name);
      const meta = COMPONENTS[name];
      if (meta?.deps) meta.deps.forEach(resolve);
    };
    toAdd.forEach((c) => {
      if (!COMPONENTS[c]) {
        console.log(warn(`Unknown component: ${c}`));
      } else {
        resolve(c);
      }
    });

    for (const name of resolved) {
      console.log(success(`${name}`));
    }

    console.log(`\n${c.bold}Install peer deps:${c.reset}`);
    console.log(
      `  ${dim("npm install @ui-velora/core")}\n`
    );
    console.log(
      `${c.bold}Import in your project:${c.reset}`
    );
    for (const name of resolved) {
      const exportName = name
        .split("-")
        .map((p) => p[0]!.toUpperCase() + p.slice(1))
        .join("");
      console.log(`  ${dim(`import { ${exportName} } from "@ui-velora/core"`)}`);
    }
    console.log();
  });

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
