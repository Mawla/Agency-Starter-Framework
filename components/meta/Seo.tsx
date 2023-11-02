import { PageContext } from "../../context/PageContext";
import { getURLForPath } from "../../helpers/sitemap/getURLForPath";
import { LanguageType } from "../../languages";
import { ConfigType } from "../../queries/config.query";
import { PageType } from "../../queries/page.query";
import { ScriptJsonLd } from "./ScriptJsonLd";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo } from "next-seo";
import NextHead from "next/head";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export type SeoProps = {
  config?: ConfigType;
  page?: PageType;
};

export const Seo = ({ config, page }: SeoProps) => {
  const router = useRouter();
  const isPreview = router.pathname.startsWith("/turbopreview");
  const { sitemapItem } = useContext(PageContext);
  const pagePath = usePathname() || "/";

  if (!config?.seo || !page || !sitemapItem) return null;

  const language = router.locale as LanguageType;

  const baseUrl = `https://${config?.general?.domain}`;
  const seoTitle = `${isPreview ? "Preview 👀 - " : ""}${
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

  const excludeFromSitemap = sitemapItem?.excludeFromSitemap;

  return (
    <>
      <NextHead>
        {config?.seo?.favicon?.apple_touch_icon && (
          <link
            rel="icon"
            type="image/x-icon"
            href={config?.seo?.favicon?.favicon_ico}
          />
        )}
        {config?.seo?.favicon?.apple_touch_icon && (
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={config?.seo?.favicon?.apple_touch_icon}
          />
        )}
        {config?.seo?.favicon?.favicon_32x32_png && (
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={config?.seo?.favicon?.favicon_32x32_png}
          />
        )}
        {config?.seo?.favicon?.favicon_16x16_png && (
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={config?.seo?.favicon?.favicon_16x16_png}
          />
        )}
        {config?.integrations?.googleSiteVerification && (
          <meta
            name="google-site-verification"
            content={config?.integrations?.googleSiteVerification}
          />
        )}
      </NextHead>
      <NextSeo
        title={seoTitle}
        noindex={excludeFromSitemap === true}
        nofollow={excludeFromSitemap === true}
        titleTemplate={`%s${config.seo.title ? config.seo.title : ""}`}
        description={seoDescription}
        canonical={seoCanonical}
        useAppDir={false}
        languageAlternates={
          !page?.languageAlternates
            ? []
            : page?.languageAlternates
                .filter(({ excludeFromSitemap }) => excludeFromSitemap !== true)
                .map(({ path, language }) => {
                  return {
                    hrefLang: language,
                    href: getURLForPath(config?.general?.domain, path),
                  };
                })
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

      {Boolean(page?.breadcrumb?.length) && (
        <BreadcrumbJsonLd
          itemListElements={page.breadcrumb.map(({ title, path }, index) => ({
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
