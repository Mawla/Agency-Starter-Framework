import richTextBasicSchema from "../objects/richtext.basic";
import { defineType } from "sanity";

export default defineType({
  name: "richtext.simple",
  title: "Rich Text",
  type: "array",
  of: [
    {
      type: "block",
      title: "Rich text",
      styles: [],
      lists: [],
      marks: {
        decorators: [...(richTextBasicSchema.of[0] as any).marks.decorators],
        annotations: [...(richTextBasicSchema.of[0] as any).marks.annotations],
      },
    },
  ],
});
