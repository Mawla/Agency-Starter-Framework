import { LivePreviewProps } from "../components/PreviewMode/LivePreview";
import { config as sanityConfig } from "../helpers/sanity/config";
import { getClient } from "../helpers/sanity/server";
import { baseLanguage, LanguageType } from "../languages";
import { Page } from "../layout/pages/Page";
import { ConfigType, getConfigQuery } from "../queries/config";
import { FooterType } from "../queries/footer";
import { NavigationType } from "../queries/navigation";
import { getPageQuery, PageType } from "../queries/page";
import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const LivePreview = dynamic<LivePreviewProps>(
  () =>
    import(
      /* webpackChunkName: "LivePreview" */ "../components/PreviewMode/LivePreview"
    ) as any,
  { suspense: true },
);

export default function PreviewPage({
  preview,
  config,
}: {
  preview: boolean;
  config: ConfigType;
}) {
  const isPreviewMode = preview;
  const router = useRouter();

  const [page, setPage] = useState<PageType | null>(null);
  const [navigation] = useState<NavigationType | null>(null);
  const [footer] = useState<FooterType | null>(null);

  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  const type = Array.isArray(router.query.type)
    ? router.query.type[0]
    : router.query.type;
  const language = router.query.language as LanguageType;
  const pagePath = usePathname() || "";

  useEffect(() => {
    if (!isPreviewMode) router.push("/");
  }, [isPreviewMode, router]);

  if (!id) return null;

  return (
    <div>
      {isPreviewMode && (
        <LivePreview
          setPageData={setPage}
          updatedAt={page?._updatedAt}
          pageId={id}
          config={sanityConfig}
          getQuery={() => getPageQuery(language)}
          queryParams={{
            _id: id,
            _type: type,
            language,
          }}
          pagePath={pagePath}
        />
      )}

      {page && (
        <Page
          navigation={navigation as NavigationType}
          page={page}
          isPreviewMode={isPreviewMode}
          footer={footer as FooterType}
          config={config}
        />
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  locale,
}) => {
  const config: ConfigType = await getClient(preview).fetch(
    getConfigQuery((locale as LanguageType) || baseLanguage),
  );

  return { props: { preview, config }, revalidate: 10 };
};
