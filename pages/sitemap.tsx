import { IconLoaderProps } from "../components/images/IconLoader";
import { getClient } from "../helpers/sanity/server";
import { languages, LanguageType } from "../languages";
import { getFooterQuery, FooterType } from "../layout/Footer/Footer.query";
import {
  getNavigationQuery,
  NavigationType,
} from "../layout/Nav/Navigation.query";
import { Page } from "../layout/pages/Page";
import { ConfigType, getConfigQuery } from "../queries/config.query";
import { getPageQuery, PageType } from "../queries/page.query";
import {
  getSitemapQuery,
  SitemapItemType,
  SitemapType,
} from "../queries/sitemap.query";
import type { GetStaticProps } from "next";
import Link from "next/link";
import React, { ComponentType, lazy } from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../components/images/IconLoader"
    ),
);

export default function Sitemap({
  config,
  navigation,
  footer,
  isPreviewMode,
  page,
  sitemapItem,
  sitemap,
  language,
}: StaticProps) {
  return (
    <Page
      navigation={navigation}
      page={page}
      isPreviewMode={isPreviewMode}
      footer={footer}
      config={config}
      sitemapItem={sitemapItem}
    >
      <ul className="max-w-inner mx-auto py-20">
        {sitemap.map(({ titles, paths, _id }: SitemapItemType) => {
          const depth = paths[language]
            ? paths[language].split("/").length - 2
            : 0;

          return (
            <li
              key={_id}
              className="mb-1"
              style={{
                paddingLeft: 10 * depth,
              }}
            >
              <IconLoader
                icon="chevron"
                className="w-3 h-3 -rotate-90 inline-block mr-1 align-middle"
              />
              <Link
                href={paths?.[language as LanguageType]}
                className="underline hover:no-underline"
              >
                {titles?.[language as LanguageType]}
              </Link>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}

type StaticProps = {
  config: ConfigType;
  footer: FooterType;
  navigation: NavigationType;
  page: PageType;
  isPreviewMode: boolean;
  revalidate?: number;
  sitemapItem?: SitemapItemType;
  sitemap: SitemapType;
  language: LanguageType;
};

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  locale,
}) => {
  const isPreviewMode = preview;
  const language = locale as LanguageType;

  // fetch config
  const config: ConfigType = await getClient(isPreviewMode).fetch(
    getConfigQuery(language),
    {
      language,
    },
  );

  // fetch navigation
  const navigation: NavigationType = await getClient(isPreviewMode).fetch(
    getNavigationQuery(language),
    { language },
  );

  // fetch page
  const sitemapItem: SitemapItemType = {
    _id: "page_sitemap",
    _type: "page.sitemap",
    title: "",
    path: "",
    _updatedAt: "",
    paths: languages.reduce(
      (acc, curr) => ({ [curr.id]: `/${curr.id}`, ...acc }),
      {} as Record<LanguageType, string>,
    ),
    titles: languages.reduce(
      (acc, curr) => ({ [curr.id]: `/${curr.id}`, ...acc }),
      {} as Record<LanguageType, string>,
    ),
    excludeFromSitemap: languages.reduce(
      (acc, curr) => ({ [curr.id]: true, ...acc }),
      {} as Record<LanguageType, boolean>,
    ),
  };
  const page = await getClient(isPreviewMode).fetch(getPageQuery(language), {
    language,
    ...sitemapItem,
  });

  // fetch navigation
  const footer: FooterType = await getClient(isPreviewMode).fetch(
    getFooterQuery(language),
    {
      language,
    },
  );

  // fetch sitemap
  let sitemap: SitemapType = await getClient(isPreviewMode).fetch(
    getSitemapQuery(),
  );
  sitemap = sitemap
    ?.filter((item: any) => Boolean(item.paths))
    ?.filter(({ titles, paths, excludeFromSitemap }: SitemapItemType) => {
      if (!titles?.[language as LanguageType]) return false;
      if (!paths?.[language as LanguageType]) return false;
      if (excludeFromSitemap?.[language as LanguageType]) return false;
      return true;
    })
    ?.sort((a: SitemapItemType, b: SitemapItemType) => {
      if (!a.paths?.[language]) return 1;
      if (!b.paths?.[language]) return 1;
      return a.paths[language].localeCompare(b.paths[language]);
    });

  // return object
  const props: StaticProps = {
    config,
    footer,
    navigation,
    page,
    isPreviewMode,
    sitemapItem,
    sitemap,
    language,
  };

  return { props, revalidate: 10 };
};
