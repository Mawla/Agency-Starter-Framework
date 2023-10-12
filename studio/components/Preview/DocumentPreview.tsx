import React, { useEffect } from "react";
import { useClient, useFormValue } from "sanity";

export const DocumentPreview = () => {
  const document = useFormValue([]);
  const [state, setState] = React.useState<"loading" | "ready">("loading");
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

      const dataset = await client.fetch(
        `* {
          ...,
          "hasReferences": count(*[references(^._id)]) > 0
        }[hasReferences]`,
      );

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

  return null;
};

export default DocumentPreview;
