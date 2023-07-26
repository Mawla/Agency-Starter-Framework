import { defaultBlockTheme } from "../../components/block/block.schema";
import { SPACE_OPTIONS } from "../../components/block/spacing.options";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { TAGGABLE_SCHEMAS } from "../../types.sanity";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { FunnelSort } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block12",
  title: "Resources feed",
  type: "object",
  icon: () => <FunnelSort weight="thin" />,
  description: "Grid of automatically loaded resources, like blogs or events",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title = "Resources feed" }: any) {
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
            list: optionsToList(TAGGABLE_SCHEMAS),
          },
        }),
        defineField({
          name: "tags",
          title: "Tags",
          type: "array",
          of: [{ type: "reference", to: [{ type: "page.tag" }] }],
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
            ],
          },
        }),
      ],
    }),
  ],
});

export default schema;
