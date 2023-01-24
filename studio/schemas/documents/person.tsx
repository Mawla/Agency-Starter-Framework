import { baseLanguage } from "../../../languages";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "person",
  title: "Person",
  type: "document",
  icon: () => <DocumentIcon type="person" />,
  preview: {
    select: {
      title: `name`,
      subtitle: `position.${baseLanguage}`,
      media: "image",
    },
    prepare({ title, subtitle, media }: any) {
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
      localize: true,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Short bio.",
      localize: true,
    }),
  ],
});

export default schema;
