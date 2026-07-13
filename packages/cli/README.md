# @ui-velora/cli

CLI tool to scaffold projects, add components, and manage themes for the Velora UI ecosystem.

## Install

```bash
npx @ui-velora/cli init
```

Or install globally:

```bash
npm install -g @ui-velora/cli
```

## Commands

### init

Initialize Velora in your project:

```bash
npx velora init
npx velora init --theme dark --src-dir
```

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
