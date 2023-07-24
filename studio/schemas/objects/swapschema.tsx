import SwapSchema from "../../components/SwapSchema";
import { defineField } from "sanity";

export default defineField({
  name: "swapSchema",
  title: "Swap schema",
  type: "object",
  group: "tools",
  components: {
    field: SwapSchema,
  },
  fields: [
    {
      name: "void",
      title: "Void",
      type: "string",
    },
  ],
});
