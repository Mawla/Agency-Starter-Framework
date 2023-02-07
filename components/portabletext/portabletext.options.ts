export const SCRIPT_OPTIONS = {
  CookieDeclaration: "Cookie Declaration",
};
export type ScriptType = keyof typeof SCRIPT_OPTIONS;

export const SCRIPTS: Record<ScriptType, {}> = {
  CookieDeclaration: {
    id: "CookieDeclaration",
    src: "", //'https://consent.cookiebot.com/5664cec0-2a5d-458a-957b-9f6c25ad5f33/cd.js',
    async: true,
  },
};
