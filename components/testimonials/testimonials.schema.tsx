import { LANGUAGE_FIELD } from "../../studio/schemas/documents/page-fields";
import { referenceFilterCurrentLanguage } from "../../studio/utils/language/reference-filter-current-language";
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
      name: "name",
      jobTitle: "jobTitle",
      subtitle: "name",
      image: "image",
    },
    prepare({ jobTitle, name, image }) {
      return {
        title: name,
        subtitle: jobTitle,
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
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Describing title of the testimonial.",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "portabletext.plain",
      description: "The testimonial itself.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Image of the person giving the testimonial.",
      options: {
        hotspot: true,
      },
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
      options: {
        filter: referenceFilterCurrentLanguage,
      },
    }),
    defineArrayMember(testimonialItemObject),
  ],
});

export default schema;

export const testimonialItem = defineType({
  name: "testimonials.item",
  title: "Testimonial",
  type: "document",
  icon: () => <ImportArrowDown weight="thin" size={20} />,
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
  preview: testimonialItemObject.preview,
  fields: [
    ...testimonialItemObject.fields,
    {
      ...LANGUAGE_FIELD,
      validation: (Rule) => Rule.required().warning(),
    },
  ],
});
