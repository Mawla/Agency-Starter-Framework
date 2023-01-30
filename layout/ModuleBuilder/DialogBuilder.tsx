import { DialogProps } from "../../components/Dialog/Dialog";
import { PortableTextProps } from "../../components/content/PortableText";
import { VideoType } from "../../types";
import { DialogSchemaName } from "../../types.sanity";
import { LazyLoadInView } from "./LazyLoadInView";
import ModuleErrorBoundary from "./ModuleErrorBoundary";
import { StaticFormBuilder } from "./StaticFormBuilder";
import { useRouter } from "next/router";
import React, { ComponentType, lazy, useEffect, useState } from "react";
import { Suspense } from "react";

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/content/PortableText"
    ) as any,
);

const Video = lazy<ComponentType<VideoType>>(
  () =>
    import(
      /* webpackChunkName: "VideoComponent" */ "../../components/video/Video"
    ) as any,
);

const Dialog = lazy<ComponentType<DialogProps>>(
  () =>
    import(
      /* webpackChunkName: "Dialog" */ "../../components/Dialog/Dialog"
    ) as any,
);

export type DialogBuilderProps = {
  onDialogOpenChange?: (open: boolean) => void;
  items: {
    _type?: DialogSchemaName;
    _key?: string;
    slug?: string;
    content?: { _type: string }[];
    video?: VideoType;
    form?: {};
  }[];
};

export const DialogBuilder = ({
  items = [],
  onDialogOpenChange = () => {},
}: DialogBuilderProps) => {
  const router = useRouter();
  const [currentOpenSlug, setCurrentOpenSlug] = useState<string | null>(null);
  const dialogSlugs = items
    ?.filter(({ slug }) => slug?.trim().length)
    .map(({ slug }) => slug);

  useEffect(() => {
    if (!router?.events) return;

    const handleRouteChange = (url: string) => {
      const hash = url.split("#")[1];
      if (!hash?.trim().length) setCurrentOpenSlug(null);
      if (dialogSlugs.indexOf(hash) > -1) setCurrentOpenSlug(hash);
    };

    router.events.on("hashChangeStart", handleRouteChange);
    handleRouteChange(location.href);
    return () => router.events.off("hashChangeStart", handleRouteChange);
  }, [dialogSlugs]);

  const onDialogClose = () => {
    const scrollY = window.scrollY;
    router.push(location.href.split("#")[0], undefined, { shallow: true });
    window.scrollTo(0, scrollY);
  };

  useEffect(
    () => onDialogOpenChange(Boolean(currentOpenSlug)),
    [onDialogOpenChange, currentOpenSlug],
  );

  const DIALOG_MODES = {
    "dialog.video": "video",
    "dialog.richtext": "content",
    "dialog.form": "form",
  };

  return (
    <>
      {items
        ?.filter(({ slug }) => slug?.trim().length)
        .map((item) => (
          <Suspense fallback={``} key={item._key}>
            <ModuleErrorBoundary>
              <LazyLoadInView
                enabled={currentOpenSlug === item?.slug}
                module={item._type}
              >
                {item._type && (
                  <Dialog
                    open={currentOpenSlug === item?.slug}
                    onOpenChange={onDialogClose}
                    mode={DIALOG_MODES[item._type] as DialogProps["mode"]}
                  >
                    {item._type === "dialog.richtext" && (
                      <PortableText content={item.content || []} />
                    )}
                    {item._type === "dialog.video" && (
                      <figure>
                        <Video {...item.video} />
                      </figure>
                    )}
                  </Dialog>
                )}
              </LazyLoadInView>
            </ModuleErrorBoundary>
          </Suspense>
        ))}
    </>
  );
};

export const DialogBuilderMemo = React.memo(DialogBuilder);
