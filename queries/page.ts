import { HeroBasicProps } from "../heroes/HeroBasic";
import { getHeroBasicQuery } from "../heroes/HeroBasic.query";
import { LanguageType } from "../languages";
import { getBillboardQuery } from "../modules/Billboard/Billboard.query";
import { getBreadcrumbQuery } from "../modules/Breadcrumb/Breadcrumb.query";
import { getCardGridQuery } from "../modules/CardGrid/CardGrid.query";
import { getGalleryQuery } from "../modules/Gallery/Gallery.query";
import { getRichTextQuery } from "../modules/RichText/RichText.query";
import { getSlidesQuery } from "../modules/Slides/Slides.query";
import { getStoryQuery } from "../modules/Story/Story.query";
import { getTextImageQuery } from "../modules/TextImage/TextImage.query";
import { ImageType } from "../types";
import { SchemaName } from "../types.sanity";
import { imageQuery } from "./components/image";
import { richTextQuery } from "./components/richText";
import { staticFormQuery } from "./components/staticForm";
import { videoQuery } from "./components/video";
import { ConfigType } from "./config";
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
};

export const getPageQuery = (language: LanguageType) => groq`*[_id == $_id][0]{
  _id,
  _type,
  _updatedAt,
  "title": title.${language},
  hideNav,
  hideFooter,
  "locked": locked.${language},

  // article intro and image
  publishedAt,
  description,
  "image": ${imageQuery},

  // page seo
  "seo": seo.${language} {
    ...,
    "image": ${imageQuery}
  },

  // hero
  "hero": select(_type == 'page.preset' => modules, hero[language == "${language}" && !(_type in path('studio.*'))])[] {
    _type,
    _key,

    ${getHeroBasicQuery(language)}

  }[0],

  // modules
  "modules": modules[language == "${language}" && !(_type in path('studio.*'))] {
    _key,
    _type,
    decorations[] {
      ...,
      "image": ${imageQuery},
    },
    theme,

    ${getRichTextQuery(language)},
    ${getBreadcrumbQuery(language)},
    ${getCardGridQuery(language)},
    ${getBillboardQuery(language)},
    ${getTextImageQuery(language)},
    ${getGalleryQuery(language)},
    ${getSlidesQuery(language)},
    ${getStoryQuery(language)},
  },

  // dialogs
  "dialogs": dialogs[language == "${language}"] {
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
      form${staticFormQuery}    
    },
  },
}`;
