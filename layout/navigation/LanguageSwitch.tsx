import { Link } from "../../components/buttons/Link";
import { IconLoaderProps } from "../../components/images/IconLoader";
import { PageContext } from "../../context/PageContext";
import { getLanguageTitle, languages, LanguageType } from "../../languages";
import { IconType } from "../../types";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import cx from "classnames";
import { ComponentType, lazy, useContext } from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../../components/images/IconLoader"
    ),
);

type LanguageSwitchProps = {
  align?: "left" | "right";
  position?: "above" | "below";
};

const FLAGS: Record<LanguageType, IconType> = {
  en: "flag-uk",
};

export const LanguageSwitch = ({
  align = "right",
  position = "below",
}: LanguageSwitchProps) => {
  const { language, languageAlternates } = useContext(PageContext);

  if (languages?.length === 1) return null;

  const links = languageAlternates
    .filter(Boolean)
    .filter(({ excludeFromSitemap }) => excludeFromSitemap !== true)
    .map(({ path, title, language }) => ({
      title,
      href: path,
      languageId: language,
    }))
    .sort((a, b) => (a.title || "").localeCompare(b.title || ""));

  if (!links.length) return null;

  return (
    <RadixNavigationMenu.Item className="relative">
      <noscript>
        <ul>
          {links.map(({ title, href, languageId }) => (
            <li key={languageId}>
              {href && title && (
                <Link href={href} locale={languageId}>
                  {title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </noscript>

      <RadixNavigationMenu.Trigger
        className={cx(
          "group",
          "bg-white",
          "flex items-center gap-2",
          "text-md  text-neutral-500",
          "rounded-full",
          "font-bold",
          "py-[8px] pl-2.5 pr-3",
          "whitespace-nowrap",
          "border-neutral-300 border-2  duration-75",
          "hover:bg-neutral-100 group-hover:bg-neutral-100 group-focus-within:bg-neutral-100",
        )}
      >
        <span className="w-5 aspect-square">
          <IconLoader
            icon={FLAGS[language]}
            removeColors={false}
            className="w-4 h-4"
          />
        </span>
        <span>{language.toUpperCase()}</span>
        <IconLoader icon="chevron" className="w-4 h-4 text-neutral-500" />
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
            "bg-white border-2 border-neutral-200 rounded-md",
          )}
        >
          {links.map(({ title, href, languageId }) => (
            <RadixNavigationMenu.Item key={languageId}>
              {title && languageId && href && (
                <Link
                  href={href}
                  locale={languageId}
                  className={cx(
                    "hover:underline flex underline-offset-4 gap-3",
                    "text-neutral-500",
                    "text-md",
                    "p-3",
                    {
                      ["font-bold bg-neutral-100 rounded-sm"]:
                        language === languageId,
                    },
                  )}
                >
                  <IconLoader
                    icon={FLAGS[languageId]}
                    removeColors={false}
                    className="w-5 aspect-square"
                  />
                  {getLanguageTitle(languageId)}
                </Link>
              )}
            </RadixNavigationMenu.Item>
          ))}
        </RadixNavigationMenu.List>
      </RadixNavigationMenu.Content>
    </RadixNavigationMenu.Item>
  );
};
