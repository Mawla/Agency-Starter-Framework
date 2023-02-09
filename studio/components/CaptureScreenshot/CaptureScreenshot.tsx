import {
  baseLanguage,
  getLanguageTitle,
  LanguageType,
} from "../../../languages";
import { ClipboardImageIcon } from "@sanity/icons";
import { Spinner, Button } from "@sanity/ui";
import React, { ComponentType, useCallback, useEffect, useState } from "react";
import { useClient, useFormValue } from "sanity";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type StateType = "loading" | "default" | "complete" | "error";

export const CaptureScreenshot: ComponentType<any> = () => {
  const document = useFormValue([]) as {
    _id: string;
    slug?: { current?: string };
    image?: { asset: { _ref: string } };
    modules?: { language: LanguageType }[];
  };
  const client = useClient({ apiVersion: "vX" });

  const [closePreviewAfterScreenshot, setClosePreviewAfterScreenshot] =
    useState<boolean>(false);
  const [state, setState] = useState<StateType>("default");

  const LABELS: Record<StateType, string> = {
    default: "Capture screenshot",
    loading: "Capturing screenshot",
    complete: "Screenshot captured",
    error: "Something went wrong",
  };

  /**
   * Send signal to child iframe to capture screenshot
   */

  const onClick = useCallback(async () => {
    setState("loading");

    const firstModuleLanguage = getLanguageTitle(
      document?.modules?.[0]?.language || baseLanguage,
    )?.toLowerCase();

    if (!window.document.querySelector(".previewView iframe")) {
      setClosePreviewAfterScreenshot(true);

      // click split
      const splitButton = window.document.querySelector(
        '[title="Split pane right"]',
      ) as HTMLButtonElement;
      splitButton?.click();

      await sleep(1000);

      // click preview
      const previewButton = window.document.querySelectorAll(
        `[data-testid="document-pane"]:last-of-type [id*="tab-preview-${firstModuleLanguage}"]`,
      )?.[0] as HTMLButtonElement;
      previewButton?.click();

      await sleep(3000);
    }

    const previewIframe = window.document.querySelector(
      ".previewView iframe",
    ) as HTMLIFrameElement;
    if (!previewIframe?.contentWindow) return;

    previewIframe.contentWindow.postMessage(
      { type: "captureScreenshot", width: 1024, height: 768 },
      import.meta.env.SANITY_STUDIO_PROJECT_PATH,
    );
  }, [document]);

  /**
   * Respond to event from child iframe
   */

  useEffect(() => {
    function closePreview() {
      if (closePreviewAfterScreenshot) {
        const closeButton = window.document.querySelectorAll(
          '[title="Close split pane"]',
        )?.[1] as HTMLButtonElement;

        closeButton?.click();
        setClosePreviewAfterScreenshot(false);
      }
    }

    async function onMessage(event: MessageEvent) {
      if (event.data.type !== "captureScreenshot") return;
      if (!document) return;

      client.assets
        .upload("image", event.data.image, {
          contentType: "image/png",
          filename: `preset-${document.slug?.current || document?._id}.png`,
        })
        .then(async (imageDocument) => {
          setState("complete");

          // save image
          await client
            .patch(document._id)
            .set({
              image: {
                _type: "image",
                asset: {
                  _ref: imageDocument._id,
                  _type: "reference",
                },
              },
            })
            .commit();

          // delete image if there is one
          if (document.image) await client.delete(document.image.asset._ref);

          closePreview();
        })
        .catch((error) => {
          setState("error");
          console.error("Upload failed:", error.message);
          closePreview();
        });
    }

    window.addEventListener("message", onMessage, false);
    return () => window.removeEventListener("message", onMessage);
  }, [
    document?.image,
    document.slug?.current,
    document?._id,
    closePreviewAfterScreenshot,
  ]);

  return (
    <Button
      disabled={state === "loading"}
      text={LABELS[state]}
      icon={state === "loading" ? <Spinner muted /> : ClipboardImageIcon}
      mode="ghost"
      onClick={onClick}
    />
  );
};

export default CaptureScreenshot;
