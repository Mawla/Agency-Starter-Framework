/**
 * Add a line to an array of lines after a flag
 *
 * injectLine({
 *   addition: 'foo',
 *   lines: ['1', '2', '3', '4', '5'],
 *   needle: '3'
 * })
 *
 * [ '1', '2', '3', 'foo', '4', '5' ]
 */

type InjectLineProps = {
  addition: string;
  lines: string[];
  needle: string;
  offset?: number;
  delimiter?: string;
};

export const injectLine = ({
  addition,
  lines,
  needle,
  offset = 1,
  delimiter,
}: InjectLineProps) => {
  const newLines = [...lines];
  const needleIndex = newLines.findIndex((line) => line.indexOf(needle) > -1);

  const relevantLines = newLines.slice(needleIndex);
  const delimiterIndex = !delimiter
    ? -1
    : relevantLines.findIndex((line) => line.indexOf(delimiter) > -1);

  // if needle and delimiter are on the same line we insert it on the same line
  if (delimiter && delimiterIndex === 0) {
    newLines[needleIndex + delimiterIndex] = newLines[
      needleIndex + delimiterIndex
    ].replace(delimiter, `,${addition} ${delimiter}`);
  } else {
    newLines.splice(needleIndex + offset, 0, addition);
  }

  return newLines;
};
