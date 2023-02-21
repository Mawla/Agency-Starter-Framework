type Props = {
  schemaName: string;
  dialogName: string;
  dialogDescription: string;
};

export const getSchemaSnippet = ({
  schemaName,
  dialogName,
  dialogDescription,
}: Props) => {
  return `
  import { Website } from "@vectopus/atlas-icons-react";
  import React from "react";
  import { defineField, defineType, SlugRule } from "sanity";
  import { SLUG_FIELD } from "./page-fields";

  const schema = defineType({
    name: "${schemaName}",
    title: "${dialogName}",
    description: "${dialogDescription}",
    type: "object",
    icon: () => <Website weight="thin" />,
    preview: {
      select: {
        title: 'title',
        subtitle: 'slug.current'
      },
      prepare({ title ='', subtitle='' }: any) {
        return {
          title,
          subtitle,
          media: <Website weight="thin" />,
        };
      },
    },
    fields: [
      defineField({
        ...SLUG_FIELD,
        group: "",
        options: {
          maxLength: 96,
        } as any,
        description:
          "Unique identifier used to link to this dialog from a button. Only lowercase and no special characters except -",
      }),
      defineField({
        name: "title",
        title: "Title",
        type: "string",
      }),
    ],
  });

  export default schema;
`;
};
