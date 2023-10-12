import React, { useEffect, useRef } from "react";
import { useClient, useFormValue } from "sanity";
import { useDocumentPane } from "sanity/desk";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const DocumentPreview = () => {
  const document = useFormValue([]);
  const [state, setState] = React.useState<"loading" | "ready">("loading");
  const { openInspector } = useDocumentPane();
  const client = useClient({ apiVersion: "vX" });

  /**
   * Send the document to the preview pane
   */

  useEffect(() => {
    if (!document) return;

    const previewIframe = window.document.querySelector(
      ".previewView iframe",
    ) as HTMLIFrameElement;
    if (!previewIframe?.contentWindow) return;

    if (!previewIframe) return;

    previewIframe.contentWindow.postMessage(
      { type: "document-preview-document", document },
      import.meta.env.SANITY_STUDIO_PROJECT_PATH,
    );
  }, [document, state]);

  /**
   * Get entire dataset
   */

  useEffect(() => {
    if (!document) return;
    if (state !== "ready") return;

    async function getDataset() {
      const previewIframe = window.document.querySelector(
        ".previewView iframe",
      ) as HTMLIFrameElement;
      if (!previewIframe?.contentWindow) return;

      const dataset = await client.fetch(`*`);

      previewIframe.contentWindow.postMessage(
        { type: "document-preview-dataset", dataset },
        import.meta.env.SANITY_STUDIO_PROJECT_PATH,
      );
    }

    getDataset();
  }, [state]);

  /**
   * Listen for the iframe to be ready
   */

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data.type == "document-preview-iframe-ready") {
        setState("ready");
      }
    }

    window.addEventListener("message", onMessage, false);
    () => window.removeEventListener("message", onMessage);
  }, []);
  /**
   * Automatically open the preview pane
   */

  useEffect(() => {
    openInspector("preview-pane");
  }, []);

  // useEffect(() => {
  //   async function openPreview() {
  //     await sleep(1000);

  //     const isPreviewOpen = Boolean(
  //       window.document.querySelector(
  //         `[data-testid="document-pane"]:last-of-type [id*="tab-preview"][data-selected]`,
  //       ),
  //     );
  //     if (isPreviewOpen) return;

  //     const splitButton = window.document.querySelector(
  //       '[aria-label="Split pane right"]',
  //     ) as HTMLButtonElement;
  //     splitButton?.click();

  //     await sleep(1000);

  //     const previewButton = window.document.querySelectorAll(
  //       `[data-testid="document-pane"]:last-of-type [id*="tab-preview"]`,
  //     )?.[0] as HTMLButtonElement;
  //     previewButton?.click();
  //   }

  //   openPreview();
  // }, []);

  return null;
};

export default DocumentPreview;
