import { pick } from "./helpers/utils/object";

export const SCHEMAS = {
  "config.cms": "",
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
  "hero.resourcehero": "",
  "module.billboard": "",
  "module.breadcrumb": "",
  "module.cardgrid": "",
  "module.faq": "",
  "module.gallery": "",
  "module.resourcefeed": "",
  "module.resourcestrip": "",
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
  "page.tag": "",
  "page.tool": "",
  "page.tools": "",
  "page.video": "",
  "page.videos": "",
  "module.video": "",
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

export const MODULE_SCHEMAS = pick(
  SCHEMAS,
  "module.billboard",
  "module.breadcrumb",
  "module.cardgrid",
  "module.faq",
  "module.gallery",
  "module.resourcefeed",
  "module.resourcestrip",
  "module.richtext",
  "module.slides",
  "module.story",
  "module.textimage",
  "module.video",
);

export type ModuleSchemaName = keyof typeof MODULE_SCHEMAS;

export const HERO_SCHEMAS = pick(SCHEMAS, "hero.basic", "hero.resourcehero");

export type HeroSchemaName = keyof typeof HERO_SCHEMAS;

export const DIALOG_SCHEMAS = pick(SCHEMAS, "dialog.richtext", "dialog.video");

export type DialogSchemaName = keyof typeof DIALOG_SCHEMAS;

export const FORM_SCHEMAS = pick(SCHEMAS, "form.static");

export type FormSchemaName = keyof typeof FORM_SCHEMAS;
