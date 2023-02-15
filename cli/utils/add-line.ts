/**
 * Add a line to an array of lines after a flag
 *
 * addLine({
 *   addition: 'foo',
 *   lines: ['1', '2', '3', '4', '5'],
 *   needle: '3'
 * })
 *
 * [ '1', '2', '3', 'foo', '4', '5' ]
 */

type AddLineProps = {
  addition: string;
  lines: string[];
  needle: string;
  adjustLine?: number;
  endNeedle?: string;
};

export const addLine = ({
  addition,
  lines,
  needle,
  adjustLine = 1,
  endNeedle,
}: AddLineProps) => {
  const newLines = [...lines];
  const needleIndex = newLines.findIndex((line) => line.indexOf(needle) > -1);

  const relevantLines = newLines.slice(needleIndex);
  const endNeedleIndex = !endNeedle
    ? -1
    : relevantLines.findIndex((line) => line.indexOf(endNeedle) > -1);

  // if needle and endNeedle are on the same line we insert it on the same line
  if (endNeedle && endNeedleIndex === 0) {
    newLines[needleIndex + endNeedleIndex] = newLines[
      needleIndex + endNeedleIndex
    ].replace(endNeedle, `,${addition} ${endNeedle}`);
  } else {
    newLines.splice(needleIndex + adjustLine, 0, addition);
  }

  return newLines;
};
