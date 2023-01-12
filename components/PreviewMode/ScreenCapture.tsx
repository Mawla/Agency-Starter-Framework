import { RefObject, useEffect } from "react";

export const ScreenCapture = ({
  previewTools,
}: {
  previewTools?: RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    async function onMessage(event: MessageEvent<any>) {
      if (event.data.type !== "captureScreenshot") return;
      if (event.data.image) return;
      if (!previewTools?.current) return;

      const html2canvas = (await import("html2canvas")).default;
      previewTools.current.style.visibility = "hidden";

      console.log("capturing screenshot");

      html2canvas(document.body, {
        width: event.data.width || 1024,
        height: event.data.height || 768,
        windowWidth: event.data.width || 1024,
        windowHeight: event.data.height || 768,
        useCORS: true,
      }).then((canvas) => {
        if (!previewTools?.current) return;
        previewTools.current.style.visibility = "visible";

        document.body.appendChild(canvas);

        canvas.toBlob((blob) => {
          event?.source?.postMessage(
            { type: "captureScreenshot", image: blob },
            event.origin as any
          );
        });
      });
    }

    window.addEventListener("message", onMessage, false);
    return () => window.removeEventListener("message", onMessage);
  }, [previewTools]);

  return null;
};
