import { WorkableDepartmentType } from "../../types";
import { SanityFieldType, SanitySchemaType } from "../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "document";
  fields: ({
    name: keyof WorkableDepartmentType;
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "workable.department",
  title: "Workable department",
  type: "document",
  readOnly: true,
  icon: () => <DocumentIcon type="loop" />,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "The name of the country",
      disabled: true,
    },
    {
      name: "count",
      title: "Count",
      type: "number",
      description: "The count of public jobs in that country",
      disabled: true,
    },
    {
      name: "url",
      title: "URL",
      type: "string",
      disabled: true,
    },
  ],
};

export default schema;
