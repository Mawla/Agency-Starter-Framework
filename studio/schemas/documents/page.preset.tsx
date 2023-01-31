import { HERO_SCHEMAS, MODULE_SCHEMAS } from "../../../types.sanity";
import CaptureScreenshot from "../../components/CaptureScreenshot/CaptureScreenshot";
import PresetUsage from "../../components/Presets/PresetUsage";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { MODULES_FIELD, MODULE_SELECT_FIELD } from "./_page";
import React from "react";
import { defineField, defineType, StringRule, SlugRule } from "sanity";

const schema = defineType({
  name: "page.preset",
  title: "Preset",
  type: "document",
  icon: () => <DocumentIcon type="module" />,
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
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identifier",
      type: "slug",
      validation: (Rule: SlugRule) => Rule.required(),
      options: {
        source: (doc, options) => (options.parent as any).title,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      ...MODULES_FIELD,
      title: "Module",
      description: null as any,
      validation: (Rule: StringRule) => Rule.required(),
      of: Object.keys({ ...MODULE_SCHEMAS, ...HERO_SCHEMAS }).map(
        (type: any) => ({ type }),
      ),
    } as any),
    defineField({
      ...MODULE_SELECT_FIELD,
      options: {
        filterType: /module|hero|studio\./,
        updateField: "modules",
        placeholder: "Add a module…",
      } as any,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "1024x768 screenshot used for previews in the CMS.",
    }),
    defineField({
      name: "screenshot",
      title: "Screenshot",
      type: "string",
      components: {
        field: CaptureScreenshot,
      },
    }),
    defineField({
      name: "usage",
      title: "Used on",
      type: "string",
      components: { field: PresetUsage },
    }),
  ],
});

export default schema;
