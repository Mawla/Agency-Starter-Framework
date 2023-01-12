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
  "page.preset": "",
  "page.pressrelease": "",
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
  "page.content",
  "page.home",
  "page.pressrelease"
);

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
  "page.pressrelease",
  "person"
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
  "module.textimage"
);

export type ModuleSchemaName = keyof typeof MODULE_SCHEMAS;

export const HERO_SCHEMAS = pick(SCHEMAS, "hero.basic");

export type HeroSchemaName = keyof typeof HERO_SCHEMAS;

export const DIALOG_SCHEMAS = pick(SCHEMAS, "dialog.richtext", "dialog.video");

export type DialogSchemaName = keyof typeof DIALOG_SCHEMAS;

export const FORM_SCHEMAS = pick(SCHEMAS, "form.static");

export type FormSchemaName = keyof typeof FORM_SCHEMAS;

/**
 * Sanity types
 */

export type SanityFieldType = {
  name: string;
  title?: string;
  type: string;
  validation?: (Rule: any) => any[];
  inputComponent?: React.ReactElement | React.ForwardRefExoticComponent<any>;
  icon?: React.ReactElement | React.ForwardRefExoticComponent<any>;
  fieldset?: string;
  group?: string | string[];
  description?: string;
  initialValue?: unknown;
  layout?: string;
  rows?: number;
  hidden?: boolean | ((props: any) => boolean);
  options?: {};
  localize?: boolean;
  to?: { type: string }[];
  weak?: boolean;
  of?: {
    name?: string;
    title?: string;
    weak?: boolean;
    type: string;
    icon?: React.ReactElement | React.FunctionComponent;
    to?: { type: string }[];
  }[];
  fields?: SanityFieldType[];
  preview?: {
    select?: object;
    prepare?: (props: unknown) => {
      title?: string;
      subtitle?: string;
      media?: React.ReactElement | (() => React.ReactElement);
    };
  };
};

export type SanityFieldsetType = {
  name: string;
  title?: string;
  description?: string;
  default?: boolean;
  icon?: unknown;
  options?: {
    collapsable?: boolean;
    collapsed?: boolean;
    columns?: number;
  };
};

export type SanitySchemaType = {
  type: "object" | "document";
  name?: string;
  title?: string;
  readOnly?: boolean;
  description?: string;
  hidden?: (pageType: LinkableSchemaName) => boolean;
  icon?: React.ComponentType;
  fieldsets?: SanityFieldsetType[];
  groups?: SanityFieldsetType[];
  fields: SanityFieldType[];
  initialValue?: {};
  preview?: {
    select?: {};
    component?: React.ReactElement | ((any: any) => React.ReactElement);
    prepare?: (props: unknown) => {
      title?: string;
      subtitle?: string;
      media?: React.ReactElement | (() => React.ReactElement);
    };
  };
};
