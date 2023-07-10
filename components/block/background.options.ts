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

export const backgroundRoundedTopClasses: Record<BlockRadiusType, string> = {
  none: "rounded-t-none",
  md: "rounded-t-[8px] sm:rounded-t-[16px] md:rounded-t-[24px] xl:rounded-t-[32px]",
  lg: "rounded-t-[16px] sm:rounded-t-[24px] md:rounded-t-[32px] xl:rounded-t-[40px]",
};

export const backgroundRoundedBottomClasses: Record<BlockRadiusType, string> = {
  none: "rounded-b-none",
  md: "rounded-b-[8px] sm:rounded-b-[16px] md:rounded-b-[24px] xl:rounded-b-[32px]",
  lg: "rounded-b-[24px] sm:rounded-b-[32px] md:rounded-b-[40px] xl:rounded-b-[48px]",
};
