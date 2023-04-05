import { COLORS } from "../../colors";
import { pick } from "../../helpers/utils/object";
import { SIZES } from "../../types";

export const BACKGROUND_COLOR_OPTIONS = pick(COLORS, "white", "black");
export type BackgroundColorType = keyof typeof BACKGROUND_COLOR_OPTIONS;

export const MODULE_RADIUS_OPTIONS = pick(SIZES, "none", "md", "lg");
export type ModuleRadiusType = keyof typeof MODULE_RADIUS_OPTIONS;

export type ModuleRoundedType = {
  top?: ModuleRadiusType;
  bottom?: ModuleRadiusType;
};
