import { AnswersType } from "..";
import { render } from "../../utils/render-field";

type Props = {
  schemaName: string;
  lowerName: string;
  blockName: string;
  blockTitle: string;
  blockDescription: string;
  fields: AnswersType["fields"];
};

export const getSchemaSnippet = ({
  blockName,
  blockTitle,
  lowerName,
  schemaName,
  fields,
  blockDescription,
}: Props) => {
  return `
  import { defaultBlockTools } from "../../studio/schemas/objects/tools";

  import { defaultBlockTheme, defaultBlockGroups } from "../../components/block/block.schema";
  ${render(
    fields,
    "title",
    `import { defaultTitleTheme } from "../../components/title/title.schema";`,
  )}
  ${render(
    fields,
    "intro",
    `import { defaultTextTheme } from "../../components/text/text.schema";`,
  )}

  import { Question } from "@vectopus/atlas-icons-react";
  import React from "react";
  import { defineField, defineType } from "sanity";

  const schema = defineType({
    name: "${schemaName}",
    title: "${blockTitle}",
    type: "object",
    icon: () => <Question weight="thin" />,
    description: "${blockDescription}",
    preview: {
      select: {
        ${render(fields, "title", `title: "title",`)}
        ${render(fields, "image", `image: "image",`)}
      },
      prepare({ 
        ${render(fields, "title", `title = "${blockTitle}", `)}
        ${render(fields, "image", `image`)}
      }: any) {
        return {
          ${render(fields, "title", `title: title,`)}
          ${render(
            fields,
            "image",
            `media: image || <Question weight="thin" />,`,
          )}
        };
      },
    },
    groups: defaultBlockGroups,
    fields: [
    ...defaultBlockTools,
      ${render(
        fields,
        "title",
        `defineField({
        name: "title",
        title: "Title",
        type: "string",
        group: "content",
      }),`,
      )}
      ${render(
        fields,
        "intro",
        `defineField({
        name: "intro",
        title: "Intro",
        type: "portabletext.simple",
        group: "content",
      }),`,
      )}
      ${render(
        fields,
        "image",
        `defineField({
        name: "image",
        title: "Image",
        type: "image",
        group: "content",
        options: {
          hotspot: true,
        },
      }),`,
      )}
      ${render(
        fields,
        "buttons",
        `defineField({
        name: "buttons",
        title: "Buttons",
        type: "buttongroup",
        group: "content",
      }),`,
      )}
      ${render(
        fields,
        "items",
        `defineField({
          name: "items",
          title: "Items",
          type: "array",
          description: "List of items",
          group: ["content"],
          of: [
            defineField({
              title: "Item",
              name: "item",
              type: "object",
              preview: {
                select: {
                  title: "title",
                },
              },
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
              ],
            }),
          ],
        }),`,
      )}
      defineField({
        name: "theme",
        title: "Theme",
        type: "object",
        group: "theme",
        fields: [
          defaultBlockTheme,
          ${render(fields, "title", `defaultTitleTheme,`)}
          ${render(fields, "intro", `defaultTextTheme,`)}
        ],
      }),
      defineField({
        name: "decorations",
        title: "Decorations",
        type: "decorations",
        group: "decorations",
      }),
    ],
  });

  export default schema;`;
};
