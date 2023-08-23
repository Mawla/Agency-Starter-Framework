import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { TEXT_SIZE_OPTIONS, TEXT_WEIGHT_OPTIONS } from "./text.options";
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
      },
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
    ],
  },
});
