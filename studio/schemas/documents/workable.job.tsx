import { WorkableJobType } from "../../types";
import { SanityFieldType, SanitySchemaType } from "../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "document";
  fields: ({
    name: keyof WorkableJobType | "slug";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "workable.job",
  title: "Workable job",
  type: "document",
  readOnly: true,
  icon: () => <DocumentIcon type="loop" />,
  fields: [
    { name: "id", type: "string" },
    { name: "title", type: "string" },
    { name: "full_title", type: "string" },
    { name: "slug", type: "slug" },
    { name: "shortcode", type: "string" },
    { name: "code", type: "string" },
    {
      name: "state",
      type: "string",
      options: {
        list: ["draft", "published", "closed", "archived"],
      },
    },
    { name: "department", type: "string" },
    { name: "url", type: "string" },
    { name: "application_url", type: "string" },
    { name: "shortlink", type: "string" },
    { name: "created_at", type: "string" },
    { name: "full_description", type: "text" },
    { name: "description", type: "text" },
    { name: "requirements", type: "text" },
    { name: "benefits", type: "text" },
    { name: "employment_type", type: "string" },
    { name: "industry", type: "string" },
    { name: "function", type: "string" },
    { name: "experience", type: "string" },
    { name: "education", type: "string" },
    { name: "keywords", type: "array", of: [{ type: "string" }] },
    {
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        { name: "country", type: "string" },
        { name: "country_code", type: "string" },
        { name: "region", type: "string" },
        { name: "region_code", type: "string" },
        { name: "city", type: "string" },
        { name: "zip_code", type: "string" },
        { name: "telecommuting", type: "boolean" },
      ],
    },
  ],
};

export default schema;
