import { COLORS } from "../../colors";
import { pick } from "../../helpers/utils/object";
import { FONT_WEIGHTS, SIZES } from "../../types";

export const TITLE_SIZE_OPTIONS = pick(
  SIZES,
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
);
export type TitleSizeType = keyof typeof TITLE_SIZE_OPTIONS;

export const TITLE_WEIGHT_OPTIONS = pick(FONT_WEIGHTS, "normal", "bold");
export type TitleWeightType = keyof typeof TITLE_WEIGHT_OPTIONS;

export const TITLE_COLOR_OPTIONS = pick(COLORS, "white", "black");
export type TitleColorType = keyof typeof TITLE_COLOR_OPTIONS;

export const TITLE_EYEBROW_COLOR_OPTIONS = pick(COLORS, "white", "black");
export type TitleEyebrowColorType = keyof typeof TITLE_EYEBROW_COLOR_OPTIONS;

export const titleSizeClasses: Record<TitleSizeType, string> = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-lg lg:text-xl",
  "2xl": "text-lg md:text-xl text-2xl",
  "3xl": "text-xl md:text-2xl lg:text-3xl",
  "4xl": "text-2xl md:text-3xl lg:text-4xl",
  "5xl": "text-3xl md:text-4xl lg:text-5xl",
  "6xl": "text-4xl md:text-5xl lg:text-6xl",
};

export const titleWeightClasses: Record<TitleWeightType, string> = {
  normal: "font-normal",
  bold: "font-bold",
};
