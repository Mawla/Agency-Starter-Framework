import { useEffect, useState } from 'react';

const MINIMAL_SCROLL = 20;

export function useScrollDirection() {
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | null>(null);

  useEffect(() => {
    function onScroll() {
      const scroll: number = window.pageYOffset;
      const scrollDiff: number = lastScrollTop - scroll;
      const isScrollingDown: boolean = scroll > lastScrollTop;

      if (scroll <= MINIMAL_SCROLL && scrollDirection !== null) {
        return setScrollDirection(null);
      }

      if (scrollDiff > MINIMAL_SCROLL || scrollDiff < -100) {
        setLastScrollTop(scroll);
        const newScrollDirection = isScrollingDown ? 'down' : 'up';

        if (newScrollDirection !== scrollDirection) {
          setScrollDirection(newScrollDirection);
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [lastScrollTop, scrollDirection]);

  return scrollDirection;
}
