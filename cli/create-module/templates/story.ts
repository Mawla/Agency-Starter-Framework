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
      INTRO_COLOR_OPTIONS,`,
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
      title: "Modules/${pascalName}",
    } as Meta;
    
    export const Default = () => <${pascalName} 
    ${render(fields, "eyebrow", `eyebrow="${pascalName}"`)}
    ${render(fields, "title", `title="${pascalName}"`)}
    ${render(fields, "intro", `intro={<p>${pascalName}</p>}`)}
    ${render(fields, "image", `image={demoImage}`)}
    ${render(fields, "buttons", `buttons={[{ label: '${pascalName}' }]}`)}
    ${render(fields, "items", `items={[{ title: '${pascalName}' }]}`)}
    />;
    
    export const ModuleBackgrounds = () => (
      <>
        {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
          (color) => (
            <div key={color} className="mb-10">
              <Beeps
                title="Beeps"
                theme={{
                  module: { background: color },
                }}
              />
            </div>
          ),
        )}
      </>
    );

    ${render(
      fields,
      "eyebrow",
      `
      export const EyebrowColors = () => (
        <>
          {(Object.keys(EYEBROW_COLOR_OPTIONS) as EyebrowColorType[]).map((color) => (
            <div key={color} className="mb-10">
              <Beeps
                title="Beeps"
                eyebrow="Beeps"
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
          <div key={color} className="mb-10">
            <Beeps
              title="Beeps"
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
          <div key={size} className="mb-10">
            <Beeps
              title="Beeps"
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
          <div key={color} className="mb-10">
            <Beeps
              title="Beeps"
              theme={{
                intro: { color },
              }}
            />
          </div>
        ))}
      </>
    );`,
    )}
  
    `;
};
