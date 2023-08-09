import { pick } from "./helpers/utils/object";

export const SCHEMAS = {
  "block.block0": "",
  "block.block1": "",
  "block.block10": "",
  "block.block11": "",
  "block.block12": "",
  "block.block13": "",
  "block.block14": "",
  "block.block15": "",
  "block.block2": "",
  "block.block3": "",
  "block.block4": "",
  "block.block6": "",
  "block.block8": "",
  "block.block9": "",
  "config.cms": "",
  "config.general": "",
  "config.icons": "",
  "config.integrations": "",
  "config.seo": "",
  "config.social": "",
  "config.theme": "",
  "config.translations": "",
  "dialog.form": "",
  "dialog.richtext": "",
  "dialog.video": "",
  "faq.item": "",
  "page.blog": "",
  "page.blogs": "",
  "page.casestudies": "",
  "page.casestudy": "",
  "page.content": "",
  "page.event": "",
  "page.events": "",
  "page.guide": "",
  "page.guides": "",
  "page.home": "",
  "page.landing": "",
  "page.notfound": "",
  "page.podcast": "",
  "page.podcasts": "",
  "preset.blocks": "",
  "page.sitemap": "",
  "page.tag": "",
  "page.tool": "",
  "page.tools": "",
  "page.video": "",
  "page.videos": "",
  "testimonials.item": "",
  footer: "",
  navigation: "",
  password: "",
  person: "",
  redirect: "",
  script: "",
};

export type SchemaName = keyof typeof SCHEMAS;

export const LINKABLE_SCHEMAS = pick(
  SCHEMAS,
  "page.blog",
  "page.blogs",
  "page.casestudies",
  "page.casestudy",
  "page.content",
  "page.event",
  "page.events",
  "page.guide",
  "page.guides",
  "page.home",
  "page.landing",
  "page.podcast",
  "page.podcasts",
  "page.sitemap",
  "page.tool",
  "page.tools",
  "page.video",
  "page.videos",
  "page.tag",
);

export type LinkableSchemaName = keyof typeof LINKABLE_SCHEMAS;

// pages we want to link to in the CMS, but are Next.js static routes
export const STATIC_LINKABLE_SCHEMAS: SchemaName[] = ["page.sitemap"];

export const TRANSLATABLE_SCHEMAS = pick(
  SCHEMAS,
  "config.general",
  "config.seo",
  "config.translations",
  "faq.item",
  "person",
  "testimonials.item",
);

export type TranslatableSchemaName = keyof typeof TRANSLATABLE_SCHEMAS;

export const RESOURCE_SCHEMAS = pick(
  LINKABLE_SCHEMAS,
  "page.blog",
  "page.event",
  "page.casestudy",
  "page.podcast",
  "page.tool",
  "page.video",
  "page.guide",
);
export type ResourceType = keyof typeof RESOURCE_SCHEMAS;
export const RESOURCE_SCHEMAS_LIST = Object.keys(
  RESOURCE_SCHEMAS,
) as ResourceType[];

export const BLOCK_SCHEMAS = pick(
  SCHEMAS,
  "block.block0",
  "block.block1",
  "block.block10",
  "block.block11",
  "block.block12",
  "block.block13",
  "block.block14",
  "block.block15",
  "block.block2",
  "block.block3",
  "block.block4",
  "block.block6",
  "block.block8",
  "block.block9",
);

export type BlockSchemaName = keyof typeof BLOCK_SCHEMAS;

export const DIALOG_SCHEMAS = pick(SCHEMAS, "dialog.richtext", "dialog.video");

export type DialogSchemaName = keyof typeof DIALOG_SCHEMAS;

declare module "sanity" {
  // redeclare StringOptions; it will be merged with StringOptions in the sanity module
  export interface StringOptions {
    localize?: boolean;
    max?: string | number;
  }

  export interface SlugOptions {
    localize?: boolean;
  }
  export interface ObjectOptions {
    localize?: boolean;
  }
}
