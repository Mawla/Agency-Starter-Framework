import {
  defaultBlockTheme,
  defaultBlockGroups,
} from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import {
  BORDER_RADIUS_OPTIONS,
  BORDER_WIDTH_OPTIONS,
  PADDING_OPTIONS,
} from "../../types";
import { MoneyStack } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block3",
  title: "Pricing plans",
  type: "object",
  icon: () => <MoneyStack weight="thin" />,
  description: "Grid with pricing plans cards",
  preview: {
    select: {
      title: "title",
      cmsTitle: "cmsTitle",
    },
    prepare({ title, cmsTitle }: any) {
      return {
        title: title || cmsTitle || "Pricing plans",
      };
    },
  },
  groups: defaultBlockGroups,
  fields: [
    ...defaultBlockTools,
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
        defaultBlockTheme,
        defaultTitleTheme,
        defaultTextTheme,
        defineField({
          name: "plans",
          title: "Plans",
          type: "object",
          fields: [
            defineField({
              name: "card",
              type: "styles",
              options: {
                fields: [
                  defineField({
                    name: "color",
                    title: "Text color",
                    type: "color",
                  }),
                  defineField({
                    name: "background",
                    type: "color",
                  }),
                  {
                    name: "padding",
                    type: "select",
                    options: {
                      list: optionsToList(PADDING_OPTIONS, true),
                    },
                  },
                ],
              },
            }),
            defineField({
              name: "border",
              title: "Border",
              type: "styles",
              options: {
                fields: [
                  {
                    name: "color",
                    type: "color",
                  },
                  {
                    name: "width",
                    type: "select",
                    options: {
                      list: optionsToList(BORDER_WIDTH_OPTIONS),
                    },
                  },
                  {
                    name: "radius",
                    type: "select",
                    options: {
                      list: optionsToList(BORDER_RADIUS_OPTIONS),
                    },
                  },
                ],
              },
            }),
            defaultTitleTheme,
            { ...defaultTextTheme, name: "description" },
            { ...defaultTitleTheme, name: "amount" },
            { ...defaultTextTheme, name: "unit" },
            { ...defaultTextTheme, name: "features" },
          ],
        }),
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

export default schema;
