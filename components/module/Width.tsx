import cx from 'classnames';
import React from 'react';

import { WidthType } from './WidthOptions';

export type WidthProps = {
  width?: WidthType;
  children: React.ReactElement | React.ReactNode;
  className?: string;
};

export const Width = ({ children, width, className }: WidthProps) => {
  return (
    <div
      className={cx('w-full mx-auto', className, {
        ['max-w-inner']: width === 'inner',
        ['max-w-outer']: width === 'outer',
      })}
    >
      {children}
    </div>
  );
};

export const WidthMemo = React.memo(Width);
