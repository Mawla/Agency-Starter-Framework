import Wrapper from "../components/block/Wrapper";
import Button from "../components/buttons/Button";
import { buttonThemeFieldsQuery } from "../components/buttons/button.query";
import { decorationFieldsQuery } from "../components/decorations/decoration.query";
import PortableText from "../components/portabletext/PortableText";
import { ScreenCapture } from "../components/previewmode/ScreenCapture";
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
import cx from "clsx";
import { parse, evaluate } from "groq-js";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

export default function PreviewPage({
  config,
  navigation,
  footer,
}: {
  config: ConfigType;
  navigation: NavigationType;
  footer: FooterType;
}) {
  const router = useRouter();

  const [dataset, setDataset] = useState<any>(null);
  const [document, setDocument] = useState<any>(null);
  const [previewDocument, setPreviewDocument] = useState<any>(null);
  const { id: documentId } = router.query;

  let previewType =
    document?._type.startsWith("page.") || document?._type === "preset.blocks"
      ? "page"
      : document?._type;

  const language = router.query.language as LanguageType;

  /**
   * Bail if not in preview mode or inside CMS iframe
   */
  useEffect(() => {
    if (window.self === window.top) router.push("/");
  }, [router]);

  /**
   * Notify studio that iframe is ready to listen for updates
   */

  useEffect(() => {
    if (!documentId) return;
    window.parent.postMessage(
      {
        type: "document-preview-iframe-ready",
        documentId: (documentId as string).replace("drafts.", ""),
      },
      "*",
    );
  }, [documentId]);

  const onReloadClick = useCallback(() => {
    window.parent.postMessage(
      {
        type: "document-preview-iframe-ready",
        documentId: (documentId as string).replace("drafts.", ""),
      },
      "*",
    );
  }, [documentId]);

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
    return () => window.removeEventListener("message", onMessage);
  }, []);

  /**
   * Update
   */

  const getQuery = () => {
    if (document._type === "navigation") {
      return getNavigationQuery(language).replace(
        `_id == "navigation`,
        `_id match "*navigation`,
      );
    }

    if (document._type === "footer") {
      return getFooterQuery(language).replace(
        `_id == "footer`,
        `_id match "*footer`,
      );
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
            "csv": coalesce(csv, file.asset->url),
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
      if (!dataset) return;
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

  if (!document || !dataset)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        viewBox="0 0 40 40"
        className="w-5 h-5 block fixed top-4 left-4"
      >
        <g
          fill="none"
          fillRule="evenodd"
          strokeWidth="3"
          transform="translate(2 2)"
        >
          <circle cx="18" cy="18" r="18" strokeOpacity="0.5"></circle>
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              dur=".35s"
              from="0 18 18"
              repeatCount="indefinite"
              to="360 18 18"
              type="rotate"
            ></animateTransform>
          </path>
        </g>
      </svg>
    );

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
      {/* refresh button */}
      <button
        className="bg-white text-[#333] hover:text-[#111] hover:bg-[#eee] grid place-items-center w-5 h-5 fixed top-1 right-1 pointer-events-auto z-[999]"
        title="Reload preview"
        onClick={onReloadClick}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      <ScreenCapture />
      {previewType === "page" && previewDocument && (
        <Page
          navigation={navigation as NavigationType}
          page={previewDocument}
          footer={footer as FooterType}
          config={config}
        />
      )}

      <div data-no-animate>
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
          <div className="p-10">
            <PricingTable {...previewDocument} />
          </div>
        )}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const config = (await getClient().fetch(
    getConfigQuery((locale as LanguageType) || baseLanguage),
  )) as ConfigType;

  // fetch navigation
  let navigation = (await getClient().fetch(
    getNavigationQuery(locale as LanguageType),
  )) as NavigationType;

  // fetch footer
  const footer = (await getClient().fetch(
    getFooterQuery(locale as LanguageType),
  )) as FooterType;

  return { props: { config, navigation, footer }, revalidate: 10 };
};
