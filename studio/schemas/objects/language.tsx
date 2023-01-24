import { languages } from "../../../languages";
import { defineType } from "sanity";

export default defineType({
  name: "language",
  title: "Language",
  type: "string",
  options: {
    list: languages.map(({ title, id }) => ({ title, value: id })),
    // layout: 'radio', // not radio, because you can't unset it
    direction: "horizontal",
  },
});
