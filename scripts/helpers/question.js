const { cyan } = require('../helpers/terminal');

module.exports.question = (q, description, options = []) => {
  const lines = [cyan(q)];
  if (description) lines.push(description);
  if (options?.length) lines.push(`Options: ${options.join(' / ')}`);
  return `\n${lines.join('\n')}\n\n`;
};
