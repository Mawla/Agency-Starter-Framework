import { HtmlTextNodeType } from "../../types";

export const slugify = (str = "") => {
  return (str || "")
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const truncate = (str?: string, maxLength?: number) => {
  if (!str) return;
  if (!maxLength) return str;
  return str.length <= maxLength ? str : `${str.slice(0, maxLength)}…`;
};

/**
 * Process string
 * https://github.com/EfogDev/react-process-string/blob/master/index.js
 * https://github.com/EfogDev/react-process-string#readme
 */

// type for Options should be an array of objects containing regex and fn fields. fn is a function that takes two arguments: key, to pass it to a react component and result — the result of regex executing.

type OptionType = {
  regex: RegExp;
  fn: (key: number, result: RegExpExecArray) => any;
};

export const processString = (options: OptionType[]) => {
  let key = 0;

  function processInputWithRegex(option: OptionType, input: any): any {
    if (!option.fn || typeof option.fn !== "function") return input;

    if (!option.regex || !(option.regex instanceof RegExp)) return input;

    if (typeof input === "string") {
      let regex = option.regex;
      let result = null;
      let output = [];

      while ((result = regex.exec(input)) !== null) {
        let index = result.index;
        let match = result[0];

        output.push(input.substring(0, index));
        output.push(option.fn(++key, result));

        input = input.substring(index + match.length, input.length + 1);
        regex.lastIndex = 0;
      }

      output.push(input);
      return output as string[];
    } else if (Array.isArray(input)) {
      return input.map((chunk: any) =>
        processInputWithRegex(option, chunk),
      ) as any;
    } else return input;
  }

  return function (input: any) {
    if (!options || !Array.isArray(options) || !options.length) return input;

    options.forEach((option) => (input = processInputWithRegex(option, input)));

    return input;
  };
};

/**
 * console.log(joinList(['Bart', 'Lisa', 'Maggie'])) // returns 'Bart, Lisa & Maggie'
 * console.log(joinList(['Bart', 'Lisa'])) // returns 'Bart & Lisa'
 * console.log(joinList(['Bart'])) // returns 'Bart'
 */

export function joinList(items: string[]) {
  items = JSON.parse(JSON.stringify(items));
  const finalString = items.pop();
  return items.length ? items.join(", ") + " & " + finalString : finalString;
}

/**
 * automatically increase the heading level by 1
 *
 * bumpHeadingLevel('span'); // span
 * bumpHeadingLevel('div'); // div
 * bumpHeadingLevel('h1'); // h2
 * bumpHeadingLevel('h2'); // h3
 * bumpHeadingLevel('h3'); // h4
 * bumpHeadingLevel('h4'); // h5
 * bumpHeadingLevel('h5'); // h6
 * bumpHeadingLevel('h6'); // h6
 */

export const bumpHeadingLevel = (
  tagName: string,
): HtmlTextNodeType | string => {
  const headings = ["h1", "h2", "h3", "h4", "h5"];
  if (!headings.includes(tagName)) return tagName;
  return `h${+tagName.substring(1) + 1}` as HtmlTextNodeType;
};

/**
 * Uppercase first character
 */

export const capitalize = <T extends string>(s: T) =>
  (s[0].toUpperCase() + s.slice(1)) as Capitalize<typeof s>;
