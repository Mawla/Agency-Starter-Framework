import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { BACKGROUND_COLOR_OPTIONS } from "./background.options";
import { ALIGN_OPTIONS } from "./block.options";
import { SPACE_OPTIONS } from "./spacing.options";
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
          colors: BACKGROUND_COLOR_OPTIONS,
        },
      },
      {
        name: "align",
        type: "select",
        options: {
          list: optionsToList(ALIGN_OPTIONS),
        },
      },
    ],
  },
});
