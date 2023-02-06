import { CustomRichTextEditor } from "../../studio/components/CustomRichTextEditor";
import { defineField } from "sanity";

export default defineField({
  name: "portabletext.basic",
  title: "Rich Text",
  type: "array",
  components: {
    input: CustomRichTextEditor,
  },
  of: [
    {
      type: "block",
      title: "Rich text",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "link",
            options: {
              modal: { type: "dialog" },
            },
          },
        ],
      },
    },
  ],
});
