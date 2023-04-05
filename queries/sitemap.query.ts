import { LanguageType } from "../languages";
import { LINKABLE_SCHEMAS, SchemaName } from "../types.sanity";
import groq from "groq";

export type LanguageAlternateType = {
  title: string;
  path: string;
  language: LanguageType;
  excludeFromSitemap?: boolean;
};

export type SitemapItemType = {
  _id: string;
  _type: SchemaName;
  title?: string;
  path?: string;
  language?: LanguageType;
  _updatedAt: string;
  excludeFromSitemap?: boolean;
  parent?: string;
  i18n_base?: string;
};

export type SitemapType = SitemapItemType[];

const baseFields = groq`
  _id,
  _type, 
  title, 
  seo, 
  _updatedAt, 
  locked,
  parent,
  language,
  "i18n_base": i18n_base,
  "blocks": blocks[] { language }
`;

const homePageQuery = groq`
*[_id match "*page_homepage*"] { 
  ${baseFields},
  "path": "/"
}`;

export const getSitemapQuery = () => {
  const sitemapQuery = groq`
  [
    // fixed path pages
    ...${homePageQuery},

    // parent based pages
    ...*[
    ${Object.keys(LINKABLE_SCHEMAS)
      .map((schema) => `_type == "${schema}"`)
      .join("|| ")}
    ] {
      ${baseFields},
      "level0": slug.current,
      "level1": parent -> slug.current,
      "level2": parent -> parent -> slug.current,
      "level3": parent -> parent -> parent -> slug.current,
      "level4": parent -> parent -> parent -> parent -> slug.current,
      "level5": parent -> parent -> parent -> parent -> parent -> slug.current,
    }
    {
    ${baseFields},
    "path": select(
      defined(level5) => "/"+ level5 +"/"+ level4 +"/"+ level3 +"/"+ level2 +"/"+ level1 +"/"+ level0,
      defined(level4) => "/"+ level4 +"/"+ level3 +"/"+ level2 +"/"+ level1 +"/"+ level0,
      defined(level3) => "/"+ level3 +"/"+ level2 +"/"+ level1 +"/"+ level0,
      defined(level2) => "/"+ level2 +"/"+ level1 + "/"+ level0,
      defined(level1) => "/"+ level1 +"/"+ level0,
      defined(level0) => "/"+ level0
    )
  }
  ]{
    _id, 
    _type, 
    title,
    language,
    _updatedAt,
    path,
    "i18n_base": i18n_base._ref,
    "parent": parent._ref,
    "excludeFromSitemap": seo.excludeFromSitemap || locked || (!defined(blocks) || count(blocks) == 0)
  }`;

  return sitemapQuery;
};
