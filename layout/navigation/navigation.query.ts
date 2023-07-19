import { ButtonProps } from "../../components/buttons/Button";
import {
  buttonQuery,
  buttonWithChildrenQuery,
} from "../../components/buttons/button.query";
import { getImageQuery } from "../../components/images/image.query";
import { LanguageType } from "../../languages";
import { getSitemapQuery } from "../../queries/sitemap.query";
import { NavigationProps } from "./Navigation";
import groq from "groq";

export type NavigationItemType = ButtonProps & {
  children?: ButtonProps[];
};

export type NavigationType = {
  title: string;
  items: NavigationItemType[];
  buttons: NavigationItemType[];
  theme?: NavigationProps["theme"];
};

export const getNavigationQuery = (language: LanguageType) => groq`
{
  "sitemap": ${getSitemapQuery()}
} {
  sitemap,
  "navigation": *[_id == "navigation__i18n_${language}"][0] {
    "items": items[] ${buttonWithChildrenQuery},
    "buttons": buttons[] ${buttonQuery},
    logo {
      "mobile": ${getImageQuery("mobile")},
      "desktop": ${getImageQuery("desktop")},
    },
    theme
  }
}.navigation
`;
