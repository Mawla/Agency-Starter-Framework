import { getFlatBreadcrumb } from "../../helpers/sitemap/getFlatBreadcrumb";
import { MiniMap, MiniMapProps } from "./MiniMap";
import { ScreenCapture } from "./ScreenCapture";
import { ClientConfig, createClient, SanityClient } from "@sanity/client";
import cx from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * Create sanity client instance using the preview token
 */

const createLivePreviewFrontendClient = (
  config: ClientConfig,
  previewToken: string,
) => {
  if (!previewToken) return null;
  return createClient({
    ...config,
    apiVersion: "2021-03-25",
    useCdn: false,
    token: previewToken,
    ignoreBrowserTokenWarning: true,
    perspective: "previewDrafts",
  });
};

export type LivePreviewProps = {
  setData: (data: any) => void;
  getQuery: () => string;
  id: string;
  updatedAt?: string;
  config: ClientConfig;
  position: "top" | "bottom";
  showMiniMap?: boolean;
};

export const LivePreview = ({
  setData,
  getQuery,
  id,
  updatedAt,
  config,
  position,
  showMiniMap = true,
}: LivePreviewProps) => {
  const previewTools = useRef<HTMLDivElement>(null);

  const [previewLoading, setPreviewLoading] = useState<boolean>(false);

  const frontendClient = useRef<SanityClient | null>(null);

  const initialRevision = useRef<string | null>(null);
  const mutationRevision = useRef<string | null>(null);
  const currentRevision = useRef<string | null>(null);

  const reloadTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reloadAttempts = useRef<number>(0);

  const [miniBlocks, setMiniBlocks] = useState<MiniMapProps["blocks"]>([]);
  const [isMiniMapVisible, setIsMiniMapVisible] = useState<boolean>(false);

  const timeLog = useCallback((date: string, message: string) => {
    console.log(`[${new Date(date).toLocaleTimeString("en-US")}]: ${message}`);
  }, []);

  /**
   * Reload data
   */

  const reloadPreview = useCallback(async () => {
    if (!frontendClient.current) return;
    if (!id) return;

    // clear timeout
    if (reloadTimeout.current) clearTimeout(reloadTimeout.current);

    // already up to date
    if (
      currentRevision.current &&
      currentRevision.current === mutationRevision.current
    ) {
      setPreviewLoading(false);
      return;
    }

    // stop after 15 tries
    if (reloadAttempts.current > 15) return;

    // fetch the new data
    setPreviewLoading(true);
    const newData = await frontendClient.current.fetch(getQuery(), {
      _id: id.replace("drafts.", ""),
    });
    if (!newData) {
      setPreviewLoading(false);
      return;
    }

    // revision mismatch
    if (mutationRevision.current && newData._rev !== mutationRevision.current) {
      console.log(`Revisions don't match`);
      console.log(
        `- Expecting ${mutationRevision.current} got ${newData._rev}`,
      );
      console.log(`- Reloading`);

      const nextTry = 100 + 250 * reloadAttempts.current;
      reloadTimeout.current = setTimeout(reloadPreview, nextTry);

      return;
    }

    timeLog(newData._updatedAt, "got new data");
    currentRevision.current = newData._rev;

    if (newData?.breadcrumb) {
      newData.breadcrumb = [
        ...getFlatBreadcrumb(newData?.breadcrumb),
        newData?.homepage,
      ]
        .filter(Boolean)
        .reverse();
    }

    setData(newData);

    const newMiniBlocks = newData?.blocks?.map(
      ({
        _key,
        _type,
        title,
      }: {
        _type: string;
        _key: string;
        title: string;
      }) => ({
        _type,
        _key,
        title,
      }),
    );

    setMiniBlocks(newMiniBlocks);

    setPreviewLoading(false);
    reloadAttempts.current = 0;
  }, [frontendClient, id, updatedAt]);

  useEffect(() => {
    if (!id) return;
    let listener: any;

    /**
     * Get preview token from api with user credentials
     * because we don't want to store it in the frontend
     */

    async function getPreviewToken() {
      const userReq = await fetch(
        `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/users/me`,
        { credentials: "include" },
      );
      const user = await userReq.json();
      if (!user?.id) return;

      const res = await fetch(`/api/preview/get-preview-token`, {
        method: "POST",
        body: JSON.stringify({ user }),
      });
      let { previewToken } = await res.json();
      previewToken = previewToken?.replace(user.id, "");
      return previewToken;
    }

    /**
     * Create a listener to ping when the data needs to be refreshed
     */

    async function setupPreviewListener() {
      if (listener?.unsubscribe) listener.unsubscribe();
      const previewToken = await getPreviewToken();
      if (!previewToken) return;
      if (frontendClient.current) return;

      frontendClient.current = await createLivePreviewFrontendClient(
        config,
        previewToken,
      );

      listener = frontendClient?.current
        ?.listen(`*[_id == "${id}"][0] { _rev }`, {
          includeResult: false,
        })
        .subscribe((mutation: any) => {
          // get the field name and key from the mutation
          // const finalMutation =
          //   mutation.mutations[mutation.mutations.length - 1];
          // const diffMatchPatch = finalMutation?.patch?.diffMatchPatch || {};
          // const updatedPath = Object.keys(diffMatchPatch)?.[0];
          // const fieldName = updatedPath?.split(`[_key=="`)?.[0];
          // const key = updatedPath?.split(`[_key=="`)[1]?.split('"]')?.[0];

          console.log("-------");
          console.log("mutation", mutation.resultRev);
          mutationRevision.current = mutation.resultRev;
          setPreviewLoading(true);

          // fetch new data
          reloadPreview();
        });

      reloadPreview();
    }

    setupPreviewListener();

    return () => {
      if (listener?.unsubscribe) listener.unsubscribe();
    };
  }, [id, config]);

  /**
   * Always keep a draft of the document in preview mode
   */

  useEffect(() => {
    let reloadTimeout: ReturnType<typeof setTimeout>;
    async function reload() {
      clearTimeout(reloadTimeout);

      // wait for frontend client to be ready
      if (!frontendClient.current) {
        reloadTimeout = setTimeout(reload, 100);
        return;
      }

      // fetch minimal document
      const doc = await frontendClient.current.fetch(
        `*[_originalId == "${id}"] { _rev }`,
      );
      initialRevision.current = doc?._rev;

      reloadPreview();
    }
    reload();
  }, [id, frontendClient, reloadPreview]);

  /**
   * Allow reordering of blocks
   */

  const onReorderBlocks = useCallback(
    async (
      changedBlockKey: string,
      replacesBlockKey: string,
      items: string[],
    ) => {
      if (!frontendClient.current) return;

      setPreviewLoading(true);

      await fetch(`/api/preview/sort-blocks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          changedBlockKey,
          replacesBlockKey,
          newBlocksOrder: items,
        }),
      });
    },
    [id],
  );

  /**
   * Scroll block in view when form dialog is opened
   * in the Sanity studio
   */

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      console.log(e);
      // scroll to block
      if (e.data.type == "preview-view-scroll-to-block" && e.data.blockKey) {
        const element = document.querySelector(
          `[data-key="${e.data.blockKey}"]`,
        );

        if (element) {
          window.scrollBy({ top: element?.getBoundingClientRect().top - 60 });
        }
      }

      // highlight block or decorations on hover
      if (e.data.type == "preview-view-highlight-hover" && e.data.key) {
        const element = document.querySelector(
          `[data-key="${e.data.key}"]`,
        ) as HTMLElement;

        if (element) {
          if (e.data.enabled) {
            element.classList.add("preview-highlight-hover");
          } else {
            element.classList.remove("preview-highlight-hover");
          }
        }
      }

      // highlight block or decorations on open
      if (e.data.type == "preview-view-highlight-open" && e.data.key) {
        const element = document.querySelector(
          `[data-key="${e.data.key}"]`,
        ) as HTMLElement;

        if (element) {
          if (e.data.enabled) {
            element.classList.add("preview-highlight-open");
          } else {
            element.classList.remove("preview-highlight-open");
          }
        }
      }
    }

    window.addEventListener("message", onMessage, false);
    () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div>
      <div
        className={cx("text-md fixed right-4 z-50 flex gap-1 text-white", {
          ["top-4"]: position !== "bottom",
          ["bottom-4"]: position === "bottom",
        })}
        ref={previewTools}
      >
        <div className="bg-black text-white">
          <ScreenCapture previewTools={previewTools} />
        </div>

        {/* reload */}
        <button
          className="shadow-lg block p-3 bg-[#1f2937] transition-color hover:underline hover:bg-[#222]"
          onClick={reloadPreview}
        >
          {previewLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              viewBox="0 0 40 40"
              className="w-5 h-5 block"
            >
              <g
                fill="none"
                fillRule="evenodd"
                strokeWidth="3"
                transform="translate(2 2)"
              >
                <circle cx="18" cy="18" r="18" strokeOpacity="0.5"></circle>
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    dur=".35s"
                    from="0 18 18"
                    repeatCount="indefinite"
                    to="360 18 18"
                    type="rotate"
                  ></animateTransform>
                </path>
              </g>
            </svg>
          ) : (
            <svg
              className="w-5 h-5 block"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </button>

        {/* minimap */}
        {showMiniMap && (
          <button
            className="shadow-lg block p-3 bg-[#1f2937] transition-color hover:underline hover:bg-[#222]"
            onClick={() => setIsMiniMapVisible((yesno) => !yesno)}
          >
            <svg
              className="block"
              width="22"
              height="22"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.75432 0.819537C7.59742 0.726821 7.4025 0.726821 7.24559 0.819537L1.74559 4.06954C1.59336 4.15949 1.49996 4.32317 1.49996 4.5C1.49996 4.67683 1.59336 4.84051 1.74559 4.93046L7.24559 8.18046C7.4025 8.27318 7.59742 8.27318 7.75432 8.18046L13.2543 4.93046C13.4066 4.84051 13.5 4.67683 13.5 4.5C13.5 4.32317 13.4066 4.15949 13.2543 4.06954L7.75432 0.819537ZM7.49996 7.16923L2.9828 4.5L7.49996 1.83077L12.0171 4.5L7.49996 7.16923ZM1.5695 7.49564C1.70998 7.2579 2.01659 7.17906 2.25432 7.31954L7.49996 10.4192L12.7456 7.31954C12.9833 7.17906 13.2899 7.2579 13.4304 7.49564C13.5709 7.73337 13.4921 8.03998 13.2543 8.18046L7.75432 11.4305C7.59742 11.5232 7.4025 11.5232 7.24559 11.4305L1.74559 8.18046C1.50786 8.03998 1.42901 7.73337 1.5695 7.49564ZM1.56949 10.4956C1.70998 10.2579 2.01658 10.1791 2.25432 10.3195L7.49996 13.4192L12.7456 10.3195C12.9833 10.1791 13.2899 10.2579 13.4304 10.4956C13.5709 10.7334 13.4921 11.04 13.2543 11.1805L7.75432 14.4305C7.59742 14.5232 7.4025 14.5232 7.24559 14.4305L1.74559 11.1805C1.50785 11.04 1.42901 10.7334 1.56949 10.4956Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        )}
      </div>

      {Boolean(miniBlocks?.length) && isMiniMapVisible && (
        <div
          className={cx(
            "fixed top-20 right-4 z-[60] bg-white border-2 border-black border-opacity-10 max-h-[calc(100vh-100px)] overflow-y-auto shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]",
          )}
        >
          <MiniMap
            blocks={miniBlocks}
            onReorder={onReorderBlocks}
            isLoading={previewLoading}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(LivePreview);
