import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { HTML_TEXT_NODES } from "../../types";
import {
  TITLE_COLOR_OPTIONS,
  TITLE_FONT_OPTIONS,
  TITLE_SIZE_OPTIONS,
  TITLE_WEIGHT_OPTIONS,
} from "./title.options";
import { defineField } from "sanity";

export const defaultTitleTheme = defineField({
  name: "title",
  type: "styles",
  options: {
    importType: "preset.theme.title",
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
        name: "as",
        type: "select",
        options: {
          list: optionsToList(HTML_TEXT_NODES),
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
