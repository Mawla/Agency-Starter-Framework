import { SCRIPT_REFERENCE_FIELD } from "../script/script.schema";
import richTextBasicSchema from "./portabletextbasic.schema";
import { defineType } from "sanity";

export default defineType({
  name: "portabletext.simple",
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
    SCRIPT_REFERENCE_FIELD,
  ],
});
