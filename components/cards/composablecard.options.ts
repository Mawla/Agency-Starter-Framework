import { pick } from "../../helpers/utils/object";
import { RATIOS, SIZES } from "../../types";

export const IMAGE_HEIGHT_OPTIONS = pick(SIZES, "xs", "sm", "md", "lg", "xl");
export type ImageHeightType = keyof typeof IMAGE_HEIGHT_OPTIONS;

export const IMAGE_RATIO_OPTIONS = pick(RATIOS, "auto", "16/9", "1/1", "3/2");
export type ImageRatioType = keyof typeof IMAGE_RATIO_OPTIONS;
