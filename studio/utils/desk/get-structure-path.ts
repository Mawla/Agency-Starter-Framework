import { isLanguage } from "../../../languages";

export const getStructurePath = (path?: string) => {
  path = path || location.pathname;
  const splitPath = path.split("/");
  const deskPath = splitPath[splitPath.length - 1];
  const pathParts = deskPath.split(";");
  const language = pathParts[0];

  return {
    language: isLanguage(language) ? language : undefined,
    parts: pathParts,
  };
};
