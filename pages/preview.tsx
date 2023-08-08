import { LivePreviewProps } from "../components/previewmode/LivePreview";
import { config as sanityConfig } from "../helpers/sanity/config";
import { getClient } from "../helpers/sanity/server";
import { baseLanguage, LanguageType } from "../languages";
import { FooterType } from "../layout/footer/footer.query";
import { Navigation } from "../layout/navigation/Navigation";
import {
  getNavigationQuery,
  NavigationType,
} from "../layout/navigation/navigation.query";
import { Page } from "../layout/pages/Page";
import { ConfigType, getConfigQuery } from "../queries/config.query";
import { getPageQuery, PageType } from "../queries/page.query";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { ComponentType, lazy, useEffect, useState } from "react";

const LivePreview = lazy<ComponentType<LivePreviewProps>>(
  () =>
    import(
      /* webpackChunkName: "LivePreview" */ "../components/previewmode/LivePreview"
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

  const [data, setData] = useState<any>(null);

  let id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  const language = router.query.language as LanguageType;

  useEffect(() => {
    if (!isPreviewMode) router.push("/");
  }, [isPreviewMode, router]);

  if (!id) return null;
  id = id.startsWith("drafts.") ? id : `drafts.${id}`;

  const getQuery = () => {
    if (router.query.type === "navigation") {
      return getNavigationQuery(language);
    }
    return getPageQuery(language);
  };

  let previewType: "page" | "navigation" = "page";
  if (router.query.type === "navigation") {
    previewType = "navigation";
  }

  return (
    <div>
      {isPreviewMode && (
        <LivePreview
          setData={setData}
          updatedAt={data?._updatedAt}
          id={id}
          config={sanityConfig}
          getQuery={getQuery}
        />
      )}

      {previewType === "page" && data && (
        <Page
          navigation={null as unknown as NavigationType}
          page={data}
          isPreviewMode={isPreviewMode}
          footer={null as unknown as FooterType}
          config={config}
        />
      )}

      {previewType === "navigation" && data && <Navigation {...data} />}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  locale,
}) => {
  const config = (await getClient(preview).fetch(
    getConfigQuery((locale as LanguageType) || baseLanguage),
  )) as ConfigType;

  return { props: { preview, config }, revalidate: 10 };
};
