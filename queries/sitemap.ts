import { languages, LanguageType } from "../languages";
import { SchemaName } from "../types.sanity";
import groq from "groq";

export type SitemapItemType = {
  _id: string;
  _type: SchemaName;
  title?: string;
  titles: {
    [key in LanguageType]: string;
  };
  path?: string;
  paths: {
    [key in LanguageType]: string;
  };
  _updatedAt: string;
  excludeFromSitemap?: {
    [key in LanguageType]: boolean;
  };
  parent?: string;
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
  "modules": modules[] { language },
  "hero": hero[] { language }
`;

const slugFields = groq`
 ${baseFields}, 
 "path": "/"+ slug.current,
 "paths": {
    ${languages.map(
      (language) => `"${language.id}": "/"+ slug.${language.id}.current`,
    )}
  },
`;

const homePageQuery = groq`
*[_id match "*page_homepage"] { 
  ${baseFields},
  "paths": {
    ${languages.map((language) => `"${language.id}": "/"`)}
  },
}[0]`;

const getSingletonQuery = (id: string) => {
  return `*[_id match "*${id}"] { ${slugFields} }[0]`;
};

export const getSitemapQuery = () => {
  const sitemapQuery = groq`
  [
    ${homePageQuery},
    
    // content pages
    ...*[
      _type == "page.content"
      ] {
      ${baseFields},

      ${languages.map(
        (language) => `
        ${`"level0${language.id}"`}: slug.${language.id}.current,
        ${`"level1${language.id}"`}: parent -> slug.${language.id}.current,
        ${`"level2${language.id}"`}: parent -> parent -> slug.${
          language.id
        }.current,
        ${`"level3${language.id}"`}: parent -> parent -> parent -> slug.${
          language.id
        }.current,
        ${`"level4${language.id}"`}: parent -> parent -> parent -> parent -> slug.${
          language.id
        }.current
      `,
      )}
    }
    {
    ${baseFields},
    titles,
    "paths": {
      ${languages.map(
        (language) => `
        "${language.id}": select(
          defined(level4${language.id}) => "/"+ level4${language.id} +"/"+ level3${language.id} +"/"+ level2${language.id} +"/"+ level1${language.id} +"/"+ level0${language.id},
          defined(level3${language.id}) => "/"+ level3${language.id} +"/"+ level2${language.id} +"/"+ level1${language.id} +"/"+ level0${language.id},
          defined(level2${language.id}) => "/"+ level2${language.id} +"/"+ level1${language.id} + "/"+ level0${language.id},
          defined(level1${language.id}) => "/"+ level1${language.id} +"/"+ level0${language.id},
          defined(level0${language.id}) => "/"+ level0${language.id}
        )
        `,
      )}
    }
  }
  ]{
    _id, 
    _type, 
    "titles": title, 
    _updatedAt,
    paths,
    "parent": parent._ref,
    "excludeFromSitemap": {
      ${languages.map(
        (language) => `
        "${language.id}": 
          seo.${language.id}.excludeFromSitemap || 
          locked.${language.id} ||
          (
            (
              !defined(hero) || 
              !("${language.id}" in hero[].language)
             ) && (
              !defined(modules) || 
              !("${language.id}" in modules[].language)
            )
          )
        `,
      )}
  }}`;

  return sitemapQuery;
};
