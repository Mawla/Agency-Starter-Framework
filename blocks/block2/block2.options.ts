import { BACKGROUND_COLOR_OPTIONS as ALL_BACKGROUND_COLOR_OPTIONS } from "../../components/block/background.options";
import { TEXT_COLOR_OPTIONS } from "../../components/block/text.options";
import {
  TITLE_SIZE_OPTIONS as ALL_TITLE_SIZE_OPTIONS,
  TITLE_COLOR_OPTIONS as ALL_TITLE_COLOR_OPTIONS,
  TITLE_EYEBROW_COLOR_OPTIONS as ALL_TITLE_EYEBROW_COLOR_OPTIONS,
} from "../../components/block/title.options";
import { pick } from "../../helpers/utils/object";

export const BACKGROUND_COLOR_OPTIONS = pick(ALL_BACKGROUND_COLOR_OPTIONS);
export type BackgroundColorType = keyof typeof BACKGROUND_COLOR_OPTIONS;

export const TITLE_SIZE_OPTIONS = pick(ALL_TITLE_SIZE_OPTIONS);
export type TitleSizeType = keyof typeof TITLE_SIZE_OPTIONS;

export const TITLE_COLOR_OPTIONS = pick(ALL_TITLE_COLOR_OPTIONS);
export type TitleColorType = keyof typeof TITLE_COLOR_OPTIONS;

export const INTRO_COLOR_OPTIONS = pick(TEXT_COLOR_OPTIONS);
export type IntroColorType = keyof typeof INTRO_COLOR_OPTIONS;
