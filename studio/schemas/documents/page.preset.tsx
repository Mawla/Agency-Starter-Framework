import { MODULE_SCHEMAS } from "../../../types.sanity";
import CaptureScreenshot from "../../components/CaptureScreenshot/CaptureScreenshot";
import PresetUsage from "../../components/Presets/PresetUsage";
import { MODULES_FIELD, pageBase } from "./page-fields";
import { StarBookmark } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType, StringRule, SlugRule } from "sanity";

const schema = defineType({
  name: "page.preset",
  title: "Preset",
  type: "document",
  icon: () => <StarBookmark weight="thin" size={20} />,
  preview: {
    select: {
      title: "title",
      description: "description",
      screenshot: "image",
    },
    prepare({ title = "Preset", description = "", screenshot }) {
      return {
        title: title,
        subtitle: description,
        media: screenshot,
      };
    },
  },
  groups: [...pageBase.groups],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: StringRule) => Rule.required(),
      group: ["content"],
    }),
    defineField({
      name: "slug",
      title: "Identifier",
      type: "slug",
      validation: (Rule: SlugRule) => Rule.required(),
      group: ["content"],
      options: {
        source: (doc, options) => (options.parent as any).title,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      group: ["content"],
    }),
    defineField({
      ...MODULES_FIELD,
      title: "Module",
      description: null as any,
      of: Object.keys(MODULE_SCHEMAS).map((type: any) => ({ type })),
      options: {
        filterType: /module|studio\./,
        updateField: "modules",
        placeholder: "Add a module…",
      } as any,
    } as any),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "1024x768 screenshot used for previews in the CMS.",
      group: ["content"],
    }),
    defineField({
      name: "screenshot",
      title: "Screenshot",
      type: "string",
      components: {
        field: CaptureScreenshot,
      },
      group: ["content"],
    }),
    defineField({
      name: "usage",
      title: "Used on",
      type: "string",
      components: { field: PresetUsage },
      group: ["content"],
    }),
  ],
});

export default schema;
