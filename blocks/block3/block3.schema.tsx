import { defaultBlockTheme } from "../../components/block/block.schema";
import { GRADIENT_OPACITY_OPTIONS } from "../../components/gradient/GradientOptions";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { ClickBait } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block3",
  title: "Heading with CTA button",
  type: "object",
  icon: () => <ClickBait weight="thin" />,
  description:
    "Use this CTA section with a heading, short paragraph, and a button to encourage users to do something.",
  preview: {
    select: {
      title: "title",
      image: "image",
    },
    prepare({ title = "Block 3", image }: any) {
      return {
        title: title,
        media: image || <ClickBait weight="thin" />,
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
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
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
          name: "image",
          title: "Image",
          type: "styles",
          options: {
            fields: [
              {
                name: "gradientFromOpacity",
                type: "select",
                options: {
                  list: GRADIENT_OPACITY_OPTIONS.reduce((acc, x) => {
                    acc.push({ title: x, value: x });
                    return acc;
                  }, [] as { title: number; value: number }[]),
                },
              },
              {
                name: "gradientToOpacity",
                type: "select",
                options: {
                  list: GRADIENT_OPACITY_OPTIONS.reduce((acc, x) => {
                    acc.push({ title: x, value: x });
                    return acc;
                  }, [] as { title: number; value: number }[]),
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
