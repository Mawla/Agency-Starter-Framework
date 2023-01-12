import { useEffect, useState, RefObject } from 'react';

type Props = {
  elementRef: RefObject<HTMLElement>;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  root?: HTMLElement;
};

export const useInView = ({
  elementRef,
  threshold = 0,
  once = false,
  root,
  rootMargin = '0px',
}: Props) => {
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    if (!elementRef?.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting }) => {
          setInView(isIntersecting);
          if (isIntersecting && once) {
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(elementRef.current);

    return () => {
      setInView(false);
      observer.disconnect();
    };
  }, [elementRef, threshold, root, rootMargin, once]);

  return inView;
};
