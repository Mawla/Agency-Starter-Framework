import { pick } from "../../helpers/utils/object";
import { SIZES } from "../../types";

export const BLEED_SPACE_OPTIONS = pick(SIZES, "none", "sm", "md", "lg");
export type BleedSpaceType = keyof typeof BLEED_SPACE_OPTIONS;

export const bleedClasses: Record<BleedSpaceType, string> = {
  none: "px-0",
  sm: "px-3 sm:px-4 lg:px-12 xl:px-20",
  md: "px-5 sm:px-8 lg:px-14 xl:px-20",
  lg: "px-8 sm:px-10 lg:px-16 xl:px-20",
};
