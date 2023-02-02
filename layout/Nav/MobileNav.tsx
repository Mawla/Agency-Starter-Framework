import { Link } from "../../components/buttons/Link";
import { IconLoader } from "../../components/images/IconLoader";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { NavProps } from "./Nav";
import * as RadixDialog from "@radix-ui/react-dialog";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import cx from "classnames";
import React from "react";

export type MobileNavProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} & NavProps;

export const MobileNav = ({
  items,
  buttons,
  open,
  onOpenChange,
}: MobileNavProps) => {
  return (
    <div className={cx("radix-dialog", { ["hidden"]: !open })}>
      <RadixDialog.Root onOpenChange={onOpenChange} open={open}>
        <RadixDialog.Overlay className="relative z-60">
          <div className="fixed inset-0 bg-neutral-base w-screen h-screen" />
        </RadixDialog.Overlay>
        <RadixDialog.Content className="z-60 fixed top-0 right-0 w-screen max-w-sm h-screen">
          <div className="h-full">
            <div className="h-full">
              <RadixDialog.Title className="sr-only">
                Navigation
              </RadixDialog.Title>
              <RadixDialog.Close className="z-60 py-3 px-3 text-neutral-base hover:text-black bg-white hover:bg-neutral-95 transition-colors absolute top-2 right-2">
                <IconLoader
                  icon="close"
                  className="text-current w-6 h-6 block"
                />
              </RadixDialog.Close>

              <Link
                href="/"
                className="inline-block absolute left-5 top-4 md:top-5 z-60"
              >
                <Logo />
              </Link>

              <RadixNavigationMenu.Root className="h-full overflow-y-auto overflow-scrolling-touch bg-white select-none shadow-2xl text-xl">
                {Boolean(items?.length) && (
                  <RadixNavigationMenu.List className="pt-20 px-2">
                    {items?.map(
                      ({ label, href, children, current, language }) => (
                        <RadixNavigationMenu.Item key={label}>
                          <details
                            open={current}
                            className="mt-0.5 py-3 px-4 group rounded-lg open:bg-neutral-95 bg-white transition-colors duration-75"
                          >
                            <summary className="list-none relative">
                              {href ? (
                                <Link
                                  href={href}
                                  locale={language}
                                  className="hover:underline text-xl font-bold text-neutral-base"
                                >
                                  {label}
                                </Link>
                              ) : (
                                <span className="block">{label}</span>
                              )}

                              <IconLoader
                                icon="chevron"
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-action-base transition-transform duration-75 group-open:rotate-180"
                              />
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
                                            "text-md font-bold text-neutral-25 hover:underline relative",
                                            {
                                              ["text-action-base"]: current,
                                            },
                                          )}
                                        >
                                          {current && (
                                            <span className="bg-action-base w-0.5 h-5 absolute -left-2 -top-0.5" />
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
                  <LanguageSwitch align="left" position="above" />
                  {Boolean(buttons?.length) &&
                    buttons?.map((button) => (
                      <RadixNavigationMenu.Item key={button.label}>
                        {button.href && (
                          <Link
                            href={button.href}
                            locale={button.language}
                            className={cx(
                              "bg-action-base",
                              "hover:underline underline-offset-4",
                              "flex items-center gap-2",
                              "text-white rounded-full text-md font-bold",
                              "py-[10px] pl-4 pr-3",
                              "whitespace-nowrap",
                            )}
                          >
                            <span>{button.label}</span>
                            <IconLoader
                              icon={button.icon}
                              className="inline text-current transform -translate-y-px w-4 h-4"
                            />
                          </Link>
                        )}
                      </RadixNavigationMenu.Item>
                    ))}
                </RadixNavigationMenu.List>

                <div className="h-16 bg-white" />
              </RadixNavigationMenu.Root>
            </div>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Root>
    </div>
  );
};
