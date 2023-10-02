import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { HORIZONTAL_ALIGN_OPTIONS } from "../../types";
import { BLOCK_RADIUS_OPTIONS } from "./background.options";
import { SPACE_OPTIONS } from "./spacing.options";
import { WIDTH_OPTIONS } from "./width.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { FieldGroupDefinition, defineField } from "sanity";

export const defaultBlockTheme = defineField({
  name: "block",
  title: "Block",
  type: "styles",
  options: {
    importType: "preset.theme.block",
    fields: [
      {
        name: "text",
        type: "color",
        group: "Inner block",
      },
      {
        name: "background",
        type: "color",
        group: "Inner block",
      },
      {
        name: "padding",
        title: "Padding",
        type: "topbottom",
        options: {
          list: optionsToList(SPACE_OPTIONS),
        },
        group: "Inner block",
      },
      {
        name: "width",
        type: "select",
        options: {
          list: optionsToList(WIDTH_OPTIONS),
        },
        group: "Inner block",
      },
      {
        name: "rounded",
        type: "topbottom",
        options: {
          list: optionsToList(BLOCK_RADIUS_OPTIONS),
        },
        group: "Inner block",
      },
      {
        name: "align",
        type: "select",
        options: {
          list: optionsToList(HORIZONTAL_ALIGN_OPTIONS),
        },
        group: "Inner block",
      },
      {
        name: "margin",
        title: "Margin",
        type: "topbottom",
        options: {
          list: optionsToList(SPACE_OPTIONS),
        },
        group: "Outer block",
      },
      {
        name: "outerBackground",
        title: "Background",
        type: "color",
        group: "Outer block",
      },
    ],
  },
});

export const defaultBlockGroups: FieldGroupDefinition[] = [
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
    name: "decorations",
    title: "Decorations",
  },
  {
    name: "tools",
    title: " ",
    icon: EllipsisVerticalIcon as any,
  },
];
