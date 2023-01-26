import { Link } from "../../components/buttons/Link";
import { IconLoader } from "../../components/images/IconLoader";
import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { getBreadCrumbForPath } from "../../helpers/sitemap/getBreadCrumbForPath";
import { languages, LanguageType } from "../../languages";
import { IconType } from "../../types";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import cx from "classnames";
import { usePathname } from "next/navigation";
import { useContext, useMemo } from "react";

type LanguageSwitchProps = {
  align?: "left" | "right";
  position?: "above" | "below";
};

const FLAGS: Record<LanguageType, IconType> = {
  en: "flag-uk",
  it: "flag-italy",
  es: "flag-spain",
};

export const LanguageSwitch = ({
  align = "right",
  position = "below",
}: LanguageSwitchProps) => {
  const { sitemap } = useContext(SiteContext);
  const { language } = useContext(PageContext);

  const pathname = usePathname();

  if (languages?.length === 1) return null;

  /**
   * Find the nearest page in the breadcrumb that has a path for the current locale
   * falling back to the root path if none is found
   */

  const breadcrumb = getBreadCrumbForPath(
    pathname,
    sitemap,
    language as LanguageType,
  );
  const availableLanguagePages: Record<LanguageType, string> = useMemo(() => {
    return languages.reduce((acc, { id }) => {
      acc[id] = `/${id}`;
      breadcrumb.forEach((item) => {
        if (item.paths?.[id] && item.excludeFromSitemap?.[id] !== true) {
          acc[id] = item.paths[id];
        }
      });
      return acc;
    }, {} as Record<LanguageType, string>);
  }, [breadcrumb, language, sitemap]);

  return (
    <RadixNavigationMenu.Item className="relative">
      <noscript>
        <ul>
          {languages.map(({ id, title }) => (
            <li key={id}>
              <Link
                href={
                  availableLanguagePages && availableLanguagePages[id]
                    ? availableLanguagePages[id]
                    : "/"
                }
                locale={id}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </noscript>

      <RadixNavigationMenu.Trigger
        className={cx(
          "group",
          "bg-white",
          "flex items-center gap-2",
          "text-md  text-neutral-base",
          "rounded-full",
          "font-bold",
          "py-[8px] pl-2.5 pr-3",
          "whitespace-nowrap",
          "border-neutral-75 border-2  duration-75",
          "hover:bg-neutral-95 group-hover:bg-neutral-95 group-focus-within:bg-neutral-95",
        )}
      >
        <span className="w-5 aspect-square">
          {language && (
            <IconLoader
              icon={FLAGS[language as LanguageType]}
              path="flags/"
              removeColors={false}
              className="w-4 h-4"
            />
          )}
        </span>
        <span>{language?.toUpperCase()}</span>
        <IconLoader icon="chevron" className="w-4 h-4 text-neutral-50" />
      </RadixNavigationMenu.Trigger>

      <RadixNavigationMenu.Content
        className={cx("w-[200px]", "absolute", {
          ["right-0"]: align === "right",
          ["left-0"]: align === "left",
          ["bottom-0 translate-y-full"]: position === "below",
          ["-top-4 -translate-y-full"]: position === "above",
        })}
      >
        <RadixNavigationMenu.List
          className={cx(
            "translate-y-4 p-1",
            "shadow-[0_16px_32px_-4px_rgba(89,93,106,0.15)]",
            "bg-white border-2 border-neutral-85 rounded-md",
          )}
        >
          {languages.map(({ id, title }) => (
            <RadixNavigationMenu.Item key={id}>
              <Link
                href={
                  availableLanguagePages && availableLanguagePages[id]
                    ? availableLanguagePages[id]
                    : "/"
                }
                locale={id}
                className={cx(
                  "hover:underline flex underline-offset-4 gap-3",
                  "text-neutral-base",
                  "text-md",
                  "p-3",
                  {
                    ["font-bold bg-action-light rounded-sm"]: language === id,
                  },
                )}
              >
                <IconLoader
                  icon={FLAGS[id]}
                  path="flags/"
                  removeColors={false}
                  className="w-5 aspect-square"
                />
                {title}
              </Link>
            </RadixNavigationMenu.Item>
          ))}
        </RadixNavigationMenu.List>
      </RadixNavigationMenu.Content>
    </RadixNavigationMenu.Item>
  );
};
