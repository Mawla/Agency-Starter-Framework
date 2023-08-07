import { BLOCK_SCHEMAS } from "../../../types.sanity";
import CaptureScreenshot from "../../components/CaptureScreenshot/CaptureScreenshot";
import PresetUsage from "../../components/Presets/PresetUsage";
import { BLOCKS_FIELD, pageBase } from "./page-fields";
import { StarBookmark } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType, StringRule, SlugRule } from "sanity";

const schema = defineType({
  name: "preset.decoration",
  title: "Decoration preset",
  type: "document",
  icon: () => <StarBookmark weight="thin" size={20} />,
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare({ title = "Decoration preset", description = "" }) {
      return {
        title: title,
        subtitle: description,
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
  ],
});

export default schema;
