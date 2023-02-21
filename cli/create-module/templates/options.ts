export const getOptionsSnippet = () => {
  return `
    import { COLORS } from "../../colors";
    import { SIZE_OPTIONS } from "../../components/module/Title";
    import { pick } from "../../helpers/utils/object";

    export const BACKGROUND_COLOR_OPTIONS = pick(COLORS, "white", "black");
    export type BackgroundColorType = keyof typeof BACKGROUND_COLOR_OPTIONS;

    export const TITLE_SIZE_OPTIONS = pick(SIZE_OPTIONS, "lg", "xl");
    export type TitleSizeType = keyof typeof TITLE_SIZE_OPTIONS;
    
    export const TITLE_COLOR_OPTIONS = pick(COLORS, "black", "white");
    export type TitleColorType = keyof typeof TITLE_COLOR_OPTIONS;
    `;
};
