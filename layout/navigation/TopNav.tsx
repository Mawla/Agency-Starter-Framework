import { widthClasses } from "../../components/block/width.options";
import { ButtonProps } from "../../components/buttons/Button";
import { Link } from "../../components/buttons/Link";
import { IconLoaderProps } from "../../components/images/IconLoader";
import { SimpleImageProps } from "../../components/images/SimpleImage";
import { PageContext } from "../../context/PageContext";
import { backgroundClasses, borderClasses, textClasses } from "../../theme";
import { LanguageSwitch } from "./LanguageSwitch";
import { NavigationProps } from "./Navigation";
import { AlignType } from "./navigation.options";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import cx from "classnames";
import React, {
  ComponentType,
  Suspense,
  lazy,
  useContext,
  useRef,
} from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../../components/images/IconLoader"
    ),
);

const SimpleImage = lazy<ComponentType<SimpleImageProps>>(
  () =>
    import(
      /* webpackChunkName: "SimpleImage" */ "../../components/images/SimpleImage"
    ),
);

const Button = lazy<ComponentType<ButtonProps>>(
  () =>
    import(/* webpackChunkName: "Button" */ "../../components/buttons/Button"),
);

export type TopNavProps = {
  showNav?: boolean;
  onHamburgerClick?: () => void;
  navHeight?: number;
} & NavigationProps;

const alignClasses: Record<AlignType, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export const TopNav = React.forwardRef<HTMLDivElement, TopNavProps>(
  (
    { items, buttons, showNav = true, onHamburgerClick, logo, theme },
    navRef,
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { language } = useContext(PageContext);

    return (
      <div ref={wrapperRef} tabIndex={-1}>
        <div
          className={cx(
            "fixed z-50 top-0 left-0 right-0",
            "w-full",
            "transform transition-transform duration-500",
            {
              ["-translate-y-full ease-[cubic-bezier(0.2,0.07,0.38,1)]"]:
                !showNav,
            },
            theme?.block?.background &&
              backgroundClasses[theme?.block?.background],
            theme?.block?.text && textClasses[theme?.block?.text],
          )}
          ref={navRef}
        >
          <RadixNavigationMenu.Root
            className={cx(
              "radix-topnav flex gap-6 items-center",
              "py-2 md:py-3 lg:py-4",
              "mx-auto",
              "px-5 sm:px-8 lg:px-8 xl:px-8",

              widthClasses.outer,
              theme?.block?.border && borderClasses[theme?.block?.border],
              {
                ["border-b"]: theme?.block?.border,
              },
            )}
            role="navigation"
          >
            {/* logo */}
            {logo && (
              <div className="flex items-center flex-0">
                <Link href={`/${language}`} className="inline-block relative">
                  <span className="sr-only">Home</span>
                  <Suspense>
                    {logo?.mobile && (
                      <span className="block sm:hidden relative">
                        <SimpleImage {...logo?.mobile} />
                      </span>
                    )}
                    {logo?.desktop && (
                      <span className="hidden sm:block relative">
                        <SimpleImage {...logo?.desktop} />
                      </span>
                    )}
                  </Suspense>
                </Link>
              </div>
            )}

            <div className="flex-1">
              {/* main menu */}
              {Boolean(items?.length) && (
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
                                ["!underline"]: item?.current,
                              })}
                            >
                              <RadixNavigationMenu.Trigger>
                                <Suspense>
                                  <IconLoader
                                    icon="chevrondown"
                                    className="inline-block align-middle w-[1.25em] h-[1.25em] -translate-y-0.5 ml-1.5"
                                  />
                                </Suspense>
                                <span className="absolute inset-0" />
                              </RadixNavigationMenu.Trigger>
                            </Button>
                          </>
                        ) : (
                          <Button
                            {...item.button}
                            as={item?.button?.href ? "a" : "span"}
                            className={cx({
                              ["!underline"]: item?.current,
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
                                  ? backgroundClasses[
                                      theme?.submenu?.background
                                    ]
                                  : "bg-white border border-black/10",
                              )}
                            >
                              {item.children?.map((item) => (
                                <RadixNavigationMenu.Item key={item?._key}>
                                  <span className="block p-3">
                                    <Button
                                      {...item}
                                      className={cx({
                                        ["!underline"]: item.current,
                                      })}
                                    />
                                  </span>
                                </RadixNavigationMenu.Item>
                              ))}
                            </RadixNavigationMenu.List>
                          </RadixNavigationMenu.Content>
                        )}
                      </RadixNavigationMenu.Item>
                    );
                  })}
                </RadixNavigationMenu.List>
              )}
            </div>

            {/* buttons */}
            <div className="flex-0">
              <RadixNavigationMenu.List className="flex gap-2 xl:gap-4 items-center justify-end">
                <LanguageSwitch
                  align="right"
                  position="below"
                  theme={{
                    background: theme?.submenu?.background || "white",
                  }}
                />

                {/* buttons */}
                {Boolean(buttons?.length) &&
                  buttons?.map((button) => (
                    <RadixNavigationMenu.Item
                      key={button._key}
                      className="hidden md:block"
                    >
                      <Button {...button} />
                    </RadixNavigationMenu.Item>
                  ))}

                {/* hamburger */}
                <RadixNavigationMenu.Item
                  className={cx("lg:hidden ml-2 sm:-mr-3", {
                    ["hidden"]:
                      !Boolean(items?.length) && !Boolean(buttons?.length),
                  })}
                >
                  <button
                    type="button"
                    aria-label="Open navigation"
                    onClick={onHamburgerClick}
                    className="flex"
                  >
                    <span className="w-6 h-6 block relative">
                      <Suspense>
                        <IconLoader icon="menu" />
                      </Suspense>
                      <span className="absolute -inset-2 opacity-0" />
                    </span>
                  </button>
                </RadixNavigationMenu.Item>
              </RadixNavigationMenu.List>
            </div>
          </RadixNavigationMenu.Root>
        </div>
      </div>
    );
  },
);
