import { pick } from "./helpers/utils/object";

export const SCHEMAS = {
  "block.block4": "",
  "config.cms": "",
  "config.general": "",
  "config.integrations": "",
  "config.seo": "",
  "config.social": "",
  "config.translations": "",
  "dialog.form": "",
  "dialog.richtext": "",
  "dialog.video": "",
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
  "page.preset": "",
  "page.sitemap": "",
  "page.tag": "",
  "page.tool": "",
  "page.tools": "",
  "page.video": "",
  "page.videos": "",
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
  "footer",
  "navigation",
  "person",
);

export type TranslatableSchemaName = keyof typeof TRANSLATABLE_SCHEMAS;

export const TAGGABLE_SCHEMAS = pick(
  LINKABLE_SCHEMAS,
  "page.blog",
  "page.event",
  "page.casestudy",
  "page.podcast",
  "page.tool",
  "page.video",
  "page.guide",
);
export type TaggableResourceType = keyof typeof TAGGABLE_SCHEMAS;

export const BLOCK_SCHEMAS = pick(SCHEMAS, "block.block4");

export type BlockSchemaName = keyof typeof BLOCK_SCHEMAS;

export const DIALOG_SCHEMAS = pick(SCHEMAS, "dialog.richtext", "dialog.video");

export type DialogSchemaName = keyof typeof DIALOG_SCHEMAS;
