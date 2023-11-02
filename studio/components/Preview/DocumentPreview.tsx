import { SANITY_API_VERSION, SCHEMAS } from "../../../types.sanity";
import { useEffect } from "react";
import { useClient, useFormValue } from "sanity";
import { useRouter } from "sanity/router";

export const DocumentPreview = () => {
  const document = useFormValue([]);
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const router = useRouter();

  const documentId = (document as any)?._id.replace("drafts.", "");

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

      if (
        e.data.type == "document-preview-iframe-ready" &&
        e.data.documentId === documentId
      ) {
        previewIframe.contentWindow.postMessage(
          { type: "document-preview-document", document },
          import.meta.env.SANITY_STUDIO_PROJECT_PATH,
        );
      }
    }

    onMessage({
      data: { type: "document-preview-iframe-ready", documentId },
    } as any);

    window.addEventListener("message", onMessage);
    () => window.removeEventListener("message", onMessage);
  }, [document, documentId]);

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
      if (!documentId) return;

      if (
        e.data.type == "document-preview-iframe-ready" &&
        e.data.documentId === documentId
      ) {
        getDataset();
      }
    }

    window.addEventListener("message", onMessage);
    () => window.removeEventListener("message", onMessage);
  }, [documentId]);

  /**
   * Auto open preview pane
   */

  useEffect(() => {
    async function openPreview() {
      if (!document) return;

      const panes = router.state.panes as {
        id: "string";
        params: { view?: string };
      }[][];
      if (!panes) return;

      const finalPane = panes[panes.length - 1];
      if (!finalPane || finalPane.length > 1) return;

      const previewPane = finalPane.find(
        (pane) => pane.params.view === "preview",
      );
      if (previewPane) return;

      const path = router.resolvePathFromState(router.state);
      router.navigateUrl({ path: `${path}%7C%2Cview%3Dpreview` });
    }

    openPreview();
  }, [document]);

  return null;
};

export default DocumentPreview;
