import { pick } from "../../helpers/utils/object";
import { COLORS } from "../../theme";

export const SLIDER_COLOR_OPTIONS = pick(COLORS);
export type SliderColorType = keyof typeof SLIDER_COLOR_OPTIONS;
