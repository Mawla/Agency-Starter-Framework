import { pick } from "../../helpers/utils/object";
import { SIZES } from "../../types";

export const SPACE_OPTIONS = pick(SIZES, "none", "xs", "sm", "md", "lg", "xl");
export type SpaceTopType = keyof typeof SPACE_OPTIONS;
export type SpaceBottomType = keyof typeof SPACE_OPTIONS;

export type SpaceType = {
  top?: keyof typeof SPACE_OPTIONS;
  bottom?: keyof typeof SPACE_OPTIONS;
};

export const spaceTopClasses: Record<SpaceTopType, string> = {
  none: "pt-0",
  xs: "pt-5 sm:pt-5 md:pt-8 lg:pt-10",
  sm: "pt-10 sm:pt-10 md:pt-16 lg:pt-20",
  md: "pt-10 sm:pt-10 md:pt-20 lg:pt-25",
  lg: "pt-12 sm:pt-12 md:pt-24 lg:pt-30",
  xl: "pt-16 sm:pt-16 md:pt-30 lg:pt-40",
};

export const spaceBottomClasses: Record<SpaceBottomType, string> = {
  none: "pb-0",
  xs: "pb-5 sm:pb-5 md:pb-8 lg:pb-10",
  sm: "pb-10 sm:pb-10 md:pb-16 lg:pb-20",
  md: "pb-10 sm:pb-10 md:pb-20 lg:pb-25",
  lg: "pb-12 sm:pb-12 md:pb-24 lg:pb-30",
  xl: "pb-16 sm:pb-16 md:pb-30 lg:pb-40",
};
