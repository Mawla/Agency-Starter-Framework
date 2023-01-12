import { SchemaName } from "../../../types.sanity";
import Warning from "../../components/Warning";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";

export const SCHEMA_NAME: SchemaName = "config.social";

export default {
  name: SCHEMA_NAME,
  title: "Social media",
  type: "document",
  singleton: true,
  icon: () => <DocumentIcon type="social" />,
  initialValue: {},
  preview: {
    prepare() {
      return {
        title: `Social configuration`,
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
      name: "twitter",
      title: "Twitter",
      type: "object",

      fields: [
        {
          name: "handle",
          title: "Handle",
          type: "string",
        },
        {
          name: "url",
          title: "URL",
          type: "url",
        },
      ],
    },
    {
      name: "socials",
      title: "Social links",
      type: "array",

      of: [{ type: "string" }],
    },
  ],
};
