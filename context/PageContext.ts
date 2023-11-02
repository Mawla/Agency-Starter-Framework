import { FlatBreadcrumbType } from "../components/breadcrumb/breadcrumb.query";
import { baseLanguage, LanguageType } from "../languages";
import {
  LanguageAlternateType,
  SitemapItemType,
} from "../queries/sitemap.query";
import React from "react";

export const PageContext = React.createContext({
  sitemapItem: {} as SitemapItemType,
  language: baseLanguage as LanguageType,
  breadcrumb: [] as FlatBreadcrumbType,
  languageAlternates: [] as LanguageAlternateType[],
});
