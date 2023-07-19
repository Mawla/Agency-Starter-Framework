import {
  buttonFieldsQuery,
  buttonQuery,
} from "../../components/buttons/button.query";
import { getImageQuery, imageQuery } from "../../components/images/image.query";
import { LanguageType } from "../../languages";
import { getSitemapQuery } from "../../queries/sitemap.query";
import { IconType } from "../../types";
import { FooterProps } from "./Footer";
import groq from "groq";

export type FooterItemType = {
  title?: string;
  href?: string;
  items: { label?: string; href?: string }[];
};

export type FooterSocialsItemProps = {
  label?: string;
  href?: string;
  icon: IconType;
};

export type FooterType = {
  copyright: string;
  links: FooterItemType[];
  socials: FooterSocialsItemProps[];
  legal?: string;
  info?: string;
  legalLinks?: FooterItemType["items"];
  logo?: FooterProps["logo"];
};

export const getFooterQuery = (language: LanguageType) => groq`
{
  "sitemap": ${getSitemapQuery()}
} {
  sitemap,
  "footer": *[_id == "footer__i18n_${language}"][0] {
    logo {
      "mobile": ${getImageQuery("mobile")},
      "desktop": ${getImageQuery("desktop")},
    },
    copyright,
    legal,
    info,
    "links": links[] { 
      title, 
      "href": link ${buttonQuery}.href,
      items[] ${buttonQuery} 
    },
    "legalLinks": legalLinks[] ${buttonQuery},
    "socials": socials[] {
      icon,
      ${buttonFieldsQuery},
    },
  }
}.footer
`;
