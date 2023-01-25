const COLORS = {
  black: '\u001b[30m',
  red: '\u001b[31m',
  green: '\u001b[32m',
  yellow: '\u001b[33m',
  blue: '\u001b[34m',
  magenta: '\u001b[35m',
  cyan: '\u001b[36m',
  white: '\u001b[37m',
  reset: '\u001b[0m',
};

Object.entries(COLORS).forEach(
  ([color, code]) =>
    (module.exports[color] = (str) => {
      return `${code}${str}\x1b[0m`;
    }),
);
