import { COLORS } from "../../colors";
import { pick } from "../../helpers/utils/object";
import { ALIGNMENTS, SIZES, FONT_WEIGHTS } from "../../types";

export const BUTTON_BACKGROUND_COLOR_OPTIONS = pick(COLORS, "white", "black");
export type BackgroundColorType = keyof typeof BUTTON_BACKGROUND_COLOR_OPTIONS;

export const BUTTON_TEXT_COLOR_OPTIONS = pick(COLORS, "white", "black");
export type ButtonTextColorType = keyof typeof BUTTON_TEXT_COLOR_OPTIONS;

export const BUTTON_BORDER_COLOR_OPTIONS = pick(COLORS, "white", "black");
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
