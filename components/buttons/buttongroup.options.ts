import { pick } from '../../helpers/utils/object';
import { ALIGNMENTS } from '../../types';

export const DIRECTION_OPTIONS = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
};

export const ALIGN_OPTIONS = pick(ALIGNMENTS, 'left', 'center', 'right');
export type AlignType = keyof typeof ALIGN_OPTIONS;
