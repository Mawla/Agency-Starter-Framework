import { PageContext } from "../context/PageContext";
import { SiteContext } from "../context/SiteContext";
import "../public/_theme.css";
import "../styles/styles.css";
import { RouterContext } from "next/dist/shared/lib/router-context";
import * as NextImage from "next/image";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { WithNextRouter } from "storybook-addon-next-router/dist/decorators";

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => (
    <OriginalNextImage {...props} unoptimized loader={({ src }) => src} />
  ),
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    asPath: "/page1/page2/page3",
    locale: "en",
  },
};

const queryClient = new QueryClient();

export const decorators = [
  (Story) => {
    return (
      <QueryClientProvider client={queryClient}>
        <SiteContext.Provider
          value={{
            config: { general: {} },
          }}
        >
          <PageContext.Provider
            value={{
              isPreviewMode: false,
              language: "en",
              sitemapItem: {
                _id: "xx",
                _type: "page.content",
                _updatedAt: "2022-01-04T14:26:24Z",
                path: "/page1",
                title: "Page 1",
              },
              breadcrumb: [],
              languageAlternates: [
                {
                  title: "Page1",
                  path: "/es",
                  language: "es",
                  excludeFromSitemap: false,
                },
              ],
            }}
          >
            <div className={`font-sans`}>
              <Story />
            </div>
          </PageContext.Provider>
        </SiteContext.Provider>
      </QueryClientProvider>
    );
  },
  WithNextRouter,
];
