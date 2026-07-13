# @ui-velora/motion

Animation utilities, variants, and React components built on Framer Motion for the Velora UI ecosystem.

## Install

```bash
npm install @ui-velora/motion framer-motion
```

## Components

### FadeIn

```tsx
import { FadeIn } from "@ui-velora/motion";

<FadeIn direction="up" delay={0.2}>
  <p>Fades in on scroll</p>
</FadeIn>
```

### Stagger / StaggerItem

```tsx
import { Stagger, StaggerItem } from "@ui-velora/motion";

<Stagger>
  <StaggerItem><div>Item 1</div></StaggerItem>
  <StaggerItem><div>Item 2</div></StaggerItem>
  <StaggerItem><div>Item 3</div></StaggerItem>
</Stagger>
```

### AnimatedNumber

```tsx
import { AnimatedNumber } from "@ui-velora/motion";

<AnimatedNumber value={1234} prefix="$" duration={1.5} />
```

### Typewriter

```tsx
import { Typewriter } from "@ui-velora/motion";

<Typewriter text={["Hello", "World"]} loop speed={60} />
```

### MorphText

```tsx
import { MorphText } from "@ui-velora/motion";

<MorphText texts={["Design", "Develop", "Deploy"]} interval={3000} />
```

### Magnetic

```tsx
import { Magnetic } from "@ui-velora/motion";

<Magnetic strength={0.3}>
  <button>Follows cursor</button>
</Magnetic>
```

### Parallax

```tsx
import { Parallax } from "@ui-velora/motion";

<Parallax speed={0.5}>
  <img src="hero.png" />
</Parallax>
```

### Reveal

```tsx
import { Reveal } from "@ui-velora/motion";

<Reveal variant="slideUp" delay={0.1}>
  <div>Reveals on scroll</div>
</Reveal>
```

## Variants & Presets

```ts
import { variants, springs, tweens } from "@ui-velora/motion";

// Variant presets: fade, scaleIn, slideUp, slideDown, slideLeft, slideRight,
//                  stagger, staggerItem, popIn, blur

// Spring presets: snappy, smooth, bouncy, gentle, stiff, wobbly
// Tween presets: fast, normal, slow, linear
```

## Re-exports

All core Framer Motion APIs are re-exported:

```ts
import {
  motion, AnimatePresence, useReducedMotion,
  useMotionValue, useTransform, useSpring, useScroll, useInView,
} from "@ui-velora/motion";
```

## Accessibility

All components respect `prefers-reduced-motion` and degrade gracefully.

## License

MIT
