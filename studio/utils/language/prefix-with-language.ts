import { getCurrentLanguages } from './get-current-languages';

export const prefixWithLanguage = (
  language: string,
  content: string = '',
): string => {
  if (!language) return content;
  const currentLanguages = getCurrentLanguages();
  if (!currentLanguages || currentLanguages.length > 1)
    return `[${language}] ${content}`;
  return content;
};
