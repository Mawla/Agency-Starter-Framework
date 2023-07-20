import { SPACE_OPTIONS } from "../../components/block/spacing.options";
import {
  TITLE_FONT_OPTIONS,
  TITLE_WEIGHT_OPTIONS,
} from "../../components/title/title.options";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { HEADING_LEVELS } from "../../types";
import {
  BACKGROUND_COLOR_OPTIONS,
  ALIGN_OPTIONS,
  TITLE_COLOR_OPTIONS,
  TITLE_SIZE_OPTIONS,
  INTRO_COLOR_OPTIONS,
  INTRO_SIZE_OPTIONS,
} from "./block6.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { StarSquare } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block6",
  title: "Default feature list",
  type: "object",
  icon: () => <StarSquare weight="thin" />,
  description:
    "Grid layout where you can show up to three items on a row featuring an icon, title and description.",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title = "Default feature list" }: any) {
      return {
        title: title,
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

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "portabletext.simple",
      group: "content",
    }),

    defineField({
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
    }),
    defineField({
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
          ],
          preview: {
            select: {
              title: "title",
            },
          },
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              group: "content",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              group: "content",
            }),
            defineField({
              name: "intro",
              title: "Intro",
              type: "portabletext.simple",
              group: "content",
            }),
            defineField({
              name: "theme",
              title: "Theme",
              type: "object",
              group: "theme",
              fields: [
                defineField({
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
                }),

                defineField({
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
                }),
              ],
            }),
          ],
        }),
      ],
    }),
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
        defineField({
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
        }),

        defineField({
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
        }),
      ],
    }),
  ],
});

export default schema;
