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
  description:
    "Global seo title. Will be added after page specific titles. E.g. <page title> - <global title>. Around 55-60 characters long.",
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
  description:
    "Fallback seo description. Will be used when no page description is set. Around 150-160 characters long.",
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
    defineField({
      type: "file",
      title: "Title font",
      name: "titleFont",
      options: {
        accept: "font/ttf",
      },
      description:
        "Font used for the title in the open graph image. Default is Inter Bold. File must be .ttf under 200kb.",
    }),
    defineField({
      type: "file",
      title: "Meta data font",
      name: "metaFont",
      options: {
        accept: "font/ttf",
      },
      description:
        "Font used for the data and authors in the open graph image. Default is Inter Medium. File must be .ttf under 200kb.",
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
  options: {
    singleton: true,
  },
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
    defineField(
      {
        name: "warningIndexing",
        title: "Warning",
        type: "string",
        components: { field: Warning },
        options: {
          tone: "critical",
        },
        hidden: ({ parent, value }) => !Boolean(parent.preventIndexing),
        description:
          "The site is not being indexed by search engines. Turn the below setting off to enable indexing.",
      },
      { strict: false },
    ),
    defineField({
      name: "preventIndexing",
      title: "Prevent Indexing",
      type: "boolean",
      description:
        "Prevent search engines from indexing the site. This is useful when you are developing the site and don't want it to be indexed by search engines yet. Be careful not to forget to turn this off when you are ready to go live.",
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
      name: "favicon",
      title: "Favicon",
      type: "object",
      description:
        "Use https://realfavicongenerator.net/ to generate the files.",
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
