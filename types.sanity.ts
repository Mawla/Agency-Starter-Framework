import { pick } from "./helpers/utils/object";

export const SCHEMAS = {
  "config.general": "",
  "config.integrations": "",
  "config.translations": "",
  "config.seo": "",
  "config.social": "",
  "dialog.form": "",
  "dialog.richtext": "",
  "dialog.video": "",
  "form.static": "",
  "hero.basic": "",
  "module.billboard": "",
  "module.breadcrumb": "",
  "module.cardgrid": "",
  "module.gallery": "",
  "module.richtext": "",
  "module.slides": "",
  "module.story": "",
  "module.textimage": "",
  "page.content": "",
  "page.home": "",
  "page.notfound": "",
  "page.sitemap": "",
  "page.preset": "",
  footer: "",
  navigation: "",
  password: "",
  person: "",
  redirect: "",
  sitemap: "",
};

export type SchemaName = keyof typeof SCHEMAS;

export const LINKABLE_SCHEMAS = pick(SCHEMAS, "page.content", "page.home");

export type LinkableSchemaName = keyof typeof LINKABLE_SCHEMAS;

export const TRANSLATABLE_SCHEMAS = pick(
  SCHEMAS,
  "config.general",
  "config.translations",
  "config.seo",
  "footer",
  "navigation",
  "page.content",
  "page.home",
  "page.notfound",
  "page.sitemap",
  "person",
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
);

export type ModuleSchemaName = keyof typeof MODULE_SCHEMAS;

export const HERO_SCHEMAS = pick(SCHEMAS, "hero.basic");

export type HeroSchemaName = keyof typeof HERO_SCHEMAS;

export const DIALOG_SCHEMAS = pick(SCHEMAS, "dialog.richtext", "dialog.video");

export type DialogSchemaName = keyof typeof DIALOG_SCHEMAS;

export const FORM_SCHEMAS = pick(SCHEMAS, "form.static");

export type FormSchemaName = keyof typeof FORM_SCHEMAS;
