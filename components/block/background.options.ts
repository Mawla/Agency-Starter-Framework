import { pick } from "../../helpers/utils/object";
import { SIZES } from "../../types";

export const BLOCK_RADIUS_OPTIONS = pick(SIZES, "none", "md", "lg");
export type BlockRadiusType = keyof typeof BLOCK_RADIUS_OPTIONS;

export type BlockRoundedType = {
  top?: BlockRadiusType;
  bottom?: BlockRadiusType;
};

export const backgroundRoundedTopClasses: Record<BlockRadiusType, string> = {
  none: "rounded-t-none",
  md: "rounded-t-[16px] sm:rounded-t-[24px] md:rounded-t-[32px] xl:rounded-t-[40px]",
  lg: "rounded-t-[16px] sm:rounded-t-[24px] md:rounded-t-[40px] lg:rounded-t-[48px] xl:rounded-t-[64px]",
};

export const backgroundRoundedBottomClasses: Record<BlockRadiusType, string> = {
  none: "rounded-b-none",
  md: "rounded-b-[16px] sm:rounded-b-[24px] md:rounded-b-[32px] xl:rounded-b-[40px]",
  lg: "rounded-b-[16px] sm:rounded-b-[24px] md:rounded-b-[40px] lg:rounded-b-[48px]  xl:rounded-b-[64px]",
};
