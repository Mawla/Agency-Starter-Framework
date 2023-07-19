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
                    {items?.map(
                      ({ label, href, children, current, language }) => (
                        <RadixNavigationMenu.Item key={label}>
                          <details
                            open={current}
                            className="mt-0.5 py-3 px-4 group"
                          >
                            <summary className="list-none relative">
                              <span className="uppercase font-bold">
                                {href ? (
                                  <Link
                                    href={href}
                                    locale={language}
                                    className="hover:underline"
                                  >
                                    {label}
                                  </Link>
                                ) : (
                                  <span className="block">{label}</span>
                                )}
                              </span>

                              {Boolean(children?.length) && (
                                <IconLoader
                                  icon="chevrondown"
                                  className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 transition-transform duration-75 group-open:rotate-180"
                                />
                              )}
                            </summary>

                            {Boolean(children?.length) && (
                              <ul className="flex flex-col gap-2 pt-6 pb-3">
                                {children?.map(
                                  ({ label, current, href, language }) => (
                                    <li key={label}>
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
                      ),
                    )}
                  </RadixNavigationMenu.List>
                )}

                <RadixNavigationMenu.List className="mt-3 p-4 flex flex-row gap-3">
                  <LanguageSwitch
                    align="left"
                    position="above"
                    theme={{
                      background: theme?.submenu?.background || "white",
                      text: theme?.submenu?.text,
                    }}
                  />
                  {Boolean(buttons?.length) &&
                    buttons?.map((button) => (
                      <RadixNavigationMenu.Item key={button.label}>
                        {button.href && (
                          <Link
                            href={button.href}
                            locale={button.language}
                            className={cx(
                              "bg-action-500",
                              "hover:underline underline-offset-4",
                              "flex items-center gap-2",
                              "rounded-full text-md",
                              "whitespace-nowrap",
                              theme?.buttons?.background &&
                                backgroundClasses[theme?.buttons?.background],
                              theme?.buttons?.text &&
                                textClasses[theme?.buttons?.text],
                              {
                                ["py-[10px] pl-4 pr-3 rounded-full"]:
                                  theme?.buttons?.background,
                              },
                            )}
                          >
                            <span>{button.label}</span>
                            <IconLoader
                              icon={button.icon}
                              className="inline transform -translate-y-px w-4 h-4"
                            />
                          </Link>
                        )}
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
