import {
  defaultBlockGroups,
  defaultBlockTheme,
} from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { COLORS } from "../../theme";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { FolderQuestion } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block10",
  title: "FAQ Accordions",
  type: "object",
  icon: () => <FolderQuestion weight="thin" />,
  description:
    "Can be used to expand the answer to each Folderquestion based on user interaction.",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title = "FAQ Accordions" }: any) {
      return {
        title: title,
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
      name: "faq",
      title: "Frequently Asked Questions",
      type: "faq.list",
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
        defaultBlockTheme,
        defaultTitleTheme,
        defaultTextTheme,
        defineField({
          name: "faq",
          title: "FAQ",
          type: "styles",
          options: {
            fields: [
              {
                name: "background",
                type: "color",
                options: {
                  colors: COLORS,
                },
              },
              {
                name: "title",
                type: "color",
                options: {
                  colors: COLORS,
                },
              },
              {
                name: "icon",
                type: "color",
                options: {
                  colors: COLORS,
                },
              },
              {
                name: "divider",
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
