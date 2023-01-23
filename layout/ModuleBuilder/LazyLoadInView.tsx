import { backgroundClasses } from "../../colors";
import { useInView } from "../../hooks/useInView";
import { ColorType } from "../../types";
import {
  DialogSchemaName,
  HeroSchemaName,
  ModuleSchemaName,
} from "../../types.sanity";
import cx from "classnames";
import React, { useState, useEffect, useRef } from "react";

type LazyLoadInViewProps = {
  children?: React.ReactElement | React.ReactNode;
  enabled?: boolean;
  background?: ColorType | "transparent";
  module?: ModuleSchemaName | DialogSchemaName | HeroSchemaName;
  id?: string;
  networkIdle?: boolean;
};

export const LazyLoadInView = ({
  children,
  enabled = true,
  background = "transparent",
  module,
  id,
  networkIdle,
}: LazyLoadInViewProps) => {
  const wrapperRef = useRef(null);
  const doLoad = useInView({
    elementRef: wrapperRef,
    threshold: 0.01,
    once: true,
    rootMargin: "1200px",
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

  return (
    <div ref={wrapperRef} data-module={module} data-id={id}>
      {doLoad || forceLoad ? (
        children
      ) : (
        <div
          data-id="module-placeholder"
          className={cx(
            "animate-[module-placeholder-fade_2s_linear_infinite] h-[450px] opacity-100 relative overflow-hidden",
            background !== "transparent" && backgroundClasses[background]
          )}
        >
          <div
            className={cx(
              "animate-[module-placeholder-move_2s_linear_infinite]",
              "h-full top-0 right-0 bottom-0 left-1/2 z-10 w-[500%] -ml-[250%]",
              "pointer-events-none",
              "mix-blend-difference bg-gradient-to-r from-[rgba(255,255,255,0)] via-[rgba(255,255,255,.05)] to-[rgba(255,255,255,0)]"
            )}
          />
        </div>
      )}
    </div>
  );
};
