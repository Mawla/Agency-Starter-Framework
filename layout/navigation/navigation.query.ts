import { ButtonProps } from "../../components/buttons/Button";
import {
  buttonFieldsWithoutDefaultThemeQuery,
  linkQuery,
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
  items?: NavigationItemType[];
  buttons?: NavigationItemType[];
  breadcrumb?: {
    hidden?: boolean;
  };
  theme?: NavigationProps["theme"];
};

export const getNavigationQuery = (language: LanguageType) => groq`
{
  "sitemap": ${getSitemapQuery()}
} {
  sitemap,
  "navigation": *[_id == "navigation__i18n_${language}"][0] {
    _updatedAt,
    _rev,
    "items": items[] {
      _key,
      button {
        ${buttonFieldsWithoutDefaultThemeQuery}
      },
      children[] {
        _key,
        ${buttonFieldsWithoutDefaultThemeQuery}
      }
    },
    "buttons": buttons[] {
      _key,
      ${buttonFieldsWithoutDefaultThemeQuery}
    },
    logo {
      "mobile": ${getImageQuery("mobile")},
      "desktop": ${getImageQuery("desktop")},
    },
    banner {
      content,
      link ${linkQuery}
    },
    theme,
  },
}.navigation
`;
