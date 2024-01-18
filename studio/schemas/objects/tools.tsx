import { BlockJSONEditor } from "../../components/BlockJSONEditor";
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
  defineField(
    {
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
        disableArrayWarning: true,
        source: (doc, options) => (options.parent as any).title,
      },
    },
    { strict: false },
  ),
  defineField({
    name: "cmsTitle",
    title: "CMS Title",
    type: "string",
    description:
      "A title for this block, used in the CMS. Useful for blocks that don't have a title field.",
    group: "tools",
  }),
  defineField({
    name: "copyPaste",
    title: "Copy Paste",
    type: "copyPaste",
    group: "tools",
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
    name: "excludeFromSearchIndex",
    title: "Exclude from search index",
    description:
      "Exclude this block from the site search index. The code block, resources feed and related articles are always excluded. Warning: this isn't for search engines like Google.",
    type: "boolean",
    group: "tools",
  }),
  defineField({
    name: "codeMode",
    title: "Change code",
    description:
      "Change the code of this block. Warning: this will overwrite the current code.",
    type: "text",
    components: {
      input: BlockJSONEditor,
    },
    group: "tools",
  }),
];
