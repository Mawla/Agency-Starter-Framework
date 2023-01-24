import { baseLanguage } from "../../../languages";
import { PersonType } from "../../../types";
import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "document";
  fields: ({
    name: keyof PersonType;
  } & SanityFieldType)[];
};

const schema: SchemaType = {
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
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Photo of the person. Used in the card grids.",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Name and surname.",
    },
    {
      name: "position",
      title: "Position",
      type: "string",
      description: "Job title.",
      localize: true,
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Short bio.",
      localize: true,
    },
  ],
};

export default schema;
