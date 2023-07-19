import { getClient } from "../helpers/sanity/server";
import { languages, LanguageType } from "../languages";
import { getFooterQuery, FooterType } from "../layout/footer/footer.query";
import {
  getNavigationQuery,
  NavigationType,
} from "../layout/navigation/navigation.query";
import { Page } from "../layout/pages/Page";
import { ConfigType, getConfigQuery } from "../queries/config.query";
import { getPageQuery, PageType } from "../queries/page.query";
import { SitemapItemType } from "../queries/sitemap.query";
import type { GetStaticProps } from "next";
import React from "react";

export default function Custom404({
  config,
  navigation,
  footer,
  isPreviewMode,
  page,
  sitemapItem,
}: StaticProps) {
  return (
    <Page
      navigation={navigation}
      page={page}
      isPreviewMode={isPreviewMode}
      footer={footer}
      config={config}
      sitemapItem={sitemapItem}
    />
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
};

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  locale,
}) => {
  const isPreviewMode = preview;
  const language = locale as LanguageType;

  // fetch config
  const config = (await getClient(isPreviewMode).fetch(
    getConfigQuery(language),
  )) as ConfigType;

  // fetch navigation
  const navigation = (await getClient(isPreviewMode).fetch(
    getNavigationQuery(language),
  )) as NavigationType;

  // fetch page
  const sitemapItem: SitemapItemType = {
    _id: `page_notfound__i18n_${language}`,
    _type: "page.notfound",
    title: "",
    path: "",
    _updatedAt: "",
    excludeFromSitemap: true,
  };
  const page = (await getClient(isPreviewMode).fetch(getPageQuery(language), {
    ...sitemapItem,
  })) as PageType;

  // fetch navigation
  const footer = (await getClient(isPreviewMode).fetch(
    getFooterQuery(language),
  )) as FooterType;

  // return object
  const props: StaticProps = {
    config,
    footer,
    navigation,
    page,
    isPreviewMode,
    sitemapItem,
  };

  return { props, revalidate: 10 };
};
