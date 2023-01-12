import { pick } from '../../helpers/utils/object';
import { SIZES } from '../../types';

export const SIZE_OPTIONS = pick(SIZES, 'sm', 'md', 'lg', 'xl');
export type SizeType = keyof typeof SIZE_OPTIONS;

export const ROTATION_OPTIONS = {
  1: "1 o'clock",
  2: "2 o'clock",
  3: "3 o'clock",
  4: "4 o'clock",
  5: "5 o'clock",
  6: "6 o'clock",
  7: "7 o'clock",
  8: "8 o'clock",
  9: "9 o'clock",
  10: "10 o'clock",
  11: "11 o'clock",
  12: "12 o'clock",
};
export type RotationType = keyof typeof ROTATION_OPTIONS;
