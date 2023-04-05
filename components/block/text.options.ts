import { COLORS } from "../../colors";
import { pick } from "../../helpers/utils/object";
import { ALIGNMENTS, FONTS, SIZES } from "../../types";

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

export const TEXT_FONT_OPTIONS = pick(FONTS, "heading", "sans", "mono");
export type TextFontType = keyof typeof TEXT_FONT_OPTIONS;

export const TEXT_COLOR_OPTIONS = pick(COLORS, "white", "black");
export type TextColorType = keyof typeof TEXT_COLOR_OPTIONS;
