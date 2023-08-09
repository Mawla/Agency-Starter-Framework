import { SchemaName } from "../../../types.sanity";
import CharacterCounter from "../../components/CharacterCounter";
import { ColorInput } from "../../components/ColorInput";
import Warning from "../../components/Warning";
import { MagnifyingGlass } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.seo";

const SEO_TITLE_FIELD = defineField({
  name: "title",
  title: "Title",
  type: "string",
  description: "Around 55-60 characters long.",
  validation: (Rule: any) =>
    Rule.required().warning("It's good practice adding a title for SEO."),
  components: {
    input: CharacterCounter,
  },
  options: {
    max: "60",
  },
});

const SEO_DESCRIPTION_FIELD = defineField({
  name: "description",
  title: "Description",
  description: "Around 150-160 characters long.",
  type: "text",
  rows: 3,
  validation: (Rule: any) =>
    Rule.required().warning("It's good practice adding a description for SEO."),
  components: {
    input: CharacterCounter,
  },
  options: {
    max: "160",
  },
});

const SEO_IMAGE_FIELD = defineField({
  name: "image",
  title: "Image",
  type: "image",
  description:
    "Used as fallback image if no page seo data is found. Size: 1200x630",
  validation: (Rule: any) =>
    Rule.required().warning(
      "It's good practice adding an image for SEO and social sharing.",
    ),
});

const OPEN_GRAPH_IMAGE_CONFIG_FIELD = defineField({
  name: "opengraphimage",
  title: "Social sharing card (Open Graph image)",
  type: "object",
  fields: [
    defineField({
      name: "background",
      title: "Background image",
      type: "image",
      description:
        "Used as background on all auto generated SEO images. The website logo and page title will be placed over it. Size: 1200x630",
    }),
    defineField({
      name: "color",
      title: "Text color",
      type: "string",
      description: "Hex color code, e.g #ff0000",
      components: {
        input: ColorInput,
      },
      validation: (Rule) =>
        Rule.custom((value) => {
          if (typeof value === "undefined") return true;
          if (!value.startsWith("#")) {
            return "value must start with #";
          }
          if (value.length !== 7) {
            return "value must be 7 characters long";
          }
          return true;
        }).required(),
    }),
  ],
});

const SEO_EXCLUDE_FROM_SITEMAP_FIELD = defineField({
  name: "excludeFromSitemap",
  title: "Exclude from sitemap",
  type: "boolean",
  description: "Option to exclude from sitemap",
  initialValue: false,
});

export const SEO_FIELD = {
  name: "seo",
  title: "Seo",
  type: "object",
  fields: [
    SEO_TITLE_FIELD,
    SEO_DESCRIPTION_FIELD,
    SEO_IMAGE_FIELD,
    SEO_EXCLUDE_FROM_SITEMAP_FIELD,
  ],
};

export default defineType({
  name: SCHEMA_NAME,
  title: "SEO",
  type: "document",
  icon: () => <MagnifyingGlass weight="thin" size={20} />,
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
      components: { field: Warning },
      description:
        "Updates to configuration will trigger a new deployment on the build server and will take a few minutes to be in effect.",
    }),
    {
      ...SEO_TITLE_FIELD,
      options: { localize: true, ...SEO_TITLE_FIELD.options } as any,
    },
    {
      ...SEO_DESCRIPTION_FIELD,
      options: { localize: true, ...SEO_DESCRIPTION_FIELD.options } as any,
    },
    OPEN_GRAPH_IMAGE_CONFIG_FIELD,
    defineField({
      name: "googleSiteVerification",
      title: "Google site verification",
      type: "string",
      description: "Google site verification code.",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "object",
      validation: (Rule: any) =>
        Rule.required().warning(
          "It's good practice adding a favicon for SEO and social sharing. Use https://realfavicongenerator.net/ to generate the files.",
        ),
      fields: [
        "favicon.ico",
        "favicon-16x16.png",
        "favicon-32x32.png",
        "apple-touch-icon.png",
        "mstile-150x150.png",
      ].map((name) =>
        defineField({
          name: name.replace(/-|\./g, "_"),
          title: name,
          type: "file",
        }),
      ),
    }),
  ],
});
