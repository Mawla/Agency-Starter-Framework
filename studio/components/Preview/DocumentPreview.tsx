import { SCHEMAS } from "../../../types.sanity";
import { useEffect } from "react";
import { useClient, useFormValue } from "sanity";
import { useRouter } from "sanity/router";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const DocumentPreview = () => {
  const document = useFormValue([]);
  const client = useClient({ apiVersion: "vX" });
  const router = useRouter();

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
   * Check if the preview pane is open or not
   */

  useEffect(() => {
    async function openPreview() {
      if (!document) return;

      const id = (document as any)?._id.replace("drafts.", "");
      if (!location.href.endsWith(id)) return;

      // router.navigateUrl({path: '/desk/products'})

      // console.log(router);
      // console.log(router.state);
      // console.log(router.resolvePathFromState(router.state));

      // const panes = router.state.panes as {
      //   id: "string";
      //   params: { view?: string };
      // }[][];
      // if (!panes) return;

      // const finalPane = panes[panes.length - 1];
      // if (!finalPane) return;

      // const previewPane = finalPane.find((pane) =>
      //   pane.id?.startsWith("preview"),
      // );
      // if (previewPane) return;

      const path = router.resolvePathFromState(router.state);
      console.log(path);
      router.navigateUrl({ path: `${path}%7C%2Cview%3Dpreview` });
    }

    openPreview();
  }, [document]);

  return null;
};

export default DocumentPreview;
