import { COLORS } from "../../colors";
import { pick } from "../../helpers/utils/object";
import { ALIGNMENTS } from "../../types";

export const STORY_ALIGN_OPTIONS = pick(ALIGNMENTS, "left", "right");
export type StoryAlignType = keyof typeof STORY_ALIGN_OPTIONS;

export const STORY_BACKGROUND_COLOR_OPTIONS = pick(
  COLORS,
  "neutral-5000",
  "neutral-800",
);
export type StoryBackgroundColorType =
  keyof typeof STORY_BACKGROUND_COLOR_OPTIONS;
