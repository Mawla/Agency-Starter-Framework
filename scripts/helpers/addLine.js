/**
 * Add a line to an array of lines after a flag
 *
 * addLine('foo', ['1', '2', '3', '4', '5'], '3') // [ '1', '2', '3', 'foo', '4', '5' ]
 */

module.exports.addLine = (line, lines, needle, adjustLine = 1, endNeedle) => {
  const newLines = [...lines];
  const needleIndex = newLines.findIndex((line) => line.indexOf(needle) > -1);

  const relevantLines = newLines.slice(needleIndex);
  const endNeedleIndex = relevantLines.findIndex(
    (line) => line.indexOf(endNeedle) > -1,
  );

  // if needle and endNeedle are on the same line we insert it on the same line
  if (endNeedle && endNeedleIndex === 0) {
    newLines[needleIndex + endNeedleIndex] = newLines[
      needleIndex + endNeedleIndex
    ].replace(endNeedle, `,${line} ${endNeedle}`);
  } else {
    newLines.splice(needleIndex + adjustLine, 0, line);
  }

  return newLines;
};
