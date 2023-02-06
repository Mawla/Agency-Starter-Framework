import { FlatBreadcrumbType } from "../components/Breadcrumb/breadcrumb.query";
import { baseLanguage, LanguageType } from "../languages";
import { SitemapItemType } from "../queries/sitemap.query";
import React from "react";

export const PageContext = React.createContext({
  isPreviewMode: false,
  sitemapItem: {} as SitemapItemType,
  language: baseLanguage as LanguageType,
  breadcrumb: [] as FlatBreadcrumbType,
});
