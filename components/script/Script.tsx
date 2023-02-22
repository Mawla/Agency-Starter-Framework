import NextScript from "next/script";
import React from "react";

export type ScriptsProps = {
  title?: string;
  items?: {
    _key?: string;
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

export const Scripts = ({ items }: ScriptsProps) => {
  if (!items?.filter(Boolean).length) return null;

  return (
    <React.Fragment>
      {items.filter(Boolean).map((script) => {
        const nextScriptProps = {
          ...script.attributes?.reduce((acc, { name, value }) => {
            if (name && value) {
              acc[name] = value;
            }
            return acc;
          }, {} as Record<string, string>),
          onReady: () => {
            try {
              new Function(script.onready || "")();
            } catch (error) {
              console.error(error);
            }
          },
          onLoad: () => {
            try {
              new Function(script.onload || "")();
            } catch (error) {
              console.error(error);
            }
          },
          onError: () => {
            try {
              new Function(script.onerror || "")();
            } catch (error) {
              console.error(error);
            }
          },
        };

        return (
          <div key={script._key}>
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
