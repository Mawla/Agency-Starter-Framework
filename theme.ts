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
  PADDING_OPTIONS,
  PaddingType,
  RatioType,
  TextTransformType,
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

export const textTransformClasses: Record<TextTransformType, string> = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
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
  1: "border-px",
  2: "border-2",
  4: "border-4",
  8: "border-8",
};

export const ratioClasses: Record<RatioType, string> = {
  auto: "aspect-auto",
  "1/1": "aspect-square",
  "16/9": "aspect-[16/9]",
  "9/16": "aspect-[9/16]",
  "3/2": "aspect-[3/2]",
  "2/3": "aspect-[2/3]",
  "2/1": "aspect-[2/1]",
  "1/2": "aspect-[1/2]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "21/9": "aspect-[21/9]",
  "9/21": "aspect-[9/21]",
};

export const paddingXClasses: Record<PaddingType, string> = Object.entries(
  PADDING_OPTIONS,
).reduce<Record<PaddingType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `px-${key}` }),
  {} as Record<PaddingType, string>,
);

export const paddingYClasses: Record<PaddingType, string> = Object.entries(
  PADDING_OPTIONS,
).reduce<Record<PaddingType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `py-${key}` }),
  {} as Record<PaddingType, string>,
);

export const paddingTopClasses: Record<PaddingType, string> = Object.entries(
  PADDING_OPTIONS,
).reduce<Record<PaddingType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `pt-${key}` }),
  {} as Record<PaddingType, string>,
);

export const paddingBottomClasses: Record<PaddingType, string> = Object.entries(
  PADDING_OPTIONS,
).reduce<Record<PaddingType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `pb-${key}` }),
  {} as Record<PaddingType, string>,
);

export const justifyClasses: Record<HorizontalAlignType, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export const alignItemsClasses: Record<HorizontalAlignType, string> = {
  left: "items-start",
  center: "items-center",
  right: "items-end",
};
