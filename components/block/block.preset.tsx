import CaptureScreenshot from "../../studio/components/CaptureScreenshot/CaptureScreenshot";
import PresetUsage from "../../studio/components/Presets/PresetUsage";
import DocumentPreview from "../../studio/components/Preview/DocumentPreview";
import Warning from "../../studio/components/Warning";
import { BLOCKS_FIELD } from "../../studio/schemas/documents/page-fields";
import { BLOCK_SCHEMAS } from "../../types.sanity";
import { HomeLayout } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType, StringRule, SlugRule } from "sanity";

const schema = defineType({
  name: "preset.blocks",
  title: "Blocks",
  type: "document",
  liveEdit: true,
  icon: () => <HomeLayout weight="thin" size={20} />,
  preview: {
    select: {
      title: "title",
      description: "description",
      screenshot: "image",
    },
    prepare({ title = "Blocks preset", description = "", screenshot }) {
      return {
        title: title,
        subtitle: description,
        media: screenshot,
      };
    },
  },
  fields: [
    defineField({
      name: "preview_sync",
      title: "Preview",
      type: "string",
      components: {
        field: DocumentPreview,
      },
    }),
    defineField({
      name: "warning",
      title: "Warning",
      type: "string",
      options: { localize: false } as any,
      components: { field: Warning },
      description:
        "Block presets do not synchronize with instances. Updating a block preset will not automatically update to blocks already used on the website.",
    }),
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
      ...BLOCKS_FIELD,
      components: null,
      group: null as any,
      title: "Block",
      description: null as any,
      of: Object.keys(BLOCK_SCHEMAS).map((type: any) => ({
        type,
        // components: {
        //   preview: PageBuilderItemPreview as any,
        //   item: PageBuilderItem as any,
        // },
      })),
      // options: {
      //   filterType: /block|studio\./,
      //   updateField: "blocks",
      //   placeholder: "Add a block",
      // } as any,
    } as any),
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
