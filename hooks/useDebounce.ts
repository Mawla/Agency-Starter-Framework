/**
 * Usage:
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 */
import { useEffect, useState } from "react";

export function useDebounce(value: any, delay: number, fn?: any) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      if (fn) fn(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}
