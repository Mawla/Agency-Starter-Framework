import { baseLanguage } from "../../languages";
import { MessagingLines, ImportArrowDown } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const testimonialItemObject = defineField({
  name: "item",
  title: "Single use testimonial item",
  type: "object",
  icon: () => <MessagingLines weight="thin" size={20} />,
  preview: {
    select: {
      title: "title",
      titleEn: `title.${baseLanguage}`,
      name: "name",
      subtitle: "name",
      image: "image",
    },
    prepare({ title, titleEn, name, image }) {
      return {
        title: titleEn || title,
        subtitle: name,
        media: image || MessagingLines,
      };
    },
  },
  fields: [
    defineField({
      name: "name",
      title: "Person name",
      type: "string",
      description: "Name of the person giving the testimonial.",
    }),
    defineField({
      name: "jobTitle",
      title: "Person job title",
      type: "string",
      description: "What does this person do?",
      options: { localize: true } as any,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Describing title of the testimonial.",
      options: { localize: true } as any,
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "portabletext.plain",
      description: "The testimonial itself.",
      options: { localize: true } as any,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Image of the person giving the testimonial.",
    }),
  ],
});

export const schema = defineType({
  name: "testimonials.list",
  title: "Testimonial list",
  type: "array",
  of: [
    defineArrayMember({
      name: "testimonials.reference",
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
