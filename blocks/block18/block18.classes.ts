import { ColumnType, GapType } from "./block18.options";

export const gridClasses: Record<ColumnType, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

export const colSpanClasses: Record<ColumnType, string> = {
  1: "",
  2: "sm:col-span-2 lg:col-span-2",
  3: "sm:col-span-2 lg:col-span-3",
  4: "sm:col-span-2 md:col-span-3 lg:col-span-4",
  5: "sm:col-span-2 md:col-span-3 lg:col-span-5",
  6: "sm:col-span-2 md:col-span-3 lg:col-span-6",
};

// need all breakpoints defined in these classes to calculate the slider gap
export const gapHorizontalClasses: Record<GapType, string> = {
  none: "gap-x-0",
  "2xs": "gap-x-1.5 sm:gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-4 2xl:gap-x-4",
  xs: "gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-6 xl:gap-x-6 2xl:gap-x-6",
  sm: "gap-x-4 sm:gap-x-4 md:gap-x-4 lg:gap-x-8 xl:gap-x-8 2xl:gap-x-8",
  md: "gap-x-5 sm:gap-x-5 md:gap-x-6 lg:gap-x-10 xl:gap-x-10 2xl:gap-x-10",
  lg: "gap-x-6 sm:gap-x-6 md:gap-x-10 lg:gap-x-16 xl:gap-x-20 2xl:gap-x-22",
  xl: "gap-x-8 sm:gap-x-8 md:gap-x-16 lg:gap-x-20 xl:gap-x-24 2xl:gap-x-30",
  "2xl":
    "gap-x-10 sm:gap-x-10 md:gap-x-20 lg:gap-x-24 xl:gap-x-32 2xl:gap-x-40",
};

export const gapVerticalClasses: Record<GapType, string> = {
  none: "gap-y-0",
  "2xs": "gap-y-1.5 sm:gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-4 2xl:gap-y-4",
  xs: "gap-y-3 sm:gap-y-4 md:gap-y-6 lg:gap-y-6 xl:gap-y-6 2xl:gap-y-6",
  sm: "gap-y-4 sm:gap-y-4 md:gap-y-4 lg:gap-y-8 xl:gap-y-8 2xl:gap-y-8",
  md: "gap-y-5 sm:gap-y-5 md:gap-y-6 lg:gap-y-10 xl:gap-y-10 2xl:gap-y-10",
  lg: "gap-y-8 sm:gap-y-8 md:gap-y-10 lg:gap-y-16 xl:gap-y-20 2xl:gap-y-24",
  xl: "gap-y-8 sm:gap-y-8 md:gap-y-16 lg:gap-y-20 xl:gap-y-24 2xl:gap-y-30",
  "2xl":
    "gap-y-10 sm:gap-y-10 md:gap-y-20 lg:gap-y-24 xl:gap-y-32 2xl:gap-y-40",
};
