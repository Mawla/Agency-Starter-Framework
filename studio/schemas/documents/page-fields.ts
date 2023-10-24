import { SCRIPT_REFERENCE_FIELD } from "../../../components/script/script.schema";
import { baseLanguage, languages, LanguageType } from "../../../languages";
import {
  LINKABLE_SCHEMAS,
  BlockSchemaName,
  BLOCK_SCHEMAS,
  SANITY_API_VERSION,
} from "../../../types.sanity";
import {
  PageBuilder,
  PageBuilderItem,
  PageBuilderItemPreview,
} from "../../components/PageBuilder";
import PagePasswordComponent, {
  PagePasswordWrapper,
} from "../../components/PagePasswordComponent";
import DocumentPreview from "../../components/Preview/DocumentPreview";
import { getISODateString } from "../../utils/datetime";
import { getStructurePath } from "../../utils/desk/get-structure-path";
import { isPathUnique } from "../../utils/desk/isPathUnique";
import { referenceFilterCurrentLanguage } from "../../utils/language/reference-filter-current-language";
import { SEO_FIELD } from "./config.seo";
import { EllipsisVerticalIcon } from "@sanity/icons";
import {
  DateRule,
  defineArrayMember,
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
  description: "Used for SEO and in the browser tab.",
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
  group: ["meta"],
});

export const PREVIEW_FIELD = defineField({
  name: "preview_sync",
  title: "Preview",
  type: "string",
  components: {
    field: DocumentPreview,
  },
  group: ["meta", "content", "language", "tools"],
});

export const BLOCKS_FIELD = defineField({
  name: "blocks",
  title: "Blocks",
  type: "array",
  components: {
    input: PageBuilder,
  },
  description: "Blocks are the building blocks of a page.",
  of: [
    ...(Object.keys(BLOCK_SCHEMAS) as BlockSchemaName[]).map(
      (type: BlockSchemaName) =>
        defineArrayMember({
          type,
          components: {
            preview: PageBuilderItemPreview as any,
            item: PageBuilderItem as any,
          },
        }),
    ),
    { type: "studio.divider" },
  ],
  options: {
    filterType: /block\.|studio\./,
    updateField: "blocks",
    placeholder: "Add a block…",
  } as any,
  group: ["content"],
});

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
    filter: referenceFilterCurrentLanguage,
  },
  group: ["content"],
});

export async function getParentDocumentInitialValue(
  context: any,
  parentId: string,
) {
  const client = context.getClient({ apiVersion: SANITY_API_VERSION });
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

export const IMAGE_FIELD = defineField({
  name: "image",
  title: "Image",
  type: "image",
  description: "Image used in article grids. Preferred aspect ratio 16/9.",
  group: ["content"],
  options: {
    hotspot: true,
  },
});

export const TAGS_FIELD = defineField({
  name: "tags",
  title: "Tags",
  type: "array",
  of: [
    {
      type: "reference",
      to: [{ type: "page.tag" }],
      weak: true,
      options: {
        filter: referenceFilterCurrentLanguage,
      },
    },
  ],
  group: ["content"],
});

export const AUTHOR_FIELD = defineField({
  name: "authors",
  title: "Authors",
  type: "array",
  of: [
    {
      type: "reference",
      weak: true,
      to: [{ type: "person" }],
      options: {
        filter: referenceFilterCurrentLanguage,
      },
    },
  ],
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

export const HIDE_BREADCRUMB_FIELD = defineField({
  name: "hideBreadcrumb",
  title: "Hide breadcrumb",
  type: "boolean",
  description:
    "Option to hide the breadcrumb (if enabled in navigation theme settings)",
  initialValue: false,
  group: ["meta"],
});

export const SCRIPTS_FIELD = defineField({
  name: "scripts",
  title: "Scripts",
  type: "array",
  description: "Scripts to load on the page",
  group: ["meta"],
  of: [SCRIPT_REFERENCE_FIELD],
});

export const PREVENT_PUBLISH_FIELD = defineField({
  name: "preventPublish",
  title: "Prevent publish",
  type: "boolean",
  description:
    "Toggle this if you don't want to allow publishing of this document.",
  group: ["tools"],
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
    {
      name: "tools",
      title: " ",
      icon: EllipsisVerticalIcon as any,
    },
  ],
  fields: [
    PREVIEW_FIELD,
    PASSWORD,
    PREVENT_PUBLISH_FIELD,
    TITLE_FIELD,
    SLUG_FIELD,
    BLOCKS_FIELD,
    { ...SEO_FIELD, group: ["meta"] },
    HIDE_NAV_FIELD,
    HIDE_FOOTER_FIELD,
    HIDE_BREADCRUMB_FIELD,
    LANGUAGE_FIELD,
    I18N_BASE_FIELD,
    SCRIPTS_FIELD,
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
    image: "image",
    block1Image: "blocks.0.image",
    language: "language",
    ...SLUG_PREVIEW_SELECT_FIELDS,
  },
  prepare({ title, image, block1Image, language, ...paths }: any) {
    return {
      title: `${title}`,
      subtitle: getPreviewSlugPagePath(language, paths),
      media: image || block1Image || undefined,
    };
  },
};

export const DEFAULT_ARTICLE_PAGE_PREVIEW: PreviewConfig = {
  select: {
    title: `title`,
    image: "image",
    block1Image: "blocks.0.image",
    language: "language",
    date: "publishedAt",
    author: "authors.0.name",
    slug: `slug.current`,
  },
  prepare({ title, date, author, image, block1Image, language, slug }: any) {
    return {
      title: `${title}`,
      subtitle: [date, author, slug].filter(Boolean).join(" - "),
      media: image || block1Image || undefined,
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

export const DEFAULT_ARTICLE_PAGE_ORDERINGS: SortOrdering[] = [
  {
    title: "Title",
    name: "Title",
    by: [{ field: `title`, direction: "asc" }],
  },
  {
    title: "Created ↑",
    name: "publishedAtDesc",
    by: [{ field: "publishedAt", direction: "desc" }],
  },
];
