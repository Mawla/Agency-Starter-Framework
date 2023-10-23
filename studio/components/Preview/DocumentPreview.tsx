import { SCHEMAS } from "../../../types.sanity";
import { useEffect } from "react";
import { useClient, useFormValue } from "sanity";

export const DocumentPreview = () => {
  const document = useFormValue([]);
  const client = useClient({ apiVersion: "vX" });

  function getIframe() {
    return window.document.querySelector(
      ".previewView iframe",
    ) as HTMLIFrameElement;
  }

  /**
   * Send the document to the preview pane
   */

  useEffect(() => {
    if (!document) return;

    function onMessage(e: MessageEvent) {
      const previewIframe = getIframe();
      if (!previewIframe?.contentWindow) return;

      if (e.data.type == "document-preview-iframe-ready") {
        previewIframe.contentWindow.postMessage(
          { type: "document-preview-document", document },
          import.meta.env.SANITY_STUDIO_PROJECT_PATH,
        );
      }
    }

    onMessage({ data: { type: "document-preview-iframe-ready" } } as any);

    window.addEventListener("message", onMessage);
    () => window.removeEventListener("message", onMessage);
  }, [document]);

  /**
   * Get entire dataset
   */

  useEffect(() => {
    if (!document) return;

    async function getDataset() {
      const previewIframe = getIframe();
      if (!previewIframe?.contentWindow) return;

      const dataset = await client.fetch(
        `*[_type in ['${Object.keys(SCHEMAS).join(
          "', '",
        )}', 'sanity.imageAsset', 'sanity.fileAsset']
        ]`,
      );

      if (!dataset?.length) return;

      previewIframe.contentWindow.postMessage(
        { type: "document-preview-dataset", dataset },
        import.meta.env.SANITY_STUDIO_PROJECT_PATH,
      );
    }

    function onMessage(e: MessageEvent) {
      if (e.data.type == "document-preview-iframe-ready") {
        getDataset();
      }
    }

    window.addEventListener("message", onMessage);
    () => window.removeEventListener("message", onMessage);
  }, [document]);

  /**
   * Listen for the iframe to be ready
   */

  return null;
};

export default DocumentPreview;
