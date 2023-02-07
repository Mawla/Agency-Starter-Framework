/**
 * Wraps a number when it breaches the defined range.
 *
 * wrap accepts a range, defined as a min and max.
 *
 * When a third number is provided:
 *
 * If it lies within the range, it is returned.
 * If it lies outside the range, it is wrapped back around:
 *
 * wrap(0, 1, 0.5); // 0.5
 * wrap(0, 1, 1.5); // 0.5
 */

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/**
 * Round a number to the nearest multiple of another number.
 */

export const roundToNearest = (multiple: number, v: number) => {
  if (multiple === 0) return Math.round(v);
  return Math.ceil(v / multiple) * multiple;
};

/**
 * Random number between two numbers.
 */

export const randomBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
