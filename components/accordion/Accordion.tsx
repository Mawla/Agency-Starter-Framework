import { backgroundClasses, divideClasses, textClasses } from "../../colors";
import { ColorType } from "../../types";
import Text from "../block/Text";
import { BackgroundColorType } from "../block/background.options";
import { TitleColorType } from "../block/title.options";
import { IconLoaderProps } from "../images/IconLoader";
import { PortableTextProps } from "../portabletext/PortableText";
import * as RadixAccordion from "@radix-ui/react-accordion";
import cx from "classnames";
import React, { ComponentType, lazy, Suspense } from "react";

export type AccordionItemType = {
  _key?: string;
  title?: string;
  content?: PortableTextProps["content"];
};

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../../components/images/IconLoader"
    ),
);
export type AccordionProps = {
  items: AccordionItemType[];
  theme?: {
    background?: BackgroundColorType;
    title?: TitleColorType;
    icon?: ColorType;
    divider?: ColorType;
  };
};

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../portabletext/PortableText"
    ),
);

export const Accordion = ({ items, theme }: AccordionProps) => {
  if (!Boolean(items.filter(Boolean)?.length)) return null;

  return (
    <div className="radix-accordion">
      <Suspense>
        <RadixAccordion.Root
          type="multiple"
          className={cx(
            "divide-y",
            theme?.background && backgroundClasses[theme?.background],
            divideClasses[theme?.divider || "neutral-200"],
          )}
        >
          {items?.map(({ _key, title = "", content }) => (
            <RadixAccordion.Item
              value={_key || title}
              key={_key || title}
              id={_key || title}
              className="radix-scroll-margin"
            >
              <RadixAccordion.Header
                className={cx(
                  "hover:underline",
                  theme?.title ? textClasses[theme?.title] : "text-current",
                )}
              >
                <RadixAccordion.Trigger className="p-5 text-lg flex items-center w-full group">
                  <div className="pr-6 text-left font-bold">{title}</div>
                  <span className="flex-shrink-0 ml-auto">
                    <IconLoader
                      icon="chevron"
                      className={cx(
                        "block w-6 h-6 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180",
                        theme?.icon ? textClasses[theme?.icon] : "text-current",
                      )}
                    />
                  </span>
                </RadixAccordion.Trigger>
              </RadixAccordion.Header>
              <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <Text
                  className="h-full px-5 pb-5 pt-0 text-left"
                  size="md"
                  background={theme?.background}
                >
                  <PortableText content={content as any} />
                </Text>
              </RadixAccordion.Content>
            </RadixAccordion.Item>
          ))}
        </RadixAccordion.Root>
      </Suspense>
    </div>
  );
};

export default React.memo(Accordion);
