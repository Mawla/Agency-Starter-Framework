import { COLORS } from "../../colors";
import { pick } from "../../helpers/utils/object";
import { ALIGNMENTS, RATIOS, SIZES } from "../../types";

export const CARD_PADDING_OPTIONS = pick(SIZES, "none", "md");
export type CardPaddingType = keyof typeof CARD_PADDING_OPTIONS;

export const CARD_ALIGN_OPTIONS = pick(ALIGNMENTS, "left", "center", "right");
export type CardAlignType = keyof typeof CARD_ALIGN_OPTIONS;

export const CARD_BACKGROUND_COLOR_OPTIONS = pick(
  COLORS,
  "white",
  "brand-500",
  "neutral-100",
  "neutral-800",
);
export type CardBackgroundColorType =
  keyof typeof CARD_BACKGROUND_COLOR_OPTIONS;

export const CARD_SPACING_OPTIONS = pick(SIZES, "md", "lg");
export type CardSpacingType = keyof typeof CARD_SPACING_OPTIONS;

export const CARD_EFFECT_OPTIONS = {
  none: "None",
  grayscale: "Grayscale",
};
export type CardEffectType = keyof typeof CARD_EFFECT_OPTIONS;

export const ICON_COLOR_OPTIONS = pick(
  COLORS,
  "white",
  "neutral-500",
  "brand-500",
  "brand-700",
);
export type IconColorType = keyof typeof ICON_COLOR_OPTIONS;

export const ICON_SIZE_OPTIONS = pick(SIZES, "sm", "lg");
export type IconSizeType = keyof typeof ICON_SIZE_OPTIONS;

export const TITLE_COLOR_OPTIONS = pick(
  COLORS,
  "white",
  "neutral-500",
  "brand-500",
  "brand-700",
  "action-500",
);
export type TitleColorType = keyof typeof TITLE_COLOR_OPTIONS;

export const TEXT_COLOR_OPTIONS = pick(COLORS, "white", "neutral-900");
export type TextColorType = keyof typeof TEXT_COLOR_OPTIONS;

export const BORDER_COLOR_OPTIONS = pick(COLORS, "neutral-200");
export type BorderColorType = keyof typeof BORDER_COLOR_OPTIONS;

export const IMAGE_HEIGHT_OPTIONS = {
  sm: "Small",
  md: "Medium",
  lg: "Large",
  xl: "Extra large",
};
export type ImageHeightType = keyof typeof IMAGE_HEIGHT_OPTIONS;

export const IMAGE_ROUNDED_OPTIONS = {
  none: "None",
  sm: "Small",
  md: "Medium",
  lg: "Large",
  xl: "Extra large",
  full: "Full",
};
export type ImageRoundedType = keyof typeof IMAGE_ROUNDED_OPTIONS;

export const IMAGE_RATIO_OPTIONS = pick(RATIOS, "auto", "16/9", "1/1", "3/2");
export type ImageRatioType = keyof typeof IMAGE_RATIO_OPTIONS;
