import { widthClasses } from "../components/block/width.options";
import { IconLoaderProps } from "../components/images/IconLoader";
import { getClient } from "../helpers/sanity/server";
import { LanguageType } from "../languages";
import { getFooterQuery, FooterType } from "../layout/footer/footer.query";
import {
  getNavigationQuery,
  NavigationType,
} from "../layout/navigation/navigation.query";
import { Page } from "../layout/pages/Page";
import { ConfigType, getConfigQuery } from "../queries/config.query";
import { getPageQuery, PageType } from "../queries/page.query";
import {
  getSitemapQuery,
  SitemapItemType,
  SitemapType,
} from "../queries/sitemap.query";
import cx from "clsx";
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
  page,
  sitemapItem,
  sitemap,
}: StaticProps) {
  return (
    <Page
      navigation={navigation}
      page={page}
      footer={footer}
      config={config}
      sitemapItem={sitemapItem}
    >
      <ul className={cx("mx-auto py-20", widthClasses.inner)}>
        {sitemap
          .filter(({ title, path }) => title && path)
          .map(({ title, path, _id, excludeFromSitemap }: SitemapItemType) => {
            const depth = path ? path.split("/").length - 2 : 0;
            if (excludeFromSitemap) return null;

            return (
              <li
                key={_id}
                className="mb-1"
                style={{
                  paddingLeft: 10 * depth,
                }}
              >
                <IconLoader
                  icon="chevrondown"
                  className="w-3 h-3 -rotate-90 inline-block mr-1 align-middle"
                />
                {path && title && (
                  <Link href={path} className="underline hover:no-underline">
                    {title}
                  </Link>
                )}
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
  revalidate?: number;
  sitemapItem?: SitemapItemType;
  sitemap: SitemapType;
  language: LanguageType;
};

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  locale,
}) => {
  const language = locale as LanguageType;

  // fetch config
  const config = (await getClient().fetch(
    getConfigQuery(language),
  )) as ConfigType;

  // fetch navigation
  const navigation = (await getClient().fetch(
    getNavigationQuery(language),
  )) as NavigationType;

  // fetch page
  const sitemapItem: SitemapItemType = {
    _id: `page_sitemap__i18n_${language}`,
    _type: "page.sitemap",
    title: "Sitemap",
    path: "/sitemap",
    _updatedAt: "",
    excludeFromSitemap: false,
  };
  const page = await getClient().fetch(getPageQuery(language), {
    ...sitemapItem,
    language,
  });

  // fetch navigation
  const footer = (await getClient().fetch(
    getFooterQuery(language),
  )) as FooterType;

  // fetch sitemap
  let sitemap = (await getClient().fetch(getSitemapQuery())) as SitemapType;
  sitemap = sitemap
    ?.filter((item: any) => Boolean(item.path))
    ?.filter(
      ({ title, path, excludeFromSitemap, language }: SitemapItemType) => {
        if (!title) return false;
        if (!path) return false;
        if (language !== locale) return false;
        if (excludeFromSitemap) return false;
        return true;
      },
    )
    ?.sort((a: SitemapItemType, b: SitemapItemType) => {
      if (!a.path) return 1;
      if (!b.path) return 1;
      return a.path.localeCompare(b.path);
    });

  // return object
  const props: StaticProps = {
    config,
    footer,
    navigation,
    page,
    sitemapItem,
    sitemap,
    language,
  };

  return { props, revalidate: 10 };
};
