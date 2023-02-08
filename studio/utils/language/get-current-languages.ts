export const getCurrentLanguages = (): string[] | null => {
  const localStorageLanguages = localStorage.getItem(
    "@sanity/plugin/language-filter/selected-languages",
  );

  if (localStorageLanguages) {
    return JSON.parse(localStorageLanguages);
  }
  return null;
};
