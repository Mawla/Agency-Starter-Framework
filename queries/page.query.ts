import {
  FlatBreadcrumbItemType,
  FlatBreadcrumbType,
  getBreadcrumbQuery,
} from "../components/breadcrumb/breadcrumb.query";
import { imageQuery } from "../components/images/image.query";
import { richTextQuery } from "../components/portabletext/portabletext.query";
import { videoQuery } from "../components/video/video.query";
import { HeroBasicProps } from "../heroes/herobasic/HeroBasic";
import { getHeroBasicQuery } from "../heroes/herobasic/herobasic.query";
import { getResourceHeroQuery } from "../heroes/resourcehero/resourcehero.query";
import { baseLanguage, LanguageType } from "../languages";
import { getBillboardQuery } from "../modules/billboard/billboard.query";
import { getBreadcrumbModuleQuery } from "../modules/breadcrumb/breadcrumb.query";
import { getCardGridQuery } from "../modules/cardgrid/cardgrid.query";
import { getFaqQuery } from "../modules/faq/faq.query";
import { getGalleryQuery } from "../modules/gallery/gallery.query";
import { getImageQuery } from "../modules/image/image.query";
import { getFeedQuery } from "../modules/resourcefeed/resourcefeed.query";
import { getResourceStripQuery } from "../modules/resourcestrip/resourcestrip.query";
import { getRichTextQuery } from "../modules/richtext/richtext.query";
import { getSlidesQuery } from "../modules/slides/slides.query";
import { getStoryQuery } from "../modules/story/story.query";
import { getTextImageQuery } from "../modules/textimage/textimage.query";
import { getVideoQuery } from "../modules/video/video.query";
import { ImageType } from "../types";
import { SchemaName } from "../types.sanity";
import { ConfigType } from "./config.query";
import { getSitemapQuery, LanguageAlternateType } from "./sitemap.query";
import groq from "groq";

export type PageType = {
  _type: SchemaName;
  _id: string;
  _updatedAt: string;
  hero?: HeroBasicProps | null;
  image?: ImageType;
  description?: string;
  title: string;
  hideNav?: boolean;
  hideFooter?: boolean;
  seo: ConfigType["seo"];
  modules: {}[];
  dialogs: {}[];
  locked?: boolean;
  homepage: FlatBreadcrumbItemType;
  breadcrumb: FlatBreadcrumbType;
  languageAlternates?: LanguageAlternateType[];
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

    // page seo
    "seo": {
      ...,
      "image": ${imageQuery}
    },

    // hero
    "hero": hero[!(_type in path('studio.*'))][] {
      _type,
      _key,
      theme,

      ${getHeroBasicQuery(language)},
      ${getResourceHeroQuery(language)},
    }[0],

    // modules
    "modules": modules[!(_type in path('studio.*'))] {
      _key,
      _type,
      decorations[] {
        ...,
        "image": ${imageQuery},
      },
      theme,

      ${getRichTextQuery(language)},
      ${getBreadcrumbModuleQuery(language)},
      ${getCardGridQuery(language)},
      ${getBillboardQuery(language)},
      ${getTextImageQuery(language)},
      ${getGalleryQuery(language)},
      ${getSlidesQuery(language)},
      ${getStoryQuery(language)},
      ${getFeedQuery(language)},
      ${getResourceStripQuery(language)},
      ${getFaqQuery(language)},
      ${getVideoQuery(language)},
      ${getImageQuery(language)},
    },

    // dialogs
    dialogs {
      _key,
      _type,
      "slug": slug.current,
      _type == "dialog.richtext" => {
        content[] ${richTextQuery}
      },

      _type == "dialog.video" => {
        ${videoQuery}
      },

      _type == "dialog.form" => {
        script ->
      },
    },
  }
}.page`;
