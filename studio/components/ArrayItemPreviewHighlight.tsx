import React, { CSSProperties, useEffect, useRef } from "react";

export const ArrayItemPreviewHighlight: React.ComponentType<any> = (props) => {
  const elementRef = useRef<HTMLDivElement>(null);

  /**
   * When the form is opened: scroll preview iframe to element
   */

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

  /**
   * When mouse enters/leaves: highlight block in preview
   */

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

  const highlightStyle: CSSProperties = {
    background: "var(--card-focus-ring-color)",
    position: "absolute",
    left: -4,
    top: 0,
    bottom: 0,
    zIndex: 1,
    width: 2,
    pointerEvents: "none",
    opacity: props.highlight ? 1 : 0,
    transition: "opacity 0.1s",
  };

  return (
    <div ref={elementRef} style={{ position: "relative" }}>
      <div style={highlightStyle} />
      {props.renderChildren ? props.children : props.renderDefault(props)}
    </div>
  );
};
