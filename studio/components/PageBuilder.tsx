import { ArrayItemPreviewHighlight } from "./ArrayItemPreviewHighlight";
import BlockSelectDialog from "./BlockSelectDialog";
import {
  addBlock,
  deleteBlock,
  duplicateBlock,
  moveBlock,
} from "./Preview/actions";
import { ComponentType, useEffect, useRef, useState } from "react";

export const PageBuilder: ComponentType<any> = (props) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  const { value, onChange }: any = props;
  const [disabled, setDisabled] = useState<Boolean>(true);

  useEffect(() => {
    if (!elementRef.current) return;
    // don't respond to messages if element isn't visible
    // if (elementRef.current.offsetParent === null) return;
    if (
      elementRef.current
        .closest('[data-testid="change-connector-root"]')
        ?.querySelector("iframe")
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, []);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (disabled) return;
      if (!elementRef.current) return;

      // don't respond to messages if element isn't visible
      if (elementRef.current.offsetParent === null) return;

      // delete
      if (e.data.action === "block-delete") {
        return deleteBlock({
          blockKey: e.data.blockKey,
          value,
          onChange,
        });
      }

      if (e.data.action === "block-duplicate") {
        return duplicateBlock({
          blockKey: e.data.blockKey,
          value,
          onChange,
        });
      }

      if (e.data.action === "block-move-up") {
        return moveBlock({
          blockKey: e.data.blockKey,
          value,
          onChange,
          direction: "up",
        });
      }

      if (e.data.action === "block-move-down") {
        return moveBlock({
          blockKey: e.data.blockKey,
          value,
          onChange,
          direction: "down",
        });
      }

      if (e.data.action === "block-add-after") {
        return addBlock({
          blockKey: e.data.blockKey,
          value,
          elementRef,
        });
      }

      // scroll to block in preview if it's not visible
      // sanity studio removes array elements that are not in view
      // so we need to scroll to it, and trigger a click on the edit button
      // to open the form
      if (e.data.type == "preview-studio-action" && e.data.blockKey) {
        const blockElement = elementRef.current.querySelectorAll(
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
              top: e.data.index * 96 + elementRef.current.offsetTop,
            });

            // edit
            if (
              e.data.action === "block-edit" ||
              e.data.action === "component-edit"
            ) {
              setTimeout(() => {
                // open block item
                const button = document.querySelectorAll(
                  `[data-key="${e.data.blockKey}"] button`,
                )[1] as HTMLButtonElement;
                if (button) {
                  button.click();
                }

                // focus on field
                if (e.data.action === "component-edit") {
                  setTimeout(() => {
                    const field = document.querySelector(
                      `[data-testid='field-${e.data.path}']`,
                    ) as HTMLDivElement;
                    if (!field) return;

                    let element: HTMLElement | null =
                      field.querySelector("label") ||
                      // inactive Portable Text field
                      field.querySelector('[data-testid="activate-overlay"]') ||
                      // Portable Text field
                      field.querySelector(".pt-editable");

                    if (element) {
                      element.click();
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }, 0);
                }
              }, 100);
            }
          }
        }
      }
    }

    window.addEventListener("message", onMessage, false);
    return () => window.removeEventListener("message", onMessage);
  }, [value, onChange, disabled]);

  return (
    <div ref={elementRef}>
      {!disabled && props.renderDefault(props)}
      <div
        style={{
          transform: "translateY(-100%)",
          background: "white",
          position: "relative",
          zIndex: 10,
        }}
      >
        <BlockSelectDialog
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

    setTimeout(() => {
      const previewIframe = getIframe();
      if (!previewIframe?.contentWindow) return;

      previewIframe.contentWindow.postMessage(
        { type: "preview-view-scroll-to-block", blockKey: props.value._key },
        import.meta.env.SANITY_STUDIO_PROJECT_PATH,
      );
    }, 100);
  }, [props.open, props.value?._key]);

  /**
   * When preview mode is clicked, open this form
   */

  useEffect(() => {
    if (!props.value?._key) return;
    if (props.value?.disabled) return;

    function onMessage(e: MessageEvent) {
      if (e.data.blockKey !== props.value?._key) return;

      // highlight block in preview
      if (e.data.type == "preview-studio-highlight-block") {
        setHighlight(e.data.enabled);
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
