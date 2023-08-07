import engineConfig from "./engine.config";
import { isDarkColor } from "./helpers/utils/color";
import {
  BorderRadiusType,
  BorderWidthType,
  ColorType,
  FontSizeType,
  FontType,
  FontWeightType,
  HorizontalAlignType,
  PaddingType,
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
  {},
);

export const fontSizeClasses: Record<FontSizeType, string> = Object.entries(
  FONT_SIZES,
).reduce<Record<FontSizeType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `text-${key}` }),
  {},
);

export const weightClasses: Record<FontWeightType, string> = Object.entries(
  FONT_WEIGHTS,
).reduce<Record<FontWeightType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `font-${key}` }),
  {},
);

export const textAlignClasses: Record<HorizontalAlignType, string> = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

export const borderRadiusClasses: Record<BorderRadiusType, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

export const borderWidthClasses: Record<BorderWidthType, string> = {
  0: "border-0",
  px: "border",
  2: "border-2",
  4: "border-4",
  8: "border-8",
};

export const paddingXClasses: Record<PaddingType, string> = {
  0: "px-0",
  px: "px-px",
  0.5: "px-0.5",
  1: "px-1",
  1.5: "px-1.5",
  2: "px-2",
  2.5: "px-2.5",
  3: "px-3",
  3.5: "px-3.5",
  4: "px-4",
  5: "px-5",
  6: "px-6",
  7: "px-7",
  8: "px-8",
  9: "px-9",
  10: "px-10",
  11: "px-11",
  12: "px-12",
  14: "px-14",
  16: "px-16",
};

export const paddingYClasses: Record<PaddingType, string> = {
  0: "py-0",
  px: "py-px",
  0.5: "py-0.5",
  1: "py-1",
  1.5: "py-1.5",
  2: "py-2",
  2.5: "py-2.5",
  3: "py-3",
  3.5: "py-3.5",
  4: "py-4",
  5: "py-5",
  6: "py-6",
  7: "py-7",
  8: "py-8",
  9: "py-9",
  10: "py-10",
  11: "py-11",
  12: "py-12",
  14: "py-14",
  16: "py-16",
};
