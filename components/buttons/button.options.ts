import { pick } from "../../helpers/utils/object";
import { COLORS } from "../../theme";

export const BUTTON_BACKGROUND_COLOR_OPTIONS = pick(COLORS);
export type BackgroundColorType = keyof typeof BUTTON_BACKGROUND_COLOR_OPTIONS;

export const BUTTON_ICON_POSITION_OPTIONS = {
  before: "Before",
  after: "After",
};
export type ButtonIconPositionType = keyof typeof BUTTON_ICON_POSITION_OPTIONS;
