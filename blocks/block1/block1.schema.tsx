import {
  defaultBlockGroups,
  defaultBlockTheme,
} from "../../components/block/block.schema";
import { defaultImageTheme } from "../../components/images/image.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { VERTICAL_ALIGN_OPTIONS } from "../../types";
import { IMAGE_POSITION_OPTIONS } from "./block1.options";
import { Image } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block1",
  title: "Text and Media",
  type: "object",
  icon: () => <Image weight="thin" />,
  description: "Text, image or video and feature list left or right",
  preview: {
    select: {
      title: "title",
      image: "image",
    },
    prepare({ title = "Block 1", image }: any) {
      return {
        title: title,
        media: image || <Image weight="thin" />,
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
      name: "body",
      title: "Body",
      type: "portabletext.basic",
      group: "content",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
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
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.video || parent?.script),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "video",
      group: "content",
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.image || parent?.script),
    }),
    defineField({
      name: "script",
      title: "Script",
      type: "reference",
      to: [{ type: "script" }],
      group: "content",
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.image || parent?.video),
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defaultBlockTheme,
        defaultImageTheme,
        defineField({
          name: "layout",
          title: "Layout",
          type: "styles",
          options: {
            fields: [
              defineField({
                name: "mediaPosition",
                title: "Image position",
                type: "select",
                options: {
                  list: optionsToList(IMAGE_POSITION_OPTIONS),
                },
              }),
              defineField({
                name: "verticalAlign",
                title: "Vertical align",
                type: "select",
                options: {
                  list: optionsToList(VERTICAL_ALIGN_OPTIONS),
                },
              }),
            ],
          },
        }),
        defaultTitleTheme,
        defaultTextTheme,
        { ...defaultTextTheme, name: "body", title: "Body" },
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
