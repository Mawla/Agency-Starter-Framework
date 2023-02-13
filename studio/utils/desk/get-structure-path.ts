import { baseLanguage } from "../../../languages";

export const getStructurePath = () => {
  const path = location.pathname;
  const splitPath = path.split("/");
  const deskPath = splitPath[splitPath.length - 1];
  const pathParts = deskPath.split(";");
  const language = pathParts[0];

  return {
    language: language || baseLanguage,
  };
};
