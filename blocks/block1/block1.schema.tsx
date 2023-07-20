import { defaultBlockTheme } from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import {
  BACKGROUND_COLOR_OPTIONS,
  IMAGE_POSITION_OPTIONS,
} from "./block1.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { VirtualRealityImage } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block1",
  title: "Image with feature list",
  type: "object",
  icon: () => <VirtualRealityImage weight="thin" />,
  description: "Text, image and feature list left or right",
  preview: {
    select: {
      title: "title",
      image: "image",
    },
    prepare({ title = "Block 1", image }: any) {
      return {
        title: title,
        media: image || <VirtualRealityImage weight="thin" />,
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
      name: "features",
      title: "Features",
      type: "portabletext.basic",
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
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defaultBlockTheme,
        defineField({
          name: "image",
          title: "Image",
          type: "styles",
          options: {
            fields: [
              {
                name: "position",
                title: "Position",
                type: "select",
                options: {
                  list: optionsToList(IMAGE_POSITION_OPTIONS),
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
        defaultTitleTheme,
        defaultTextTheme,
        { ...defaultTextTheme, name: "Features", title: "Features" },
      ],
    }),
  ],
});

export default schema;
