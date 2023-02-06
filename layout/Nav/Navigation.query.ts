import { ButtonProps } from "../../components/buttons/Button";
import {
  buttonQuery,
  buttonWithChildrenQuery,
} from "../../components/buttons/Button.query";
import { LanguageType } from "../../languages";
import { getSitemapQuery } from "../../queries/sitemap.query";
import groq from "groq";

export type NavigationItemType = ButtonProps & {
  children?: ButtonProps[];
};

export type NavigationType = {
  title: string;
  items: NavigationItemType[];
  buttons: NavigationItemType[];
};

export const getNavigationQuery = (language: LanguageType) => groq`
{
  "sitemap": ${getSitemapQuery()}
} {
  sitemap,
  "navigation": *[_id == 'navigation'][0] {
    "items": items.${language}[] ${buttonWithChildrenQuery},
    "buttons": buttons.${language}[] ${buttonQuery},
  }
}.navigation
`;
