import {
  FlatBreadcrumbItemType,
  FlatBreadcrumbType,
  getBreadcrumbQuery,
} from "../components/breadcrumb/breadcrumb.query";
import {
  imageQuery,
  getImageQuery as getImageComponentQuery,
} from "../components/images/image.query";
import { richTextQuery } from "../components/portabletext/portabletext.query";
import { ScriptsType } from "../components/script/Script";
import { videoQuery } from "../components/video/video.query";
import { HeroSplitProps } from "../heroes/herosplit/HeroSplit";
import { getHeroSplitQuery } from "../heroes/herosplit/herosplit.query";
import { getHeroVerticalQuery } from "../heroes/herovertical/herovertical.query";
import { getResourceHeroQuery } from "../heroes/resourcehero/resourcehero.query";
import { baseLanguage, LanguageType } from "../languages";
import { getBreadcrumbModuleQuery } from "../modules/breadcrumb/breadcrumb.query";
import { getStoryQuery } from "../modules/story/story.query";
import { getVideoQuery } from "../modules/video/video.query";
import { ImageType } from "../types";
import { SchemaName } from "../types.sanity";
import { SeoType } from "./config.query";
import { getSitemapQuery, LanguageAlternateType } from "./sitemap.query";
import groq from "groq";

export type PageType = {
  _type: SchemaName;
  _id: string;
  _updatedAt: string;
  hero?: HeroSplitProps | null;
  image?: ImageType;
  description?: string;
  title: string;
  hideNav?: boolean;
  hideFooter?: boolean;
  seo: SeoType;
  modules: {}[];
  dialogs: {}[];
  locked?: boolean;
  homepage: FlatBreadcrumbItemType;
  breadcrumb: FlatBreadcrumbType;
  languageAlternates?: LanguageAlternateType[];
  scripts: ScriptsType[];
};

export const getPageQuery = (language: LanguageType) => groq`
{
  "sitemap": ${getSitemapQuery()}
} {
  sitemap,
  "page": *[_id == $_id][0]{
    _id,
    _type,
    _updatedAt,
    _rev,
    title,
    hideNav,
    hideFooter,
    "locked": locked,

    // homepage for language
    "homepage": ^.sitemap[_id match "*page_homepage*" && language == '${language}'][0] {
      path, 
      title
    },

    // path pages
    "breadcrumb": ${getBreadcrumbQuery(language)},

    // related documents in other languages
    "languageAlternates": select(
      language == "${baseLanguage}" => ^.sitemap[i18n_base == $_id] { path, title, language, excludeFromSitemap },
      ^.sitemap[_id == ^.i18n_base._ref] { path, title, language, excludeFromSitemap },
    ),

    // basic page data
    "sitemapItem": ^.sitemap[_id == $_id][0],
    publishedAt,
    description,
    "image": ${imageQuery},
    "scripts": select(
      _type == "script" => [{
        title,
        items[],
      }],
      scripts[].script -> {
        title,
        items[]
      }
    ),

    // page seo
    "seo": {
      ...seo,
      "image": ${getImageComponentQuery("seo.image")}
    },

    // hero
    "hero": hero[!(_type in path('studio.*'))][] {
      ${getHeroSplitQuery(language)},
      ${getResourceHeroQuery(language)},
      ${getHeroVerticalQuery(language)},
      _type,
      _key,
      theme,

    }[0],

    // modules
    "modules": modules[!(_type in path('studio.*'))] {
      ${getBreadcrumbModuleQuery(language)},
      ${getStoryQuery(language)},
      ${getVideoQuery(language)},
      _key,
      _type,
      decorations,
      theme,
    },

    // dialogs
    dialogs {
      _type == "dialog.richtext" => {
        content[] ${richTextQuery}
      },

      _type == "dialog.video" => {
        ${videoQuery}
      },

      _type == "dialog.form" => {
        script ->
      },

      _key,
      _type,
      "slug": slug.current,
    },
  }
}.page`;
