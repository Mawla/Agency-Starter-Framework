import { useBreakpoint } from "./useBreakpoint";
import { useDebounce } from "./useDebounce";
import { useEffect } from "react";

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export const useInviewAnimation = (
  elementRef: React.RefObject<HTMLDivElement>,
): void => {
  const { screenWidth } = useBreakpoint();
  const debouncedScreenWidth = useDebounce(screenWidth, 250);

  useEffect(() => {
    if (!elementRef.current) return;
    if (!window.IntersectionObserver) return;

    const observers: IntersectionObserver[] = [];

    // find children to animate
    const animateChildren =
      elementRef.current.querySelectorAll("[data-animate]");

    //  sort children by position
    const sortedChildren = Array.from(animateChildren)
      .sort((a, b) => {
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();
        return rectA.top - rectB.top || rectA.left - rectB.left;
      })

      // remove elements with data-no-animate attribute
      .filter((el) => {
        return (
          !el.hasAttribute("data-no-animate") &&
          el.closest("[data-no-animate]") === null
        );
      });

    let currentIndex = 0;

    // create observer for each element
    sortedChildren.forEach((el) => {
      const threshold = +(el.getAttribute("data-animate-threshold") || 0.01);
      const rootMargin = el.getAttribute("data-animate-rootmargin") || "0px";

      if (el && el instanceof HTMLElement) {
        // add delay to cards based on column
        if (el.classList.contains("card")) {
          const column = +(el.dataset.column || 0);
          el.setAttribute("data-animate-delay", `${column * 100}`);
        } else {
          // set delay based on sorted index, except for cards
          if (!el.closest(".card") && !el.classList.contains("decoration")) {
            ++currentIndex;
            el.setAttribute("data-animate-delay", `${currentIndex * 50}`);
          }
        }

        // create observer
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(({ target, isIntersecting }) => {
              if (isIntersecting && target) {
                if (!el.closest("[data-no-animate]")) {
                  target.classList.add("animate");
                }
                observer.disconnect();
              }
            });
          },
          { rootMargin, threshold },
        );

        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [debouncedScreenWidth]);
};
