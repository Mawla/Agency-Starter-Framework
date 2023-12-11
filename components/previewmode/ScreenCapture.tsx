import { useEffect } from "react";

export const ScreenCapture = () => {
  useEffect(() => {
    async function onMessage(event: MessageEvent<any>) {
      if (event.data.type !== "captureScreenshot") return;
      if (event.data.image) return;

      const html2canvas = (await import("html2canvas")).default;

      document.body.classList.add("is-taking-screenshot");

      html2canvas(document.body, {
        width: event.data.width || 1024,
        height: event.data.height || 768,
        windowWidth: event.data.width || 1024,
        windowHeight: event.data.height || 768,
        useCORS: true,
      }).then((canvas) => {
        document.body.appendChild(canvas);

        canvas.toBlob((blob) => {
          event?.source?.postMessage(
            { type: "captureScreenshot", image: blob },
            event.origin as any,
          );
        });

        document.body.classList.remove("is-taking-screenshot");
      });
    }

    window.addEventListener("message", onMessage, false);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
};
