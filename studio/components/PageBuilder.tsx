import { ArrayItemPreviewHighlight } from "./ArrayItemPreviewHighlight";
import BlockSelect from "./BlockSelect";
import { ComponentType, useEffect, useState } from "react";

export const PageBuilder: ComponentType<any> = (props) => {
  return (
    <div>
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
      if (
        e.data.type == "preview-studio-highlight-block" &&
        e.data.blockKey === props.value?._key
      ) {
        setHighlight(e.data.enabled);
      }
    }

    // post message to iframe to check inview
    // because this React element gets (un/re)mounted by sanity on scroll
    const previewIframe = getIframe();
    if (!previewIframe?.contentWindow) return;

    previewIframe.contentWindow.postMessage(
      { type: "preview-view-check-inview", blockKey: props.value._key },
      import.meta.env.SANITY_STUDIO_PROJECT_PATH,
    );

    window.addEventListener("message", onMessage, false);
    () => window.removeEventListener("message", onMessage);
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
