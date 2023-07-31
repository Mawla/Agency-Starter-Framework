import { PageContext } from "../../context/PageContext";
import { formatDate } from "../../helpers/utils/date";
import React, { useContext } from "react";

export type DateDisplayProps = {
  datetime?: string;
  className?: string;
  format?: Intl.DateTimeFormatOptions;
  locale?: string;
  pubdate?: boolean;
  from?: string;
  to?: string;
};

const dateTimeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
};

export const DateDisplay = ({
  datetime,
  format,
  locale,
  className,
  from,
  to,
}: DateDisplayProps) => {
  const { language } = useContext(PageContext);

  let isSameDate = false;
  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    if (
      fromDate.getFullYear() === toDate.getFullYear() &&
      fromDate.getMonth() === toDate.getMonth() &&
      fromDate.getDate() === toDate.getDate()
    ) {
      isSameDate = true;
    }
  }

  if (isSameDate && from && to) {
    return (
      <time dateTime={from} className={className}>
        {formatDate(from, format || dateTimeFormat, locale || language)}
        {" – "}
        {formatDate(to, dateTimeFormat, locale || language)
          ?.split(" ")[4]
          .trim()}
      </time>
    );
  }

  if (from && !to) {
    return (
      <time dateTime={from} className={className}>
        {formatDate(from, format || dateTimeFormat, locale || language)}
      </time>
    );
  }

  if (to && !from) {
    return (
      <time dateTime={to} className={className}>
        {formatDate(to, format || dateTimeFormat, locale || language)}
      </time>
    );
  }

  if (to && from) {
    return (
      <>
        <time dateTime={from} className={className}>
          {formatDate(from, format || dateTimeFormat, locale || language)}
        </time>
        {" – "}
        <time dateTime={to} className={className}>
          {formatDate(to, format || dateTimeFormat, locale || language)}
        </time>
      </>
    );
  }

  if (datetime) {
    return (
      <time
        dateTime={datetime}
        className={className}
        // @ts-ignore
        pubdate="pubdate"
      >
        {formatDate(datetime, format, locale || language)}
      </time>
    );
  }

  return null;
};

export default DateDisplay;
