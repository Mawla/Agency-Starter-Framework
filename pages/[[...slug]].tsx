import { LoadingAnimation } from "../components/loaders/LoadingAnimation";
import { Wrapper } from "../components/module/Wrapper";
import { getClient } from "../helpers/sanity/server";
import { getFlatBreadcrumb } from "../helpers/sitemap/getFlatBreadcrumb";
import { baseLanguage, languages, LanguageType } from "../languages";
import { Footer } from "../layout/Footer/Footer";
import { Nav } from "../layout/Nav/Nav";
import { Page } from "../layout/pages/Page";
import {
  FlatBreadcrumbType,
  NestedBreadcrumbType,
} from "../queries/breadcrumb";
import { ConfigType, getConfigQuery } from "../queries/config";
import { getFooterQuery, FooterType } from "../queries/footer";
import { getNavigationQuery, NavigationType } from "../queries/navigation";
import { getPageQuery, PageType } from "../queries/page";
import {
  getSitemapQuery,
  SitemapItemType,
  SitemapType,
} from "../queries/sitemap";
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
        <Nav items={[]} buttons={[]} />
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
  let sitemap: SitemapType = await getClient(preview).fetch(getSitemapQuery());
  sitemap = sitemap.filter(Boolean);

  if (!sitemap.length) return { notFound: true };

  // get draft page or published page in preview mode
  const sitemapItem = preview
    ? sitemap.find(
        (item) =>
          item.paths[language] === path && item._id.startsWith(`drafts.`),
      ) || sitemap.find((item) => item.paths[language] === path)
    : // get published page in production mode
      sitemap?.find((item) => item?.paths?.[language] === path);

  if (!sitemapItem) return { notFound: true };

  // fetch config
  const config: ConfigType = await getClient(preview).fetch(
    getConfigQuery(language),
  );

  // fetch navigation
  let navigation: NavigationType = await getClient(preview).fetch(
    getNavigationQuery(language),
    {
      language,
    },
  );

  // fetch navigation
  const footer: FooterType = await getClient(preview).fetch(
    getFooterQuery(language),
    {
      language,
    },
  );

  // fetch page
  const page = await getClient(preview).fetch(getPageQuery(language), {
    ...sitemapItem,
    language,
    slug: finalSlug,
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
    props.page.hero = null;
    props.page.modules = [];
    props.page.dialogs = [];
    props.page.seo = { excludeFromSitemap: true };
    props.locked = true;
  }

  if (!page) return { notFound: true };
  if (!page?.hero && !page?.modules?.length && !page.locked) {
    if (!IS_PRODUCION)
      console.log(
        `No hero or modules, rendering 404. The page exists, it just has no content.`,
      );
    return { notFound: true };
  }

  return { props, revalidate: 10 };
};

/**
 * Static paths
 */

export const getStaticPaths: GetStaticPaths = async () => {
  const sitemap: SitemapType = await getClient(false).fetch(getSitemapQuery());

  const paths = sitemap
    .filter(Boolean)
    .reduce(
      (acc, curr) => [
        ...languages.map(({ id }) => ({
          params: {
            slug: curr?.paths?.[id]?.split("/").splice(1),
          },
          locale: id,
        })),
        ...acc,
      ],
      [] as { params: { slug: string[] }; locale: LanguageType }[],
    )
    .filter((path) => path.params.slug?.length);

  return {
    paths,
    fallback: true,
  };
};
