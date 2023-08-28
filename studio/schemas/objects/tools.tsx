import BlockSlugField from "../../components/BlockSlugField";
import { defineField } from "sanity";

export const defaultBlockTools = [
  defineField({
    name: "disabled",
    title: "Disabled",
    type: "boolean",
    description:
      "Disable a block if you want to temporarily remove it from the website. Disabled blocks will still be visible in the CMS.",
    group: "tools",
  }),
  defineField({
    name: "slug",
    title: "Identifier",
    type: "slug",
    group: "tools",
    description:
      "A unique identifier for this block, used for anchor links. If left empty, the title will be used.",
    components: {
      input: BlockSlugField,
    },
    options: {
      source: (doc, options) => (options.parent as any).title,
    },
  }),
  defineField({
    name: "swapSchema",
    title: "Swap schema",
    type: "swapSchema",
    group: "tools",
  }),
  defineField({
    name: "preset",
    title: "Preset",
    type: "preset",
    group: "tools",
  }),
  defineField({
    name: "copyPaste",
    title: "Copy Paste",
    type: "copyPaste",
    group: "tools",
  }),
];
