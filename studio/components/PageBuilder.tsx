import { ArrayItemPreviewHighlight } from "./ArrayItemPreviewHighlight";
import BlockSelect from "./BlockSelect";
import { ComponentType, useEffect, useRef, useState } from "react";

export const PageBuilder: ComponentType<any> = (props) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!elementRef.current) return;

      // scroll to block in preview if it's not visible
      // sanity studio removes array elements that are not in view
      // so we need to scroll to it, and trigger a click on the edit button
      // to open the form
      if (e.data.type == "preview-studio-edit-block") {
        const blockElement = document.querySelectorAll(
          `[data-key="${e.data.blockKey}"]`,
        )[1] as HTMLDivElement;

        if (typeof blockElement === "undefined") {
          // find the scroll area
          const scrollElement = elementRef.current.closest(
            '[data-testid="document-panel-scroller"]',
          );

          if (scrollElement) {
            scrollElement.scrollTo({
              behavior: "instant",
              top: e.data.index * 96 + 500,
            });

            setTimeout(() => {
              const button = document.querySelectorAll(
                `[data-key="${e.data.blockKey}"] button`,
              )[1] as HTMLButtonElement;
              if (button) {
                button.click();
              }
            }, 100);
          }
        }
      }
    }

    window.addEventListener("message", onMessage, false);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div ref={elementRef}>
      {props.renderDefault(props)}

      <div
        style={{
          transform: "translateY(-100%)",
          background: "white",
          position: "relative",
          zIndex: 10,
        }}
      >
        <BlockSelect
          onChange={props.onChange}
          value={props.value}
          options={props.options}
          schemaType={props.schemaType}
        />
      </div>
    </div>
  );
};

/**
 * Wrapper around the item that responds to opening
 * and responds to clicks from the preview iframe
 */

export const PageBuilderItem: React.ComponentType<any> = (props) => {
  const [highlight, setHighlight] = useState(false);

  function getIframe() {
    const previewIframe = window.document.querySelector(
      ".previewView iframe",
    ) as HTMLIFrameElement;
    return previewIframe;
  }

  /**
   * When the form is opened: scroll preview iframe to element
   */

  useEffect(() => {
    if (!props.open) return;
    if (!props?.value?._key) return;

    // post message to iframe to scroll to block
    const previewIframe = getIframe();
    if (!previewIframe?.contentWindow) return;

    previewIframe.contentWindow.postMessage(
      { type: "preview-view-scroll-to-block", blockKey: props.value._key },
      import.meta.env.SANITY_STUDIO_PROJECT_PATH,
    );
  }, [props.open, props.value?._key]);

  /**
   * When preview mode is clicked, open this form
   */

  useEffect(() => {
    if (!props.value?._key) return;

    function onMessage(e: MessageEvent) {
      if (e.data.blockKey !== props.value?._key) return;

      // highlight block in preview
      if (e.data.type == "preview-studio-highlight-block") {
        setHighlight(e.data.enabled);
      }

      // open cms form when clicking edit in preview
      if (e.data.type == "preview-studio-edit-block") {
        // ideally I'd call props.onOpen() here, but that sometimes
        // results in a double open, so I'm calling the button click
        // as this prevent duplicate opening here in preview view
        if (!props.open) {
          const button = document.querySelectorAll(
            `[data-key="${e.data.blockKey}"] button`,
          )[1] as HTMLButtonElement;
          if (button) {
            console.log(button.getBoundingClientRect().top);
            button.scrollIntoView({ behavior: "smooth" });
            button.click();
          }
        }
      }
    }

    // post message to iframe to check inview
    // because this React element gets (un/re)mounted by sanity on scroll

    function requestInview() {
      const previewIframe = getIframe();
      if (!previewIframe?.contentWindow) {
        requestAnimationFrame(requestInview);
        return;
      }

      previewIframe.contentWindow.postMessage(
        { type: "preview-view-check-inview", blockKey: props.value._key },
        import.meta.env.SANITY_STUDIO_PROJECT_PATH,
      );
    }

    requestInview();

    window.addEventListener("message", onMessage, false);
    return () => window.removeEventListener("message", onMessage);
  }, [props.value?._key]);

  return (
    <ArrayItemPreviewHighlight {...props} highlight={highlight} renderChildren>
      <div
        style={{
          borderBottom: "1px solid rgba(0,0,0,.1)",
          position: "relative",
        }}
        data-type="block"
        data-key={props.value?._key}
      >
        <div
          style={{
            marginLeft: 2,
            marginTop: -4,
            marginBottom: -2,
            opacity: 0.65,
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 500,
              textTransform: "uppercase",
              display: "inline-block",
              padding: 2,
              textDecoration: Boolean(props.value?.disabled)
                ? "line-through"
                : "",
            }}
          >
            {props.schemaType?.title}
          </span>
          {Boolean(props.value?.disabled) && (
            <span
              style={{
                fontSize: 7,
                fontWeight: 500,
                textTransform: "uppercase",
                display: "inline-block",
                padding: 2,
              }}
            >
              disabled
            </span>
          )}
        </div>
        {props.renderDefault(props)}
      </div>
    </ArrayItemPreviewHighlight>
  );
};

/**
 * Stylistic wrapper around the preview
 */

export const PageBuilderItemPreview: React.ComponentType<any> = (props) => (
  <div style={{ padding: "8px 0" }} data-type="block-preview">
    {props.renderDefault(props)}
  </div>
);
