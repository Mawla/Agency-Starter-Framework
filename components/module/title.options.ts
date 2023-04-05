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
