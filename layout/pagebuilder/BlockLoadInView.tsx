import { BlockPreviewToolsProps } from "../../components/previewmode/BlockPreviewTools";
import { slugify } from "../../helpers/utils/string";
import { useInView } from "../../hooks/useInView";
import { backgroundClasses } from "../../theme";
import { ColorType } from "../../types";
import { BlockSchemaName } from "../../types.sanity";
import cx from "clsx";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, ComponentType, lazy } from "react";

type BlockLoadInViewProps = {
  children?: React.ReactElement | React.ReactNode;
  enabled?: boolean;
  background?: ColorType | "transparent";
  block?: BlockSchemaName;
  slug?: string;
  _key: string;
  networkIdle?: boolean;
  index: number;
};

const BlockPreviewTools = lazy<ComponentType<BlockPreviewToolsProps>>(
  () =>
    import(
      /* webpackChunkName: "BlockPreviewTools" */ "../../components/previewmode/BlockPreviewTools"
    ),
);

export const BlockLoadInView = ({
  children,
  enabled = true,
  background = "transparent",
  block,
  slug,
  _key,
  networkIdle,
  index,
}: BlockLoadInViewProps) => {
  const router = useRouter();
  const isPreview = router.pathname.startsWith("/turbopreview");

  const wrapperRef = useRef(null);
  const doLoad = useInView({
    elementRef: wrapperRef,
    threshold: 0.01,
    once: true,
    rootMargin: "1200px",
  });

  const inView = useInView({
    elementRef: wrapperRef,
    threshold: 0.01,
  });

  const [forceLoad, setForceLoad] = useState(!enabled);

  /**
   * Block Loading
   */

  useEffect(() => {
    let idleCallback: number;
    if (forceLoad === true) return;
    if (!networkIdle) return;

    function load() {
      setForceLoad(true);
    }

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleCallback = requestIdleCallback(load);
    }

    () => cancelIdleCallback(idleCallback);
  }, [forceLoad, networkIdle]);

  /**
   * Preview highlight
   */

  useEffect(() => {
    if (!isPreview) return;
    if (!doLoad) return;

    function sendInview() {
      window.parent.postMessage(
        {
          type: "preview-studio-highlight-block",
          blockKey: _key,
          enabled: inView,
        },
        "*",
      );
    }
    sendInview();

    // respond to check for inview from sanity studio when element (re)mounts
    function onMessage(e: MessageEvent) {
      if (
        e.data.type == "preview-view-check-inview" &&
        e.data.blockKey === _key
      ) {
        sendInview();
      }
    }

    window.addEventListener("message", onMessage, false);
    return () => window.removeEventListener("message", onMessage);
  }, [inView, _key, isPreview, doLoad]);

  return (
    <section
      ref={wrapperRef}
      data-block={isPreview ? block : undefined}
      data-key={isPreview ? _key : undefined}
      id={slugify(slug)}
      className="group/block"
      data-inview={inView}
      data-no-animate={isPreview ? true : undefined}
      data-is-preview={isPreview ? true : undefined}
    >
      {isPreview && !(router.query.type === "preset.blocks") && (
        <BlockPreviewTools _key={_key} index={index} />
      )}

      {doLoad || forceLoad ? (
        children
      ) : (
        <div
          data-key="block-placeholder"
          className={cx(
            "animate-[block-placeholder-fade_2s_linear_infinite] h-[450px] opacity-100 relative overflow-hidden",
            background !== "transparent" && backgroundClasses[background],
          )}
        >
          <div
            className={cx(
              "animate-[block-placeholder-move_2s_linear_infinite]",
              "h-full top-0 right-0 bottom-0 left-1/2 z-10 w-[500%] -ml-[250%]",
              "pointer-events-none",
              "mix-blend-difference bg-gradient-to-r from-[rgba(255,255,255,0)] via-[rgba(255,255,255,.05)] to-[rgba(255,255,255,0)]",
            )}
          />
        </div>
      )}
    </section>
  );
};
