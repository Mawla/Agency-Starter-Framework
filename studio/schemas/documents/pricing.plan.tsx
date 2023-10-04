import { LANGUAGE_FIELD } from "./page-fields";
import { MoneyPinLocation } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "pricing.plan",
  title: "Pricing plan",
  type: "document",
  icon: () => <MoneyPinLocation weight="thin" size={20} />,
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
    {
      title: "Language",
      name: "language",
    },
  ],
  preview: {
    select: {
      title: `name`,
      subtitle: `description`,
    },
  },
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "e.g. Free, Basic, Premium, etc.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description:
        "e.g For startups and small teams to get started at no cost.",
      rows: 2,
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "object",
      fields: [
        defineField({
          name: "price",
          title: "Price",
          type: "string",
          description: "e.g. 10.00 or 'custom'",
        }),
        defineField({
          name: "unit",
          title: "Unit",
          description: "e.g. per month, per year, etc.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      description: "e.g. Try for Free, Book a Demo etc.",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "object",
      description: "Short list of of features",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          description: "e.g. Features, What's included, etc.",
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    {
      ...LANGUAGE_FIELD,
      validation: (Rule) => Rule.required().warning(),
    },
  ],
});

export default schema;
