import { AnswersType } from "..";
import { render } from "../../utils/render-field";

type Props = {
  fields: AnswersType["fields"];
};

export const getOptionsSnippet = ({ fields }: Props) => {
  return `
    import { COLORS } from "../../colors";
    ${render(
      fields,
      "title",
      `import { SIZE_OPTIONS } from "../../components/module/Title";`,
    )}
    
    import { pick } from "../../helpers/utils/object";

    export const BACKGROUND_COLOR_OPTIONS = pick(COLORS, "white", "black");
    export type BackgroundColorType = keyof typeof BACKGROUND_COLOR_OPTIONS;

    
    ${render(
      fields,
      "title",
      `
      export const TITLE_SIZE_OPTIONS = pick(SIZE_OPTIONS, "lg", "xl");
      export type TitleSizeType = keyof typeof TITLE_SIZE_OPTIONS;
    
      export const TITLE_COLOR_OPTIONS = pick(COLORS, "black");
      export type TitleColorType = keyof typeof TITLE_COLOR_OPTIONS;
    `,
    )};
    
    ${render(
      fields,
      "intro",
      `
      export const INTRO_COLOR_OPTIONS = pick(COLORS, "black");
      export type IntroColorType = keyof typeof INTRO_COLOR_OPTIONS;
    `,
    )};
    
    ${render(
      fields,
      "eyebrow",
      `
      export const EYEBROW_COLOR_OPTIONS = pick(COLORS, "black");
      export type EyebrowColorType = keyof typeof EYEBROW_COLOR_OPTIONS;
    `,
    )};
    `;
};
