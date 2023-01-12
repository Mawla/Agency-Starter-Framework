import { LanguageType } from "../languages";
import { buttonQuery } from "../queries/components/button";
import { getImageQuery } from "../queries/components/image";
import { richTextQuery } from "../queries/components/richText";
import { SitemapType } from "../queries/sitemap";
import groq from "groq";

export const getHeroBasicQuery = (
  _id: string,
  _key: string,
  sitemap: SitemapType,
  language: LanguageType
) => groq`*[_id == "${_id}"][0] { 
    "hero": hero[_key == "${_key}"] {
      title,
      eyebrow,
      visual {
        "image1": ${getImageQuery("image1")},
        "image2": ${getImageQuery("image2")},
        colors
      },
      showLozenges,
      breakOutImage,
      text[] ${richTextQuery},
      buttons[] ${buttonQuery},
    }
  }.hero[0]`;
