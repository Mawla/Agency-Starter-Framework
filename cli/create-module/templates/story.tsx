import { AnswersType } from "..";

type Props = {
  pascalName: string;
  fields: AnswersType["fields"];
};

export const getStorySnippet = ({ pascalName, fields }: Props) => {
  return `
    import { STORYBOOK_COLORS_SUBSET } from "../../colors";
    import { demoImage } from "../../stories/content";
    import { ColorType } from "../../types";
    import { ${pascalName} } from "./${pascalName}";
    import { Meta } from "@storybook/react";
    import React from "react";
    
    export default {
      component: ${pascalName},
      title: "Modules/${pascalName}",
    } as Meta;
    
    export const Default = () => <${pascalName} 
    ${fields?.includes("title") ? `title="${pascalName}"` : ""}
    ${fields?.includes("intro") ? `intro={<p>${pascalName}</p>}` : ""}
    ${fields?.includes("image") ? `image={demoImage}` : ""}
    ${fields?.includes("buttons") ? `buttons={[{ label: ${pascalName} }]}` : ""}
    ${fields?.includes("items") ? `items={[{ title: ${pascalName} }]}` : ""}
    />;
    
    export const Colors = () => (
      <>
        {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
          (color1: ColorType) =>
            (Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
              (color2: ColorType) => (
                <div key={\`\${color1}\${color2}\`} className="mb-10">
                  <${pascalName}
                    title="${pascalName}"
                    theme={{
                      module: { background: color1 },
                      text: { color: color2 },
                    }}
                  />
                </div>
              ),
            ),
        )}
      </>
    );`;
};
