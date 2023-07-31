import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { COLORS } from "../../theme";
import { HORIZONTAL_ALIGN_OPTIONS } from "../../types";
import { SPACE_OPTIONS } from "./spacing.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const defaultBlockTheme = defineField({
  name: "block",
  title: "Block",
  type: "styles",
  options: {
    fields: [
      {
        name: "space",
        title: "Space",
        type: "space",
        options: {
          list: optionsToList(SPACE_OPTIONS),
        },
      },
      {
        name: "background",
        type: "color",
        options: {
          colors: COLORS,
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
