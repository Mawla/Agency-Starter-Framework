import richTextBasicSchema from "./portabletextbasic.schema";
import { defineType } from "sanity";

export default defineType({
  name: "portabletext.plain",
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
      },
    },
  ],
});
