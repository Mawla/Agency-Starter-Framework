import { baseLanguage } from "../../languages";
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
      titleEn: `title.${baseLanguage}`,
      content: "content",
      contentEn: `content.${baseLanguage}`,
    },
    prepare({ title, titleEn, contentEn, content = [] }) {
      return {
        title: titleEn || title,
        subtitle: blocksToText(contentEn || content),
        media: FolderQuestion,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      options: { localize: true } as any,
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "portabletext.simple",
      options: { localize: true } as any,
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
    }),
    defineArrayMember(faqItemObject),
  ],
});

export default schema;

export const faqItem = defineType({
  ...faqItemObject,
  name: "faq.item",
  title: "FAQ item",
  type: "document",
  icon: () => <ImportArrowDown weight="thin" size={20} />,
});
