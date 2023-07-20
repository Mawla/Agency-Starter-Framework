import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { HEADING_LEVELS } from "../../types";
import {
  TITLE_COLOR_OPTIONS,
  TITLE_FONT_OPTIONS,
  TITLE_SIZE_OPTIONS,
  TITLE_WEIGHT_OPTIONS,
} from "./title.options";
import { defineField } from "sanity";

export const defaultTitleTheme = defineField({
  name: "title",
  title: "Title",
  type: "styles",
  options: {
    fields: [
      {
        name: "size",
        type: "select",
        options: {
          list: optionsToList(TITLE_SIZE_OPTIONS),
        },
      },
      {
        name: "weight",
        type: "select",
        options: {
          list: optionsToList(TITLE_WEIGHT_OPTIONS),
        },
      },
      {
        name: "font",
        type: "select",
        options: {
          list: optionsToList(TITLE_FONT_OPTIONS),
        },
      },
      {
        name: "level",
        type: "select",
        options: {
          list: optionsToList(HEADING_LEVELS),
        },
      },
      {
        name: "color",
        type: "color",
        options: {
          colors: TITLE_COLOR_OPTIONS,
        },
      },
    ],
  },
});
