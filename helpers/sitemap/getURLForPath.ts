import { baseLanguage, LanguageType } from "../../languages";

export const getURLForPath = (
  domain: string = "",
  path: string = "",
  language: LanguageType = baseLanguage,
) => {
  const languagePath = language === baseLanguage ? "" : `/${language}`;
  const pathWithoutTrailingSlash = path?.replace(/\/+$/, "") || "";

  if (!domain) return `${languagePath}${pathWithoutTrailingSlash}`;

  return `https://${domain.replace(
    /\/$/,
    "",
  )}${languagePath}${pathWithoutTrailingSlash}`;
};
