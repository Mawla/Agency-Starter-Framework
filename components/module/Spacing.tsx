import cx from 'classnames';
import React from 'react';

import { SpaceType, spaceTopClasses, spaceBottomClasses } from './SpacingOptions';

export type SpacingProps = {
  space: SpaceType;
  children?: React.ReactElement | React.ReactNode;
};

export const Spacing = ({ space, children }: SpacingProps) => {
  return (
    <div
      className={cx(
        spaceTopClasses[space?.top || 'xl'],
        spaceBottomClasses[space?.bottom || 'xl'],
      )}
    >
      {children}
    </div>
  );
};

export const SpacingMemo = React.memo(Spacing);
