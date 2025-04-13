# 🎨 StudyMate AI – Frontend Style Guide

Keep this file updated to ensure design consistency across all pages.

---

## 🧱 Layout & Structure

- Responsive grid/flex-based layout
- Centralized splash and auth views (`min-h-screen flex items-center justify-center`)
- Soft rounded corners: `rounded-md`, `rounded-lg`
- Shadows for depth: `shadow-md`, `hover:shadow-lg`
- Subtle animations on buttons: `transition`, `hover:scale-105`

---

## 🎨 Color Palette

| Use               | Hex Code     | Tailwind Name |
|------------------|--------------|---------------|
| Background        | `#f9f6f0`    | `beige`       |
| Primary Accent    | `#a78bfa`    | `lavender`    |
| Dark Text         | `#001d3d`    | `dark`        |
| Secondary Text    | `#5b4a89`    | `indigo-500`  |
| Button Hover Fill | `#f3f0ff`    | `light-lavender` |

---

## 🅰️ Typography

| Element  | Font            | Weight/Style   |
|----------|------------------|----------------|
| Headings | `Space Grotesk`  | Bold, expressive |
| Body     | `Inter`          | Neutral, readable |
| Buttons  | `Manrope`        | Semi-bold, sharp |

> Installed via:
```bash
npm install @fontsource/space-grotesk @fontsource/inter @fontsource/manrope
