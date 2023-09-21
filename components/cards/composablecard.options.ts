import { pick } from "../../helpers/utils/object";
import { SIZES } from "../../types";

export const IMAGE_HEIGHT_OPTIONS = pick(
  SIZES,
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
);
export type ImageHeightType = keyof typeof IMAGE_HEIGHT_OPTIONS;
