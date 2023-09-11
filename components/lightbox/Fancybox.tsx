import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { OptionsType } from "@fancyapps/ui/types/Fancybox/options";
import React from "react";
import { useEffect, useRef } from "react";

export type FancyboxProps = {
  delegate?: string;
  options?: OptionsType;
  children?: React.ReactNode;
};

export default function Fancybox(props: FancyboxProps) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};

    NativeFancybox.bind(container, delegate, {
      defaultType: "iframe",
      Html: {
        preload: true,
      },
      on: {
        reveal: (instance, slide) => {
          const iframeWindow =
            instance.container.querySelector("iframe").contentWindow;

          function onKeyUp(e: KeyboardEvent) {
            if (e.key === "Escape") {
              NativeFancybox.close();
            }
          }

          /**
           * Iframes with internal links are not resized automatically,
           * not sure why this is happening.
           * We could turn off preloading `Html: { preload: true }`, then it works
           * but then we'd lose the nice loader and fade-in effect
           * so instead for iframes we add a class that sets the height
           */

          if (slide.type === "iframe") {
            instance.container.classList.add("fix-iframe-height");

            /**
             * Close on key press
             */

            iframeWindow.addEventListener("keyup", onKeyUp);
          }

          return () => {
            iframeWindow?.removeEventListener("keyup", onKeyUp);
          };
        },
      },
      ...options,
    });

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return <span ref={containerRef}>{props.children}</span>;
}
