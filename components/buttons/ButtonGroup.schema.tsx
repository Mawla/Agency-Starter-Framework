import { defineType } from "sanity";

export const schema = defineType({
  name: "buttongroup",
  title: "Button group",
  type: "array",
  of: [{ type: "button" }],
});

export default schema;
