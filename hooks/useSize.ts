import { useDebounce } from "./useDebounce";
import { useCallback, useEffect, useState } from "react";

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export const useSize = (
  elementRef: React.RefObject<HTMLDivElement> | undefined,
): Size => {
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  const onResize = useCallback(() => {
    if (!elementRef?.current) return;
    const { width, height } = elementRef.current.getBoundingClientRect();
    setSize({ width, height });
  }, []);

  useEffect(() => {
    if (!elementRef?.current) return;
    if (typeof ResizeObserver === "undefined") return;
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(elementRef.current);
    () => resizeObserver.disconnect();
  }, []);
  return size;
};
