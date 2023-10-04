import { processString } from "../../helpers/utils/string";
import React from "react";

/**
 * Change link like text to anchors, e.g https://google.com becomes a clickable link
 * used for data from an external source in the table component
 */

export type TextTransformerType = {
  regex: RegExp;
  fn: (key: number, result: RegExpExecArray) => React.ReactNode;
};

export const TextTransform = ({
  children,
  transformers = [],
}: {
  children: React.ReactElement<any, any>;
  transformers: TextTransformerType[];
}) => {
  let config = [
    {
      regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
      fn: (key: number, result: RegExpExecArray) => (
        <span key={key}>
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}
          >
            {result[2]}.{result[3]}
            {result[4]}
          </a>
          {result[5]}
        </span>
      ),
    },
    ...transformers,
  ];

  let processed = processString(config)(children);
  return processed;
};
