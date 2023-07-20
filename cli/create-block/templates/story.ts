import { AnswersType } from "..";
import { render } from "../../utils/render-field";

type Props = {
  pascalName: string;
  lowerName: string;
  fields: AnswersType["fields"];
};

export const getStorySnippet = ({ pascalName, lowerName, fields }: Props) => {
  return `
    import { ${pascalName}, ${pascalName}Props } from "./${pascalName}";
    import { TextSizeType, TEXT_SIZE_OPTIONS } from "../../components/text/text.options";
    import { TitleSizeType, TITLE_SIZE_OPTIONS } from "../../components/title/title.options";
    import { demoImage } from "../../stories/content";
    import { COLORS } from "../../theme";
    import { ColorType, HorizontalAlignType, HORIZONTAL_ALIGN_OPTIONS } from "../../types";
    import { Meta } from "@storybook/react";
    import React from "react";
    
    export default {
      component: ${pascalName},
      title: "Blocks/${pascalName}",
    } as Meta;
    
    const DEMO_CONTENT:${pascalName}Props = {
      ${render(fields, "title", "title: 'title',")}
      ${render(fields, "intro", "intro: <p>intro</p>,")}
      ${render(fields, "image", "image: demoImage,")}
      ${render(fields, "buttons", "buttons: [{ label: 'Button' }],")}
      ${render(fields, "items", "items: [{ title: 'Item' }],")}
    };

    export const Default = () => <${pascalName} 
      {...DEMO_CONTENT}
    />;

    
    export const BlockBackgrounds = () => (
      <>
        {(Object.keys(COLORS) as ColorType[]).map(
          (color) => (
            <div key={color}>
              <${pascalName}
                {...DEMO_CONTENT}
                theme={{
                  block: { background: color },
                }}
              />
            </div>
          ),
        )}
      </>
    );

    export const Alignments = () => (
      <>
        {(Object.keys(HORIZONTAL_ALIGN_OPTIONS) as HorizontalAlignType[]).map((align) => (
          <div key={align}>
            <${pascalName}
              {...DEMO_CONTENT}
              theme={{
                block: { align },
              }}
            />
          </div>
        ))}
      </>
    );

    ${render(
      fields,
      "title",
      `
    export const TitleColors = () => (
      <>
        {(Object.keys(COLORS) as ColorType[]).map((color) => (
          <div key={color}>
            <${pascalName}
              title={DEMO_CONTENT.title}
              theme={{
                title: { color },
              }}
            />
          </div>
        ))}
      </>
    );
    
    export const TitleSizes = () => (
      <>
        {(Object.keys(TITLE_SIZE_OPTIONS) as TitleSizeType[]).map((size) => (
          <div key={size}>
            <${pascalName}
              title={DEMO_CONTENT.title}
              theme={{
                title: { size },
              }}
            />
          </div>
        ))}
      </>
    );`,
    )}

    ${render(
      fields,
      "intro",
      `
    export const IntroColors = () => (
      <>
        {(Object.keys(COLORS) as ColorType[]).map((color) => (
          <div key={color}>
            <${pascalName}
              intro={DEMO_CONTENT.intro}
              theme={{
                intro: { color },
              }}
            />
          </div>
        ))}
      </>
    );
    
    export const IntroSizes = () => (
      <>
        {(Object.keys(TEXT_SIZE_OPTIONS) as TextSizeType[]).map((size) => (
          <div key={size}>
            <${pascalName}
              intro={DEMO_CONTENT.intro}
              theme={{
                intro: { size },
              }}
            />
          </div>
        ))}
      </>
    );`,
    )}
  
    `;
};
