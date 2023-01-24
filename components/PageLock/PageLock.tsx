import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { getClient } from "../../helpers/sanity/server";
import { LanguageType } from "../../languages";
import { DefaultPage } from "../../layout/pages/DefaultPage";
import { getPageQuery, PageType } from "../../queries/page";
import { IconLoader } from "../images/IconLoader";
import { Spinner } from "../loaders/Spinner";
import { Background } from "../module/Background";
import { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";

export const PageLock = () => {
  const { sitemapItem } = useContext(PageContext);
  const { sitemap } = useContext(SiteContext);

  const [status, setStatus] =
    useState<"loading" | "error" | "locked" | "unlocked">("locked");
  const [page, setPage] = useState<PageType | null>(null);

  const router = useRouter();

  const language = router.locale as LanguageType;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const { password } = Object.fromEntries(
      new FormData(e.currentTarget).entries()
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
      const pageData = await getClient(false).fetch(getPageQuery(language), {
        ...sitemapItem,
        language,
        sitemap,
      });
      setPage(pageData);
    }
    if (status === "unlocked") getPage();
  }, [status, sitemapItem, sitemap, language]);

  if (status === "unlocked" && page) return <DefaultPage {...page} />;

  return (
    <Background theme={{ background: "white", text: "neutral-base" }}>
      <div className="h-[75vh] grid">
        <div className="place-self-center">
          <form autoComplete="off" onSubmit={onSubmit}>
            <div className="flex gap-4 items-center">
              <label>
                <span className="sr-only">Password</span>
                <IconLoader
                  icon="lock"
                  className="w-6 h-6 text-neutral-base block"
                />
              </label>
              <div className="flex relative">
                {status === "error" && (
                  <div className="absolute inset-0 bg-[rgba(255,0,0,.1)] pointer-events-none" />
                )}
                <input
                  type="text"
                  name="password"
                  className="border border-neutral-base text-neutral-base block"
                />
                <button
                  type="submit"
                  className="bg-white -ml-px px-2 border border-neutral-base text-neutral-base"
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
