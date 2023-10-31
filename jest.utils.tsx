import { PageContext } from "./context/PageContext";
import { SiteContext } from "./context/SiteContext";
import { SitemapItemType } from "./queries/sitemap.query";
import { DEMO_FLAT_BREADCRUMB } from "./test/fixtures/breadcrumb";
// test-utils.js
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const DEMO_SITEMAP: SitemapItemType[] = [
  {
    _id: "xx",
    _type: "page.content",
    _updatedAt: "2022-01-04T14:26:24Z",
    path: "/page1",
    title: "Page 1",
  },
  {
    _id: "xx",
    _type: "page.content",
    _updatedAt: "2022-01-04T15:03:13Z",
    path: "/page1/page2",
    title: "Page 2",
  },
  {
    _id: "xxx",
    _type: "page.content",
    _updatedAt: "2022-01-04T15:03:13Z",
    path: "/page1/page2/page3",
    title: "Page 3",
  },
];

const Wrapper = ({ children }: { children: React.ReactElement }) => {
  return (
    <SiteContext.Provider
      value={{
        config: { general: {} },
      }}
    >
      <PageContext.Provider
        value={{
          language: "en",
          sitemapItem: DEMO_SITEMAP[0],
          breadcrumb: DEMO_FLAT_BREADCRUMB,
          languageAlternates: [],
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PageContext.Provider>
    </SiteContext.Provider>
  );
};

const customRender = (ui: React.ReactElement) =>
  render(ui, { wrapper: Wrapper });

export * from "@testing-library/react";
export { customRender as render };

jest.mock("swiper/css", jest.fn());
jest.mock("swiper/css/navigation", jest.fn());
jest.mock("swiper/css/effect-fade", jest.fn());

export {};
