import theme from "./_theme";
import { isDarkColor } from "./helpers/utils/color";
import { ColorType, FontType, FontWeightType } from "./types";

export const COLORS = {
  white: "#fff",
  black: "#000000",
  ...theme.colors,
};

export const FONTS = {
  ...Object.keys(theme.fonts).reduce((acc, size) => {
    acc[size] = size;
    return acc;
  }, {} as Record<string, string>),
};

export const FONT_SIZES = {
  ...Object.keys(theme.fontSizes).reduce((acc, size) => {
    acc[size] = size;
    return acc;
  }, {} as Record<string, string>),
};

export const FONT_WEIGHTS = {
  ...Object.keys(theme.fontWeights).reduce((acc, size) => {
    acc[size] = size;
    return acc;
  }, {} as Record<string, string>),
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

export const fontClasses: Record<FontType, string> = Object.entries(
  FONTS,
).reduce<Record<FontWeightType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `font-${key}` }),
  {} as Record<ColorType, string>,
);

export const weightClasses: Record<FontWeightType, string> = Object.entries(
  FONT_WEIGHTS,
).reduce<Record<FontWeightType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `font-${key}` }),
  {} as Record<ColorType, string>,
);
