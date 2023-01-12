export const getCurrentLanguages = (): string[] => {
  const localStorageLanguages = localStorage.getItem(
    '@sanity/plugin/language-filter/selected-languages',
  );

  if (localStorageLanguages) {
    return JSON.parse(localStorageLanguages);
  }
  return [];
};
