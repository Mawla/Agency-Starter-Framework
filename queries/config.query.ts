import { getImageQuery } from "../components/images/Image.query";
import { LanguageType } from "../languages";
import { ImageType, TranslationFieldType } from "../types";
import groq from "groq";

export type SeoType = {
  title?: string;
  description?: string;
  image?: ImageType;
  excludeFromSitemap?: boolean;
};

export type TwitterType = {
  handle?: string;
  url?: string;
};

export type ConfigType = {
  general: {
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
  };
  translations?: Record<TranslationFieldType, Record<LanguageType, string>>;
};

export const getConfigQuery = (language: LanguageType) => groq`
{
  "general": *[_id == 'config_general'][0]{
    "name": name.${language},
    "domain": domain.${language},
  },
  "seo": *[_id == 'config_seo'][0] { 
    "title": title.${language},
    "description": description.${language},
    "image": ${getImageQuery(`image.${language}`)}
  },
  "social": *[_id == 'config_social'][0],
  "integrations": *[_id == 'config_integrations'][0],
  "translations": *[_id == 'config_translations'][0]
}
`;
