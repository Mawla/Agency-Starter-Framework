import { SchemaName } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { getLinkableTypes } from "../../utils/schemas/getLinkableTypes";
import React from "react";
import { StringRule } from "sanity";

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
      validation: (Rule: StringRule) => Rule.required(),
    },
    {
      name: "page",
      title: "Page",
      type: "reference",
      to: getLinkableTypes(),
      validation: (Rule: StringRule) => Rule.required(),
    },
  ],
};
