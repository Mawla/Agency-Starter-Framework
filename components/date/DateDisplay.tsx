import { formatDate } from "../../helpers/utils/date";
import React from "react";

export type DateDisplayProps = {
  datetime: string;
  className?: string;
  format?: Intl.DateTimeFormatOptions;
  locale?: string;
};

export const DateDisplay = ({
  datetime,
  format,
  locale,
  className,
}: DateDisplayProps) => {
  return (
    <time dateTime={datetime} className={className}>
      {formatDate(datetime, format, locale)}
    </time>
  );
};
