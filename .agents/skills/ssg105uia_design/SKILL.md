---
name: ssg105uia_design
description: Guidelines and instructions for styling and developing features for the ssg105uia vintage Vietnamese music archives application.
---

# Ssg105uia Vintage Web Design & Components Guide

This guide details the core design language, components, visual tokens, and implementation guidelines for the **Giai Điệu Một Thời (ssg105uia)** project. Refer to this skill when building new pages, updating components, or modifying layouts to maintain visual harmony.

---

## 1. Core Aesthetic Goals

The website is a **non-profit cultural music archive** showcasing historical Vietnamese music. The design language must feel:
*   **Tactile & Nostalgic**: Emulating old paper, print press, historic books, and analog film.
*   **Cinematic Dark & Warm Contrast**: Fusing a warm cream color system with high-contrast cinematic dark blocks (emulating film negatives and dark music player panels).
*   **Premium & State-of-the-Art**: Smooth micro-animations, custom textures, responsive layouts, and elegant layouts.

---

## 2. Design Tokens

### A. Typography
Include standard fonts from Google Fonts in [fonts.css](file:///c:/Users/Long/Documents/GitHub/Ssg105uia/New%20folder/src/styles/fonts.css):
*   **Headers & Decorative Text**: `Fraunces` (Serif). Elegant, vintage serif with distinct character weights.
    *   *Usage*: Section titles, blockquotes, numbering, period labels.
    *   *CSS*: `font-family: 'Fraunces', serif;`
*   **Signature & Notes**: `Dancing Script` (Cursive/Handwriting).
    *   *Usage*: Subtitles, hand-signed notes, artistic quotes.
    *   *CSS*: `font-family: 'Dancing Script', cursive;`
*   **Metadata & Body Copy**: `Inter` (Sans-serif). Clean, legible, high readability on small screens.
    *   *Usage*: Song descriptions, lyrics, time stamps, tags, and standard buttons.
    *   *CSS*: `font-family: 'Inter', sans-serif;`

### B. Color Palette
Defined in [theme.css](file:///c:/Users/Long/Documents/GitHub/Ssg105uia/New%20folder/src/styles/theme.css):
*   **Primary Crimson**: `#8B0000` (Deep crimson red for accents, indicators, active states)
*   **Vintage Gold**: `#C2A47E` (Muted warm metallic gold for borders, tags, secondary headers)
*   **Warm Paper BG**: `#F5F1E8` (Light background resembling old parchment/paper)
*   **Dark Coal BG**: `#1A1A1A` / `#0D0D0D` (Rich warm dark colors for cinematic/player grids)
*   **Muted Cream BG**: `#EDE9DF` (Intermediate light card background)
*   **Warm Gray Text**: `#6B5F4E` / `#A09080` (Muted description text colors)

---

## 3. Reusable Visual Effects & Texture Layers

Ensure new features import and overlay these helper elements located in [Grain.tsx](file:///c:/Users/Long/Documents/GitHub/Ssg105uia/New%20folder/src/app/components/Grain.tsx):

### Film Grain Overlay
Injects SVG-based fractal noise to emulate old printed paper or photographic film grain.
```tsx
import { Grain } from "./Grain";

// Place inside a container with 'relative' positioning:
<div className="relative overflow-hidden">
  <Grain opacity={0.07} blend="overlay" />
  {/* Content */}
</div>
```

### Cinematic Filter
CSS sepia contrast configuration to match photographic print tone.
```typescript
import { filmFilter } from "./Grain";
// Apply to image containers or background layers:
style={{ filter: filmFilter }}
```

### Video Scanlines Overlay
CRT/TV style lines for video-heavy archives.
```tsx
import { Scanlines } from "./Grain";
<div className="relative">
  <Scanlines opacity={0.05} />
  {/* Video element */}
</div>
```

---

## 4. Mobile Layouts & Swipe Gestures

When creating horizontal galleries, carousels, or multi-step screens, prioritize touchscreen swiping over clicking arrows.
Implement swipe controls in React components using `onTouchStart`, `onTouchMove`, and `onTouchEnd` as shown in [TimelineSection.tsx](file:///c:/Users/Long/Documents/GitHub/Ssg105uia/New%20folder/src/app/components/TimelineSection.tsx):

```typescript
const [touchStart, setTouchStart] = useState<number | null>(null);
const [touchEnd, setTouchEnd] = useState<number | null>(null);
const [touchStartY, setTouchStartY] = useState<number | null>(null);
const [touchEndY, setTouchEndY] = useState<number | null>(null);

const minSwipeDistance = 50;

const handleTouchStart = (e: React.TouchEvent) => {
  setTouchEnd(null);
  setTouchEndY(null);
  setTouchStart(e.targetTouches[0].clientX);
  setTouchStartY(e.targetTouches[0].clientY);
};

const handleTouchMove = (e: React.TouchEvent) => {
  setTouchEnd(e.targetTouches[0].clientX);
  setTouchEndY(e.targetTouches[0].clientY);
};

const handleTouchEnd = () => {
  if (!touchStart || !touchEnd || !touchStartY || !touchEndY) return;

  const distanceX = touchStart - touchEnd;
  const distanceY = touchStartY - touchEndY;
  const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

  if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
    if (distanceX > 0) {
      // Swipe Left (finger drag from right-to-left) -> Action for Next Slide
      onNext();
    } else {
      // Swipe Right (finger drag from left-to-right) -> Action for Previous Slide
      onPrev();
    }
  }
};
```

---

## 5. Animation Best Practices

*   Use `motion` from `"motion/react"` (Framer Motion v12) for UI element animations.
*   **Fades & Vertical Slides**: Use subtle translations to maintain elegance.
    ```tsx
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
    >
    ```
*   **Active Tab Lines**: Use `layoutId` for smooth layout transitions when changing tab selections.

---

## 6. Auto-deploy Workflow
Always deploy to Vercel **before** attempting `git push` to prevent GitHub credential/auth prompts from hanging and blocking the build:
1. Compile: `npm run build`
2. Commit: `git add .`, `git commit -m "..."`
3. Deploy: `cd "New folder"; npx vercel --prod --yes`
4. Push: `cd ..; git push`
