import { isInternalLink } from "../../helpers/sitemap/isInternalLink";
import { LanguageType } from "../../languages";
import {
  backgroundClasses,
  borderClasses,
  borderRadiusClasses,
  borderWidthClasses,
  fontClasses,
  fontSizeClasses,
  paddingXClasses,
  paddingYClasses,
  textClasses,
  textTransformClasses,
  weightClasses,
} from "../../theme";
import {
  BorderRadiusType,
  BorderWidthType,
  ColorType,
  FontSizeType,
  FontType,
  FontWeightType,
  PaddingType,
  TextTransformType,
} from "../../types";
import { IconLoaderProps } from "../images/IconLoader";
import { Spinner } from "../loaders/Spinner";
import { Link } from "./Link";
import { ButtonIconPositionType } from "./button.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";
import { twMerge } from "tailwind-merge";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () => import(/* webpackChunkName: "IconLoader" */ "../images/IconLoader"),
);

export type ButtonProps = {
  ariaLabel?: string;
  as?: "button" | "a" | "div" | "span" | "submit";
  href?: string;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  stretch?: boolean;
  target?: "_blank";
  disabled?: boolean;
  loading?: boolean;
  download?: boolean;
  hideLabel?: boolean;
  language?: LanguageType;
  className?: string;
  presetTheme?: {
    name?: string;
    icon?: {
      name?: string;
      position?: ButtonIconPositionType;
    };
    mobile?: ButtonThemeType;
    tablet?: ButtonThemeType;
    desktop?: ButtonThemeType;
  };
  theme?: {
    icon?: {
      name?: string;
      position?: ButtonIconPositionType;
    };
    mobile?: ButtonThemeType;
    tablet?: ButtonThemeType;
    desktop?: ButtonThemeType;
  };
};

type ButtonThemeType = {
  label?: {
    color?: ColorType;
    font?: FontType;
    size?: FontSizeType;
    transform?: TextTransformType;
    weight?: FontWeightType;
  };
  background?: {
    color?: ColorType;
    paddingX?: PaddingType;
    paddingY?: PaddingType;
  };
  border?: {
    color?: ColorType;
    radius?: BorderRadiusType;
    width?: BorderWidthType;
  };
};

export const Button = (props: ButtonProps) => {
  if (props.href && isInternalLink(props.href)) {
    return (
      <Link href={props.href} locale={props.language} showExternalIcon={false}>
        <ButtonInner {...props} as="span" />
      </Link>
    );
  }

  return <ButtonInner {...props} />;
};

const ButtonInner = ({
  ariaLabel,
  as = "a",
  disabled = false,
  download = false,
  hideLabel = false,
  href,
  label = "",
  loading = false,
  onClick,
  stretch = false,
  target,
  presetTheme,
  theme,
}: ButtonProps) => {
  const Element = as === "submit" ? "button" : as;
  const props: {
    type?: "button" | "reset" | "submit" | undefined;
    href?: string | undefined;
    target?: string | undefined;
    download?: boolean | null;
    title?: string | undefined;
    disabled?: boolean;
  } = {};

  const themeObj: ButtonProps["presetTheme"] = {
    name: presetTheme?.name || "custom",
    icon: theme?.icon || presetTheme?.icon,
  };

  if (!themeObj?.icon) themeObj.icon = {};

  if (target === "_blank") {
    themeObj.icon.name = "externallink";
    themeObj.icon.position = "after";
  }

  if (hideLabel) {
    ariaLabel = label;
    props.title = label;
    label = "";
  }

  label = label || "";
  themeObj.icon.position = themeObj.icon.position || "after";

  if (as === "button") {
    props.type = "button";
  }

  if (as === "submit") {
    props.type = "button";
  }

  if (as === "a") {
    props.href = href;
    props.target = target;
  }

  if (download) {
    props.download = true;
    if (props.href && props.href?.indexOf(".sanity.io") > -1)
      props.href = `${props.href}?dl`;
  }

  const handleClick = (e: React.MouseEvent) =>
    disabled ? () => {} : onClick ? onClick(e) : () => {};

  function getClasses(scope: string, classes: Record<string, string>) {
    const [group, prop] = scope.split(".");

    const arr: string[] = [];

    const newPresetTheme = { ...(presetTheme as any) };
    const newtheme = { ...(theme as any) };

    if (newPresetTheme?.mobile?.[group]?.[prop])
      arr.push(classes[newPresetTheme.mobile[group][prop]]);

    if (newPresetTheme?.tablet?.[group]?.[prop])
      arr.push(`md:${classes[newPresetTheme.tablet[group][prop]]}`);

    if (newPresetTheme?.desktop?.[group]?.[prop])
      arr.push(`lg:${classes[newPresetTheme.desktop[group][prop]]}`);

    if (newtheme?.mobile?.[group]?.[prop])
      arr.push(classes[newtheme.mobile[group][prop]]);

    if (newtheme?.tablet?.[group]?.[prop])
      arr.push(`md:${classes[newtheme.tablet[group][prop]]}`);

    if (newtheme?.desktop?.[group]?.[prop])
      arr.push(`lg:${classes[newtheme.desktop[group][prop]]}`);

    return arr;
  }

  return (
    <Element {...props} aria-label={ariaLabel || label} onClick={handleClick}>
      <span
        className={cx(
          twMerge(
            cx(
              ...getClasses("label.color", textClasses),
              ...getClasses("label.font", fontClasses),
              ...getClasses("label.size", fontSizeClasses),
              ...getClasses("label.weight", weightClasses),
              ...getClasses("label.transform", textTransformClasses),
              ...getClasses("background.color", backgroundClasses),
              ...getClasses("background.paddingX", paddingXClasses),
              ...getClasses("background.paddingY", paddingYClasses),
              ...getClasses("border.color", borderClasses),
              ...getClasses("border.radius", borderRadiusClasses),
              ...getClasses("border.width", borderWidthClasses),
              {
                ["group"]: true,
                ["cursor-pointer"]: true,
                ["transition-colors duration-200"]: true,
                ["hover:underline focus:underline underline-offset-4 decoration-from-font"]:
                  true,
                ["pointer-events-none opacity-75"]: disabled,
                ["w-full"]: stretch,
                ["no-underline text-left break-words"]: true,
              },
            ),
          ),
          ` btn btn-${themeObj?.name}`,
        )}
      >
        {label && themeObj.icon.position === "after" && label}
        {themeObj.icon.name && (
          <IconLoader
            icon={themeObj.icon.name}
            className={cx(
              "inline-block align-middle w-[1.25em] h-[1.25em] -translate-y-0.5",
              {
                ["mr-1.5"]: label && themeObj.icon.position === "before",
                ["ml-1.5"]: label && themeObj.icon.position !== "before",
              },
            )}
          />
        )}
        {label && themeObj.icon.position === "before" && label}
        {loading && <ButtonLoader />}
      </span>
    </Element>
  );
};

const ButtonLoader = () => (
  <span className="h-[2em] w-[2em] inline-flex self-center align-middle ml-2 -mb-1">
    <Spinner />
  </span>
);

export default React.memo(Button);
