import { getClient } from "../helpers/sanity/server";
import { languages, LanguageType } from "../languages";
import { Page } from "../layout/pages/Page";
import { ConfigType, getConfigQuery } from "../queries/config";
import { getFooterQuery, FooterType } from "../queries/footer";
import { getNavigationQuery, NavigationType } from "../queries/navigation";
import { getPageQuery, PageType } from "../queries/page";
import {
  SitemapItemType,
  getSitemapQuery,
  SitemapType,
} from "../queries/sitemap";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";

export default function Custom404({
  config,
  navigation,
  footer,
  isPreviewMode,
  sitemap,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page
      navigation={navigation}
      page={page}
      isPreviewMode={isPreviewMode}
      footer={footer}
      config={config}
      sitemap={sitemap}
    />
  );
}

type StaticProps = {
  config: ConfigType;
  footer: FooterType;
  navigation: NavigationType;
  page: PageType;
  isPreviewMode?: boolean;
  revalidate?: number;
  sitemap: SitemapType;
};

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  locale,
}) => {
  const isPreviewMode = preview;
  const language = locale as LanguageType;

  // fetch sitemap
  const sitemap: SitemapType = await getClient(isPreviewMode).fetch(
    getSitemapQuery()
  );

  // fetch config
  const config: ConfigType = await getClient(isPreviewMode).fetch(
    getConfigQuery(language),
    {
      language,
    }
  );

  // fetch navigation
  const navigation: NavigationType = await getClient(isPreviewMode).fetch(
    getNavigationQuery(language),
    { sitemap, language }
  );

  // fetch page
  const notFoundPage: SitemapItemType = {
    _id: "page_notfound",
    _type: "page.notfound",
    title: "",
    path: "",
    _updatedAt: "",
    paths: languages.reduce(
      (acc, curr) => ({ [curr.id]: `/${curr.id}`, ...acc }),
      {} as Record<LanguageType, string>
    ),
    titles: languages.reduce(
      (acc, curr) => ({ [curr.id]: `/${curr.id}`, ...acc }),
      {} as Record<LanguageType, string>
    ),
  };
  const page = await getClient(isPreviewMode).fetch(getPageQuery(language), {
    sitemap,
    language,
    ...notFoundPage,
  });

  // fetch navigation
  const footer: FooterType = await getClient(isPreviewMode).fetch(
    getFooterQuery(language),
    {
      sitemap,
      language,
    }
  );

  // return object
  const props: StaticProps = {
    config,
    footer,
    navigation,
    page,
    isPreviewMode,
    sitemap,
  };

  return { props, revalidate: 10 };
};
