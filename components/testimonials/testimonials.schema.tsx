import { blocksToText } from "../../studio/utils/portableText/portableTextToText";
import { MessagingLines, ImportArrowDown } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineArrayMember, defineField, defineType } from "sanity";

const testimonialItemObject = defineField({
  name: "item",
  title: "Single use testimonial item",
  type: "object",
  icon: () => <MessagingLines weight="thin" size={20} />,
  preview: {
    select: {
      title: "title",
      subtitle: "name",
      content: "content",
    },
    prepare({ title, content = [] }) {
      return {
        title,
        subtitle: blocksToText(content),
        media: MessagingLines,
      };
    },
  },
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "jobTitle",
      title: "Job title",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "portabletext.simple",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "string",
    }),
  ],
});

export const schema = defineType({
  name: "testimonial.list",
  title: "testimonial list",
  type: "array",
  of: [
    defineArrayMember({
      name: "testimonial.reference",
      title: "Reusable testimonial",
      type: "reference",
      to: [{ type: "testimonial.item" }],
    }),
    defineArrayMember(testimonialItemObject),
  ],
});

export default schema;

export const testimonialItem = defineType({
  ...testimonialItemObject,
  name: "testimonial.item",
  title: "Testimonial",
  type: "document",
  icon: () => <ImportArrowDown weight="thin" size={20} />,
});
