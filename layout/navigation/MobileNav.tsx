import { Button } from "../../components/buttons/Button";
import { Link } from "../../components/buttons/Link";
import { IconLoader } from "../../components/images/IconLoader";
import { backgroundClasses, textClasses } from "../../theme";
import { LanguageSwitch } from "./LanguageSwitch";
import { NavigationProps } from "./Navigation";
import * as RadixDialog from "@radix-ui/react-dialog";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import cx from "classnames";
import React from "react";

export type MobileNavProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} & NavigationProps;

export const MobileNav = ({
  items,
  buttons,
  open,
  theme,
  onOpenChange,
}: MobileNavProps) => {
  return (
    <div
      className={cx(
        "radix-dialog",
        { ["hidden"]: !open },
        theme?.block?.text && textClasses[theme?.block?.text],
      )}
    >
      <RadixDialog.Root onOpenChange={onOpenChange} open={open}>
        <RadixDialog.Overlay className="relative">
          <div className="fixed inset-0 bg-black/20 w-screen h-screen z-50" />
        </RadixDialog.Overlay>
        <RadixDialog.Content className="z-[60] fixed top-0 right-0 w-screen max-w-xs h-screen">
          <div className="h-full">
            <div className="h-full">
              <RadixDialog.Title className="sr-only">
                Navigation
              </RadixDialog.Title>
              <RadixDialog.Close className="z-[60] py-3 px-3 absolute top-2 right-2">
                <IconLoader icon="close" className="w-6 h-6 block" />
              </RadixDialog.Close>

              <RadixNavigationMenu.Root
                className={cx(
                  "h-full overflow-y-auto overflow-scrolling-touch select-none shadow-2xl text-xl",
                  theme?.block?.background
                    ? backgroundClasses[theme?.block?.background]
                    : "bg-white",
                )}
              >
                {Boolean(items?.length) && (
                  <RadixNavigationMenu.List className="pt-20 px-2">
                    {items?.map((item) => (
                      <RadixNavigationMenu.Item key={item._key}>
                        <details
                          open={item.current}
                          className="mt-0.5 py-3 px-4 group"
                        >
                          <summary className="list-none relative">
                            <span className="uppercase font-bold">
                              {item.button?.href ? (
                                <Link
                                  href={item.button?.href}
                                  locale={item.button?.language}
                                  className="hover:underline"
                                >
                                  {item.button?.label}
                                </Link>
                              ) : (
                                <span className="block">
                                  {item.button?.label}
                                </span>
                              )}
                            </span>

                            {Boolean(item.children?.length) && (
                              <IconLoader
                                icon="chevrondown"
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 transition-transform duration-75 group-open:rotate-180"
                              />
                            )}
                          </summary>

                          {Boolean(item?.children?.length) && (
                            <ul className="flex flex-col gap-2 pt-6 pb-3">
                              {item?.children?.map(
                                ({ label, current, href, language, _key }) => (
                                  <li key={_key}>
                                    {href && (
                                      <Link
                                        href={href}
                                        locale={language}
                                        className={cx(
                                          "text-md hover:underline relative",
                                          {
                                            ["underline"]: current,
                                          },
                                        )}
                                      >
                                        {current && (
                                          <span className="bg-action-500 w-0.5 h-5 absolute -left-2 -top-0.5" />
                                        )}
                                        {label}
                                      </Link>
                                    )}
                                  </li>
                                ),
                              )}
                            </ul>
                          )}
                        </details>
                      </RadixNavigationMenu.Item>
                    ))}
                  </RadixNavigationMenu.List>
                )}

                <RadixNavigationMenu.List className="mt-3 p-4 flex flex-row gap-3">
                  <LanguageSwitch
                    align="left"
                    position="above"
                    theme={{
                      background: theme?.submenu?.background || "white",
                    }}
                  />
                  {Boolean(buttons?.length) &&
                    buttons?.map((button) => (
                      <RadixNavigationMenu.Item key={button._key}>
                        <Button {...button} />
                      </RadixNavigationMenu.Item>
                    ))}
                </RadixNavigationMenu.List>

                <div className="h-16" />
              </RadixNavigationMenu.Root>
            </div>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Root>
    </div>
  );
};
