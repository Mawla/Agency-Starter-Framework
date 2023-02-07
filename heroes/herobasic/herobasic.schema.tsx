import { EllipsisVerticalIcon } from "@sanity/icons";
import { ImageGallery } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "hero.basic",
  title: "Hero Basic",
  type: "object",
  icon: () => <ImageGallery weight="thin" />,
  preview: {
    select: {
      title: "title",
      eyebrow: "eyebrow",
      image: "image",
    },
    prepare({ title = "", eyebrow = "", image }: any) {
      return {
        title: `${title}`,
        subtitle: eyebrow,
        media: image,
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
      name: "visual",
      title: "Visual",
    },
    {
      name: "language",
      title: "Language",
    },
    {
      name: "tools",
      title: " ",
      icon: EllipsisVerticalIcon,
    },
  ],
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "language",
      group: "language",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "text",
      rows: 2,
      group: "content",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "portabletext.simple",
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
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
      name: "preset",
      title: "Preset",
      type: "preset",
      group: "tools",
      options: {
        updateField: "hero",
      },
    }),
    defineField({
      name: "copyPaste",
      title: "Copy Paste",
      type: "copyPaste",
      group: "tools",
      options: {
        updateField: "hero",
      },
    }),
  ],
});

export default schema;
