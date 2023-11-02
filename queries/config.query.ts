import { getImageQuery } from "../components/images/image.query";
import { ScriptsType } from "../components/script/Script";
import { LanguageType } from "../languages";
import { ImageType, TranslationFieldType } from "../types";
import groq from "groq";

export type SeoType = {
  title?: string;
  description?: string;
  image?: ImageType;
  excludeFromSitemap?: boolean;
  favicon?: {
    favicon_ico?: string;
    favicon_16x16_png?: string;
    favicon_32x32_png?: string;
    apple_touch_icon?: string;
    mstile_150x150_png?: string;
  };
};

export type TwitterType = {
  handle?: string;
  url?: string;
};

export type ConfigType = {
  general?: {
    name?: string;
    domain?: string;
  };
  seo?: SeoType;
  social?: {
    twitter?: TwitterType;
    socials?: string[];
  };
  integrations?: {
    gtmid?: string;
    googleSiteVerification?: string;
    globalScripts?: ScriptsType[];
  };
  translations?: Record<TranslationFieldType, Record<LanguageType, string>>;
};

export const getConfigQuery = (language: LanguageType) => groq`
{
  "general": *[_id == 'config_general'][0]{
    "name": name.${language},
    domain
  },
  "seo": *[_id == 'config_seo'][0] { 
    "title": title.${language},
    "description": description.${language},
    "image": ${getImageQuery(`image.${language}`)},
    favicon {
      "favicon_ico": favicon_ico.asset -> url,
      "favicon_16x16_png": favicon_16x16_png.asset -> url,
      "favicon_32x32_png": favicon_32x32_png.asset -> url,
      "apple_touch_icon_png": apple_touch_icon_png.asset -> url,
      "mstile_150x150_png": mstile_150x150_png.asset -> url,
    }
  },
  "social": *[_id == 'config_social'][0],
  "integrations": *[_id == 'config_integrations'][0] {
    gtmid,
    googleSiteVerification,
    "globalScripts": globalScripts[].script -> {
      title,
      items[]
    }
  },
  "translations": *[_id == 'config_translations'][0] 
}
`;
