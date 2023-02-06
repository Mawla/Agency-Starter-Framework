const fs = require("fs");
const path = require("path");
const { prettierFile } = require("../helpers/prettierFile");
const { cyan } = require("../helpers/terminal");
const { addLine } = require("../helpers/addLine");
const { sortLines } = require("../helpers/sortLines");

/**
 * Insert schema import at the alphabetically sorted correct position
 * a. create studio/modules/module.[schemaname].tsx
 * b. add import in schema
 * c. add schema in list of schemas
 * d. add selected fields
 */

module.exports.createSchema = (lowerName, pascalName, schemaName, options) => {
  const schemaEditFn = options.schemaEditFn || ((x) => x);
  const schemaImportName = `${options.schemaImportPrefix}${pascalName}`;

  const filePath = `${__dirname}/../../studio/schemas/index.ts`;
  const schemaFilePath =
    options?.schemaFilePath ||
    `${__dirname}/../../studio/schemas/documents/${schemaName}.tsx`;
  const file = fs.readFileSync(filePath).toString();
  let lines = file.split("\n");

  const relativeSchemaPath = path
    .relative(path.resolve(filePath), schemaFilePath)
    .replace("../", "./");

  /**
   * Add to all schema imports
   */
  lines = [
    `import ${schemaImportName} from '${relativeSchemaPath.replace(
      ".tsx",
      "",
    )}';`,
    ...lines,
  ];
  const fromNeedle = options.translatable ? `translateFields([` : `...[`;
  const toNeedle = options.translatable ? `]),` : `],`;

  lines = addLine(`    ${schemaImportName},`, lines, fromNeedle);
  lines = sortLines(lines, fromNeedle, toNeedle);

  fs.writeFileSync(filePath, lines.join("\n"));
  prettierFile(filePath);

  /**
   * Create schema
   */

  const fieldLines = [];

  if (options.fields?.indexOf("title") > -1) {
    fieldLines.push(`
      defineField({
        name: 'eyebrow',
        title: 'Eyebrow',
        type: 'string',
        group: 'content',
      })`);

    fieldLines.push(`
      defineField({
        name: 'title',
        title: 'Title',
        type: 'text',
        rows: 2,
        group: 'content',
      })`);
  }

  if (options.fields?.indexOf("intro") > -1) {
    fieldLines.push(`
      defineField({
        name: 'intro',
        title: 'Intro',
        type: 'portabletext.simple',
        group: 'content',
      })`);
  }

  if (options.fields?.indexOf("image") > -1) {
    fieldLines.push(`
      defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        group: 'content',
      })`);
  }

  if (options.fields?.indexOf("items") > -1) {
    fieldLines.push(`
      defineField({
        name: 'items',
        title: 'Items',
        group: 'content',
        type: 'array',
        of: [
          defineField({
            title: 'Item',
            name: 'item',
            type: 'object',
            fields: [
              defineField({
                name: 'title',
                title: 'Title',
                type: 'string',
              })
            ],
          }),
        ],
      })`);
  }

  if (options.fields?.indexOf("buttons") > -1) {
    fieldLines.push(`
     defineField({
        name: 'buttons',
        title: 'Buttons',
        type: 'buttongroup',
        group: 'content',
      })`);
  }

  // create schema file
  let schemaContent = fs
    .readFileSync(options.prototypeFile)
    .toString()
    .replace(
      new RegExp(`${options.replacer}Title`, "g"),
      pascalName.replace(/([A-Z])/g, " $1").trim(),
    )
    .replace(new RegExp(`${options.replacer}Schema`, "g"), schemaName)
    .replace(new RegExp(`${options.replacer.toLowerCase()}`, "g"), lowerName)
    .replace(new RegExp(`${options.replacer}`, "g"), pascalName)
    .replace("/*FIELDS*/", `${fieldLines.join(",\n")},`)
    .replace("/*DESCRIPTION*/", options.description || "");

  if (options.schemaImportPrefix === "hero") {
    schemaContent = schemaContent.replace(
      new RegExp(`../modules/${pascalName}`, "g"),
      `../heroes`,
    );
  }

  fs.writeFileSync(schemaFilePath, schemaEditFn(schemaContent));
  prettierFile(schemaFilePath);

  console.log(
    `› Added import in ${cyan(path.relative(process.cwd(), schemaFilePath))}`,
  );
  console.log(
    `› Added schema in ${cyan(path.relative(process.cwd(), filePath))}`,
  );
};
