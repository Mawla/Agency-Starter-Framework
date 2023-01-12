import { PageContext } from "../context/PageContext";
import { SiteContext } from "../context/SiteContext";
import { SitemapItemType } from "../queries/sitemap";
import "../styles/plyr-custom.css";
import "../styles/plyr.css";
import "../styles/styles.css";
import { RouterContext } from "next/dist/shared/lib/router-context";
import * as NextImage from "next/image";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        "Introduction",
        "Framework",
        "Templates",
        "Components",
        "Modules",
      ],
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    asPath: "/page1/page2/page3",
    locale: "en",
  },
};

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => (
    <OriginalNextImage {...props} unoptimized loader={({ src }) => src} />
  ),
});

const DEMO_SITEMAP: SitemapItemType[] = [
  {
    _id: "xx",
    _type: "page.content",
    _updatedAt: "2022-01-04T14:26:24Z",
    path: "/page1",
    title: "Page 1",
    paths: {
      en: "/",
      it: "/",
      es: "/",
    },
    titles: {
      en: "/",
      it: "/",
      es: "/",
    },
  },
  {
    _id: "xx",
    _type: "page.content",
    _updatedAt: "2022-01-04T15:03:13Z",
    path: "/page1/page2",
    title: "Page 2",
    paths: {
      en: "/",
      it: "/",
      es: "/",
    },
    titles: {
      en: "/",
      it: "/",
      es: "/",
    },
  },
  {
    _id: "xxx",
    _type: "page.content",
    _updatedAt: "2022-01-04T15:03:13Z",
    path: "/page1/page2/page3",
    title: "Page 3",
    paths: {
      en: "/",
      it: "/",
      es: "/",
    },
    titles: {
      en: "/",
      it: "/",
      es: "/",
    },
  },
];

const queryClient = new QueryClient();

export const decorators = [
  (Story) => {
    return (
      <QueryClientProvider client={queryClient}>
        <SiteContext.Provider
          value={{
            config: { general: {} },
            sitemap: DEMO_SITEMAP,
          }}
        >
          <PageContext.Provider
            value={{
              isPreviewMode: false,
              language: "en",
              sitemapItem: DEMO_SITEMAP[0],
            }}
          >
            <Story />
          </PageContext.Provider>
        </SiteContext.Provider>
      </QueryClientProvider>
    );
  },
];
