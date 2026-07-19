# @ui-velora/cli

CLI tool to scaffold projects, add components, and manage themes for the Velora UI ecosystem.

## Quick Start

```bash
npx velora init
```

Or install globally:

```bash
npm install -g @ui-velora/cli
```

## Commands

### init

Scaffold a new project with all Velora configuration pre-wired:

```bash
# Interactive mode — prompts for framework, theme, and package manager
npx velora init

# Non-interactive — skip prompts with flags
npx velora init --template next --name my-app --theme dark --package-manager pnpm
```

**Flags:**

| Flag | Description | Default |
|------|-------------|---------|
| `--template <name>` | Framework template (`next`, `vite`, `start`, `react-router`, `astro`, `laravel`) | Prompts |
| `--name <name>` | Project name / directory | Prompts |
| `--theme <theme>` | Default theme | `dark` |
| `--package-manager <pm>` | Package manager (`npm`, `pnpm`, `yarn`, `bun`) | Prompts |
| `--no-install` | Skip dependency installation | `false` |

**Supported Frameworks:**

| Framework | Template Key | What's Included |
|-----------|-------------|-----------------|
| Next.js | `next` | App Router, Tailwind v4, TypeScript, globals.css, layout, demo page |
| Vite + React | `vite` | React plugin, Tailwind v4, TypeScript, index.html, main.tsx, demo page |
| TanStack Start | `start` | File-based routing, Tailwind v4, TypeScript, app.config, demo page |
| React Router | `react-router` | Framework mode v7, Tailwind v4, TypeScript, routes, demo page |
| Astro | `astro` | React integration, Tailwind v4, TypeScript, Layout.astro, demo page |
| Laravel | `laravel` | Vite + React, Tailwind v4, Blade template, resources/ structure, demo page |

Each template generates:
- `package.json` — framework + `@ui-velora/core` + all peer deps
- `velora.config.json` — chosen theme and alias configuration
- Global CSS — `@import "@ui-velora/core/styles"` + Tailwind v4 setup
- Root layout — `ThemeScript` + `ThemeProvider` wired in
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- Starter page — demo using Button, Card, Badge so you see it working immediately
- Framework config — next.config, vite.config, astro.config, etc.

### add

Add components to your project:

```bash
npx velora add button card toast
npx velora add --all
npx velora add sidebar --overwrite
```

### list

List all available components:

```bash
npx velora list
```

### theme

Manage themes:

```bash
npx velora theme list
npx velora theme set luxury
```

### doctor

Check your Velora setup for issues:

```bash
npx velora doctor
```

## Available Components

accordion, avatar, badge, button, card, checkbox, command, dialog, dropdown, form, input, navigation, popover, progress, scroll-area, select, separator, sidebar, skeleton, spinner, switch, table, tabs, textarea, toast, tooltip

## License

MIT
