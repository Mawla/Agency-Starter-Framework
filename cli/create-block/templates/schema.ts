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
  import { SPACE_OPTIONS } from "../../components/block/spacing.options";
  import { optionsToList } from "../../studio/utils/fields/optionsToList";
  ${render(fields, "title", `import { HTML_TEXT_NODES } from "../../types";`)}
  ${render(
    fields,
    "title",
    `import { TITLE_FONT_OPTIONS, TITLE_WEIGHT_OPTIONS } from "../../components/title/title.options";`,
  )}
  import { EllipsisVerticalIcon } from "@sanity/icons";
  import { Question } from "@vectopus/atlas-icons-react";
  import React from "react";
  import { defineField, defineType } from "sanity";
  import { BACKGROUND_COLOR_OPTIONS, ALIGN_OPTIONS
    ${render(fields, "title", `, TITLE_COLOR_OPTIONS, TITLE_SIZE_OPTIONS`)}
    ${render(fields, "eyebrow", `, EYEBROW_COLOR_OPTIONS`)}
  ${render(
    fields,
    "intro",
    `,INTRO_COLOR_OPTIONS, INTRO_SIZE_OPTIONS`,
  )} } from "./${lowerName}.options";

  const schema = defineType({
    name: "${schemaName}",
    title: "${blockTitle}",
    type: "object",
    icon: () => <Question weight="thin" />,
    description: "${blockDescription}",
    preview: {
      select: {
        ${render(fields, "title", `title: "title",`)}
        ${render(fields, "eyebrow", `eyebrow: "eyebrow",`)}
        ${render(fields, "image", `image: "image",`)}
      },
      prepare({ 
        ${render(fields, "eyebrow", `eyebrow = "", `)}
        ${render(fields, "title", `title = "${blockTitle}", `)}
        ${render(fields, "image", `image`)}
      }: any) {
        return {
          ${render(fields, "title", `title: title,`)}
          ${render(fields, "eyebrow", `subtitle: eyebrow,`)}
          ${render(
            fields,
            "image",
            `media: image || <Question weight="thin" />,`,
          )}
        };
      },
    },
    groups: [
      {
        name: "content",
        title: "Content",
        default: true,
      },
      {
        name: "theme",
        title: "Theme",
      },
      {
        name: "tools",
        title: " ",
        icon: EllipsisVerticalIcon,
      },
    ],
    fields: [
      defineField({
        name: "preset",
        title: "Preset",
        type: "preset",
        group: "tools",
      }),
      defineField({
        name: "copyPaste",
        title: "Copy Paste",
        type: "copyPaste",
        group: "tools",
      }),
      ${render(
        fields,
        "eyebrow",
        `defineField({
        name: "eyebrow",
        title: "Eyebrow",
        type: "string",
        group: "content",
      }),`,
      )}
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
          defineField({
            name: "block",
            title: "Block",
            type: "styles",
            options: {
              fields: [
                {
                  name: "space",
                  title: "Space",
                  type: "space",
                  options: {
                    list: optionsToList(SPACE_OPTIONS),
                  },
                },
                {
                  name: "background",
                  type: "color",
                  options: {
                    colors: BACKGROUND_COLOR_OPTIONS,
                  },
                },
                {
                  name: "align",
                  type: "select",
                  options: {
                    list: optionsToList(ALIGN_OPTIONS),
                  },
                },
              ],
            },
          }),
          ${render(
            fields,
            "title",
            `defineField({
            name: "title",
            title: "Title",
            type: "styles",
            options: {
              fields: [
                {
                  name: "size",
                  type: "select",
                  options: {
                    list: optionsToList(TITLE_SIZE_OPTIONS),
                  },
                },
                {
                  name: "weight",
                  type: "select",
                  options: {
                    list: optionsToList(TITLE_WEIGHT_OPTIONS),
                  },
                },
                {
                  name: "font",
                  type: "select",
                  options: {
                    list: optionsToList(TITLE_FONT_OPTIONS),
                  },
                },
                {
                  name: "level",
                  type: "select",
                  options: {
                    list: optionsToList(HTML_TEXT_NODES),
                  },
                },
                {
                  name: "color",
                  type: "color",
                  options: {
                    colors: TITLE_COLOR_OPTIONS,
                  },
                },
              ],
            },
          }),`,
          )}
          ${render(
            fields,
            "eyebrow",
            `defineField({
            name: "eyebrow",
            title: "Eyebrow",
            type: "styles",
            options: {
              fields: [
                {
                  name: "color",
                  type: "color",
                  options: {
                    colors: EYEBROW_COLOR_OPTIONS,
                  },
                },
              ],
            },
          }),`,
          )}
          ${render(
            fields,
            "intro",
            `defineField({
            name: "intro",
            title: "Intro",
            type: "styles",
            options: {
              fields: [
                {
                  name: "size",
                  type: "select",
                  options: {
                    list: optionsToList(INTRO_SIZE_OPTIONS),
                  },
                },
                {
                  name: "color",
                  type: "color",
                  options: {
                    colors: INTRO_COLOR_OPTIONS,
                  },
                },
              ],
            },
          }),`,
          )}
        ],
      }),
    ],
  });

  export default schema;`;
};
