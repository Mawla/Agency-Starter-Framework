import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { OptionsType } from "@fancyapps/ui/types/Fancybox/options";
import React from "react";
import { useEffect, useRef } from "react";

export type FancyboxProps = {
  delegate?: string;
  options?: OptionsType;
  className?: string;
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
      Carousel: {
        infinite: false,
      },
      on: {
        reveal: (instance, slide) => {
          const iframeWindow =
            instance.container.querySelector("iframe")?.contentWindow;

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

          instance.container.setAttribute("data-no-animate", true);

          if (slide.type === "iframe") {
            instance.container.classList.add("fix-iframe-height");

            /**
             * Close on key press
             */
            try {
              iframeWindow?.addEventListener("keyup", onKeyUp);
            } catch (e) {}
          }

          return () => {
            try {
              iframeWindow?.removeEventListener("keyup", onKeyUp);
            } catch (e) {}
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

  return (
    <span ref={containerRef} className={props.className}>
      {props.children}
    </span>
  );
}
