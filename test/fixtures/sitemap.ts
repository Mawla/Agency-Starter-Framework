import { SitemapType } from "../../queries/sitemap.query";

export const DEMO_SITEMAP: SitemapType = [
  {
    _id: "xxx1",
    _type: "page.content",
    title: "content page",
    path: "/page1",
    _updatedAt: "xxx",
  },
  {
    _id: "xxx2",
    _type: "page.content",
    title: "content page 2",
    path: "/page1/page2",
    _updatedAt: "xxx",
  },
  {
    _id: "xxx3",
    _type: "page.content",
    title: "content page 3",
    path: "/es/page1/page2/page3",
    _updatedAt: "xxx",
  },
];
