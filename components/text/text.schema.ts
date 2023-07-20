import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { TEXT_COLOR_OPTIONS, TEXT_SIZE_OPTIONS } from "./text.options";
import { defineField } from "sanity";

export const defaultTextTheme = defineField({
  name: "intro",
  title: "Intro",
  type: "styles",
  options: {
    fields: [
      {
        name: "color",
        type: "color",
        options: {
          colors: TEXT_SIZE_OPTIONS,
        },
      },
      {
        name: "size",
        type: "select",
        options: {
          list: optionsToList(TEXT_COLOR_OPTIONS),
        },
      },
    ],
  },
});
