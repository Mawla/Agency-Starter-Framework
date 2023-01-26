const fs = require("fs");
const path = require("path");
const { addLine } = require("../helpers/addLine");
const { cyan } = require("../helpers/terminal");
const { prettierFile } = require("../helpers/prettierFile");
const { sortLines } = require("../helpers/sortLines");

/**
 * Add page to the list of sanity schema types
 */

module.exports.createType = (schemaName, options) => {
  const filePath = `${__dirname}/../../types.sanity.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  const fromNeedle = "export const SCHEMAS";
  const toNeedle = "};";
  lines = addLine(`  '${schemaName}': '',`, lines, fromNeedle);
  lines = sortLines(lines, fromNeedle, toNeedle);

  if (options.linkable) lines = createLinkableType(lines, schemaName, filePath);
  if (options.translatable)
    lines = createTranslatableType(lines, schemaName, filePath);
  if (options.module) lines = createModuleType(lines, schemaName, filePath);
  if (options.hero) lines = createHeroType(lines, schemaName, filePath);
  if (options.dialog) lines = createDialogType(lines, schemaName, filePath);

  fs.writeFileSync(filePath, lines.join("\n"));
  prettierFile(filePath);

  console.log(
    `› Added schema type to SCHEMAS in ${cyan(
      path.relative(process.cwd(), filePath),
    )}`,
  );
};

const createLinkableType = (lines, schemaName, filePath) => {
  const fromNeedle2 = "export const LINKABLE_SCHEMAS";
  const toNeedle2 = ");";
  lines = addLine(`  '${schemaName}',`, lines, fromNeedle2, 2, toNeedle2);
  lines = sortLines(lines, fromNeedle2, toNeedle2, 1);

  console.log(
    `› Added linkable type to LINKABLE_SCHEMAS in ${cyan(
      path.relative(process.cwd(), filePath),
    )}`,
  );
  return lines;
};

const createTranslatableType = (lines, schemaName, filePath) => {
  const fromNeedle2 = "export const TRANSLATABLE_SCHEMAS";
  const toNeedle2 = ");";
  lines = addLine(`  '${schemaName}',`, lines, fromNeedle2, 2, toNeedle2);
  lines = sortLines(lines, fromNeedle2, toNeedle2, 1);

  console.log(
    `› Added translatable type to TRANSLATABLE_SCHEMAS in ${cyan(
      path.relative(process.cwd(), filePath),
    )}`,
  );
  return lines;
};

const createModuleType = (lines, schemaName, filePath) => {
  const fromNeedle2 = "export const MODULE_SCHEMAS";
  const toNeedle2 = ");";
  lines = addLine(`  '${schemaName}',`, lines, fromNeedle2, 2, toNeedle2);
  lines = sortLines(lines, fromNeedle2, toNeedle2, 1);

  console.log(
    `› Added module type to MODULE_SCHEMAS in ${cyan(
      path.relative(process.cwd(), filePath),
    )}`,
  );
  return lines;
};

const createHeroType = (lines, schemaName, filePath) => {
  const fromNeedle2 = "export const HERO_SCHEMAS";
  const toNeedle2 = ");";
  lines = addLine(`  '${schemaName}',`, lines, fromNeedle2, 2, toNeedle2);
  lines = sortLines(lines, fromNeedle2, toNeedle2, 1);

  console.log(
    `› Added hero type to HERO_SCHEMAS in ${cyan(
      path.relative(process.cwd(), filePath),
    )}`,
  );
  return lines;
};

const createDialogType = (lines, schemaName, filePath) => {
  const fromNeedle2 = "export const DIALOG_SCHEMAS";
  const toNeedle2 = ");";
  lines = addLine(`  '${schemaName}',`, lines, fromNeedle2, 2, toNeedle2);
  lines = sortLines(lines, fromNeedle2, toNeedle2, 1);

  console.log(
    `› Added dialog type to HERO_SCHEMAS in ${cyan(
      path.relative(process.cwd(), filePath),
    )}`,
  );
  return lines;
};
