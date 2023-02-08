import { pick } from "./helpers/utils/object";

export const SCHEMAS = {
  "config.general": "",
  "config.integrations": "",
  "config.seo": "",
  "config.social": "",
  "config.translations": "",
  "dialog.form": "",
  "dialog.richtext": "",
  "dialog.video": "",
  "form.static": "",
  "hero.basic": "",
  "module.billboard": "",
  "module.breadcrumb": "",
  "module.cardgrid": "",
  "module.feed": "",
  "module.gallery": "",
  "module.richtext": "",
  "module.slides": "",
  "module.story": "",
  "module.textimage": "",
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
  "page.tool": "",
  "page.tools": "",
  "page.video": "",
  "page.videos": "",
  "page.tag": "",
  footer: "",
  navigation: "",
  password: "",
  person: "",
  redirect: "",
  sitemap: "",
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
  "page.tool",
  "page.tools",
  "page.video",
  "page.videos",
  "page.tag",
);

export type LinkableSchemaName = keyof typeof LINKABLE_SCHEMAS;

export const TRANSLATABLE_SCHEMAS = pick(
  SCHEMAS,
  "config.general",
  "config.seo",
  "config.translations",
  "footer",
  "navigation",
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
  "page.notfound",
  "page.podcast",
  "page.podcasts",
  "page.sitemap",
  "page.tool",
  "page.tools",
  "page.video",
  "page.videos",
  "person",
  "page.tag",
);

export type TranslatableSchemaName = keyof typeof TRANSLATABLE_SCHEMAS;

export const MODULE_SCHEMAS = pick(
  SCHEMAS,
  "module.billboard",
  "module.breadcrumb",
  "module.cardgrid",
  "module.gallery",
  "module.richtext",
  "module.slides",
  "module.story",
  "module.textimage",
  "module.feed",
);

export type ModuleSchemaName = keyof typeof MODULE_SCHEMAS;

export const HERO_SCHEMAS = pick(SCHEMAS, "hero.basic");

export type HeroSchemaName = keyof typeof HERO_SCHEMAS;

export const DIALOG_SCHEMAS = pick(SCHEMAS, "dialog.richtext", "dialog.video");

export type DialogSchemaName = keyof typeof DIALOG_SCHEMAS;

export const FORM_SCHEMAS = pick(SCHEMAS, "form.static");

export type FormSchemaName = keyof typeof FORM_SCHEMAS;
