export const optionsToList = (
  options: {
    [key: string]: string;
  },
  sortNumeric = false,
): { title: string; value: string }[] => {
  const collator = new Intl.Collator([], { numeric: true });
  let entries = Object.entries(options);

  if (sortNumeric) {
    entries = entries.sort((a, b) => {
      return collator.compare(a[1], b[1]);
    });
  }

  return entries.map(([key, value]) => ({
    title: value,
    value: key,
  }));
};
