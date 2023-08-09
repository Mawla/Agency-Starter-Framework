/**
 * Typesafe pick function
 * use this to take an object and get a subset by passing keys as rest params:
 *
 * pick({ a:1, b:2, c: 3}, 'a', 'b') -> { a: 1, b: 2}
 *
 * e.g pick(COLOR, "black", "white")
 */

export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  if (!obj) return obj;
  if (!keys || !keys.length) keys = Object.keys(obj) as K[];
  const ret: any = {};
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
}

/**
 * remove null, undefined and ""
 */

export const removeEmptyValues = (obj: Record<string, unknown>) => {
  if (!obj) return {};
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Record<string, unknown>);
};

/**
 * Is emty object
 */

export function isEmptyObject(obj: Record<string, unknown>) {
  return Object.keys(obj).length === 0;
}
