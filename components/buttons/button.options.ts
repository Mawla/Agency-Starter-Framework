import { COLORS } from "../../colors";
import { pick } from "../../helpers/utils/object";
import { ALIGNMENTS, SIZES, FONT_WEIGHTS } from "../../types";

export const BUTTON_BACKGROUND_COLOR_OPTIONS = pick(COLORS);
export type BackgroundColorType = keyof typeof BUTTON_BACKGROUND_COLOR_OPTIONS;

export const BUTTON_TEXT_COLOR_OPTIONS = pick(COLORS);
export type ButtonTextColorType = keyof typeof BUTTON_TEXT_COLOR_OPTIONS;

export const BUTTON_BORDER_COLOR_OPTIONS = pick(COLORS);
export type ButtonBorderColorType = keyof typeof BUTTON_BORDER_COLOR_OPTIONS;

export const BUTTON_SIZE_OPTIONS = pick(SIZES, "sm", "md");
export type ButtonSizeType = keyof typeof BUTTON_SIZE_OPTIONS;

export const BUTTON_ALIGN_OPTIONS = pick(ALIGNMENTS, "left", "center", "right");
export type ButtonAlignType = keyof typeof BUTTON_ALIGN_OPTIONS;

export const BUTTON_ICON_POSITION_OPTIONS = {
  before: "Before",
  after: "After",
};
export type ButtonIconPositionType = keyof typeof BUTTON_ICON_POSITION_OPTIONS;

export const BUTTON_FONT_WEIGHT_OPTIONS = pick(
  FONT_WEIGHTS,
  "regular",
  "medium",
);
export type ButtonWeightType = keyof typeof BUTTON_FONT_WEIGHT_OPTIONS;

export const buttonSizeClasses: Record<ButtonSizeType, string> = {
  sm: "text-base md:text-lg",
  md: "text-lg md:text-xl",
};
export const buttonSpaceClasses: Record<ButtonSizeType, string> = {
  sm: "px-4 py-2 md:px-4",
  md: "px-5 py-[9px] md:px-6",
};

export const buttonIconSizeClasses: Record<ButtonSizeType, string> = {
  sm: "w-5 h-5",
  md: "w-5 h-5",
};

export const buttonIconOnlySizeClasses: Record<ButtonSizeType, string> = {
  sm: "w-10 h-10 md:w-10 md:h-10",
  md: "w-10 h-10 md:w-11 md:h-11",
};

export const buttonAlignClasses: Record<ButtonAlignType, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export const buttonWeightClasses: Record<ButtonWeightType, string> = {
  regular: "font-normal",
  medium: "font-medium",
};
