import StylesPanel from "../../components/StylesPanel/StylesPanel";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";
import { defineField } from "sanity";

export const schema = defineField({
  name: "styles",
  title: "Styles",
  type: "object",
  icon: () => <DocumentIcon type="paint" />,
  components: {
    field: ({ children }: { children?: React.ReactElement }) => (
      <div>{children}</div>
    ),
    input: StylesPanel,
  },
  options: {
    title: "Theme",
    fields: [],
  },
  fields: [
    {
      name: "void",
      title: "Void",
      type: "string",
    },
  ],
});

export default schema;
