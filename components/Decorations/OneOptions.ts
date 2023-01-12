import { COLORS } from '../../colors';
import { pick } from '../../helpers/utils/object';

export const COLOR_OPTIONS = pick(COLORS, 'brand-base', 'blue-base', 'green-base');
export type ColorType = keyof typeof COLOR_OPTIONS;

export const DIRECTION_OPTIONS = {
  up: 'Up',
  down: 'Down',
};
export type DirectionType = keyof typeof DIRECTION_OPTIONS;
