import { IconLoaderProps } from "../images/IconLoader";
import * as RadixDialog from "@radix-ui/react-dialog";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () => import(/* webpackChunkName: "IconLoader" */ "../images/IconLoader"),
);

export type DialogProps = {
  children: React.ReactNode | React.ReactElement;
  title?: string;
  description?: string;
  open?: boolean;
  mode?: "video" | "content" | "form";
  onOpenChange?(open: boolean): void;
};

export const Dialog = ({
  title,
  description,
  children,
  open = false,
  mode = "content",
  onOpenChange,
}: DialogProps) => {
  if (!children) return null;

  return (
    <div className={cx("radix-dialog", { ["hidden"]: !open })}>
      <RadixDialog.Root onOpenChange={onOpenChange} open={open}>
        <RadixDialog.Overlay className="relative z-50">
          <div className="fixed inset-0 bg-black w-screen h-screen" />
        </RadixDialog.Overlay>
        <RadixDialog.Content
          className={cx(
            "fixed z-50 w-screen top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 max-w-[90vw]",
            {
              ["max-h-[75vh] aspect-ratio-16-9 max-w-inner"]: mode === "video",
              ["max-w-[90vw] md:max-w-[75vw] lg:max-w-3xl"]: mode === "content",
              ["inline-flex justify-center"]: mode === "form",
            },
          )}
        >
          <div
            className={cx({
              ["text-neutral-500 overflow-y-auto overflow-scrolling-touch filter shadow-md bg-white p-10 h-auto max-h-[75vh] "]:
                mode === "content",
              ["overflow-y-auto overflow-scrolling-touch h-auto max-h-[75vh] relative"]:
                mode === "form",
            })}
          >
            <div>
              {title && (
                <RadixDialog.Title className="sr-only">
                  {title}
                </RadixDialog.Title>
              )}
              {description && (
                <RadixDialog.Description className="sr-only">
                  {description}
                </RadixDialog.Description>
              )}

              <RadixDialog.Close className="py-3 px-3 text-neutral-10 hover:text-neutral-900 bg-white hover:bg-neutral-100 transition-colors absolute top-0 right-0 z-10">
                <IconLoader
                  icon="close"
                  className="text-current w-8 h-8 block"
                />
              </RadixDialog.Close>

              {mode === "content" && (
                <div className="h-full prose prose-sm md:prose break-words">
                  {children}
                </div>
              )}

              {mode === "form" && <div>{children}</div>}

              {mode === "video" && (
                <div className="relative aspect-ratio-16-9">{children}</div>
              )}
            </div>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Root>
    </div>
  );
};

export default React.memo(Dialog);
