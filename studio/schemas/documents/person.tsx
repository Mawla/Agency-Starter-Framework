import { LANGUAGE_FIELD } from "./page-fields";
import { Account } from "@vectopus/atlas-icons-react";
import React from "react";
import { StringRule, defineField, defineType } from "sanity";

const schema = defineType({
  name: "person",
  title: "Person",
  type: "document",
  icon: () => <Account weight="thin" size={20} />,
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
    {
      title: "Language",
      name: "language",
    },
  ],
  preview: {
    select: {
      title: `name`,
      subtitle: `position`,
      media: "image",
    },
    prepare({ title = "", subtitle = "", media }: any) {
      return {
        title: `${title}`,
        subtitle: `${subtitle}`,
        media,
      };
    },
  },
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Photo of the person. Used in the card grids.",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name and surname.",
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      description: "Job title.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Short bio.",
    }),
    {
      ...LANGUAGE_FIELD,
      validation: (Rule) => Rule.required().warning(),
    },
  ],
});

export default schema;
