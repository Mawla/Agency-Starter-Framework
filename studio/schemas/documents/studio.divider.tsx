import { DotArrowLeftRight } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "studio.divider",
  title: "CMS divider",
  description:
    "Helper to visually group blocks in the cms. Not shown on the website.",
  type: "object",
  icon: () => <DotArrowLeftRight weight="thin" />,
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
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
  ],
});

export default schema;
