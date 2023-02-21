import { AnswersType } from "..";
import { render } from "../../utils/render-field";

type Props = {
  schemaName: string;
  lowerName: string;
  moduleName: string;
  moduleDescription: string;
  fields: AnswersType["fields"];
};

export const getSchemaSnippet = ({
  moduleName,
  lowerName,
  schemaName,
  fields,
  moduleDescription,
}: Props) => {
  return `
  import { SPACE_OPTIONS } from "../../components/module/spacing.options";
  import { optionsToList } from "../../studio/utils/fields/optionsToList";
  ${render(fields, "title", `import { HEADING_LEVELS } from "../../types";`)}
  import { EllipsisVerticalIcon } from "@sanity/icons";
  import { Question } from "@vectopus/atlas-icons-react";
  import React from "react";
  import { defineField, defineType } from "sanity";
  ${render(
    fields,
    "title",
    `import { BACKGROUND_COLOR_OPTIONS, TITLE_COLOR_OPTIONS, TITLE_SIZE_OPTIONS, INTRO_COLOR_OPTIONS } from "./${lowerName}.options";`,
  )}

  const schema = defineType({
    name: "${schemaName}",
    title: "${moduleName}",
    type: "object",
    icon: () => <Question weight="thin" />,
    description: "${moduleDescription}",
    preview: {
      select: {
        ${render(fields, "title", `title: "title",`)}
        ${render(fields, "eyebrow", `eyebrow: "eyebrow",`)}
        ${render(fields, "image", `image: "image",`)};
      },
      prepare({ 
        ${render(fields, "eyebrow", `eyebrow = "", `)}
        ${render(fields, "title", `title = "${moduleName}", `)}
        ${render(fields, "image", `image`)}
      }: any) {
        return {
          ${render(fields, "title", `title: title,`)}
          ${render(fields, "eyebrow", `subtitle: eyebrow,`)}
          ${render(
            fields,
            "eyebrow",
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
            name: "module",
            title: "Module",
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
                  name: "level",
                  type: "select",
                  options: {
                    list: optionsToList(HEADING_LEVELS),
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
            "intro",
            `defineField({
            name: "intro",
            title: "Intro",
            type: "styles",
            options: {
              fields: [
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
