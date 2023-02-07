import StylesPanel from "../../components/StylesPanel/StylesPanel";
import { Paintbrush } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField } from "sanity";

export const schema = defineField({
  name: "styles",
  title: "Styles",
  type: "object",
  icon: () => <Paintbrush weight="thin" />,
  components: {
    field: ({ children }) => <div>{children}</div>,
    input: StylesPanel,
  },
  options: {
    title: "Theme",
    fields: [],
  } as any,
  fields: [
    {
      name: "void",
      title: "Void",
      type: "string",
    },
  ],
});

export default schema;
