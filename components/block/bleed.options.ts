import { pick } from '../../helpers/utils/object';
import { SIZES } from '../../types';

export const BLEED_SPACE_OPTIONS = pick(SIZES, 'none', 'sm', 'md', 'lg');
export type BleedSpaceType = keyof typeof BLEED_SPACE_OPTIONS;
