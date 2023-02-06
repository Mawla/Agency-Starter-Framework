import { COLORS } from "../../colors";
import { pick } from "../../helpers/utils/object";

export const SLIDER_COLOR_OPTIONS = pick(COLORS, "white", "black");
export type SliderColorType = keyof typeof SLIDER_COLOR_OPTIONS;
