import { pick } from "../../helpers/utils/object";
import { COLORS, FONTS, FONT_SIZES, FONT_WEIGHTS } from "../../theme";
import { HtmlTextNodeType } from "../../types";

export const TITLE_SIZE_OPTIONS = pick(FONT_SIZES);
export type TitleSizeType = keyof typeof TITLE_SIZE_OPTIONS;

export const TITLE_WEIGHT_OPTIONS = pick(FONT_WEIGHTS);
export type TitleWeightType = keyof typeof TITLE_WEIGHT_OPTIONS;

export const TITLE_FONT_OPTIONS = pick(FONTS);
export type TitleFontType = keyof typeof TITLE_FONT_OPTIONS;

export const TITLE_COLOR_OPTIONS = pick(COLORS);
export type TitleColorType = keyof typeof TITLE_COLOR_OPTIONS;

/**
 * Automatically convert the title size options to tailwind classes for small, medium and large breakpoints
 * e.g 4xl -› text-2xl md:text-3xl lg:text-4xl
 * or sm -› text-xs md:text-sm lg:text-sm
 */

export const titleSizeClasses: Record<TitleSizeType, string> = Object.keys(
  TITLE_SIZE_OPTIONS,
).reduce((acc, cur, i) => {
  const FONT_SIZE_NAMES = Object.keys(TITLE_SIZE_OPTIONS);
  const sm =
    FONT_SIZE_NAMES[i - 2] || FONT_SIZE_NAMES[i - 1] || FONT_SIZE_NAMES[i];
  const md = FONT_SIZE_NAMES[i - 1] || FONT_SIZE_NAMES[i];
  const lg = FONT_SIZE_NAMES[i];

  acc[cur] = `text-${sm} md:text-${md} xl:text-${lg}`;
  return acc;
}, {} as Record<TitleSizeType, string>);

export type TitleThemeType = {
  color?: TitleColorType;
  size?: TitleSizeType;
  as?: HtmlTextNodeType;
  font?: TitleFontType;
  weight?: TitleWeightType;
};
