export const render = (fields?: string[], fieldName?: string, snippet = "") => {
  if (!fields) return "";
  if (!fieldName) return "";
  if (!Array.isArray(fields)) return "";
  if (fields.includes(fieldName)) return snippet;
  return "";
};
