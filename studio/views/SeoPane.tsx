import { getPathForId } from "../../helpers/sitemap/getPathForId";
import { baseLanguage, languages, LanguageType } from "../../languages";
import { getConfigQuery } from "../../queries/config.query";
import { getSitemapQuery, SitemapItemType } from "../../queries/sitemap.query";
import { SANITY_API_VERSION } from "../../types.sanity";
import { getStructurePath } from "../utils/desk/get-structure-path";
import { Card, Stack, Text, TabList, Tab, TabPanel } from "@sanity/ui";
import React, { ComponentType, useEffect, useState } from "react";
import { useClient } from "sanity";

export const SeoPane: ComponentType<any> = ({
  documentId,
  schemaType,
  options,
  document,
}) => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const [config, setConfig] = useState<any>(null);
  const { language = baseLanguage } = getStructurePath();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(
    language as LanguageType,
  );
  const [sitemap, setSitemap] = useState<SitemapItemType[]>([]);

  useEffect(() => {
    async function fetchConfig() {
      const result = await client.fetch(getConfigQuery(currentLanguage));
      setConfig(result);
    }
    fetchConfig();
  }, [currentLanguage]);

  useEffect(() => {
    async function fetchSitemap() {
      const sitemap: SitemapItemType[] = await client.fetch(getSitemapQuery());
      setSitemap(sitemap);
    }

    fetchSitemap();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      {languages.length > 1 && (
        <TabList space={2}>
          {languages.map((language) => (
            <Tab
              aria-controls={`tab-${language.id}`}
              id={`tab-${language.id}`}
              label={language.title}
              onClick={() => setCurrentLanguage(language.id)}
              selected={currentLanguage === language.id}
            />
          ))}
        </TabList>
      )}

      {languages.map((language) => (
        <TabPanel
          aria-labelledby={`tab-${language.id}`}
          hidden={currentLanguage !== language.id}
          id="content-panel"
        >
          <Stack space={4} style={{ marginTop: 40 }}>
            <Card>
              <Stack space={4}>
                <img
                  src={`${process.env.SANITY_STUDIO_PROJECT_PATH}api/opengraph-image?id=${document?.displayed?._id}&date=${document?.displayed?._updatedAt}&language=${currentLanguage}`}
                  style={{
                    width: "100%",
                    aspectRatio: "1200/630",
                    maxWidth: 400,
                    border: "1px solid rgba(0,0,0,.1)",
                    padding: 10,
                  }}
                />
                <Text size={3} style={{ color: "#1a0dab" }}>
                  {document?.displayed?.seo?.title ||
                    document?.displayed?.title}
                  {config?.seo?.title}
                </Text>
                <Text
                  size={2}
                  style={{
                    color: "#4d5156",
                  }}
                >
                  {document?.displayed?.description ||
                    document?.displayed?.seo?.description ||
                    config?.seo?.description}
                </Text>
                <Text
                  size={1}
                  style={{
                    color: "#4d5156",
                  }}
                >
                  https://
                  {config?.general?.domain}
                  {language.id === baseLanguage ? "" : `/${language.id}`}
                  {getPathForId(document?.displayed?._id, sitemap)}
                </Text>
              </Stack>
            </Card>
          </Stack>
        </TabPanel>
      ))}
    </div>
  );
};
