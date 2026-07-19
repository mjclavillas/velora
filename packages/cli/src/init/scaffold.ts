import fs from "fs/promises";
import path from "path";
import { execSync } from "child_process";
import { nextTemplate } from "./templates/next";
import { viteTemplate } from "./templates/vite";
import { startTemplate } from "./templates/start";
import { reactRouterTemplate } from "./templates/react-router";
import { astroTemplate } from "./templates/astro";
import { laravelTemplate } from "./templates/laravel";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TemplateFile {
  path: string;
  content: (name: string, theme: string) => string;
}

export interface Template {
  name: string;
  key: string;
  files: TemplateFile[];
}

export interface ScaffoldOptions {
  name: string;
  template: string;
  theme: string;
  packageManager: string;
  installDeps: boolean;
}

// ─── Colors ──────────────────────────────────────────────────────────────────

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

const success = (s: string) => `${c.green}✓${c.reset} ${s}`;
const info = (s: string) => `${c.cyan}→${c.reset} ${s}`;
const warn = (s: string) => `${c.yellow}⚠${c.reset} ${s}`;
const error = (s: string) => `${c.red}✗${c.reset} ${s}`;
const dim = (s: string) => `${c.dim}${s}${c.reset}`;

// ─── Templates ───────────────────────────────────────────────────────────────

export const TEMPLATES: Record<string, Template> = {
  next: nextTemplate,
  vite: viteTemplate,
  start: startTemplate,
  "react-router": reactRouterTemplate,
  astro: astroTemplate,
  laravel: laravelTemplate,
};

export const TEMPLATE_LIST = Object.values(TEMPLATES);

export const THEMES = [
  "light", "dark", "system", "amoled", "glass",
  "luxury", "cyberpunk", "neo-brutalism", "high-contrast", "minimal",
];

export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"];

// ─── Scaffold Logic ──────────────────────────────────────────────────────────

export async function scaffoldProject(opts: ScaffoldOptions): Promise<void> {
  const template = TEMPLATES[opts.template];
  if (!template) {
    console.log(error(`Unknown template: ${opts.template}`));
    console.log(dim(`Available: ${Object.keys(TEMPLATES).join(", ")}`));
    process.exit(1);
  }

  const projectDir = path.resolve(process.cwd(), opts.name);

  // Check if directory already exists
  try {
    await fs.access(projectDir);
    console.log(error(`Directory "${opts.name}" already exists.`));
    console.log(dim("Please choose a different name or remove the directory."));
    process.exit(1);
  } catch {
    // Directory doesn't exist — good
  }

  console.log(info(`Scaffolding ${template.name} project…\n`));

  // Create project directory
  await fs.mkdir(projectDir, { recursive: true });

  // Write all template files
  for (const file of template.files) {
    const filePath = path.join(projectDir, file.path);
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });

    const content = file.content(opts.name, opts.theme);
    await fs.writeFile(filePath, content);
    console.log(success(`Created ${file.path}`));
  }

  // Install dependencies
  if (opts.installDeps) {
    console.log();
    console.log(info(`Installing dependencies with ${opts.packageManager}…\n`));

    try {
      const installCmd = getInstallCommand(opts.packageManager);
      execSync(installCmd, {
        cwd: projectDir,
        stdio: "inherit",
      });
      console.log(success("Dependencies installed\n"));
    } catch {
      console.log(warn("Failed to install dependencies. Install manually:\n"));
      console.log(dim(`  cd ${opts.name}`));
      console.log(dim(`  ${opts.packageManager} install\n`));
    }
  } else {
    console.log();
    console.log(dim("Skipping dependency installation.\n"));
  }

  // Print next steps
  printNextSteps(opts);
}

function getInstallCommand(pm: string): string {
  switch (pm) {
    case "pnpm":
      return "pnpm install";
    case "yarn":
      return "yarn install";
    case "bun":
      return "bun install";
    case "npm":
    default:
      return "npm install";
  }
}

function getDevCommand(pm: string): string {
  switch (pm) {
    case "yarn":
      return "yarn dev";
    case "pnpm":
      return "pnpm dev";
    case "bun":
      return "bun run dev";
    case "npm":
    default:
      return "npm run dev";
  }
}

function printNextSteps(opts: ScaffoldOptions): void {
  const devCmd = getDevCommand(opts.packageManager);

  console.log(`${c.bold}Your project is ready!${c.reset}\n`);
  console.log(`${c.bold}Next steps:${c.reset}\n`);
  console.log(dim(`  cd ${opts.name}`));
  if (!opts.installDeps) {
    console.log(dim(`  ${opts.packageManager} install`));
  }
  console.log(dim(`  ${devCmd}`));
  console.log();
  console.log(dim("  Add components:"));
  console.log(dim(`    npx velora add button card badge toast`));
  console.log();
}
