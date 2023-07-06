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
      image: "image",
    },
    prepare({ title, content = [], image }) {
      return {
        title,
        subtitle: blocksToText(content),
        media: image || MessagingLines,
      };
    },
  },
  fields: [
    defineField({
      name: "name",
      title: "Person name",
      type: "string",
    }),
    defineField({
      name: "jobTitle",
      title: "Person job title",
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
      type: "image",
    }),
  ],
});

export const schema = defineType({
  name: "testimonials.list",
  title: "Testimonial list",
  type: "array",
  of: [
    defineArrayMember({
      name: "testimonial.reference",
      title: "Reusable testimonial",
      type: "reference",
      to: [{ type: "testimonials.item" }],
    }),
    defineArrayMember(testimonialItemObject),
  ],
});

export default schema;

export const testimonialItem = defineType({
  ...testimonialItemObject,
  name: "testimonials.item",
  title: "Testimonial",
  type: "document",
  icon: () => <ImportArrowDown weight="thin" size={20} />,
});
