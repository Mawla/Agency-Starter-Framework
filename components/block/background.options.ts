import { COLORS } from "../../colors";
import { pick } from "../../helpers/utils/object";
import { SIZES } from "../../types";

export const BACKGROUND_COLOR_OPTIONS = pick(COLORS, "white", "black");
export type BackgroundColorType = keyof typeof BACKGROUND_COLOR_OPTIONS;

export const BLOCK_RADIUS_OPTIONS = pick(SIZES, "none", "md", "lg");
export type BlockRadiusType = keyof typeof BLOCK_RADIUS_OPTIONS;

export type BlockRoundedType = {
  top?: BlockRadiusType;
  bottom?: BlockRadiusType;
};
