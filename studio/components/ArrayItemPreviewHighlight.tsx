import React, { useEffect, useRef } from "react";

export const ArrayItemPreviewHighlight: React.ComponentType<any> = (props) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props?.value?._key) return;
    if (!elementRef.current) return;

    const previewIframe = window.document.querySelector(
      ".previewView iframe",
    ) as HTMLIFrameElement;
    if (!previewIframe?.contentWindow) return;

    if (props.open) {
      previewIframe.contentWindow.postMessage(
        {
          type: "preview-view-highlight-open",
          key: props.value._key,
          enabled: true,
        },
        import.meta.env.SANITY_STUDIO_PROJECT_PATH,
      );
    } else {
      previewIframe.contentWindow.postMessage(
        {
          type: "preview-view-highlight-open",
          key: props.value._key,
          enabled: false,
        },
        import.meta.env.SANITY_STUDIO_PROJECT_PATH,
      );
    }
  }, [props.open]);

  useEffect(() => {
    if (!props?.value?._key) return;
    if (!elementRef.current) return;

    const previewIframe = window.document.querySelector(
      ".previewView iframe",
    ) as HTMLIFrameElement;
    if (!previewIframe?.contentWindow) return;

    const handleMouseEnter = () => {
      if (!previewIframe?.contentWindow) return;
      previewIframe.contentWindow.postMessage(
        {
          type: "preview-view-highlight-hover",
          key: props.value._key,
          enabled: true,
        },
        import.meta.env.SANITY_STUDIO_PROJECT_PATH,
      );
    };

    const handleMouseLeave = () => {
      if (!previewIframe?.contentWindow) return;
      if (props.open) return;
      previewIframe.contentWindow.postMessage(
        {
          type: "preview-view-highlight-hover",
          key: props.value._key,
          enabled: false,
        },
        import.meta.env.SANITY_STUDIO_PROJECT_PATH,
      );
    };

    elementRef.current.addEventListener("mouseenter", handleMouseEnter);
    elementRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      elementRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      elementRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [props.value?._key]);

  return (
    <div ref={elementRef}>
      {props.renderChildren ? props.children : props.renderDefault(props)}
    </div>
  );
};
