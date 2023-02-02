import { COLORS } from "../../colors";
import { SIZE_OPTIONS } from "../../components/module/Title";
import { pick } from "../../helpers/utils/object";
import { ALIGNMENTS } from "../../types";

export const BACKGROUND_COLOR_OPTIONS = pick(COLORS, "white", "neutral-100");
export type BackgroundColorType = keyof typeof BACKGROUND_COLOR_OPTIONS;

export const IMAGE_ALIGN_OPTIONS = pick(ALIGNMENTS, "left", "right");
export type ImageAlignType = keyof typeof IMAGE_ALIGN_OPTIONS;

export const TITLE_SIZE_OPTIONS = pick(SIZE_OPTIONS, "xl", "2xl", "3xl");
export type TitleSizeType = keyof typeof TITLE_SIZE_OPTIONS;
