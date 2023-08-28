const path = require("path");
module.exports = {
  staticDirs: ["../public"],
  stories: [
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../blocks/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../layout/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-styling",
      options: {
        cssLoaderOptions: {
          // When you have splitted your css over multiple files
          // and use @import('./other-styles.css')
          importLoaders: 1,
        },
        postCss: {
          implementation: require("postcss"),
        },
      },
    },
    "@storybook/addon-mdx-gfm",
  ],
  webpackFinal: (config) => {
    // https://stackoverflow.com/questions/61498644/storybook-failed-to-execute-createelement-on-svg-files-using-svgr-webpack
    // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".svg"),
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      enforce: "pre",
      loader: require.resolve("@svgr/webpack"),
    });
    return config;
  },
  docs: {
    //👇 See the table below for the list of supported options
    autodocs: "tag",
    defaultName: "Documentation",
  },
  framework: {
    name: "@storybook/nextjs",
    options: { nextConfigPath: "../next.config.js" },
  },
};
