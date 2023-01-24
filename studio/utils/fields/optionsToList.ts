export const optionsToList = (options: {
  [key: string]: string;
}): { title: string; value: string }[] =>
  Object.entries(options).map(([key, value]) => ({
    title: value,
    value: key,
  }));
