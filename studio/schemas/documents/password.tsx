import { SchemaName } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { getLinkableTypes } from "../../utils/schemas/getLinkableTypes";
import { validate } from "../../utils/validate";
import React from "react";

export const SCHEMA_NAME: SchemaName = "password";

export default {
  name: SCHEMA_NAME,
  type: "document",
  title: "Password",
  icon: () => <DocumentIcon type="password" />,
  fields: [
    {
      name: "password",
      title: "Password",
      type: "string",
      validation: validate({ required: true }),
    },
    {
      name: "page",
      title: "Page",
      type: "reference",
      to: getLinkableTypes(),
      validation: validate({ required: true }),
    },
  ],
};
