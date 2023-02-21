import { baseLanguage, languages, LanguageType } from "../../../languages";
import {
  DialogSchemaName,
  DIALOG_SCHEMAS,
  HeroSchemaName,
  HERO_SCHEMAS,
  LINKABLE_SCHEMAS,
  ModuleSchemaName,
  MODULE_SCHEMAS,
} from "../../../types.sanity";
import {
  PageBuilder,
  PageBuilderItem,
  PageBuilderItemPreview,
} from "../../components/PageBuilder";
import PagePasswordComponent, {
  PagePasswordWrapper,
} from "../../components/PagePasswordComponent";
import { getISODateString } from "../../utils/datetime";
import { getStructurePath } from "../../utils/desk/get-structure-path";
import { isPathUnique } from "../../utils/desk/isPathUnique";
import { SEO_FIELD } from "./config.seo";
import { nanoid } from "nanoid";
import {
  ArrayRule,
  DateRule,
  defineField,
  PreviewConfig,
  SlugRule,
  SortOrdering,
  StringRule,
  useSchema,
} from "sanity";

export const TITLE_FIELD = defineField({
  name: "title",
  title: "Title",
  type: "string",
  validation: (Rule: StringRule) => Rule.required(),
  group: ["content"],
});

export const SLUG_FIELD = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  description:
    "The unique identifying part of a web address at the end of the URL. Only lowercase and no special characters except -.",
  options: {
    source: (doc: any) => {
      return doc.title;
    },
    maxLength: 96,
    isUnique: isPathUnique,
  } as any,
  validation: (Rule: SlugRule) =>
    Rule.required().custom(async (slug, context) => {
      if (typeof slug === "undefined") return true;
      const regex = /(^[a-z0-9-]+$)/;
      if (regex.test(slug.current || "")) {
        return true;
      } else {
        return "Invalid slug: Only numbers, lowercase letters, and dashes are permitted.";
      }
    }),
  group: ["content"],
});

export const PUBLISHED_AT_FIELD = defineField({
  name: "publishedAt",
  initialValue: getISODateString(),
  title: "Date",
  type: "date",
  validation: (Rule: DateRule) => Rule.required(),
});

export const HERO_FIELD = defineField({
  name: "hero",
  title: "Hero",
  type: "array",
  components: {
    input: PageBuilder,
  },
  validation: (Rule: ArrayRule<any>) => Rule.max(1).warning(),
  description: "The hero section of the page.",
  of: (Object.keys(HERO_SCHEMAS) as HeroSchemaName[]).map(
    (type: HeroSchemaName) => ({
      type,
      components: {
        preview: PageBuilderItemPreview,
        item: PageBuilderItem,
      },
    }),
  ),
  options: {
    filterType: /hero\./,
    updateField: "hero",
    placeholder: "Add a hero…",
  } as any,
  group: ["content"],
});

export const MODULES_FIELD = defineField({
  name: "modules",
  title: "Modules",
  type: "array",
  components: {
    input: PageBuilder,
  },
  description: "Modules are the building blocks of a page.",
  of: [
    ...(Object.keys(MODULE_SCHEMAS) as ModuleSchemaName[]).map(
      (type: ModuleSchemaName) => ({
        type,
        components: {
          preview: PageBuilderItemPreview,
          item: PageBuilderItem,
        },
      }),
    ),
    { type: "studio.divider" },
  ],
  options: {
    filterType: /module|studio\./,
    updateField: "modules",
    placeholder: "Add a module…",
  } as any,
  group: ["content"],
});

export const DIALOGS_FIELD = defineField({
  name: "dialogs",
  title: "Dialogs",
  type: "array",
  components: {
    input: PageBuilder,
  },
  description:
    "Dialogs are modal windows, used for presenting extra information. A dialog must be created before it can be linked to from a button inside module.",
  of: (Object.keys(DIALOG_SCHEMAS) as DialogSchemaName[]).map(
    (type: DialogSchemaName) => ({
      type,
      components: {
        preview: PageBuilderItemPreview,
        item: PageBuilderItem,
      },
    }),
  ),
  options: {
    filterType: /dialog.*/,
    updateField: "dialogs",
    placeholder: "Add a dialog…",
  } as any,
  group: ["content"],
});

export const ORDER_PUBLISHED_DESC: SortOrdering = {
  title: "Created ↑",
  name: "publishedAtDesc",
  by: [{ field: "publishedAt", direction: "desc" }],
};

export const EMPTY_RICHTEXT_MODULE = {
  _type: "module.richtext",
  _key: nanoid(),
  background: "white",
  content: [
    {
      _type: "block",
      _key: nanoid(),
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: nanoid(),
          text: "",
          marks: [],
        },
      ],
    },
  ],
};

export const PASSWORD = defineField({
  name: "locked",
  title: "Locked",
  type: "boolean",
  components: {
    input: PagePasswordComponent,
    field: PagePasswordWrapper,
  },
  group: ["meta"],
});

export const PARENT_FIELD = defineField({
  name: "parent",
  title: "Parent",
  type: "reference",
  to: [{ type: "page.content" }, { type: "page.landing" }],
  options: {
    filter: ({ document }) => {
      const { language = baseLanguage } = getStructurePath();
      if (!document._id) return {};

      return {
        filter: `
          _id != $id
          && language == $language
        `,
        params: {
          id: document._id,
          language,
        },
      };
    },
  },
  group: ["content"],
});

export async function getParentDocumentInitialValue(
  context: any,
  parentId: string,
) {
  const client = context.getClient({ apiVersion: "vX" });
  const { language = baseLanguage } = getStructurePath();

  const parentDocumentId = await client.fetch(
    `*[_id match "${parentId}__i18n_${language}"][0]._id`,
  );

  // prevent a reference to a non existing page, that crashes the studio
  if (!parentDocumentId) return {};

  return {
    parent: { _type: "reference", _ref: parentDocumentId },
  };
}

