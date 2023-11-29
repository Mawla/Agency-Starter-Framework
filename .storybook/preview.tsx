import { PageContext } from "../context/PageContext";
import { SiteContext } from "../context/SiteContext";
import "../public/engine.styles.css";
import "../styles/styles.css";
import { Preview } from "@storybook/react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const preview: Preview = {
  parameters: {
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
    options: {
      storySort: (a, b) => {
        return a.title.localeCompare(b.title, "en", {
          numeric: a.title.startsWith("Blocks"),
        });
      },
    },
  },
};

export default preview;

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
              language: "en",
              sitemapItem: {
                _id: "xx",
                _type: "page.content",
                _updatedAt: "2022-01-04T14:26:24Z",
                path: "/page1",
                title: "Page 1",
              },
              breadcrumb: [],
              languageAlternates: [],
            }}
          >
            <div className={`font-text`}>
              <Story />
            </div>
          </PageContext.Provider>
        </SiteContext.Provider>
      </QueryClientProvider>
    );
  },
];
