import { defineField } from "sanity";

export const defaultBlockTools = [
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
