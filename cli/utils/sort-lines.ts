/**
 * Alphabetically sort a subset of lines
 * starting the line after fromNeedle and ending the line before toNeedle
 *
 * const lines = ['x','xx','xxx','start here','x','y','z','a','d','end here;','xxxx','xxxxx']
 * sortLines({ lines, fromNeedle: 'start here', toNeedle: 'end here' })
 * [ 'x', 'xx', 'xxx', 'start here', 'a', 'd', 'x', 'y', 'z', 'end here;', 'xxxx', 'xxxxx' ]
 */

type SortLinesProps = {
  lines: string[];
  fromNeedle: string;
  toNeedle: string;
  adjustFromLine?: number;
  adjustToLine?: number;
};

export const sortLines = ({
  lines,
  fromNeedle,
  toNeedle,
  adjustFromLine = 0,
  adjustToLine = 0,
}: SortLinesProps) => {
  const newLines = [...lines];
  const startAt = newLines.findIndex((line) => line.indexOf(fromNeedle) > -1);

  if (newLines[startAt].endsWith(toNeedle)) return newLines;

  const linesToSort = newLines.slice(startAt + adjustFromLine + 1);
  const endAt =
    linesToSort.findIndex((line) => line.indexOf(toNeedle) > -1) + adjustToLine;
  const sortedLines = linesToSort.slice(0, endAt).sort();
  newLines.splice(
    startAt + adjustFromLine + 1,
    sortedLines.length,
    ...sortedLines,
  );
  return newLines;
};
