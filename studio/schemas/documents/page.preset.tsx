import {
  HeroSchemaName,
  HERO_SCHEMAS,
  ModuleSchemaName,
  MODULE_SCHEMAS,
  SanityFieldType,
  SanitySchemaType,
} from "../../../types.sanity";
import CaptureScreenshot from "../../components/CaptureScreenshot/CaptureScreenshot";
import PresetUsage from "../../components/Presets/PresetUsage";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { validate } from "../../utils/validate";
import { MODULES_FIELD, MODULE_SELECT_FIELD } from "./_page";
import React from "react";
import { defineField, getSchemaTypeTitle, defineType } from "sanity";

// const schemas = require('part:@sanity/base/schema')

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
      validation: validate({ required: true }),
    }),
    {
      name: "slug",
      title: "Identifier",
      type: "slug",
      validation: validate({ required: true }),
      options: {
        source: (doc, options) => options.parent.title,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    },
    {
      ...MODULES_FIELD,
      title: "Module",
      description: null,
      validation: validate({ length: 1, required: true }),
      of: Object.keys({ ...MODULE_SCHEMAS, ...HERO_SCHEMAS }).map(
        (type: ModuleSchemaName | HeroSchemaName) => ({ type })
      ),
    },
    {
      ...MODULE_SELECT_FIELD,
      options: {
        filterType: /module|hero|studio\./,
        updateField: "modules",
        placeholder: "Add a module…",
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      description: "1024x768 screenshot used for previews in the CMS.",
    },
    {
      name: "screenshot",
      title: "Screenshot",
      type: "string",
      components: {
        field: CaptureScreenshot,
      },
    },
    {
      name: "usage",
      title: "Used on",
      type: "string",
      components: { field: PresetUsage },
    },
  ],
});

export default schema;
