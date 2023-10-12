import { getClient } from "../helpers/sanity/server";
import { baseLanguage, LanguageType } from "../languages";
import { FooterType } from "../layout/footer/footer.query";
import { NavigationType } from "../layout/navigation/navigation.query";
import { Page } from "../layout/pages/Page";
import { ConfigType, getConfigQuery } from "../queries/config.query";
import { getPageQuery } from "../queries/page.query";
import cx from "classnames";
import { parse, evaluate } from "groq-js";
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

  const [dataset, setDataset] = useState<any>(null);
  const [document, setDocument] = useState<any>(null);
  const [previewDocument, setPreviewDocument] = useState<any>(null);

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
      if (e.data.type == "document-preview-document") {
        setDocument(e.data.document);
      } else if (e.data.type == "document-preview-dataset") {
        setDataset(e.data.dataset);
      }
    }

    window.addEventListener("message", onMessage, false);
    () => window.removeEventListener("message", onMessage);
  }, []);

  /**
   * Update
   */

  useEffect(() => {
    if (!document) return;
    if (!dataset) return;

    async function update() {
      if (!document._id) return;
      let tree = parse(getPageQuery(language));
      let value = await evaluate(tree, {
        dataset: [document, ...dataset],
        params: { _id: document._id },
      });
      let result = await value.get();
      setPreviewDocument(result);
    }

    update();
  }, [dataset, document]);

  if (!document) return null;

  return (
    <div
      className={cx(
        "pb-20",
        // data?.preview?.styles?.background &&
        //   backgroundClasses[data?.preview?.styles?.background as ColorType],
        // data?.preview?.styles?.background && "p-4",
      )}
    >
      <Page
        navigation={null as unknown as NavigationType}
        page={previewDocument}
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
