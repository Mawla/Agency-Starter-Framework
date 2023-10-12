import Wrapper from "../components/block/Wrapper";
import Button from "../components/buttons/Button";
import { buttonThemeFieldsQuery } from "../components/buttons/button.query";
import { decorationFieldsQuery } from "../components/decorations/decoration.query";
import PortableText from "../components/portabletext/PortableText";
import { LivePreviewProps } from "../components/previewmode/LivePreview";
import { Scripts } from "../components/script/Script";
import PricingTable from "../components/table/PricingTable";
import Text from "../components/text/Text";
import Title from "../components/title/Title";
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
import { backgroundClasses } from "../theme";
import { ColorType } from "../types";
import cx from "classnames";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";

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

  /**
   * Bail if not in preview mode
   */

  useEffect(() => {
    if (!isPreviewMode) router.push("/");
  }, [isPreviewMode, router]);

  /**
   * Notify studio that iframe is ready to listen for updates
   */

  useEffect(() => {
    window.parent.postMessage({ type: "document-preview-iframe-ready" }, "*");
  }, []);

  /**
   * Listen for updates
   */

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data.type == "document-preview-update") {
        setData(e.data.document);
      }
    }

    window.addEventListener("message", onMessage, false);
    () => window.removeEventListener("message", onMessage);
  }, []);

  if (!id) return null;
  id = id.startsWith("drafts.") ? id : `drafts.${id}`;
  if (previewType.startsWith("preset.") || documentType === "preset.blocks")
    id = id.replace("drafts.", "");

  return (
    <div
      className={cx(
        "pb-20",
        data?.preview?.styles?.background &&
          backgroundClasses[data?.preview?.styles?.background as ColorType],
        data?.preview?.styles?.background && "p-4",
      )}
    >
      <Page
        navigation={null as unknown as NavigationType}
        page={data}
        isPreviewMode={isPreviewMode}
        footer={null as unknown as FooterType}
        config={config}
      />

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.3/iframeResizer.contentWindow.js" />
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
