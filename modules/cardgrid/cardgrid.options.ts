import { COLORS } from "../../colors";
import { SIZE_OPTIONS } from "../../components/module/Title";
import { pick } from "../../helpers/utils/object";
import { ALIGNMENTS, SIZES } from "../../types";

export const COLUMN_OPTIONS = {
  1: "One column",
  2: "Two columns",
  3: "Three columns",
  4: "Four columns",
};
export type ColumnType = keyof typeof COLUMN_OPTIONS;

export const GAP_OPTIONS = pick(SIZES, "none", "xs", "sm", "md", "lg", "xl");
export type GapType = keyof typeof GAP_OPTIONS;

export const ALIGN_OPTIONS = pick(ALIGNMENTS, "left", "center", "right");
export type AlignType = keyof typeof ALIGN_OPTIONS;

export const BACKGROUND_COLOR_OPTIONS = pick(
  COLORS,
  "white",
  "neutral-100",
  "brand-700",
);
export type BackgroundColorType = keyof typeof BACKGROUND_COLOR_OPTIONS;

export const BUTTON_POSITION_OPTIONS = {
  before: "Before grid",
  after: "After grid",
};
export type ButtonPositionType = keyof typeof BUTTON_POSITION_OPTIONS;

export const TITLE_SIZE_OPTIONS = pick(SIZE_OPTIONS, "2xl", "3xl");
export type TitleSizeType = keyof typeof TITLE_SIZE_OPTIONS;
