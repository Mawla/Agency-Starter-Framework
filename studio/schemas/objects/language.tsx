import { languages } from "../../../languages";

export default {
  name: "language",
  title: "Language",
  type: "string",
  options: {
    list: languages.map(({ title, id }) => ({ title, value: id })),
    // layout: 'radio', // not radio, because you can't unset it
    direction: "horizontal",
  },
};
