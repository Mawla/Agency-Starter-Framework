import router from "next/router";
import { useEffect, useState } from "react";

type ScrollPositionType =
  | "top"
  | "bottom"
  | "middle"
  | "almost-top"
  | "almost-bottom";

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] =
    useState<ScrollPositionType>("top");

  useEffect(() => {
    function onScroll() {
      const scroll: number = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;
      let newScrollPosition: ScrollPositionType;

      if (scroll === 0) {
        newScrollPosition = "top";
      } else if (scroll < windowHeight * 0.25) {
        newScrollPosition = "almost-top";
      } else if (scroll + windowHeight === documentHeight) {
        newScrollPosition = "bottom";
      } else if (scroll >= documentHeight - windowHeight * 1.5) {
        newScrollPosition = "almost-bottom";
      } else {
        newScrollPosition = "middle";
      }

      if (newScrollPosition === scrollPosition) return;
      setScrollPosition(newScrollPosition);
    }
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    function onRouteChange() {
      setScrollPosition("top");
    }

    router.events.on("routeChangeStart", onRouteChange);
    router.events.on("routeChangeComplete", onRouteChange);

    return () => {
      router.events.off("routeChangeStart", onRouteChange);
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, []);

  return scrollPosition;
}
