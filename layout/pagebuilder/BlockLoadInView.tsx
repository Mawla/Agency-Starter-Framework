import { slugify } from "../../helpers/utils/string";
import { useInView } from "../../hooks/useInView";
import { backgroundClasses } from "../../theme";
import { ColorType } from "../../types";
import { BlockSchemaName } from "../../types.sanity";
import cx from "clsx";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useContext } from "react";

type BlockLoadInViewProps = {
  children?: React.ReactElement | React.ReactNode;
  enabled?: boolean;
  background?: ColorType | "transparent";
  block?: BlockSchemaName;
  slug?: string;
  _key?: string;
  networkIdle?: boolean;
};

export const BlockLoadInView = ({
  children,
  enabled = true,
  background = "transparent",
  block,
  slug,
  _key,
  networkIdle,
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
    rootMargin: "1200px",
    enabled: isPreview,
  });

  const [forceLoad, setForceLoad] = useState(!enabled);

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
    () => window.removeEventListener("message", onMessage);
  }, [inView, _key, isPreview, doLoad]);

  return (
    <section
      ref={wrapperRef}
      data-block={isPreview ? block : undefined}
      data-key={isPreview ? _key : undefined}
      id={slugify(slug)}
    >
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
