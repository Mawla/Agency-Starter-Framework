import { SchemaName } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { Sitemap } from "../../views/Sitemap";
import React from "react";

export const SCHEMA_NAME: SchemaName = "sitemap";

export default {
  name: SCHEMA_NAME,
  title: "Sitemap",
  type: "document",
  singleton: true,
  icon: () => <DocumentIcon type="sitemap" />,
  initialValue: {},
  fields: [
    {
      name: "sitemap",
      title: "Sitemap",
      type: "string",
      components: {
        field: Sitemap,
      },
    },
  ],
};
