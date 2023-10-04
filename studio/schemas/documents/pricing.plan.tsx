import { LANGUAGE_FIELD } from "./page-fields";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { MoneyPinLocation } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "pricing.plan",
  title: "Pricing plan",
  type: "document",
  icon: () => <MoneyPinLocation weight="thin" size={20} />,
  orderings: [orderRankOrdering],
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
      title: `title`,
      subtitle: `description`,
    },
  },
  fields: [
    orderRankField({ type: "pricing.plan" }),
    defineField({
      name: "title",
      title: "Title",
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
          name: "amount",
          title: "Amount",
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
      type: "portabletext.basic",
    }),
    {
      ...LANGUAGE_FIELD,
      validation: (Rule) => Rule.required().warning(),
    },
  ],
});

export default schema;
