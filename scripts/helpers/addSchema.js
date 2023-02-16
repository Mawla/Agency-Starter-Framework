const fs = require("fs");
const path = require("path");
const { prettierFile } = require("./prettierFile");
const { cyan } = require("./terminal");
const { addLine } = require("./addLine");
const { sortLines } = require("./sortLines");

/**
 * Insert new schema in schema index
 * e.g `import moduleGallery from "../../modules/gallery/gallery.schema";`
 */

module.exports.addSchema = (schemaImportName, importPath) => {
  const indexFilePath = path.resolve(
    `${__dirname}../../../studio/schemas/index.ts`,
  );
  const file = fs.readFileSync(indexFilePath).toString();
  let lines = file.split("\n");

  /**
   * Add to all schema imports
   */
  lines = [`import ${schemaImportName} from '${importPath}';`, ...lines];
  const fromNeedle = `...[`;
  const toNeedle = `],`;

  lines = addLine(`    ${schemaImportName},`, lines, fromNeedle);
  lines = sortLines(lines, fromNeedle, toNeedle);

  fs.writeFileSync(indexFilePath, lines.join("\n"));
  prettierFile(indexFilePath);

  console.log(
    `› Added import in ${cyan(path.relative(process.cwd(), indexFilePath))}`,
  );
};
