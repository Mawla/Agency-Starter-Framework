import Wrapper from "../components/block/Wrapper";
import Button from "../components/buttons/Button";
import { buttonThemeFieldsQuery } from "../components/buttons/button.query";
import { decorationFieldsQuery } from "../components/decorations/decoration.query";
import { LivePreviewProps } from "../components/previewmode/LivePreview";
import { config as sanityConfig } from "../helpers/sanity/config";
import { getClient } from "../helpers/sanity/server";
import { baseLanguage, LanguageType } from "../languages";
import { Footer } from "../layout/footer/Footer";
import { FooterType, getFooterQuery } from "../layout/footer/footer.query";
import { Navigation } from "../layout/navigation/Navigation";
import {
  getNavigationQuery,
  NavigationType,
} from "../layout/navigation/navigation.query";
import { Page } from "../layout/pages/Page";
import { ConfigType, getConfigQuery } from "../queries/config.query";
import { getPageQuery } from "../queries/page.query";
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

  let documentType = Array.isArray(router.query.type)
    ? router.query.type[0]
    : router.query.type || "page";
  let previewType =
    documentType.startsWith("page.") || documentType === "preset.blocks"
      ? "page"
      : documentType;

  const language = router.query.language as LanguageType;

  useEffect(() => {
    if (!isPreviewMode) router.push("/");
  }, [isPreviewMode, router]);

  if (!id) return null;
  id = id.startsWith("drafts.") ? id : `drafts.${id}`;

  const getQuery = () => {
    if (documentType === "navigation") {
      return getNavigationQuery(language);
    }

    if (documentType === "footer") {
      return getFooterQuery(language);
    }

    if (documentType === "preset.button") {
      return `
      *[_id == $_id][0] {
        _rev,
        _updatedAt,
        "name": slug.current,
        ${buttonThemeFieldsQuery}
      }
      `;
    }
    if (documentType === "preset.decoration") {
      return `
      *[_id == $_id][0] {
        _rev,
        _updatedAt,
        ${decorationFieldsQuery}
      }
      `;
    }
    return getPageQuery(language);
  };

  return (
    <div>
      {isPreviewMode && (
        <LivePreview
          setData={setData}
          updatedAt={data?._updatedAt}
          id={id}
          config={sanityConfig}
          getQuery={getQuery}
          position={
            ["navigation", "preset.decoration"].includes(previewType)
              ? "bottom"
              : "top"
          }
          showMiniMap={previewType === "page"}
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

      {previewType === "footer" && data && <Footer {...data} />}

      {previewType === "preset.button" && data && (
        <div className="p-4 bg-[#fafafa]">
          <Button presetTheme={data} label="This is a button" href="/" />
        </div>
      )}

      {previewType === "preset.decoration" && data && (
        <div className="bg-black/10">
          <Wrapper
            theme={{
              background: "white",
              text: "white",
              width: "inner",
              margin: {
                top: "lg",
                bottom: "lg",
              },
              padding: {
                top: "xl",
                bottom: "xl",
              },
            }}
            decorations={[data]}
          />
        </div>
      )}
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
