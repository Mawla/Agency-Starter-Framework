import { SchemaName } from "../../../types.sanity";
import Warning from "../../components/Warning";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";
import { defineField, defineType } from "sanity";

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
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Around 55-60 characters long.",
      validation: (Rule: any) =>
        Rule.required().warning("It's good practice adding a title for SEO."),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Around 150-160 characters long.",
      type: "text",
      rows: 3,
      validation: (Rule: any) =>
        Rule.required().warning(
          "It's good practice adding a description for SEO."
        ),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Preferred size: 1200x630",
      validation: (Rule: any) =>
        Rule.required().warning(
          "It's good practice adding an image for SEO and social sharing."
        ),
    }),
    defineField({
      name: "excludeFromSitemap",
      title: "Exclude from sitemap",
      type: "boolean",
      description: "Option to exclude from sitemap",
      initialValue: false,
    }),
  ],
};

export default defineType({
  name: SCHEMA_NAME,
  title: "SEO",
  type: "document",
  singleton: true,
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
    defineField({
      name: "warning",
      title: "Warning",
      type: "string",
      options: { localize: false } as any,
      components: { field: Warning },
      description:
        "Updates to configuration will trigger a new deployment on the build server and will take a few minutes to be in effect.",
    }),
    ...SEO_FIELD.fields.filter((x) => x.name !== "excludeFromSitemap"),
  ],
});
