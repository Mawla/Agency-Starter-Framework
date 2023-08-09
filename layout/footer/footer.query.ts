import {
  buttonFieldsQuery,
  buttonQuery,
} from "../../components/buttons/button.query";
import { getImageQuery } from "../../components/images/image.query";
import { LanguageType } from "../../languages";
import { getSitemapQuery } from "../../queries/sitemap.query";
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
  icon?: string;
};

export type FooterType = {
  copyright: string;
  links: FooterItemType[];
  socials: FooterSocialsItemProps[];
  legal?: string;
  info?: string;
  legalLinks?: FooterItemType["items"];
  logo?: FooterProps["logo"];
  theme?: FooterProps["theme"];
};

export const getFooterQuery = (language: LanguageType) => groq`
{
  "sitemap": ${getSitemapQuery()}
} {
  sitemap,
  "footer": *[_id == "footer__i18n_${language}"][0] {
    _rev,
    _updatedAt,
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
    theme
  }
}.footer
`;
