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

module.exports.addSchema = (schemaImportName, schemaFilePath, translatable) => {
  const dir = path.relative(__dirname, ".");
  const indexFilePath = `${dir}/../../studio/schemas/index.ts`;
  const file = fs.readFileSync(indexFilePath).toString();
  let lines = file.split("\n");

  const relativeSchemaPath = path
    .relative(path.resolve(indexFilePath), schemaFilePath)
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
  const fromNeedle = translatable ? `translateFields([` : `...[`;
  const toNeedle = translatable ? `]),` : `],`;

  lines = addLine(`    ${schemaImportName},`, lines, fromNeedle);
  lines = sortLines(lines, fromNeedle, toNeedle);

  fs.writeFileSync(indexFilePath, lines.join("\n"));
  prettierFile(indexFilePath);

  console.log(
    `› Added import in ${cyan(path.relative(process.cwd(), schemaFilePath))}`,
  );
};
