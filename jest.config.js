const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["scripts/"],
};

const ignoredErrors = [
  /act\(\.\.\.\) is not supported in production builds of React/,
];

const consoleError = global.console.error;
global.console.error = (...args) => {
  if (ignoredErrors.some((el) => el.test(args[0]))) {
    return console.log(...args);
  }
  return consoleError(...args);
};

module.exports = async () => ({
  /**
   * Using ...(await createJestConfig(customJestConfig)()) to override transformIgnorePatterns
   * provided byt next/jest.
   *
   * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096635363
   */
  ...(await createJestConfig(customJestConfig)()),
  /**
   * Swiper uses ECMAScript Modules (ESM) and Jest provides some experimental support for it
   * but "node_modules" are not transpiled by next/jest yet.
   *
   * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096698456
   * @link https://jestjs.io/docs/ecmascript-modules
   */
  transformIgnorePatterns: [
    "node_modules/(?!(swiper|ssr-window|dom7|get-it)/)",
  ],
});
