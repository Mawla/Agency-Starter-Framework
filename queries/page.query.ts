import { getBlock0Query } from "../blocks/block0/block0.query";
import { getBlock1Query } from "../blocks/block1/block1.query";
import { getBlock2Query } from "../blocks/block2/block2.query";
import { getBlock3Query } from "../blocks/block3/block3.query";
import { getBlock4Query } from "../blocks/block4/block4.query";
import { getBlock5Query } from "../blocks/block5/block5.query";
import { getBlock7Query } from "../blocks/block7/block7.query";
import { getBlock10Query } from "../blocks/block10/block10.query";
import { getBlock12Query } from "../blocks/block12/block12.query";
import { getBlock13Query } from "../blocks/block13/block13.query";
import { getBlock14Query } from "../blocks/block14/block14.query";
import { getBlock15Query } from "../blocks/block15/block15.query";
import { getBlock16Query } from "../blocks/block16/block16.query";
import { getBlock17Query } from "../blocks/block17/block17.query";
import { getBlock18Query } from "../blocks/block18/block18.query";
import {
  FlatBreadcrumbItemType,
  FlatBreadcrumbType,
  getBreadcrumbQuery,
} from "../components/breadcrumb/breadcrumb.query";
import { decorationsQuery } from "../components/decorations/decoration.query";
import {
  imageQuery,
  getImageQuery as getImageComponentQuery,
} from "../components/images/image.query";
import { richTextQuery } from "../components/portabletext/portabletext.query";
import { ScriptsType } from "../components/script/Script";
import { videoQuery } from "../components/video/video.query";
import { baseLanguage, LanguageType } from "../languages";
import { ImageType } from "../types";
import { SchemaName } from "../types.sanity";
import { SeoType } from "./config.query";
import { getSitemapQuery, LanguageAlternateType } from "./sitemap.query";
import groq from "groq";

export type PageType = {
  _type: SchemaName;
  _id: string;
  _updatedAt: string;
  image?: ImageType;
  description?: string;
  title: string;
  hideNav?: boolean;
  hideFooter?: boolean;
  hideBreadcrumb?: boolean;
  seo: SeoType;
  blocks: { _key: string }[];
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
    hideBreadcrumb,
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

    // blocks
    "blocks": blocks[!(_type in path('studio.*')) && disabled != true] {
      ${getBlock5Query(language)},
      ${getBlock3Query(language)},
      ${getBlock7Query(language)},
      ${getBlock18Query(language)},
      ${getBlock17Query(language)},
      ${getBlock16Query(language)},
      ${getBlock15Query(language)},
      ${getBlock14Query(language)},
      ${getBlock13Query(language)},
      ${getBlock12Query(language)},
      ${getBlock0Query(language)},
      ${getBlock10Query(language)},
      ${getBlock1Query(language)},
      ${getBlock2Query(language)},
      ${getBlock4Query(language)},
      _key,
      _type,
      decorations,
      theme,
      "slug": coalesce(slug.current, title, _key),
      ${decorationsQuery}
    }
  }
}.page`;
