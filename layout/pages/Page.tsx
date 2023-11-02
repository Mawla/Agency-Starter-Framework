import { Seo } from "../../components/meta/Seo";
import { PageLock } from "../../components/pagelock/PageLock";
import { ScriptsType } from "../../components/script/Script";
import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { LanguageType } from "../../languages";
import { ConfigType } from "../../queries/config.query";
import { PageType } from "../../queries/page.query";
import {
  LanguageAlternateType,
  SitemapItemType,
} from "../../queries/sitemap.query";
import { Footer } from "../footer/Footer";
import { FooterType } from "../footer/footer.query";
import { Navigation } from "../navigation/Navigation";
import { NavigationProps } from "../navigation/Navigation";
import { BlockBuilder } from "../pagebuilder/BlockBuilder";
import ErrorBoundary from "../pagebuilder/ErrorBoundary";
import { useRouter } from "next/dist/client/router";
import { usePathname } from "next/navigation";
import React, { ComponentType, lazy } from "react";

const Scripts = lazy<ComponentType<ScriptsType>>(
  () =>
    import(/* webpackChunkName: "Scripts" */ "../../components/script/Script"),
);

export type PageProps = {
  navigation: NavigationProps;
  page: PageType;
  footer: FooterType;
  config: ConfigType;
  sitemapItem?: SitemapItemType;
  locked?: boolean;
  children?: React.ReactNode | React.ReactElement;
};

export const Page = ({
  navigation,
  page,
  footer,
  config,
  sitemapItem,
  locked,
  children,
}: PageProps) => {
  const router = useRouter();
  const pagePath = usePathname() || "";

  let isLightbox = router.asPath.indexOf("lightbox=1") > -1;

  // set active state
  const navItems = navigation?.items?.map((item) => ({
    ...item,
    current:
      pagePath === "/"
        ? item?.button?.href === "/"
        : pagePath.startsWith(item?.button?.href || "") &&
          Boolean(item?.button?.href) &&
          item?.button?.href !== "/",
    children: item.children?.map((subitem) => ({
      ...subitem,
      current: pagePath === subitem.href,
    })),
  }));

  return (
    <SiteContext.Provider
      value={{
        config,
      }}
    >
      <PageContext.Provider
        value={{
          sitemapItem: (sitemapItem || {}) as SitemapItemType,
          language: (router.query.language || router.locale) as LanguageType,
          breadcrumb: page?.breadcrumb,
          languageAlternates:
            page?.languageAlternates as LanguageAlternateType[],
        }}
      >
        <Seo page={page} config={config} />
        {page &&
          navigation &&
          !isLightbox &&
          page?._type.startsWith("page.") && (
            <ErrorBoundary>
              <Navigation
                items={page.hideNav === true ? [] : navItems}
                buttons={page.hideNav === true ? [] : navigation.buttons}
                logo={navigation.logo}
                banner={navigation.banner}
                theme={{
                  ...(navigation.theme || {}),
                  breadcrumb: {
                    ...(navigation.theme?.breadcrumb || {}),
                    hidden:
                      page.breadcrumb === null ||
                      page.hideBreadcrumb ||
                      navigation.theme?.breadcrumb?.hidden,
                  },
                }}
              />
            </ErrorBoundary>
          )}

        <BlockBuilder items={page?.blocks} />

        {children}

        {locked && !isLightbox && <PageLock />}

        {page && footer && !isLightbox && page?._type.startsWith("page.") && (
          <ErrorBoundary>
            <Footer
              links={page.hideFooter === true ? [] : footer.links}
              socials={page.hideFooter === true ? [] : footer.socials}
              copyright={footer.copyright}
              legal={footer.legal}
              legalLinks={footer.legalLinks}
              logo={footer.logo}
              info={footer.info}
              theme={footer.theme}
              hideBreadcrumb={page.hideBreadcrumb}
            />
          </ErrorBoundary>
        )}

        {[
          ...(config?.integrations?.globalScripts || []),
          ...(page?.scripts || []),
        ]
          ?.filter(Boolean)
          .map((script) => (
            <Scripts
              key={script.title}
              title={script.title}
              items={script.items}
            />
          ))}
      </PageContext.Provider>
    </SiteContext.Provider>
  );
};
