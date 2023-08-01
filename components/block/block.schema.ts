import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { HORIZONTAL_ALIGN_OPTIONS } from "../../types";
import { BLOCK_RADIUS_OPTIONS } from "./background.options";
import { SPACE_OPTIONS } from "./spacing.options";
import { WIDTH_OPTIONS } from "./width.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const defaultBlockTheme = defineField({
  name: "block",
  title: "Block",
  type: "styles",
  options: {
    fields: [
      {
        name: "background",
        type: "color",
      },
      {
        name: "text",
        type: "color",
      },
      {
        name: "padding",
        title: "Inside space",
        type: "topbottom",
        options: {
          list: optionsToList(SPACE_OPTIONS),
        },
      },
      {
        name: "margin",
        title: "Outside space",
        type: "topbottom",
        options: {
          list: optionsToList(SPACE_OPTIONS),
        },
      },
      {
        name: "width",
        type: "select",
        options: {
          list: optionsToList(WIDTH_OPTIONS),
        },
      },
      {
        name: "rounded",
        type: "topbottom",
        options: {
          list: optionsToList(BLOCK_RADIUS_OPTIONS),
        },
      },

      {
        name: "align",
        type: "select",
        options: {
          list: optionsToList(HORIZONTAL_ALIGN_OPTIONS),
        },
      },
    ],
  },
});

export const defaultBlockGroups = [
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
];
