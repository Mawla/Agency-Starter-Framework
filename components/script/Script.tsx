import NextScript from "next/script";
import React from "react";

export type ScriptsProps = {
  title?: string;
  scripts?: {
    title?: string;
    code?: "string";
    html?: "string";
    src?: "string";
    onload?: "string";
    onready?: "string";
    onerror?: "string";
    attributes: { name?: string; value?: string }[];
  }[];
};

export const Scripts = ({ scripts }: ScriptsProps) => {
  if (!scripts?.filter(Boolean).length) return null;

  return (
    <React.Fragment>
      {scripts.filter(Boolean).map((script) => {
        const nextScriptProps = {
          ...script.attributes?.reduce((acc, { name, value }) => {
            if (name && value) {
              acc[name] = value;
            }
            return acc;
          }, {} as Record<string, string>),
          onReady: () => new Function(script.onready || "")(),
          onLoad: () => new Function(script.onload || "")(),
          onError: () => new Function(script.onerror || "")(),
        };

        return (
          <div key={script.title}>
            {script.html && (
              <div dangerouslySetInnerHTML={{ __html: script.html }} />
            )}

            {script.code && (
              <NextScript key={script.title} {...nextScriptProps}>
                {script.code}
              </NextScript>
            )}

            {script.src && (
              <NextScript
                src={script.src}
                key={script.src}
                {...nextScriptProps}
              />
            )}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default React.memo(Scripts);
