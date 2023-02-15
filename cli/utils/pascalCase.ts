export const pascalCase = (str: string) => {
  return str
    .replace(/-/g, " ")
    .replace(/(\w)(\w*)/g, function (g0, g1, g2) {
      return g1.toUpperCase() + g2.toLowerCase();
    })
    .replace(/\s+/g, "");
};
