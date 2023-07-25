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
  defineField({
    name: "swapSchema",
    title: "Swap schema",
    type: "swapSchema",
    group: "tools",
  }),
];
