import { SIZE_OPTIONS } from "../../components/module/Title";
import { pick } from "../../helpers/utils/object";

export const TITLE_SIZE_OPTIONS = pick(SIZE_OPTIONS, "xl", "2xl", "3xl");
export type TitleSizeType = keyof typeof TITLE_SIZE_OPTIONS;
