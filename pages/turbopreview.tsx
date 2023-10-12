import Wrapper from "../components/block/Wrapper";
import Button from "../components/buttons/Button";
import { buttonThemeFieldsQuery } from "../components/buttons/button.query";
import { decorationFieldsQuery } from "../components/decorations/decoration.query";
import PortableText from "../components/portabletext/PortableText";
import { Scripts } from "../components/script/Script";
import PricingTable from "../components/table/PricingTable";
import Text from "../components/text/Text";
import Title from "../components/title/Title";
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
import { parse, evaluate } from "groq-js";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
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

  let previewType =
    document?._type.startsWith("page.") || document?._type === "preset.blocks"
      ? "page"
      : document?._type;

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
  }, [router.asPath]);

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

      /**
       * Scroll block in view when form dialog is opened
       * in the Sanity studio
       */

      // scroll to block
      else if (
        e.data.type == "preview-view-scroll-to-block" &&
        e.data.blockKey
      ) {
        const element = window?.document.querySelector(
          `[data-key="${e.data.blockKey}"]`,
        );

        if (element) {
          window.scrollBy({ top: element?.getBoundingClientRect().top - 60 });
        }
      }

      // highlight block or decorations on hover
      else if (e.data.type == "preview-view-highlight-hover" && e.data.key) {
        const element = window?.document.querySelector(
          `[data-key="${e.data.key}"]`,
        ) as HTMLElement;

        if (element) {
          if (e.data.enabled) {
            element.classList.add("preview-highlight-hover");
          } else {
            element.classList.remove("preview-highlight-hover");
          }
        }
      }

      // highlight block or decorations on open
      else if (e.data.type == "preview-view-highlight-open" && e.data.key) {
        const element = window?.document.querySelector(
          `[data-key="${e.data.key}"]`,
        ) as HTMLElement;

        if (element) {
          if (e.data.enabled) {
            element.classList.add("preview-highlight-open");
          } else {
            element.classList.remove("preview-highlight-open");
          }
        }
      }
    }

    window.addEventListener("message", onMessage, false);
    () => window.removeEventListener("message", onMessage);
  }, []);

  /**
   * Update
   */

  const getQuery = () => {
    if (document._type === "navigation") {
      return getNavigationQuery(language);
    }

    if (document._type === "footer") {
      return getFooterQuery(language);
    }

    if (document._type === "preset.button") {
      return `
      *[_id == $_id][0] {
        _rev,
        _updatedAt,
        "name": slug.current,
        ${buttonThemeFieldsQuery}
        ...,
      }
      `;
    }

    if (document._type === "preset.decoration") {
      return `
      *[_id == $_id][0] {
        _rev,
        _updatedAt,
        ${decorationFieldsQuery}
      }
      `;
    }

    if (
      [
        "script",
        "preset.theme.title",
        "preset.theme.text",
        "preset.theme.block",
      ].includes(document._type)
    ) {
      return `
      *[_id == $_id][0] {
        _rev,
        _updatedAt,
        ...
      }
      `;
    }

    if (["pricing.feature"].includes(document._type)) {
      return `
      *[_id == $_id][0] {
        _rev,
        _updatedAt,
        "features": [
          {
            _id,
            title,
            "csv": file.asset->url
          }
        ]
      }
      `;
    }

    return getPageQuery(language);
  };

  useEffect(() => {
    if (!document) return;
    if (!dataset) return;

    async function update() {
      if (!document._id) return;
      let tree = parse(getQuery());
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
        previewDocument?.preview?.styles?.background &&
          backgroundClasses[
            previewDocument?.preview?.styles?.background as ColorType
          ],
        previewDocument?.preview?.styles?.background && "p-4",
      )}
    >
      {previewType === "page" && previewDocument && (
        <Page
          navigation={null as unknown as NavigationType}
          page={previewDocument}
          isPreviewMode={false}
          footer={null as unknown as FooterType}
          config={config}
        />
      )}
      {previewType === "navigation" && previewDocument && (
        <Navigation {...previewDocument} />
      )}
      {previewType === "footer" && previewDocument && (
        <Footer {...previewDocument} />
      )}
      {previewType === "preset.button" && previewDocument && (
        <div className="relative z-1">
          <Button
            presetTheme={previewDocument}
            label={
              previewDocument.preview?.text ||
              previewDocument.title ||
              "Click here"
            }
            href="/"
          />
        </div>
      )}
      {previewType === "preset.decoration" && previewDocument && (
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
            decorations={[previewDocument]}
          />
        </div>
      )}
      {previewType === "script" && previewDocument && (
        <Scripts items={previewDocument?.items} />
      )}
      {previewType === "preset.theme.title" && previewDocument && (
        <Title {...previewDocument.theme}>
          {previewDocument.preview?.text || previewDocument.title}
        </Title>
      )}
      {previewType === "preset.theme.text" && previewDocument && (
        <Text
          size={previewDocument.theme?.size}
          color={previewDocument.theme?.color}
          weight={previewDocument.theme?.weight}
        >
          <PortableText
            content={previewDocument.preview?.text || previewDocument.title}
          />
        </Text>
      )}
      {previewType === "preset.theme.block" && previewDocument && (
        <Wrapper
          theme={{
            ...previewDocument?.theme,
          }}
        >
          {previewDocument.preview?.text || previewDocument.title}
        </Wrapper>
      )}
      {previewType === "pricing.feature" && previewDocument && (
        <PricingTable {...previewDocument} />
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
