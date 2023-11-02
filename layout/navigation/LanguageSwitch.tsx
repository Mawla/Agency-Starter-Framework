import { Link } from "../../components/buttons/Link";
import IconLoader from "../../components/images/IconLoader";
import { PageContext } from "../../context/PageContext";
import { getLanguageTitle, languages } from "../../languages";
import { backgroundClasses, textClasses } from "../../theme";
import { ColorType } from "../../types";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import cx from "clsx";
import { useContext } from "react";

type LanguageSwitchProps = {
  align?: "left" | "right";
  position?: "above" | "below";
  theme?: {
    background?: ColorType;
    text?: ColorType;
  };
};

export const LanguageSwitch = ({
  align = "right",
  position = "below",
  theme,
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
    .filter(({ href }) => Boolean(href))
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

      <RadixNavigationMenu.Trigger className="group flex items-center gap-2 text-[14px] font-bold mr-10 whitespace-nowrap hover:underline">
        <IconLoader icon="globe" className="w-4 h-4" />
        {language.toUpperCase()}
        <IconLoader icon="chevrondown" className="w-4 h-4" />
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
            "translate-y-4 p-1 shadow-[0_16px_32px_-4px_rgba(89,93,106,0.15)] rounded-md",
            theme?.background
              ? backgroundClasses[theme?.background]
              : "bg-white border border-black/10",
            theme?.text && textClasses[theme?.text],
          )}
        >
          {links.map(({ title, href, languageId }, i) => (
            <RadixNavigationMenu.Item key={i}>
              {title && languageId && href && (
                <Link
                  href={href}
                  locale={languageId}
                  className={cx(
                    "hover:underline flex underline-offset-4 gap-3",
                    "text-md",
                    "p-3",
                    {
                      ["font-bold rounded-sm"]: language === languageId,
                    },
                  )}
                >
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
