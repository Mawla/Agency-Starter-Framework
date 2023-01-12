import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import { blocksToText } from "../../utils/portableText/portableTextToText";
import { validate } from "../../utils/validate";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "object";
  fields: ({
    name: "content" | "slug" | "language";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "dialog.richtext",
  title: "Rich Text Dialog",
  type: "object",
  icon: () => <DocumentIcon type="dialog" />,
  preview: {
    select: {
      content: "content",
      language: "language",
    },
    prepare({ content = [], language }) {
      return {
        title: blocksToText(content),
        subtitle: prefixWithLanguage(language),
      };
    },
  },
  fields: [
    {
      name: "language",
      title: "Language",
      type: "language",
    },
    {
      name: "slug",
      title: "Identifier",
      type: "slug",
      validation: validate({ required: true }),
      description:
        "Unique identifier used to link to this dialog from a button. Only lowercase and no special characters except -",
    },
    {
      name: "content",
      title: "Content",
      type: "richtext.full",
    },
  ],
};

export default schema;
