import { languages } from "../../languages";
import { useLanguageFilter } from "../utils/language/useLanguageFilter";
import ModuleSelect from "./ModuleSelect";
import { ComponentType, useEffect } from "react";

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
        <ModuleSelect
          onChange={props.onChange}
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
  const selectedLanguages = useLanguageFilter();
  let makeHidden = true;

  // If no language is selected, show all items with no language set
  if (selectedLanguages.length === 0) {
    if (!props.value?.language || !props.value?.language?.trim().length) {
      makeHidden = false;
    }
  }

  // If all languages are selected, show all items
  if (selectedLanguages.length === languages.length) {
    makeHidden = false;
  }

  // If the item has a language and it is selected, show the item
  if (selectedLanguages.includes(props.value?.language)) {
    makeHidden = false;
  }

  /**
   * When the form is opened: scroll preview iframe to element
   */

  useEffect(() => {
    if (!props.open) return;
    if (!props?.value?._key) return;

    // find iframe
    const previewIframe = window.document.querySelector(
      ".previewView iframe",
    ) as HTMLIFrameElement;
    if (!previewIframe?.contentWindow) return;

    // post message to iframe to scroll to module
    previewIframe.contentWindow.postMessage(
      { type: "preview-view-scroll-to-module", moduleKey: props.value._key },
      (import.meta as any).env.SANITY_STUDIO_PROJECT_PATH,
    );
  }, [props.open, props.value?._key]);

  /**
   * When preview mode is clicked, open this form
   */

  useEffect(() => {
    if (!props.value?._key) return;

    function onMessage(e: MessageEvent) {
      if (
        e.data.type == "preview-studio-open-module-dialog" &&
        e.data.moduleKey === props.value?._key
      ) {
        const moduleFormOpenButton = document.querySelector(
          `[data-key="${e.data.moduleKey}"] [data-type="module-preview"]`,
        ) as HTMLButtonElement;

        if (moduleFormOpenButton) {
          moduleFormOpenButton.click();
        }
      }
    }

    window.addEventListener("message", onMessage, false);
    () => window.removeEventListener("message", onMessage);
  }, [props.value?._key]);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(0,0,0,.1)",
        display: makeHidden ? "none" : "block",
        position: "relative",
      }}
      data-type="module"
      data-key={props.value?._key}
    >
      <div
        style={{
          marginLeft: 2,
          marginTop: -4,
          marginBottom: -2,
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 500,
            textTransform: "uppercase",
            display: "inline-block",
            padding: 2,
          }}
        >
          {props.schemaType?.title}
        </span>
      </div>
      {props.renderDefault(props)}
    </div>
  );
};

/**
 * Stylistic wrapper around the preview
 */

export const PageBuilderItemPreview: React.ComponentType<any> = (props) => (
  <div style={{ padding: "8px 0" }} data-type="module-preview">
    {props.renderDefault(props)}
  </div>
);
