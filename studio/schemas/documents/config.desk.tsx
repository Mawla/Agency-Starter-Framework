import { SchemaName } from "../../../types.sanity";
import { FolderLock } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.desk";

export default defineType({
  name: SCHEMA_NAME,
  title: "Desk",
  type: "document",
  icon: () => <FolderLock weight="thin" size={20} />,
  initialValue: {},
  options: {
    singleton: true,
  },
  preview: {
    prepare() {
      return {
        title: `CMS Desk configuration`,
      };
    },
  },
  fields: [
    defineField({
      name: "blacklist",
      title: "Hide page types",
      type: "array",
      description:
        "Hides page types that are not enabled in the CMS desk structure.",
      of: [
        {
          name: "Type",
          type: "string",
          options: {
            list: [
              "Content pages",
              "Landing pages",
              "Resources",
              "Blogs",
              "Events",
              "Case Studies",
              "Podcasts",
              "Guides",
              "Tools",
              "Videos",
              "Newsroom",
              "News",
              "Press Releases",
              "Media Coverage",
            ],
          },
        },
      ],
    }),
  ],
});
