import { pick } from '../../helpers/utils/object';
import { ALIGNMENTS } from '../../types';

export const ALIGN_OPTIONS = pick(ALIGNMENTS, 'left', 'right');
export type AlignType = keyof typeof ALIGN_OPTIONS;
