const { withSentry, withSentryConfig } = require("@sentry/nextjs");

module.exports.withSentryOptional = (handler) => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return withSentry(handler);
  }
  return handler;
};

module.exports.withSentryConfigOptional = (
  handler,
  sentryWebpackPluginOptions,
) => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return withSentryConfig(handler, sentryWebpackPluginOptions);
  }
  return handler;
};
