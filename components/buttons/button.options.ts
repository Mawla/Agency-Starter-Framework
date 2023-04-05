import { COLORS } from "../../colors";
import { pick } from "../../helpers/utils/object";
import { ALIGNMENTS, SIZES, FONT_WEIGHTS } from "../../types";

export const BACKGROUND_COLOR_OPTIONS = pick(COLORS, "white", "black");
export type BackgroundColorType = keyof typeof BACKGROUND_COLOR_OPTIONS;

export const TEXT_COLOR_OPTIONS = pick(COLORS, "white", "black");
export type TextColorType = keyof typeof TEXT_COLOR_OPTIONS;

export const BORDER_COLOR_OPTIONS = pick(COLORS, "white", "black");
export type BorderColorType = keyof typeof BORDER_COLOR_OPTIONS;

export const SIZE_OPTIONS = pick(SIZES, "sm", "md");
export type SizeType = keyof typeof SIZE_OPTIONS;

export const ALIGN_OPTIONS = pick(ALIGNMENTS, "left", "center", "right");
export type AlignType = keyof typeof ALIGN_OPTIONS;

export const ICON_POSITION_OPTIONS = { before: "Before", after: "After" };
export type IconPositionType = keyof typeof ICON_POSITION_OPTIONS;

export const FONT_WEIGHT_OPTIONS = pick(FONT_WEIGHTS, "regular", "medium");
export type WeightType = keyof typeof FONT_WEIGHT_OPTIONS;
