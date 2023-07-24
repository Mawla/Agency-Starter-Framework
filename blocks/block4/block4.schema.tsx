import { defaultBlockTheme } from "../../components/block/block.schema";
import { defaultImageTheme } from "../../components/images/image.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { AlignCenter } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block4",
  title: "Default content",
  type: "object",
  icon: () => <AlignCenter weight="thin" />,
  description: "Basic title, intro, buttons and image block",
  preview: {
    select: {
      title: "title",
      image: "image",
    },
    prepare({ title = "Block 4", image }: any) {
      return {
        title: title,
        media: image || <AlignCenter weight="thin" />,
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
        defaultImageTheme,
      ],
    }),
  ],
});

export default schema;
