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
  index?: number;
};

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
    return () => window.removeEventListener("message", onMessage);
  }, [inView, _key, isPreview, doLoad]);

  function onEditClick() {
    window.parent.postMessage(
      {
        type: "preview-studio-edit-block",
        blockKey: _key,
        index,
      },
      "*",
    );
  }

  return (
    <section
      ref={wrapperRef}
      data-block={isPreview ? block : undefined}
      data-key={isPreview ? _key : undefined}
      id={slugify(slug)}
      className="group hover:outline-offset-[-2px] hover:outline-[royalblue] hover:outline-dashed"
    >
      {isPreview && (
        <button
          className="preview-edit-button p-1 rounded bg-[royalblue] text-white absolute m-1 z-50 hidden group-hover:block"
          onClick={onEditClick}
        >
          <svg
            fill="none"
            height="25"
            viewBox="0 0 25 25"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m15 7 3 3m-12 9 1-4 10-10 3 3-10 10z"
              stroke="#fff"
              strokeWidth="1.2"
            />
          </svg>
        </button>
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
