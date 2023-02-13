import { SPACE_OPTIONS } from "../../components/module/spacing.options";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { DotsHorizontal } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "module.breadcrumb",
  title: "Breadcrumb",
  type: "object",
  description: "Navigation path",
  icon: () => <DotsHorizontal weight="thin" />,
  initialValue: {
    theme: {
      background: "white",
      text: "black",
    },
  },
  preview: {
    select: {
      title: "title",
    },
    prepare({ title = "Breadcrumb" }: any) {
      return {
        title: title,
        media: () => <DotsHorizontal weight="thin" />,
      };
    },
  },
  groups: [
    {
      name: "theme",
      title: "Theme",
      default: true,
    },
    {
      name: "tools",
      title: " ",
      icon: EllipsisVerticalIcon,
    },
  ],
  fields: [
    defineField({
      name: "theme",
      title: "Theme",
      type: "styles",
      group: "theme",
      options: {
        fields: [
          {
            name: "text",
            title: "Text",
            type: "color",
          },
          {
            name: "background",
            title: "Background",
            type: "color",
          },
          {
            name: "space",
            title: "Space",
            type: "space",
            options: {
              list: optionsToList(SPACE_OPTIONS),
            },
          },
        ],
      },
    }),
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
  ],
});

export default schema;
