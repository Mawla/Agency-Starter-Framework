import { LivePreviewProps } from "../components/previewmode/LivePreview";
import { ScriptsPreviewProps } from "../components/previewmode/ScriptsPreview";
import { config as sanityConfig } from "../helpers/sanity/config";
import { getClient } from "../helpers/sanity/server";
import { baseLanguage, LanguageType } from "../languages";
import { FooterType } from "../layout/footer/footer.query";
import { NavigationType } from "../layout/navigation/navigation.query";
import { Page } from "../layout/pages/Page";
import { ConfigType, getConfigQuery } from "../queries/config.query";
import { getPageQuery, PageType } from "../queries/page.query";
import type { GetStaticProps } from "next";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { ComponentType, lazy, useEffect, useState } from "react";

const LivePreview = lazy<ComponentType<LivePreviewProps>>(
  () =>
    import(
      /* webpackChunkName: "LivePreview" */ "../components/previewmode/LivePreview"
    ),
);
const ScriptsPreview = lazy<ComponentType<ScriptsPreviewProps>>(
  () =>
    import(
      /* webpackChunkName: "ScriptsPreview" */ "../components/previewmode/ScriptsPreview"
    ),
);

export default function PreviewPage({
  preview,
  config,
}: {
  preview: boolean;
  config: ConfigType;
}) {
  const isPreviewMode = preview;
  const router = useRouter();

  const [page, setPage] = useState<PageType | null>(null);
  const [navigation] = useState<NavigationType | null>(null);
  const [footer] = useState<FooterType | null>(null);

  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  const language = router.query.language as LanguageType;
  const pagePath = usePathname() || "";

  useEffect(() => {
    if (!isPreviewMode) router.push("/");
  }, [isPreviewMode, router]);

  if (!id) return null;

  return (
    <div>
      {isPreviewMode && (
        <LivePreview
          setPageData={setPage}
          updatedAt={page?._updatedAt}
          pageId={id}
          config={sanityConfig}
          getQuery={() => getPageQuery(language)}
          queryParams={{
            _id: id,
            language,
          }}
          pagePath={pagePath}
        />
      )}

      {page?._type === "script" && <ScriptsPreview page={page} />}

      {page && (
        <Page
          navigation={navigation as NavigationType}
          page={page}
          isPreviewMode={isPreviewMode}
          footer={footer as FooterType}
          config={config}
        />
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  locale,
}) => {
  const config: ConfigType = await getClient(preview).fetch(
    getConfigQuery((locale as LanguageType) || baseLanguage),
  );

  return { props: { preview, config }, revalidate: 10 };
};
