import { AnswersType } from "..";
import { render } from "../../utils/render-field";

type Props = {
  pascalName: string;
  lowerName: string;
  fields: AnswersType["fields"];
};

export const getStorySnippet = ({ pascalName, lowerName, fields }: Props) => {
  return `
    import { demoImage } from "../../stories/content";
    import { ${pascalName} } from "./${pascalName}";
    import { Meta } from "@storybook/react";
    import React from "react";
    import {
      AlignType,
      ALIGN_OPTIONS,
      BackgroundColorType,
      BACKGROUND_COLOR_OPTIONS,
      ${render(
        fields,
        "eyebrow",
        `
      EyebrowColorType,
      EYEBROW_COLOR_OPTIONS,`,
      )}
      ${render(
        fields,
        "intro",
        `
      IntroColorType,
      INTRO_COLOR_OPTIONS, 
      IntroSizeType,
      INTRO_SIZE_OPTIONS,`,
      )}
      ${render(
        fields,
        "title",
        `
      TitleColorType,
      TitleSizeType,
      TITLE_COLOR_OPTIONS,
      TITLE_SIZE_OPTIONS,`,
      )}
    } from "./${lowerName}.options";
    
    export default {
      component: ${pascalName},
      title: "Blocks/${pascalName}",
    } as Meta;
    
    const DEMO_CONTENT = {
      ${render(fields, "eyebrow", "eyebrow,")}
      ${render(fields, "title", "title,")}
      ${render(fields, "intro", "<p>intro</p>,")}
      ${render(fields, "image", "demoImage,")}
      ${render(fields, "buttons", "[{ label: 'Button' }],")}
      ${render(fields, "items", "[{ title: 'Item' }],")}
    };

    export const Default = () => <${pascalName} 
      {...DEMO_CONTENT}
    />;

    
    export const BlockBackgrounds = () => (
      <>
        {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
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
        {(Object.keys(ALIGN_OPTIONS) as AlignType[]).map((align) => (
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
      "eyebrow",
      `
      export const EyebrowColors = () => (
        <>
          {(Object.keys(EYEBROW_COLOR_OPTIONS) as EyebrowColorType[]).map((color) => (
            <div key={color}>
              <${pascalName}
                title={DEMO_CONTENT.title}
                eyebrow={DEMO_CONTENT.eyebrow}
                theme={{
                  eyebrow: { color },
                }}
              />
            </div>
          ))}
        </>
      );
      `,
    )}

    ${render(
      fields,
      "title",
      `
    export const TitleColors = () => (
      <>
        {(Object.keys(TITLE_COLOR_OPTIONS) as TitleColorType[]).map((color) => (
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
        {(Object.keys(INTRO_COLOR_OPTIONS) as IntroColorType[]).map((color) => (
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
        {(Object.keys(INTRO_SIZE_OPTIONS) as IntroSizeType[]).map((size) => (
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
