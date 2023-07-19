import { Seo } from "../../components/meta/Seo";
import { PageLock } from "../../components/pagelock/PageLock";
import { PreviewButton } from "../../components/previewmode/PreviewButton";
import { Scripts } from "../../components/script/Script";
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
import { PageBody } from "./PageBody";
import { useRouter } from "next/dist/client/router";
import { usePathname } from "next/navigation";
import React from "react";

export type PageProps = {
  isPreviewMode: boolean;
  navigation: NavigationProps;
  page: PageType;
  footer: FooterType;
  config: ConfigType;
  sitemapItem?: SitemapItemType;
  locked?: boolean;
  children?: React.ReactNode | React.ReactElement;
};

export const Page = ({
  isPreviewMode,
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

  // set active state
  const navItems = navigation?.items?.map((item) => ({
    ...item,
    current:
      pagePath === "/"
        ? item.href === "/"
        : pagePath.startsWith(item.href || "") && item.href !== "/",
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
          isPreviewMode,
          sitemapItem: (sitemapItem || {}) as SitemapItemType,
          language: router.locale as LanguageType,
          breadcrumb: page?.breadcrumb,
          languageAlternates:
            page?.languageAlternates as LanguageAlternateType[],
        }}
      >
        <Seo page={page} config={config} isPreviewMode={isPreviewMode} />
        {page && navigation && !isPreviewMode && (
          <Navigation
            items={page.hideNav === true ? [] : navItems}
            buttons={page.hideNav === true ? [] : navigation.buttons}
            logo={navigation.logo}
          />
        )}

        <PageBody {...page} />
        {children}
        {isPreviewMode && pagePath !== "/preview" && (
          <div className="text-md fixed top-4 right-4 z-50 flex gap-1 text-white">
            <PreviewButton pagePath={pagePath} />
          </div>
        )}
        {locked && !isPreviewMode && <PageLock />}
        {page && footer && !isPreviewMode && (
          <Footer
            links={page.hideFooter === true ? [] : footer.links}
            socials={page.hideFooter === true ? [] : footer.socials}
            copyright={footer.copyright}
            legal={footer.legal}
            legalLinks={footer.legalLinks}
            logo={footer.logo}
          />
        )}

        {!isPreviewMode &&
          config.integrations?.scripts
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
