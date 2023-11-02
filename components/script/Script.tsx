import cx from "clsx";
import { useRouter } from "next/router";
import NextScript from "next/script";
import React, { useEffect, useState } from "react";

export type ScriptsType = {
  title?: string;
  items?: ScriptType[];
};

export type ScriptType = {
  _key?: string;
  title?: string;
  code?: string;
  html?: string;
  src?: string;
  onload?: string;
  onready?: string;
  onerror?: string;
  attributes?: { name?: string; value?: string }[];
};

export const Scripts = ({ items }: ScriptsType) => {
  const router = useRouter();
  const isPreview = router.pathname.startsWith("/turbopreview");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!items?.filter(Boolean).length) return null;

  return (
    <React.Fragment>
      {items.filter(Boolean).map((script) => {
        if (script.code) {
          script.code = `
          try {
            ${script.code}
          } catch (error) {
            console.error(error);
          }`;
        }

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
          <div
            key={script._key}
            className={cx("script", {
              ["relative"]: isPreview,
            })}
          >
            {isPreview && (
              <span className="absolute right-0 top-0 text-[10px] p-1 bg-[#ddd]">
                {script.title} script
              </span>
            )}

            {script.html && mounted && (
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
