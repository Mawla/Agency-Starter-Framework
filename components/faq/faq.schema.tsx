import { baseLanguage } from "../../languages";
import { LANGUAGE_FIELD } from "../../studio/schemas/documents/page-fields";
import { referenceFilterCurrentLanguage } from "../../studio/utils/language/reference-filter-current-language";
import { blocksToText } from "../../studio/utils/portableText/portableTextToText";
import { FolderQuestion, ImportArrowDown } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineArrayMember, defineField, defineType } from "sanity";

const faqItemObject = defineField({
  name: "item",
  title: "Single use FAQ item",
  type: "object",
  icon: () => <FolderQuestion weight="thin" size={20} />,
  preview: {
    select: {
      title: "title",
      content: "content",
    },
    prepare({ title, content = [] }) {
      return {
        title: title,
        subtitle: blocksToText(content),
        media: FolderQuestion,
      };
    },
  },
  fields: [
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
  ],
});

export const schema = defineType({
  name: "faq.list",
  title: "FAQ list",
  type: "array",
  of: [
    defineArrayMember({
      name: "faq.reference",
      title: "Reusable FAQ item",
      type: "reference",
      to: [{ type: "faq.item" }],
      options: {
        filter: referenceFilterCurrentLanguage,
      },
    }),
    defineArrayMember(faqItemObject),
  ],
});

export default schema;

export const faqItem = defineType({
  name: "faq.item",
  title: "FAQ item",
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
  preview: faqItemObject.preview,
  fields: [
    ...faqItemObject.fields,
    {
      ...LANGUAGE_FIELD,
      validation: (Rule) => Rule.required().warning(),
    },
  ],
});
