import { getBlock0Query } from "../blocks/block0/block0.query";
import { getBlock1Query } from "../blocks/block1/block1.query";
import { getBlock2Query } from "../blocks/block2/block2.query";
import { getBlock3Query } from "../blocks/block3/block3.query";
import { getBlock4Query } from "../blocks/block4/block4.query";
import { getBlock6Query } from "../blocks/block6/block6.query";
import { getBlock8Query } from "../blocks/block8/block8.query";
import { getBlock9Query } from "../blocks/block9/block9.query";
import { getBlock10Query } from "../blocks/block10/block10.query";
import { getBlock11Query } from "../blocks/block11/block11.query";
import { getBlock12Query } from "../blocks/block12/block12.query";
import { getBlock13Query } from "../blocks/block13/block13.query";
import { getBlock14Query } from "../blocks/block14/block14.query";
import { getBlock15Query } from "../blocks/block15/block15.query";
import { getBlock16Query } from "../blocks/block16/block16.query";
import { getBlock17Query } from "../blocks/block17/block17.query";
import { decorationsQuery } from "../components/block/decoration.query";
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
  seo: SeoType;
  blocks: {}[];
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

    // blocks
    "blocks": blocks[!(_type in path('studio.*')) && disabled != true] {
      ${getBlock17Query(language)},
      ${getBlock16Query(language)},
      ${getBlock15Query(language)},
      ${getBlock14Query(language)},
      ${getBlock13Query(language)},
      ${getBlock12Query(language)},
      ${getBlock0Query(language)},
      ${getBlock11Query(language)},
      ${getBlock10Query(language)},
      ${getBlock1Query(language)},
      ${getBlock2Query(language)},
      ${getBlock3Query(language)},
      ${getBlock4Query(language)},
      ${getBlock6Query(language)},
      ${getBlock8Query(language)},
      ${getBlock9Query(language)},
      _key,
      _type,
      decorations,
      theme,
      ${decorationsQuery}
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
