import engineConfig from "./engine.config";
import { isDarkColor } from "./helpers/utils/color";
import {
  ColorType,
  FontType,
  FontWeightType,
  HorizontalAlignType,
} from "./types";

export const COLORS = {
  ...engineConfig.theme.colors,
};

export const FONTS = {
  ...Object.keys(engineConfig.theme.fontFamily).reduce((acc, size) => {
    acc[size] = size;
    return acc;
  }, {} as Record<string, string>),
};

export const FONT_SIZES = {
  ...Object.keys(engineConfig.theme.fontSize).reduce((acc, size) => {
    acc[size] = size;
    return acc;
  }, {} as Record<string, string>),
};

export const FONT_WEIGHTS = {
  ...Object.keys(engineConfig.theme.fontWeight).reduce((acc, size) => {
    acc[size] = size;
    return acc;
  }, {} as Record<string, string>),
};

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

export const textAlignClasses: Record<HorizontalAlignType, string> = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};
