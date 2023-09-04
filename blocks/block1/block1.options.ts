import { pick } from "../../helpers/utils/object";
import { SIZES } from "../../types";

export const MEDIA_POSITION_OPTIONS = {
  left: "Left",
  right: "Right",
};
export type mediaPositionType = keyof typeof MEDIA_POSITION_OPTIONS;

export const LAYOUT_COLUMN_OPTIONS = {
  "1/2": "50/50",
  "1/4": "1/4",
  "3/4": "3/4",
  "1/3": "1/3",
  "2/3": "2/3",
  "5/7": "5/7",
  "2/7": "7/5",
  "5/8": "5/8",
  "3/8": "3/8",
};
export type layoutColumnType = keyof typeof LAYOUT_COLUMN_OPTIONS;

export const GAP_OPTIONS = pick(
  SIZES,
  "none",
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
);
export type GapType = keyof typeof GAP_OPTIONS;

// need all breakpoints defined in these classes to calculate the slider gap
export const gapClasses: Record<GapType, string> = {
  none: "lg:gap-x-0",
  "2xs": "lg:gap-x-4 xl:gap-x-4 2xl:gap-x-4",
  xs: "lg:gap-x-6 xl:gap-x-6 2xl:gap-x-6",
  sm: "lg:gap-x-8 xl:gap-x-8 2xl:gap-x-8",
  md: "lg:gap-x-10 xl:gap-x-10 2xl:gap-x-10",
  lg: "lg:gap-x-16 xl:gap-x-20 2xl:gap-x-22",
  xl: "lg:gap-x-20 xl:gap-x-24 2xl:gap-x-30",
  "2xl": "lg:gap-x-24 xl:gap-x-32 2xl:gap-x-40",
};
