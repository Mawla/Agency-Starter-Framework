import { PageContext } from "../../context/PageContext";
import { getBreadCrumbForPath } from "../../helpers/sitemap/getBreadCrumbForPath";
import { getURLForPath } from "../../helpers/sitemap/getURLForPath";
import { LanguageType } from "../../languages";
import { ConfigType } from "../../queries/config";
import { PageType } from "../../queries/page";
import { SitemapType } from "../../queries/sitemap";
import { ScriptJsonLd } from "./ScriptJsonLd";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo } from "next-seo";
import NextHead from "next/head";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const TagManager = require("react-gtm-module");

export type SeoProps = {
  config?: ConfigType;
  page?: PageType;
  sitemap?: SitemapType;
  isPreviewMode?: boolean;
};

export const Seo = ({ config, page, sitemap, isPreviewMode }: SeoProps) => {
  const router = useRouter();
  const { sitemapItem } = useContext(PageContext);
  const pagePath = usePathname() || "/";

  useEffect(() => {
    if (isPreviewMode) return;
    if (
      config?.integrations?.gtmid &&
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    )
      TagManager.initialize({ gtmId: config?.integrations?.gtmid });
  }, [config?.integrations?.gtmid, isPreviewMode]);

  if (!config?.seo || !page || !sitemap || !sitemapItem) return null;

  const language = router.locale as LanguageType;
  const sitemapItemPaths = sitemapItem?.paths;
  const sitemapItemExcludedPaths = sitemapItem?.excludeFromSitemap;

  const baseUrl = `https://${config?.general?.domain}`;
  const seoTitle = `${isPreviewMode ? "Preview mode 👀 - " : ""}${
    page.seo?.title || page.title
  }`;
  const seoDescription =
    page.description || page.seo?.description || config?.seo?.description;
  const seoCanonical = getURLForPath(config?.general?.domain, pagePath);

  const dynamicOGImageURL = `${baseUrl}/api/opengraph-image?id=${page._id}&language=${language}`;
  const seoImage = {
    url: dynamicOGImageURL,
    width: 1200,
    height: 630,
    alt: "",
  };

  const brandJsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: config?.general?.name,
    description: config?.seo?.description,
    logo: `${baseUrl}/logo.svg`,
    URL: baseUrl,
    sameAs: config?.social?.socials,
  };

  const breadCrumb = getBreadCrumbForPath(pagePath, sitemap, language);

  const excludeFromSitemap = sitemapItem?.excludeFromSitemap?.[language];

  return (
    <>
      <NextSeo
        title={seoTitle}
        noindex={excludeFromSitemap === true}
        nofollow={excludeFromSitemap === true}
        titleTemplate={`%s - ${config?.general?.name}`}
        description={seoDescription}
        canonical={seoCanonical}
        useAppDir={true}
        languageAlternates={
          sitemapItemPaths
            ? (Object.entries(sitemapItemPaths)
                .map(([language, pagePath]) => {
                  if (sitemapItemExcludedPaths?.[language as LanguageType])
                    return null;
                  return {
                    hrefLang: language,
                    href: getURLForPath(config?.general?.domain, pagePath),
                  };
                })
                .filter(Boolean) as {
                hrefLang: LanguageType;
                href: string;
              }[])
            : []
        }
        openGraph={{
          type: "website",
          url: seoCanonical,
          title: seoTitle,
          description: seoDescription,
          images: [seoImage],
          site_name: config?.general?.name,
        }}
        twitter={{
          handle: config?.social?.twitter?.handle,
          site: config?.social?.twitter?.url,
          cardType: "summary_large_image",
        }}
      />

      <LogoJsonLd logo={`${baseUrl}/logo.svg`} url={baseUrl} />

      {Boolean(breadCrumb?.length) && (
        <BreadcrumbJsonLd
          itemListElements={breadCrumb.map(({ title, path }, index) => ({
            position: index + 1,
            name: title,
            item: getURLForPath(config?.general?.domain, path),
          }))}
        />
      )}

      <NextHead>
        <ScriptJsonLd data={brandJsonLd} />
      </NextHead>
    </>
  );
};
