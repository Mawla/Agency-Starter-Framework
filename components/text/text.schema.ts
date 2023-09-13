import { optionsToList } from "../../studio/utils/fields/optionsToList";
import {
  TEXT_FONT_OPTIONS,
  TEXT_SIZE_OPTIONS,
  TEXT_WEIGHT_OPTIONS,
} from "./text.options";
import { defineField } from "sanity";

export const defaultTextTheme = defineField({
  name: "intro",
  type: "styles",
  options: {
    importType: "preset.theme.text",
    fields: [
      {
        name: "size",
        type: "select",
        options: {
          list: optionsToList(TEXT_SIZE_OPTIONS),
        },
      },
      {
        name: "weight",
        type: "select",
        options: {
          list: optionsToList(TEXT_WEIGHT_OPTIONS),
        },
      },
      {
        name: "font",
        type: "select",
        options: {
          list: optionsToList(TEXT_FONT_OPTIONS),
        },
      },
      {
        name: "color",
        type: "color",
      },
    ],
  },
});
