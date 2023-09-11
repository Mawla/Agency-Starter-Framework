import { pick } from "../../helpers/utils/object";
import { RATIOS, SIZES } from "../../types";

export const IMAGE_HEIGHT_OPTIONS = pick(SIZES, "xs", "sm", "md", "lg", "xl");
export type ImageHeightType = keyof typeof IMAGE_HEIGHT_OPTIONS;
