import { PageContext } from "../../context/PageContext";
import { getClient } from "../../helpers/sanity/server";
import { LanguageType } from "../../languages";
import { BlockBuilder } from "../../layout/pagebuilder/BlockBuilder";
import { getPageQuery, PageType } from "../../queries/page.query";
import { Background } from "../block/Background";
import { IconLoaderProps } from "../images/IconLoader";
import { Spinner } from "../loaders/Spinner";
import { useRouter } from "next/router";
import React, {
  useEffect,
  useState,
  useContext,
  lazy,
  ComponentType,
} from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () => import(/* webpackChunkName: "IconLoader" */ "../images/IconLoader"),
);

export const PageLock = () => {
  const { sitemapItem } = useContext(PageContext);

  const [status, setStatus] = useState<
    "loading" | "error" | "locked" | "unlocked"
  >("locked");
  const [page, setPage] = useState<PageType | null>(null);

  const router = useRouter();

  const language = router.locale as LanguageType;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const { password } = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    );

    const res = await fetch(`/api/page-password/login`, {
      method: "POST",
      body: JSON.stringify({ password, pageId: sitemapItem._id }),
    });

    let success = await res.json();
    return setStatus(success ? "unlocked" : "error");
  };

  useEffect(() => {
    async function getPage() {
      const pageData = await getClient()?.fetch(getPageQuery(language), {
        ...sitemapItem,
        language,
      });
      setPage(pageData);
    }
    if (status === "unlocked") getPage();
  }, [status, sitemapItem, language]);

  if (status === "unlocked" && page)
    return <BlockBuilder items={page.blocks} />;

  return (
    <Background theme={{ background: "white", text: "black" }}>
      <div className="h-[75vh] grid">
        <div className="place-self-center">
          <form autoComplete="off" onSubmit={onSubmit}>
            <div className="flex gap-4 items-center">
              <label>
                <span className="sr-only">Password</span>
                <IconLoader
                  icon="lock"
                  className="w-6 h-6 text-gray-500 block"
                />
              </label>
              <div className="flex relative">
                {status === "error" && (
                  <div className="absolute inset-0 bg-[rgba(255,0,0,.1)] pointer-events-none" />
                )}
                <input
                  type="text"
                  name="password"
                  className="border border-gray-500 text-gray-500 block"
                />
                <button
                  type="submit"
                  className="bg-white -ml-px px-2 border border-gray-500 text-gray-500"
                  disabled={status === "loading"}
                >
                  {status !== "loading" ? (
                    <IconLoader icon="arrow" className="w-6 h-6 block" />
                  ) : (
                    <Spinner className="w-h h-6" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Background>
  );
};
