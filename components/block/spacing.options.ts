import { pick } from "../../helpers/utils/object";
import { SIZES } from "../../types";

export const SPACE_OPTIONS = pick(
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
export type SpaceTopType = keyof typeof SPACE_OPTIONS;
export type SpaceBottomType = keyof typeof SPACE_OPTIONS;

export type SpaceType = {
  top?: keyof typeof SPACE_OPTIONS;
  bottom?: keyof typeof SPACE_OPTIONS;
};

export const paddingTopClasses: Record<SpaceTopType, string> = {
  none: "pt-0",
  "2xs": "pt-2.5 sm:pt-2.5 md:pt-4 lg:pt-5",
  xs: "pt-5 sm:pt-5 md:pt-8 lg:pt-10",
  sm: "pt-10 sm:pt-10 md:pt-16 lg:pt-20",
  md: "pt-10 sm:pt-10 md:pt-20 lg:pt-25",
  lg: "pt-12 sm:pt-12 md:pt-24 lg:pt-30",
  xl: "pt-16 sm:pt-16 md:pt-30 lg:pt-40",
  "2xl": "pt-24 sm:pt-24 md:pt-40 lg:pt-60",
};

export const paddingBottomClasses: Record<SpaceBottomType, string> = {
  none: "pb-0",
  "2xs": "pb-2.5 sm:pb-2.5 md:pb-4 lg:pb-5",
  xs: "pb-5 sm:pb-5 md:pb-8 lg:pb-10",
  sm: "pb-10 sm:pb-10 md:pb-16 lg:pb-20",
  md: "pb-10 sm:pb-10 md:pb-20 lg:pb-25",
  lg: "pb-12 sm:pb-12 md:pb-24 lg:pb-30",
  xl: "pb-16 sm:pb-16 md:pb-30 lg:pb-40",
  "2xl": "pb-24 sm:pb-24 md:pb-40 lg:pb-60",
};

export const marginTopClasses: Record<SpaceTopType, string> = {
  none: "mt-0",
  "2xs": "mt-2.5 sm:mt-2.5 md:mt-4 lg:mt-5",
  xs: "mt-5 sm:mt-5 md:mt-8 lg:mt-10",
  sm: "mt-10 sm:mt-10 md:mt-16 lg:mt-20",
  md: "mt-10 sm:mt-10 md:mt-20 lg:mt-25",
  lg: "mt-12 sm:mt-12 md:mt-24 lg:mt-30",
  xl: "mt-16 sm:mt-16 md:mt-30 lg:mt-40",
  "2xl": "mt-24 sm:mt-24 md:mt-40 lg:mt-60",
};

export const marginBottomClasses: Record<SpaceBottomType, string> = {
  none: "mb-0",
  "2xs": "mb-2.5 sm:mb-2.5 md:mb-4 lg:mb-5",
  xs: "mb-5 sm:mb-5 md:mb-8 lg:mb-10",
  sm: "mb-10 sm:mb-10 md:mb-16 lg:mb-20",
  md: "mb-10 sm:mb-10 md:mb-20 lg:mb-25",
  lg: "mb-12 sm:mb-12 md:mb-24 lg:mb-30",
  xl: "mb-16 sm:mb-16 md:mb-30 lg:mb-40",
  "2xl": "mb-24 sm:mb-24 md:mb-40 lg:mb-60",
};
