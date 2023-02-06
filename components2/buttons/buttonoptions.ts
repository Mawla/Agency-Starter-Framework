import { pick } from '../../helpers/utils/object';
import { ALIGNMENTS, SIZES, FONT_WEIGHTS } from '../../types';

export const SIZE_OPTIONS = pick(SIZES, 'sm', 'md');
export type SizeType = keyof typeof SIZE_OPTIONS;

export const ALIGN_OPTIONS = pick(ALIGNMENTS, 'left', 'center', 'right');
export type AlignType = keyof typeof ALIGN_OPTIONS;

export const ICON_POSITION_OPTIONS = { before: 'Before', after: 'After' };
export type IconPositionType = keyof typeof ICON_POSITION_OPTIONS;

export const FONT_WEIGHT_OPTIONS = pick(FONT_WEIGHTS, 'regular', 'medium');
export type WeightType = keyof typeof FONT_WEIGHT_OPTIONS;

export const VARIANT_OPTIONS = {
  primary: 'Primary',
  secondary: 'Secondary',
  tertiary: 'Tertiary',
};
export type VariantType = keyof typeof VARIANT_OPTIONS;