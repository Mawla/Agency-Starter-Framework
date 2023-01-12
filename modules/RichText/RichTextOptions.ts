import { COLORS } from '../../colors';
import { SIZE_OPTIONS } from '../../components/module/Title';
import { pick } from '../../helpers/utils/object';
import { ALIGNMENTS } from '../../types';

export const BACKGROUND_COLOR_OPTIONS = pick(
  COLORS,
  'white',
  'neutral-95',
  'brand-dark',
  'brand-base',
  'blue-dark',
  'green-dark',
);
export type BackgroundColorType = keyof typeof BACKGROUND_COLOR_OPTIONS;

export const TITLE_SIZE_OPTIONS = pick(SIZE_OPTIONS, '2xl', '3xl');
export type TitleSizeType = keyof typeof TITLE_SIZE_OPTIONS;

export const TEXT_ALIGN_OPTIONS = pick(ALIGNMENTS, 'left', 'center');
export type TextAlignType = keyof typeof TEXT_ALIGN_OPTIONS;
