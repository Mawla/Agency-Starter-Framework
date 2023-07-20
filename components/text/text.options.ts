import { pick } from "../../helpers/utils/object";
import { FONTS } from "../../theme";
import { ALIGNMENTS, ColorType, SIZES } from "../../types";

export const TEXT_ALIGN_OPTIONS = pick(
  ALIGNMENTS,
  "left",
  "center",
  "right",
  "auto",
);
export type TextAlignType = keyof typeof TEXT_ALIGN_OPTIONS;

export const TEXT_SIZE_OPTIONS = pick(SIZES, "sm", "md", "lg", "xl", "2xl");
export type TextSizeType = keyof typeof TEXT_SIZE_OPTIONS;

export const TEXT_FONT_OPTIONS = pick(FONTS);
export type TextFontType = keyof typeof TEXT_FONT_OPTIONS;

export const textAlignClasses: Record<TextAlignType, string> = {
  auto: "",
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

export const textSizeClasses: Record<TextSizeType, string> = {
  sm: "prose-sm md:prose-md",
  md: "prose-md md:prose-base",
  lg: "prose-lg md:prose-xl",
  xl: "prose-xl md:prose-2xl",
  "2xl": "prose-2xl xl:prose-3xl",
};

export const textFontClasses: Record<TextFontType, string> = {
  sans: "font-sans",
  mono: "font-mono",
  heading: "font-sans",
};

export type TextThemeType = {
  size?: TextSizeType;
  color?: ColorType;
};
