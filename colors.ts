import { isDarkColor } from "./helpers/utils/color";
import { ColorType } from "./types";

/**
 * !important
 * All colors must be defined in
 * - tailwind.config.js colors
 * - tailwind.config.js safelist
 * - colors.ts
 */

export const COLORS = {
  white: "#fff",
  black: "#000000",

  "neutral-50": "#f8fafc",
  "neutral-100": "#f1f5f9",
  "neutral-200": "#e2e8f0",
  "neutral-300": "#cbd5e1",
  "neutral-400": "#94a3b8",
  "neutral-500": "#64748b",
  "neutral-600": "#475569",
  "neutral-700": "#334155",
  "neutral-800": "#1e293b",
  "neutral-900": "#0f172a",

  "brand-50": "#eff6ff",
  "brand-100": "#dbeafe",
  "brand-200": "#bfdbfe",
  "brand-300": "#93c5fd",
  "brand-400": "#60a5fa",
  "brand-500": "#3b82f6",
  "brand-600": "#2563eb",
  "brand-700": "#1d4ed8",
  "brand-800": "#1e40af",
  "brand-900": "#1e3a8a",

  "action-50": "#ecfeff",
  "action-100": "#cffafe",
  "action-200": "#a5f3fc",
  "action-300": "#67e8f9",
  "action-400": "#22d3ee",
  "action-500": "#06b6d4",
  "action-600": "#0891b2",
  "action-700": "#0e7490",
  "action-800": "#155e75",
  "action-900": "#164e63",
};

Object.entries(COLORS).map(([key, value]) => {
  const colorKey = key as ColorType;
  if (/^#[0-9A-F]{3}$/i.test(value)) {
    return (COLORS[colorKey] = value
      .split("")
      .map((hex) => `${hex}${hex}`)
      .join("")
      .substring(1));
  }
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
    console.error(
      `Found a color in colors.ts (${value}) that is not formatted as a hexadecimal. Make sure all colors are formatted like #ffffff.`,
    );
    COLORS[colorKey] = "#ff0000";
  }
});

export const ALL_COLORS = Object.keys(COLORS) as ColorType[];

export const STORYBOOK_COLORS_SUBSET = COLORS;
// use this if you have a lot of colors and don't to use all of them in storybook
// export const STORYBOOK_COLORS_SUBSET = pick(COLORS, 'white', 'black');

export const backgroundClasses: Record<ColorType, string> = Object.entries(
  COLORS,
).reduce<Record<ColorType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `bg-${key}` }),
  {} as Record<ColorType, string>,
);

export const textClasses: Record<ColorType, string> = Object.entries(
  COLORS,
).reduce<Record<ColorType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `text-${key}` }),
  {} as Record<ColorType, string>,
);

export const borderClasses: Record<ColorType, string> = Object.entries(
  COLORS,
).reduce<Record<ColorType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `border-${key}` }),
  {} as Record<ColorType, string>,
);

export const divideClasses: Record<ColorType, string> = Object.entries(
  COLORS,
).reduce<Record<ColorType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `divide-${key}` }),
  {} as Record<ColorType, string>,
);

const PROSE_BACKGROUND_OVERRIDES: Record<"my-dark-color", string> = {
  "my-dark-color": "prose-invert",
};

export const proseClasses: Record<ColorType, string> = Object.entries(
  COLORS,
).reduce<Record<ColorType, string>>((acc, [key, value]) => {
  const colorKey = key as keyof typeof PROSE_BACKGROUND_OVERRIDES;
  return {
    ...acc,
    [key]:
      PROSE_BACKGROUND_OVERRIDES[colorKey] || isDarkColor(value)
        ? "prose-invert"
        : "prose-coal",
  };
}, {} as Record<ColorType, string>);
