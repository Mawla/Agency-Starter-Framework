import { COLORS } from '../../colors';
import { pick } from '../../helpers/utils/object';
import { ALIGNMENTS, SIZES } from '../../types';

export const SIZE_OPTIONS = pick(SIZES, 'sm', 'md', 'lg', 'xl');
export type SizeType = keyof typeof SIZE_OPTIONS;

export const VARIANT_OPTIONS = {
  primary: 'Primary',
  secondary: 'Secondary',
  tertiary: 'Tertiary',
  brand: 'Brand',
  ghost: 'Ghost',
  white: 'White',
};
export type VariantType = keyof typeof VARIANT_OPTIONS;

export const ALIGN_OPTIONS = pick(ALIGNMENTS, 'left', 'center', 'right');
export type AlignType = keyof typeof ALIGN_OPTIONS;

export const ICON_POSITION_OPTIONS = { before: 'Before', after: 'After' };
export type IconPositionType = keyof typeof ICON_POSITION_OPTIONS;

export const BACKGROUND_COLOR_OPTIONS = pick(
  COLORS,
  'action-base',
  'brand-base',
  'white',
);
export type BackgroundColorType = keyof typeof BACKGROUND_COLOR_OPTIONS;

export const BORDER_COLOR_OPTIONS = pick(
  COLORS,
  'action-dark',
  'neutral-85',
  'white',
);
export type BorderColorType = keyof typeof BORDER_COLOR_OPTIONS;

export const TEXT_COLOR_OPTIONS = pick(
  COLORS,
  'action-dark',
  'neutral-base',
  'white',
);
export type TextColorType = keyof typeof TEXT_COLOR_OPTIONS;
