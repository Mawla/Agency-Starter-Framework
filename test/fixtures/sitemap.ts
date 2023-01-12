import { SitemapType } from "../../queries/sitemap";

export const DEMO_SITEMAP: SitemapType = [
  {
    _id: "xxx1",
    _type: "page.content",
    title: "content page",
    titles: {
      en: "Content page",
      it: "Content pagina",
      es: "Content página",
    },
    path: "/page1",
    paths: {
      en: "/page1",
      it: "/it/page1",
      es: "/es/page1",
    },
    _updatedAt: "xxx",
    excludeFromSitemap: {
      en: true,
      it: true,
      es: true,
    },
  },
  {
    _id: "xxx2",
    _type: "page.content",
    title: "content page 2",
    titles: {
      en: "Content page 2",
      it: "Content pagina 2",
      es: "Content página 2",
    },
    path: "/page1/page2",
    paths: {
      en: "/page1/page2",
      it: "/it/page1/page2",
      es: "/es/page1/page2",
    },
    _updatedAt: "xxx",
    excludeFromSitemap: {
      en: true,
      it: true,
      es: true,
    },
  },
  {
    _id: "xxx3",
    _type: "page.content",
    title: "content page 3",
    titles: {
      en: "Content page 3",
      it: "Content pagina 3",
      es: "Content página 3",
    },
    path: "/page1/page2/page3",
    paths: {
      en: "/page1/page2/page3",
      it: "/it/page1/page2/page3",
      es: "/es/page1/page2/page3",
    },
    _updatedAt: "xxx",
    excludeFromSitemap: {
      en: true,
      it: true,
      es: true,
    },
  },
];
