import { ColorType, HorizontalAlignType } from "../../types";
import { BlockRoundedType } from "./background.options";
import { SpaceType } from "./spacing.options";
import { WidthType } from "./width.options";

export type BlockThemeType = {
  padding?: SpaceType;
  margin?: SpaceType;
  background?: ColorType;
  outerBackground?: ColorType;
  text?: ColorType;
  rounded?: BlockRoundedType;
  width?: WidthType;
  align?: HorizontalAlignType;
};
