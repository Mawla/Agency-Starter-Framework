import {
  defaultBlockGroups,
  defaultBlockTheme,
} from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { capitalize } from "../../helpers/utils/string";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { referenceFilterCurrentLanguage } from "../../studio/utils/language/reference-filter-current-language";
import { RESOURCE_SCHEMAS } from "../../types.sanity";
import { FunnelSort } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block12",
  title: "Resources feed",
  type: "object",
  icon: () => <FunnelSort weight="thin" />,
  description:
    "Feed of automatically loaded resources (like blogs or events) in a grid of cards",
  preview: {
    select: {
      title: "title",
      cmsTitle: "cmsTitle",
    },
    prepare({ title, cmsTitle }: any) {
      return {
        title: title || cmsTitle || "Resources feed",
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
      name: "filter",
      title: "Filter",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "types",
          title: "Types",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: Object.keys(RESOURCE_SCHEMAS).map((key) => {
              return {
                title: capitalize(key.replace("page.", "")),
                value: key,
              };
            }),
          },
        }),
        defineField({
          name: "tags",
          title: "Tags",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "page.tag" }],
              options: {
                filter: referenceFilterCurrentLanguage,
              },
            },
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
        defaultBlockTheme,
        defaultTitleTheme,
        defaultTextTheme,
        defineField({
          name: "tags",
          title: "Tags",
          type: "styles",
          options: {
            fields: [
              {
                name: "display",
                type: "boolean",
              },
              {
                name: "color",
                type: "color",
              },
              {
                name: "background",
                type: "color",
              },
            ],
          },
        }),
        defineField({
          name: "card",
          title: "Card",
          type: "styles",
          options: {
            fields: [
              {
                name: "background",
                type: "color",
              },
              {
                name: "border",
                type: "color",
              },
              {
                name: "title",
                type: "color",
              },
              {
                name: "text",
                type: "color",
              },
              {
                name: "tag",
                type: "color",
              },
              {
                name: "author",
                type: "color",
              },
              {
                name: "date",
                type: "color",
              },
            ],
          },
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
