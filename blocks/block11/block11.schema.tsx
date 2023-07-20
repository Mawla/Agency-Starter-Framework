import { SPACE_OPTIONS } from "../../components/block/spacing.options";
import {
  TITLE_FONT_OPTIONS,
  TITLE_WEIGHT_OPTIONS,
} from "../../components/title/title.options";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { COLORS } from "../../theme";
import { HEADING_LEVELS } from "../../types";
import {
  BACKGROUND_COLOR_OPTIONS,
  ALIGN_OPTIONS,
  TITLE_COLOR_OPTIONS,
  TITLE_SIZE_OPTIONS,
  INTRO_COLOR_OPTIONS,
  INTRO_SIZE_OPTIONS,
} from "./block11.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { MessagingLines } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block11",
  title: "Grid layout testimonial cards",
  type: "object",
  icon: () => <MessagingLines weight="thin" />,
  description:
    "Up to three testimonial cards for every row and show a title, description, avatar, name, and job title",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title = "Grid layout testimonial cards" }: any) {
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
      name: "testimonials",
      title: "Testimonials",
      type: "testimonials.list",
      group: "content",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
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

        defineField({
          name: "testimonials",
          title: "Testimonials",
          type: "styles",
          options: {
            fields: [
              {
                name: "background",
                type: "color",
                options: {
                  colors: BACKGROUND_COLOR_OPTIONS,
                },
              },
              {
                name: "title",
                type: "color",
                options: {
                  colors: TITLE_COLOR_OPTIONS,
                },
              },
              {
                name: "content",
                type: "color",
                options: {
                  colors: COLORS,
                },
              },
              {
                name: "name",
                type: "color",
                options: {
                  colors: COLORS,
                },
              },
              {
                name: "jobTitle",
                type: "color",
                options: {
                  colors: COLORS,
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
