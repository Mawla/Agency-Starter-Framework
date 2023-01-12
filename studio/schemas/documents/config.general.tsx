import { SchemaName } from "../../../types.sanity";
import Warning from "../../components/Warning";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { validate } from "../../utils/validate";
import React from "react";

export const SCHEMA_NAME: SchemaName = "config.general";

export default {
  name: SCHEMA_NAME,
  title: "General",
  type: "document",
  singleton: true,
  icon: () => <DocumentIcon type="config" />,
  initialValue: {},
  preview: {
    prepare() {
      return {
        title: `General configuration`,
      };
    },
  },
  fields: [
    {
      name: "warning",
      title: "Warning",
      type: "string",
      localize: false,
      components: { field: Warning },
      message:
        "Updates to configuration will trigger a new deployment on the build server and will take a few minutes to be in effect.",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      localize: true,
      description:
        "Name of the website. Used in the page title and brand schema as brand name.",
      validation: validate({ required: true }),
    },
    {
      name: "domain",
      type: "string",
      localize: true,
      title: "Domain",
      validation: validate({ required: true }),
      description:
        "The website domain without slash and protocol, e.g google.com. Used for the canonical url.",
    },
  ],
};
