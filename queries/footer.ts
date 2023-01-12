import { LanguageType } from "../languages";
import { IconType } from "../types";
import { buttonFieldsQuery, buttonQuery } from "./components/button";
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
  legalLinks?: FooterItemType["items"];
};

export const getFooterQuery = (language: LanguageType) => groq`
*[_id == 'footer'][0] {
  "copyright": copyright.${language},
  "legal": legal.${language},
  "links": links.${language}[] { 
    title, 
    "href": link ${buttonQuery}.href,
    items[] ${buttonQuery} 
  },
  "legalLinks": legalLinks.${language}[] ${buttonQuery},
  "socials": socials.${language}[] {
    icon,
    ${buttonFieldsQuery},
  },
}
`;
