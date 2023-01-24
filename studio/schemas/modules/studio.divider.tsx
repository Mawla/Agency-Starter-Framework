import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "object";
  fields: ({
    name: "description" | "language";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "studio.divider",
  title: "CMS divider",
  description:
    "Helper to visually group modules in the cms. Not shown on the website.",
  type: "object",
  icon: () => <DocumentIcon type="divider" />,
  preview: {
    select: {
      description: "description",
      language: "language",
    },
    prepare({ description = "", language }: any) {
      return {
        title: `〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰`,
        subtitle: description,
        media: () => (
          <span
            style={{
              textTransform: "uppercase",
              fontSize: ".7em",
            }}
          >
            {language}
          </span>
        ),
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
      name: "description",
      title: "Description",
      type: "string",
    },
  ],
};

export default schema;
