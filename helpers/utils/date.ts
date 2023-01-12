export const isValidDate = (date: Date) => {
  return !isNaN(date.getTime());
};

export const formatDate = (
  datetime: string,
  format?: Intl.DateTimeFormatOptions,
  locale?: string
) => {
  const date = new Date(datetime);
  if (!isValidDate(date)) return null;
  return date.toLocaleDateString(
    locale || "en-US",
    format || {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
};
