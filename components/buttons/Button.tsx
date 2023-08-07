import { isInternalLink } from "../../helpers/sitemap/isInternalLink";
import { LanguageType } from "../../languages";
import {
  backgroundClasses,
  borderClasses,
  borderRadiusClasses,
  borderWidthClasses,
  fontClasses,
  paddingXClasses,
  paddingYClasses,
  textClasses,
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
  icon?: string;
  iconPosition?: ButtonIconPositionType;
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
  theme?: {
    name?: string;
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
    uppercase?: boolean;
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
  icon,
  iconPosition = "after",
  label = "",
  loading = false,
  onClick,
  stretch = false,
  target,
  className,
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

  if (target === "_blank") {
    icon = "externallink";
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
          {wordBefore && ` ${wordBefore} `}
          <IconLoader icon={icon} className="inline-block translate-y-1" />
          {wordAfter && ` ${wordAfter}`}
        </span>
      )
    : null;

  const sharedClasses = twMerge(
    cx(
      theme?.mobile?.label?.font && fontClasses[theme?.mobile?.label?.font],
      theme?.mobile?.background?.color &&
        backgroundClasses[theme?.mobile?.background?.color],
      theme?.mobile?.label?.color && textClasses[theme?.mobile?.label?.color],
      theme?.mobile?.label?.weight &&
        weightClasses[theme?.mobile?.label?.weight],
      theme?.mobile?.background?.paddingX &&
        paddingXClasses[theme?.mobile?.background?.paddingX],
      theme?.mobile?.background?.paddingY &&
        paddingYClasses[theme?.mobile?.background?.paddingY],
      theme?.mobile?.border?.color && `border`,
      theme?.mobile?.border?.color &&
        borderClasses[theme?.mobile?.border?.color],
      theme?.mobile?.border?.radius &&
        borderRadiusClasses[theme?.mobile?.border?.radius],
      theme?.mobile?.border?.width &&
        borderWidthClasses[theme?.mobile?.border?.width],

      theme?.tablet?.label?.font &&
        `md:${fontClasses[theme?.tablet?.label?.font]}`,
      theme?.tablet?.background?.color &&
        `md:${backgroundClasses[theme?.tablet?.background?.color]}`,
      theme?.tablet?.label?.color &&
        `md:${textClasses[theme?.tablet?.label?.color]}`,
      theme?.tablet?.label?.weight &&
        `md:${weightClasses[theme?.tablet?.label?.weight]}`,
      theme?.tablet?.background?.paddingX &&
        `md:${paddingXClasses[theme?.tablet?.background?.paddingX]}`,
      theme?.tablet?.background?.paddingY &&
        `md:${paddingYClasses[theme?.tablet?.background?.paddingY]}`,
      theme?.tablet?.border?.color && `md:border`,
      theme?.tablet?.border?.color &&
        `md:${borderClasses[theme?.tablet?.border?.color]}`,
      theme?.tablet?.border?.radius &&
        `md:${borderRadiusClasses[theme?.tablet?.border?.radius]}`,
      theme?.tablet?.border?.width &&
        `md:${borderWidthClasses[theme?.tablet?.border?.width]}`,

      theme?.desktop?.label?.font &&
        `lg:${fontClasses[theme?.desktop?.label?.font]}`,
      theme?.desktop?.background?.color &&
        `lg:${backgroundClasses[theme?.desktop?.background?.color]}`,
      theme?.desktop?.label?.color &&
        `lg:${textClasses[theme?.desktop?.label?.color]}`,
      theme?.desktop?.label?.weight &&
        `lg:${weightClasses[theme?.desktop?.label?.weight]}`,
      theme?.desktop?.background?.paddingX &&
        `lg:${paddingXClasses[theme?.desktop?.background?.paddingX]}`,
      theme?.desktop?.background?.paddingY &&
        `lg:${paddingYClasses[theme?.desktop?.background?.paddingY]}`,
      theme?.desktop?.border?.color && `lg:border`,
      theme?.desktop?.border?.color &&
        `lg:${borderClasses[theme?.desktop?.border?.color]}`,
      theme?.desktop?.border?.radius &&
        `lg:${borderRadiusClasses[theme?.desktop?.border?.radius]}`,
      theme?.desktop?.border?.width &&
        `lg:${borderWidthClasses[theme?.desktop?.border?.width]}`,
      {
        ["cursor-pointer"]: true,
        [`btn-${theme?.name}`]: theme?.name,
        ["transition-colors duration-200"]: true,
        ["inline-flex items-center justify-center"]: !stretch,
        ["hover:underline focus:underline underline-offset-4 decoration-from-font"]:
          true,
        ["pointer-events-none opacity-75"]: disabled,
        ["uppercase"]: theme?.mobile?.label?.uppercase,
        ["sm:uppercase"]: theme?.tablet?.label?.uppercase,
        ["lg:uppercase"]: theme?.desktop?.label?.uppercase,
      },
      "btn",
      className,
    ),
  );

  // icon only button
  if (!label?.trim().length) {
    return (
      <Element {...props} aria-label={ariaLabel || label} onClick={handleClick}>
        <span className={sharedClasses}>
          {ButtonIcon && <ButtonIcon />}
          {loading && <ButtonLoader />}
        </span>
      </Element>
    );
  }

  // icon + text button
  return (
    <Element {...props} aria-label={ariaLabel || label} onClick={handleClick}>
      <span
        className={cx(sharedClasses, {
          ["w-full flex"]: stretch,
        })}
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

export default React.memo(Button);
