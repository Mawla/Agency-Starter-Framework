import { backgroundClasses, borderClasses, textClasses } from "../../colors";
import { isInternalLink } from "../../helpers/sitemap/isInternalLink";
import { LanguageType } from "../../languages";
import { ColorType, IconType } from "../../types";
import { IconLoaderProps } from "../images/IconLoader";
import { Spinner } from "../loaders/Spinner";
import { Link } from "./Link";
import {
  AlignType,
  SizeType,
  IconPositionType,
  WeightType,
  VariantType,
} from "./button.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () => import(/* webpackChunkName: "IconLoader" */ "../images/IconLoader"),
);

export type ButtonProps = {
  align?: AlignType;
  ariaLabel?: string;
  as?: "button" | "a" | "div" | "span" | "submit";
  compact?: boolean;
  href?: string;
  icon?: IconType;
  iconPosition?: IconPositionType;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  plain?: boolean;
  round?: boolean;
  size?: SizeType;
  stretch?: boolean;
  target?: "_blank";
  theme?: { text?: ColorType; background?: ColorType; border?: ColorType };
  disabled?: boolean;
  loading?: boolean;
  weight?: WeightType;
  download?: boolean;
  hideLabel?: boolean;
  language?: LanguageType;
  variant?: VariantType;
};

const sizeClasses: Record<SizeType, string> = {
  sm: "text-base md:text-lg",
  md: "text-lg md:text-xl",
};

const spaceClasses: Record<SizeType, string> = {
  sm: "px-4 py-2 md:px-4",
  md: "px-5 py-[9px] md:px-6",
};

const iconSizeClasses: Record<SizeType, string> = {
  sm: "w-5 h-5",
  md: "w-5 h-5",
};

const iconOnlySizeClasses: Record<SizeType, string> = {
  sm: "w-10 h-10 md:w-10 md:h-10",
  md: "w-10 h-10 md:w-11 md:h-11",
};

const alignClasses: Record<AlignType, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const weightClasses: Record<WeightType, string> = {
  regular: "font-normal",
  medium: "font-medium",
};

const variantClasses: Record<VariantType, string> = {
  primary: "bg-[#eee] text-[#000]",
  secondary: "bg-[#000] text-[#fff]",
  tertiary: "bg-[#fff] text-[#000]",
};

export const Button = (props: ButtonProps) => {
  if (props.href && isInternalLink(props.href)) {
    return (
      <Link href={props.href} locale={props.language}>
        <ButtonInner {...props} as="span" />
      </Link>
    );
  }

  return <ButtonInner {...props} />;
};

export const ButtonMemo = React.memo(Button);

const ButtonInner = ({
  align = "center",
  ariaLabel,
  as = "a",
  compact = false,
  disabled = false,
  download = false,
  hideLabel = false,
  href,
  icon,
  iconPosition = "after",
  label = "",
  loading = false,
  onClick,
  plain = false,
  round = true,
  size = "md",
  stretch = false,
  target,
  theme,
  variant = "primary",
  weight = "medium",
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

  if (target === "_blank") {
    icon = "external-link";
    iconPosition = "after";
  }

  if (hideLabel) {
    ariaLabel = label;
    props.title = label;
    label = "";
  }

  label = label || "";
  iconPosition = iconPosition || "after";

  // prevent orphan icon by adding first / last word to icon
  const labelWords = label?.split(" ");

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

  const ButtonIcon = icon
    ? ({
        wordBefore,
        wordAfter,
      }: {
        wordBefore?: string;
        wordAfter?: string;
      }) => (
        <span className=" whitespace-nowrap break-all">
          {wordBefore && ` ${wordBefore}`}
          <IconLoader
            icon={icon}
            className={cx("inline-block translate-y-1", iconSizeClasses[size])}
          />
          {wordAfter && `${wordAfter} `}
        </span>
      )
    : null;

  const sharedClasses = {
    ["cursor-pointer"]: true,
    ["border"]: theme?.border,
    ["transition-colors duration-200"]: true,
    ["rounded-full"]: round,
    [backgroundClasses[theme?.background || "white"]]: true,
    [borderClasses[theme?.border || "white"]]: theme?.border,
    [textClasses[theme?.text || "black"]]: true,
    ["inline-flex items-center justify-center"]: !stretch,
    ["bg-opacity-0 border-opacity-0"]: plain,
    ["hover:bg-opacity-0 focus:bg-opacity-0"]: plain,
    ["hover:underline focus:underline underline-offset-4 decoration-from-font"]:
      true,
    ["pointer-events-none opacity-75"]: disabled,
    [weightClasses[weight]]: true,
    [variantClasses[variant]]: true,
  };

  // icon only button
  if (!label?.trim().length) {
    return (
      <Element
        {...props}
        aria-label={ariaLabel || label}
        onClick={handleClick}
        className="btn"
      >
        <span
          className={cx(sharedClasses, {
            [iconOnlySizeClasses[size]]: !compact,
          })}
        >
          {ButtonIcon && <ButtonIcon />}
          {loading && <ButtonLoader />}
        </span>
      </Element>
    );
  }

  // icon + text button
  return (
    <Element
      {...props}
      aria-label={ariaLabel || label}
      onClick={handleClick}
      className="btn"
    >
      <span
        className={cx(
          sharedClasses,
          sizeClasses[size],
          alignClasses[align],
          { ["w-full flex"]: stretch },
          { ["rounded-full"]: round },
          { [spaceClasses[size]]: !compact },
        )}
      >
        <span className="no-underline text-left break-words">
          {ButtonIcon ? (
            <>
              {ButtonIcon && iconPosition === "before" && (
                <ButtonIcon wordAfter={labelWords[0]} />
              )}
              {iconPosition === "before"
                ? labelWords.slice(1).join(" ")
                : labelWords.slice(0, -1).join(" ")}
              {ButtonIcon && iconPosition === "after" && (
                <ButtonIcon wordBefore={labelWords[labelWords.length - 1]} />
              )}
              {loading && <ButtonLoader />}
            </>
          ) : (
            <span className="flex">
              {label}
              {loading && <ButtonLoader />}
            </span>
          )}
        </span>
      </span>
    </Element>
  );
};

const ButtonLoader = () => (
  <span className="h-5 w-5 inline-flex self-center align-middle ml-2 -mb-1">
    <Spinner />
  </span>
);