export const LANGUAGE_FIELD = defineField({
  name: "language",
  title: "Language",
  type: "string",
  validation: (Rule: StringRule) => Rule.required(),
  options: {
    list: languages.map(({ title, id }) => ({ title, value: id })),
  },
  initialValue: () => {
    const { language } = getStructurePath();
    return language || baseLanguage;
  },
  readOnly: ({ document }: any) => {
    if (!document) return false;
    const schemas = useSchema();
    const schema = schemas._original?.types.find(
      ({ name }: { name: string }) => name === document._type,
    );
    // can't change language of singleton documents as the id has the language in it
    if ((schema?.options as any)?.singleton) return true;

    return false;
  },
  group: ["language"],
});

export const I18N_BASE_FIELD = defineField({
  name: "i18n_base",
  title: "Base language document",
  description:
    "The same document in the primary language. This is to provide language alternatives on the website. Leave this blank if there is no such related page.",
  type: "reference",
  validation: (Rule: any) =>
    Rule.required().warning(
      "It's good practice adding base language document.",
    ),
  to: Object.keys(LINKABLE_SCHEMAS).map((schema) => ({ type: schema })),
  weak: true,
  options: {
    filter: ({ document }: any) => {
      if (!document._id) return {};
      return {
        filter: `language == "${baseLanguage}"`,
      };
    },
  },
  hidden: ({ document }: any) => {
    if (document.language === baseLanguage) return true;
    return false;
  },
  group: ["meta", "language"],
});

export const getI18nBaseFieldForSingleton = (schemaType: string) => {
  const { language = baseLanguage } = getStructurePath();
  if (language === baseLanguage) return I18N_BASE_FIELD;
  const schemaName = schemaType.toLowerCase().replace(/\s/g, "");
  const documentId = schemaName.replace("page.", "page_");

  return {
    ...I18N_BASE_FIELD,
    initialValue: {
      _ref: `${documentId}__i18n_${baseLanguage}`,
      _weak: true,
    },
  };
};

export const TAGS_FIELD = defineField({
  name: "tags",
  title: "Tags",
  type: "array",
  of: [{ type: "reference", to: [{ type: "page.tag" }] }],
  group: ["content"],
});

export const AUTHOR_FIELD = defineField({
  name: "authors",
  title: "Authors",
  type: "array",
  of: [{ type: "reference", to: [{ type: "person" }] }],
  group: ["content"],
});

export const HIDE_NAV_FIELD = defineField({
  name: "hideNav",
  title: "Hide navigation",
  type: "boolean",
  description: "Option to hide the navigation",
  initialValue: false,
  group: ["meta"],
});

export const HIDE_FOOTER_FIELD = defineField({
  name: "hideFooter",
  title: "Hide footer",
  type: "boolean",
  description: "Option to hide the footer",
  initialValue: false,
  group: ["meta"],
});

export const pageBase = {
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
    {
      title: "SEO & metadata",
      name: "meta",
    },
    {
      title: "Language",
      name: "language",
    },
  ],
  fields: [
    PASSWORD,
    TITLE_FIELD,
    SLUG_FIELD,
    HERO_FIELD,
    MODULES_FIELD,
    DIALOGS_FIELD,
    { ...SEO_FIELD, group: ["meta"] },
    HIDE_NAV_FIELD,
    HIDE_FOOTER_FIELD,
    LANGUAGE_FIELD,
    I18N_BASE_FIELD,
  ],
};

export const SLUG_PREVIEW_SELECT_FIELDS = {
  slug: `slug.current`,
  level1Slug: `parent.slug.current`,
  level2Slug: `parent.parent.slug.current`,
  level3Slug: `parent.parent.parent.slug.current`,
  level4Slug: `parent.parent.parent.parent.slug.current`,
  level5Slug: `parent.parent.parent.parent.parent.slug.current`,
};

export const getPreviewSlugPagePath = (
  language: LanguageType,
  paths: string[],
) => {
  const languagePath = language === baseLanguage ? "" : `/${language}`;

  return `${languagePath}/${[
    "",
    ...Object.values(paths).filter(Boolean).reverse(),
  ]
    .filter(Boolean)
    .join("/")}`;
};

export const DEFAULT_CONTENT_PAGE_PREVIEW: PreviewConfig = {
  select: {
    title: `title`,
    media: "hero.0.image",
    language: "language",
    ...SLUG_PREVIEW_SELECT_FIELDS,
  },
  prepare({ title, media, language, ...paths }: any) {
    return {
      title: `${title}`,
      subtitle: getPreviewSlugPagePath(language, paths),
      media,
    };
  },
};

export const DEFAULT_CONTENT_PAGE_ORDERINGS: SortOrdering[] = [
  {
    title: "Title",
    name: "Title",
    by: [{ field: `title`, direction: "asc" }],
  },
  {
    title: "Slug",
    name: "Slug",
    by: [{ field: `slug.current`, direction: "asc" }],
  },
  {
    title: "Path",
    name: "Path",
    by: [
      {
        field: `parent.parent.parent.parent.parent.slug.current`,
        direction: "desc",
      },
      {
        field: `parent.parent.parent.parent.slug.current`,
        direction: "desc",
      },
      {
        field: `parent.parent.parent.slug.current`,
        direction: "desc",
      },
      {
        field: `parent.parent.slug.current`,
        direction: "desc",
      },
      { field: `parent.slug.current`, direction: "desc" },
      { field: `slug.current`, direction: "desc" },
    ],
  },
];
