import { SchemaName } from "../../../types.sanity";
import Warning from "../../components/Warning";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";

export const SCHEMA_NAME: SchemaName = "config.seo";

export const SEO_FIELD = {
  name: "seo",
  title: "Seo",
  type: "object",
  localize: true,
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Around 55-60 characters long.",
      validation: (Rule) =>
        Rule.required().warning("It's good practice adding a title for SEO."),
    },
    {
      name: "description",
      title: "Description",
      description: "Around 150-160 characters long.",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.required().warning(
          "It's good practice adding a description for SEO."
        ),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      description: "Preferred size: 1200x630",
      validation: (Rule) =>
        Rule.required().warning(
          "It's good practice adding an image for SEO and social sharing."
        ),
    },
    {
      name: "excludeFromSitemap",
      title: "Exclude from sitemap",
      type: "boolean",
      description: "Option to exclude from sitemap",
      initialValue: false,
    },
  ],
};

export default {
  name: SCHEMA_NAME,
  title: "SEO",
  type: "document",
  singleton: true,
  localize: true,
  icon: () => <DocumentIcon type="search" />,
  initialValue: {},
  preview: {
    prepare() {
      return {
        title: `SEO configuration`,
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
    ...SEO_FIELD.fields.filter((x) => x.name !== "excludeFromSitemap"),
  ],
};
