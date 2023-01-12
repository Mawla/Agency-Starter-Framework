import cx from 'classnames';

import { ColorType, DirectionType } from './OneOptions';

type OneProps = {
  color?: ColorType;
  direction?: DirectionType;
  className?: string;
};

const FILES: Record<ColorType, string> = {
  'brand-base': '/decorations/one-brand-base.svg',
  'blue-base': '/decorations/one-blue-base.svg',
  'green-base': '/decorations/one-green-base.svg',
};

export const rotationClasses: Record<DirectionType, string> = {
  up: 'rotate-[15deg]',
  down: 'rotate-[205deg]',
};

export const One = ({
  color = 'brand-base',
  direction = 'up',
  className,
}: OneProps) => {
  if (!color || !FILES[color]) return null;
  return (
    <img
      src={FILES[color]}
      alt=""
      className={cx(rotationClasses[direction], className)}
    />
  );
};
