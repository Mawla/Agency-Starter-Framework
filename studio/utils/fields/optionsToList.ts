export const optionsToList = (options: {
  [key: string]: string;
}): { [key: string]: string }[] =>
  Object.entries(options).map(([key, value]) => ({
    title: value,
    value: key,
  }));
