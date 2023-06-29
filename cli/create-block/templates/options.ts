import { AnswersType } from "..";
import { render } from "../../utils/render-field";

type Props = {
  fields: AnswersType["fields"];
};

export const getOptionsSnippet = ({ fields }: Props) => {
  return `
    import { ALIGNMENTS } from "../../types";
    import { BACKGROUND_COLOR_OPTIONS as ALL_BACKGROUND_COLOR_OPTIONS } from "../../components/block/background.options";
    ${render(
      fields,
      "title",
      `import { 
        TITLE_SIZE_OPTIONS as ALL_TITLE_SIZE_OPTIONS, 
        TITLE_COLOR_OPTIONS as ALL_TITLE_COLOR_OPTIONS, 
      } from "../../components/block/title.options";`,
    )}
    ${render(
      fields,
      "eyebrow",
      `import { 
        TITLE_EYEBROW_COLOR_OPTIONS as ALL_TITLE_EYEBROW_COLOR_OPTIONS 
      } from "../../components/block/title.options";`,
    )}
    ${render(
      fields,
      "intro",
      `import { TEXT_COLOR_OPTIONS, TEXT_SIZE_OPTIONS } from "../../components/block/text.options";`,
    )}
    
    import { pick } from "../../helpers/utils/object";

    export const BACKGROUND_COLOR_OPTIONS = pick(ALL_BACKGROUND_COLOR_OPTIONS);
    export type BackgroundColorType = keyof typeof BACKGROUND_COLOR_OPTIONS;

    export const ALIGN_OPTIONS = pick(ALIGNMENTS, "left", "center", "right");
    export type AlignType = keyof typeof ALIGN_OPTIONS;

    
    ${render(
      fields,
      "title",
      `
      export const TITLE_SIZE_OPTIONS = pick(ALL_TITLE_SIZE_OPTIONS);
      export type TitleSizeType = keyof typeof TITLE_SIZE_OPTIONS;
    
      export const TITLE_COLOR_OPTIONS = pick(ALL_TITLE_COLOR_OPTIONS);
      export type TitleColorType = keyof typeof TITLE_COLOR_OPTIONS;

    `,
    )};
    
    ${render(
      fields,
      "intro",
      `
      export const INTRO_SIZE_OPTIONS = pick(TEXT_SIZE_OPTIONS);
      export type IntroSizeType = keyof typeof INTRO_SIZE_OPTIONS;

      export const INTRO_COLOR_OPTIONS = pick(TEXT_COLOR_OPTIONS);
      export type IntroColorType = keyof typeof INTRO_COLOR_OPTIONS;

    `,
    )};
    
    
    ${render(
      fields,
      "eyebrow",
      `
      export const EYEBROW_COLOR_OPTIONS = pick(ALL_TITLE_EYEBROW_COLOR_OPTIONS);
      export type EyebrowColorType = keyof typeof EYEBROW_COLOR_OPTIONS;
    `,
    )};
    `;
};
