import cx from 'classnames';
import React from 'react';

import { formatDate } from '../../helpers/utils/date';

export type DateDisplayProps = {
  datetime: string;
  className?: string;
  inline?: boolean;
  format?: Intl.DateTimeFormatOptions;
  locale?: string;
};

export const DateDisplay = ({
  datetime,
  format,
  locale,
  className,
  inline,
}: DateDisplayProps) => {
  return (
    <time
      dateTime={datetime}
      className={cx(
        'text-sm opacity-75',
        { ['mb-4 sm:mb-5 block ']: !inline },
        className,
      )}
    >
      {formatDate(datetime, format, locale)}
    </time>
  );
};
