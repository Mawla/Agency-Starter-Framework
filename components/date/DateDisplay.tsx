import { formatDate } from "../../helpers/utils/date";
import React from "react";

export type DateDisplayProps = {
  datetime: string;
  className?: string;
  format?: Intl.DateTimeFormatOptions;
  locale?: string;
  pubdate?: boolean;
};

export const DateDisplay = ({
  datetime,
  format,
  locale,
  className,
  pubdate,
}: DateDisplayProps) => {
  return (
    <time
      dateTime={datetime}
      className={className}
      // @ts-ignore
      pubdate
    >
      {formatDate(datetime, format, locale)}
    </time>
  );
};

export default DateDisplay;
