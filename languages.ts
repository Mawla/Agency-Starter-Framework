import engineConfig from "./engine.config";

export type LanguageType = "en";

export type LanguagesListItemType = {
  id: LanguageType;
  title: string;
};
export type LanguagesListType = LanguagesListItemType[];

export const languages = (engineConfig.languages || [
  { id: "en", title: "English" },
]) as LanguagesListType;

export const baseLanguage: LanguageType = languages[0].id;

export const getLanguageTitle = (language: LanguageType): string | null =>
  languages.find(({ id }) => id === language)?.title ?? null;

export const getLanguagePath = (language?: LanguageType): string =>
  language === baseLanguage || !language ? "/" : `/${language}`;

export const isLanguage = (str: string): boolean =>
  languages.some(({ id }) => id === str);

export const getLanguageFromPath = (path: string | null): LanguageType => {
  if (!path || !path.length) return baseLanguage;

  const pathParts = path.split("/");
  const language = pathParts[1];
  return isLanguage(language) ? (language as LanguageType) : baseLanguage;
};
