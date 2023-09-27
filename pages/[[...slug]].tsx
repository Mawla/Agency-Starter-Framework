import { Wrapper } from "../components/block/Wrapper";
import {
  FlatBreadcrumbType,
  NestedBreadcrumbType,
} from "../components/breadcrumb/breadcrumb.query";
import { LoadingAnimation } from "../components/loaders/LoadingAnimation";
import { getClient } from "../helpers/sanity/server";
import { getFlatBreadcrumb } from "../helpers/sitemap/getFlatBreadcrumb";
import { baseLanguage, LanguageType } from "../languages";
import { Footer } from "../layout/footer/Footer";
import { getFooterQuery, FooterType } from "../layout/footer/footer.query";
import { Navigation } from "../layout/navigation/Navigation";
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
import { STATIC_LINKABLE_SCHEMAS } from "../types.sanity";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import React from "react";

const IS_PRODUCION = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

const SlugPage = ({
  config,
  navigation,
  footer,
  page,
  preview,
  sitemapItem,
  locked,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  // fallback page
  if (!page || router.isFallback) {
    return (
      <>
        <Navigation items={[]} buttons={[]} logo={navigation?.logo} />
        <Wrapper>
          <LoadingAnimation />
        </Wrapper>
        <Footer links={[]} socials={[]} copyright="" />
      </>
    );
  }

  return (
    <Page
      navigation={navigation}
      page={page}
      isPreviewMode={preview}
      footer={footer}
      config={config}
      sitemapItem={sitemapItem}
      locked={locked}
    />
  );
};

export default SlugPage;

type StaticProps = {
  config: ConfigType;
  footer: FooterType;
  navigation: NavigationType;
  notFound?: boolean;
  page: PageType;
  preview?: boolean;
  revalidate?: number;
  sitemapItem?: SitemapItemType;
  breadcrumb?: FlatBreadcrumbType;
  locked?: boolean;
};

/**
 * Get static props:
 * - sitemap for resolving all links
 * - navigation
 * - page
 * - footer
 */

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  locale,
}) => {
  const slug = params?.slug || "";
  const language = (locale as LanguageType) || baseLanguage;

  let path = Array.isArray(slug) ? `/${slug.join("/")}` : `/${slug}`;
  const finalSlug = slug[slug.length - 1];

  // fetch sitemap
  let sitemap = (await getClient(preview).fetch(
    getSitemapQuery(),
  )) as SitemapType;
  sitemap = sitemap.filter(Boolean);

  if (!sitemap.length) return { notFound: true };

  // get draft page or published page in preview mode
  const sitemapItem = preview
    ? sitemap.find(
        (item) =>
          item.path === path &&
          item._id.startsWith(`drafts.`) &&
          item?.language == language,
      ) ||
      sitemap.find((item) => item.path === path && item?.language == language)
    : // get published page in production mode
      sitemap?.find(
        (item) => item?.path === path && item?.language == language,
      );

  if (!sitemapItem) return { notFound: true };

  // fetch config
  const config = (await getClient(preview).fetch(
    getConfigQuery(language),
  )) as ConfigType;

  // fetch navigation
  let navigation = (await getClient(preview).fetch(
    getNavigationQuery(language),
  )) as NavigationType;

  // fetch navigation
  const footer = (await getClient(preview).fetch(
    getFooterQuery(language),
  )) as FooterType;

  // fetch page
  const page = await getClient(preview).fetch(getPageQuery(language), {
    ...sitemapItem,
    language,
  });

  if (page.navigation) navigation = page.navigation;

  if (page?.breadcrumb)
    page.breadcrumb = [
      page?.homepage,
      ...getFlatBreadcrumb(page.breadcrumb as NestedBreadcrumbType).reverse(),
    ].filter(Boolean);

  const props: StaticProps = {
    config,
    footer,
    navigation,
    page,
    preview,
    sitemapItem,
  };

  // if page is locked let no page data leak through
  if (page.locked) {
    props.page.blocks = [];
    props.page.seo = { excludeFromSitemap: true };
    props.locked = true;
  }

  if (!page) return { notFound: true };
  if (!page?.blocks?.length && !page.locked) {
    if (!IS_PRODUCION)
      console.log(
        `No blocks, rendering 404. The page exists but has no content.\n${sitemapItem.path}`,
      );
    return { notFound: true };
  }

  return { props, revalidate: 10 };
};

/**
 * Static paths
 */

export const getStaticPaths: GetStaticPaths = async () => {
  const sitemap = (await getClient(false).fetch(
    getSitemapQuery(),
  )) as SitemapType;

  // don't build on preview environments
  if (
    !process.env.VERCEL_GIT_COMMIT_REF ||
    !["production", "staging"].includes(process.env.VERCEL_GIT_COMMIT_REF)
  ) {
    console.log("not building on preview environment");
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  // get static generation blacklist so we can exclude pages like page.blog or page.content
  const staticGenerationBlacklist: string[] | null = await getClient(
    true,
  ).fetch(
    `*[_id == "secret.config_deployment"][0] { staticGenerationBlacklist }.staticGenerationBlacklist`,
  );

  if (staticGenerationBlacklist?.length) {
    console.log(
      `static generation blacklist: ${staticGenerationBlacklist.join(", ")}`,
    );
  }

  const paths = sitemap
    .filter(Boolean)
    .filter((item) => !STATIC_LINKABLE_SCHEMAS.includes(item._type))
    .filter((item) => !staticGenerationBlacklist?.includes(item._type))
    .map((item) => ({
      params: {
        slug: item?.path?.split("/").splice(1),
      },
      locale: item.language,
    }))
    .filter((path) => path.params.slug?.length);

  return {
    paths,
    fallback: true,
  };
};
