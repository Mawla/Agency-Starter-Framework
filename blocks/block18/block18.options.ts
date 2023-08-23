import { pick } from "../../helpers/utils/object";
import { SIZES } from "../../types";

export const COLUMN_OPTIONS = {
  1: "One column",
  2: "Two columns",
  3: "Three columns",
  4: "Four columns",
  5: "Five columns",
  6: "Six columns",
};
export type ColumnType = keyof typeof COLUMN_OPTIONS;

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
