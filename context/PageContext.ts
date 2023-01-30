import { baseLanguage, LanguageType } from "../languages";
import { FlatBreadcrumbType } from "../queries/breadcrumb";
import { SitemapItemType } from "../queries/sitemap";
import React from "react";

export const PageContext = React.createContext({
  isPreviewMode: false,
  sitemapItem: {} as SitemapItemType,
  language: baseLanguage as LanguageType,
  breadcrumb: [] as FlatBreadcrumbType,
});
