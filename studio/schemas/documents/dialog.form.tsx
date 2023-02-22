import { Website } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType, SlugRule } from "sanity";

const schema = defineType({
  name: "dialog.form",
  title: "Form",
  type: "object",
  icon: () => <Website weight="thin" />,
  preview: {
    select: {
      title: "form.name",
    },
    prepare({ title = "" }: any) {
      return {
        title: `Form: ${title}`,
      };
    },
  },
  fields: [
    defineField({
      name: "slug",
      title: "Identifier",
      type: "slug",
      validation: (Rule: SlugRule) => Rule.required(),
      description:
        "Unique identifier used to link to this dialog from a button. Only lowercase and no special characters except -",
    }),
    defineField({
      name: "script",
      title: "Script",
      type: "reference",
      to: [{ type: "script" }],
    }),
  ],
});

export default schema;
