# Contributing to Velora UI

Thank you for considering contributing! This guide covers everything you need
to get started.

## Project structure

```
velora/
├── packages/
│   ├── core/        Main component library (@ui-velora/core)
│   ├── cli/         CLI scaffold tool (@ui-velora/cli)
│   ├── tokens/      Design token constants (@ui-velora/tokens)
│   └── motion/      Animation utilities (@ui-velora/motion)
├── apps/
│   ├── docs/        Documentation site (Next.js)
│   └── playground/  Component sandbox (Next.js)
└── tooling/
    ├── eslint/      Shared ESLint config
    └── tsconfig/    Shared TypeScript configs
```

## Setup

**Prerequisites:** Node.js ≥20, pnpm ≥9

```bash
# Clone and install
git clone https://github.com/mjclavillas/velora.git
cd velora
pnpm install

# Start docs dev server
pnpm dev --filter=@ui-velora/docs

# Start playground
pnpm dev --filter=@ui-velora/playground

# Build all packages
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck
```

## Adding a component

1. Create the directory: `packages/core/src/components/<name>/`
2. Create the component file: `<Name>.tsx`
3. Export from the barrel: add to `packages/core/src/index.ts`
4. Write tests in `packages/core/src/test/<Name>.test.tsx`
5. Add docs page: `apps/docs/src/app/docs/components/<name>/page.tsx`

### Component checklist

- [ ] Uses `React.forwardRef` with correct HTML element type
- [ ] Has `displayName` set
- [ ] Exports typed `Props` interface
- [ ] Uses `cn()` for class composition
- [ ] Uses CSS custom properties for all colors (never hardcoded)
- [ ] Has `aria-*` attributes where needed
- [ ] Supports `className` override
- [ ] Respects `prefers-reduced-motion` for animations
- [ ] Has at least one test

## Component conventions

```tsx
// ✅ Good
const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
MyComponent.displayName = "MyComponent";

// ❌ Avoid
function MyComponent({ className }) {
  return <div className={`fixed-class ${className}`} />;
}
```

## Styling rules

- All colors via CSS variables: `var(--velora-text-primary)`, never `text-gray-900`
- Use `cn()` from `@ui-velora/core` (re-exports `clsx` + `tailwind-merge`)
- Use `cva()` for variant APIs
- Never use `!important` in components
- Animations must use `useReducedMotion()` guard

## Commit conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(core): add Slider component
fix(button): loading state not showing spinner
docs: update Button API reference
chore: bump dependencies
```

## Releasing

We use [Changesets](https://github.com/changesets/changesets):

```bash
# Document your changes
pnpm changeset

# Version packages (CI only)
pnpm version-packages

# Publish (CI only)
pnpm release
```

## Code of conduct

Be kind. We're all building something together.
