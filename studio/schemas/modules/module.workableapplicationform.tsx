import { WorkableApplicationFormProps } from "../../../modules/WorkableApplicationForm/WorkableApplicationForm";
import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "object";
  fields: ({
    name:
      | keyof WorkableApplicationFormProps
      | "form"
      | "language"
      | "preset"
      | "copyPaste";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "module.workableapplicationform",
  title: "Workable Application Form",
  type: "object",
  hidden: (pageType) => !["page.job"].includes(pageType),
  icon: () => <DocumentIcon type="page" />,
  description: "Display a workable job form",
  preview: {
    select: {
      language: "language",
    },
    prepare({ title = "Workable Application Form", language }) {
      return {
        title: title,
        subtitle: prefixWithLanguage(language),
      };
    },
  },
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "theme",
      title: "Theme",
    },
    {
      name: "language",
      title: "Language",
    },
    {
      name: "tools",
      title: " ",
      icon: EllipsisVerticalIcon,
    },
  ],
  fields: [
    {
      name: "language",
      title: "Language",
      type: "language",
      group: "language",
    },
    {
      name: "preset",
      title: "Preset",
      type: "preset",
      group: "tools",
    },
    {
      name: "copyPaste",
      title: "Copy Paste",
      type: "copyPaste",
      group: "tools",
    },
    {
      name: "form",
      title: "Form",
      type: "reference",
      group: "content",
      to: [{ type: "form.static" }],
    },
    {
      name: "shortcode",
      title: "Shortcode",
      description: "Workable job shortcode",
      type: "string",
      group: "content",
    },
  ],
};

export default schema;
