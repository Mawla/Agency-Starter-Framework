import { ColorType, HorizontalAlignType } from "../../types";
import { SpaceType } from "./spacing.options";

export type BlockThemeType = {
  background?: ColorType;
  space?: SpaceType;
  align?: HorizontalAlignType;
};
