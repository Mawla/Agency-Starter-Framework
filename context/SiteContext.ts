import { ConfigType } from "../queries/config";
import { SitemapType } from "../queries/sitemap";
import React from "react";

export const SiteContext = React.createContext({
  sitemap: {} as SitemapType,
  config: {} as ConfigType,
});
