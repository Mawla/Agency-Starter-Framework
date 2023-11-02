import { WidthType, widthClasses } from "../../components/block/width.options";
import Link, { LinkProps } from "../../components/buttons/Link";
import IconLoader from "../../components/images/IconLoader";
import { textAlignClasses } from "../../components/text/text.options";
import { backgroundClasses, borderClasses, textClasses } from "../../theme";
import { ColorType } from "../../types";
import { AlignType } from "./navigation.options";
import cx from "clsx";

export type TopNavBannerProps = {
  theme?: {
    hidden?: boolean;
    background?: ColorType;
    text?: ColorType;
    border?: ColorType;
    align?: AlignType;
    width?: WidthType;
  };
  link?: LinkProps;
  content?: React.ReactNode;
};

export const TopNavBanner = ({ theme, content, link }: TopNavBannerProps) => {
  if (!content) return null;

  return (
    <div
      className={cx(
        theme?.text && textClasses[theme.text],
        theme?.align && textAlignClasses[theme.align],
        theme?.background && backgroundClasses[theme.background],
        theme?.border && borderClasses[theme?.border],
        theme?.border && "border-b",
      )}
    >
      <div
        className={cx(
          "text-sm group",
          "relative",
          "py-2 md:py-2.5",
          "mx-auto",
          "px-5 sm:px-8 lg:px-8 xl:px-8",
          widthClasses[theme?.width || "inner"],
        )}
      >
        {link ? (
          <Link
            {...link}
            className={cx("flex items-center gap-1", {
              ["justify-center"]:
                theme?.align !== "left" && theme?.align !== "right",
              ["justify-start"]: theme?.align === "left",
              ["justify-end"]: theme?.align === "right",
            })}
            showExternalIcon={false}
          >
            {content && (
              <p className="group-hover:underline hover:underline focus:underline underline-offset-4 decoration-from-font">
                {content}
              </p>
            )}
            <IconLoader icon="arrow" className="w-4 h-4" />
          </Link>
        ) : (
          <>{content && <p>{content}</p>}</>
        )}
      </div>
    </div>
  );
};
