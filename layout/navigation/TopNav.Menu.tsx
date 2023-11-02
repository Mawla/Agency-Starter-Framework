import Button from "../../components/buttons/Button";
import IconLoader from "../../components/images/IconLoader";
import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { backgroundClasses } from "../../theme";
import { NavigationProps } from "./Navigation";
import { AlignType } from "./navigation.options";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import cx from "clsx";
import { Suspense, useContext } from "react";

export type TopNavMenuProps = {
  items: NavigationProps["items"];
  theme?: NavigationProps["theme"];
};

const alignClasses: Record<AlignType, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export const TopNavMenu = ({ items, theme }: TopNavMenuProps) => {
  const { config } = useContext(SiteContext);
  const { language } = useContext(PageContext);

  const translations = config.translations;

  if (!Boolean(items?.filter(Boolean).length)) return null;

  return (
    <Suspense>
      <RadixNavigationMenu.Root>
        <RadixNavigationMenu.List
          className={cx(
            "hidden lg:flex gap-px",
            alignClasses[theme?.menu?.align || "center"],
          )}
        >
          {items?.filter(Boolean).map((item) => {
            if (item?.children?.length) {
              delete item?.button?.theme?.icon;
            }

            return (
              <RadixNavigationMenu.Item
                key={item._key}
                className="relative group"
              >
                {Boolean(item.children?.length) ? (
                  <>
                    <Button
                      {...item.button}
                      as={item?.button?.href ? "a" : "span"}
                      className={cx({
                        ["!underline current"]: item?.current,
                      })}
                    >
                      <RadixNavigationMenu.Trigger>
                        <IconLoader
                          icon="chevrondown"
                          className="inline-block align-middle w-[1.25em] h-[1.25em] -translate-y-0.5 ml-1.5"
                        />
                        <span className="absolute inset-0" />
                        <span className="sr-only">
                          {translations?.open?.[language] || "open"}
                        </span>
                      </RadixNavigationMenu.Trigger>
                    </Button>
                  </>
                ) : (
                  <Button
                    {...item.button}
                    as={item?.button?.href ? "a" : "span"}
                    className={cx({
                      ["!underline current"]: item?.current,
                    })}
                  />
                )}

                {Boolean(item.children?.length) && (
                  <noscript>
                    <ul>
                      {item.children?.map((item) => (
                        <li key={item._key}>
                          <Button {...item} />
                        </li>
                      ))}
                    </ul>
                  </noscript>
                )}

                {/* submenu */}
                {Boolean(item.children?.length) && (
                  <RadixNavigationMenu.Content
                    className={cx(
                      "w-[200px]",
                      "absolute bottom-0 left-1/2",
                      "translate-y-full -translate-x-1/2",
                    )}
                  >
                    <RadixNavigationMenu.List
                      className={cx(
                        "translate-y-2 p-1 shadow-[0_16px_32px_-4px_rgba(89,93,106,0.15)] rounded-md",
                        theme?.submenu?.background
                          ? backgroundClasses[theme?.submenu?.background]
                          : "bg-white border border-black/10",
                      )}
                    >
                      {item.children?.map((item) => (
                        <RadixNavigationMenu.Item key={item?._key}>
                          <Button
                            {...item}
                            className={cx("max-w-full whitespace-pre-wrap", {
                              ["!underline current"]: item.current,
                            })}
                          />
                        </RadixNavigationMenu.Item>
                      ))}
                    </RadixNavigationMenu.List>
                  </RadixNavigationMenu.Content>
                )}
              </RadixNavigationMenu.Item>
            );
          })}
        </RadixNavigationMenu.List>
      </RadixNavigationMenu.Root>
    </Suspense>
  );
};
