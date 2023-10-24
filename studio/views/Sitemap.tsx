import {
  baseLanguage,
  getLanguageTitle,
  languages,
  LanguageType,
} from "../../languages";
import { getSitemapQuery, SitemapItemType } from "../../queries/sitemap.query";
import { SANITY_API_VERSION } from "../../types.sanity";
import { isPathUnique } from "../utils/desk/isPathUnique";
import { WarningOutlineIcon } from "@sanity/icons";
import {
  Stack,
  Text,
  Spinner,
  Card,
  TabList,
  Tab,
  TabPanel,
  Badge,
} from "@sanity/ui";
import React, { ComponentType, useEffect, useState } from "react";
import { useClient } from "sanity";
import { StructureBuilder } from "sanity/desk";
import { IntentLink } from "sanity/router";

export const Sitemap: ComponentType<any> = ({ options }) => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });

  const [tree, setTree] = useState<SitemapItemType[]>([]);
  const [state, setState] = useState<"loading" | "ready">("loading");
  const [result, setResult] = useState<SitemapItemType[]>([]);
  const [currentTab, setCurrentTab] = useState<"sitemap" | "query" | "result">(
    "sitemap",
  );
  const [currentLanguage, setCurrentLanguage] =
    useState<LanguageType>(baseLanguage);

  useEffect(() => {
    async function fetchTree() {
      const result = await client.fetch(getSitemapQuery());
      setResult(result);
      setTree(result.filter((item: any) => Boolean(item.path)));
      setState("ready");
    }
    fetchTree();
  }, []);

  return (
    <div className="sitemap" style={{ padding: 40 }}>
      {state === "loading" && <Spinner muted />}

      {state === "ready" && (
        <Card>
          <TabList space={2}>
            <Tab
              aria-controls="sitemap-panel"
              id="sitemap-tab"
              label="Sitemap"
              onClick={() => setCurrentTab("sitemap")}
              selected={currentTab === "sitemap"}
            />
            <Tab
              aria-controls="query-panel"
              id="query-tab"
              label="GROQ Query"
              onClick={() => setCurrentTab("query")}
              selected={currentTab === "query"}
            />
            <Tab
              aria-controls="result-panel"
              id="result-tab"
              label="Raw JSON"
              onClick={() => setCurrentTab("result")}
              selected={currentTab === "result"}
            />
          </TabList>

          <TabPanel
            aria-labelledby="sitemap-tab"
            hidden={currentTab !== "sitemap"}
            id="content-panel"
          >
            <>
              <TabList space={2} style={{ marginTop: 8 }}>
                {languages.map((language) => (
                  <Tab
                    aria-controls={`sitemap-${language.id}`}
                    id={`sitemap-${language.id}`}
                    label={language.title}
                    onClick={() => setCurrentLanguage(language.id)}
                    selected={currentLanguage === language.id}
                  />
                ))}
              </TabList>

              <Card marginTop={2}>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {tree
                    ?.sort((a, b) => {
                      if (!a.path) return 1;
                      if (!b.path) return 1;

                      return a.path.localeCompare(b.path);
                    })
                    .filter(({ language }) => language === currentLanguage)
                    .map(({ title, path, _id, _type }) => {
                      const depth = path ? path.split("/").length - 2 : 0;

                      return (
                        <li key={_id}>
                          <Stack
                            space={3}
                            marginBottom={4}
                            style={{
                              border: "1px solid #ccc",
                              padding: 12,
                              marginLeft: depth * 24,
                              background: depth === 0 ? "#f9f9f9" : "white",
                              borderRadius: 2,
                            }}
                          >
                            <Text weight="semibold">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                }}
                              >
                                {_id.startsWith("drafts.") && (
                                  <Badge mode="outline">draft</Badge>
                                )}
                                <IntentLink
                                  intent="edit"
                                  params={{ id: _id, type: _type }}
                                  style={{ color: "#111" }}
                                >
                                  {title}
                                </IntentLink>
                              </div>
                            </Text>
                            {path ? (
                              <Stack space={2}>
                                <Text
                                  size={1}
                                  style={{
                                    color: "#111",
                                  }}
                                >
                                  /{currentLanguage}
                                  {path}
                                </Text>
                                <CheckUnique
                                  _id={_id}
                                  language={currentLanguage}
                                  S={options?.S as StructureBuilder}
                                />
                              </Stack>
                            ) : (
                              <Text size={1}>
                                <Badge tone="caution">
                                  <WarningOutlineIcon
                                    style={{ marginRight: 4 }}
                                  />
                                  Missing {getLanguageTitle(currentLanguage)}{" "}
                                  slug
                                </Badge>
                              </Text>
                            )}
                          </Stack>
                        </li>
                      );
                    })}
                </ul>
              </Card>
            </>
          </TabPanel>

          <TabPanel
            aria-labelledby="query-tab"
            hidden={currentTab !== "query"}
            id="query-panel"
          >
            <Card marginTop={2} style={{ overflow: "auto" }}>
              <pre>
                <code>{getSitemapQuery()}</code>
              </pre>
            </Card>
          </TabPanel>

          <TabPanel
            aria-labelledby="result-tab"
            hidden={currentTab !== "result"}
            id="result-panel"
          >
            <Card marginTop={2}>
              <pre>
                <code>{JSON.stringify(result, null, 2)}</code>
              </pre>
            </Card>
          </TabPanel>
        </Card>
      )}
    </div>
  );
};

const CheckUnique = ({
  _id,
  language,
  S,
}: {
  _id: string;
  language: string;
  S: StructureBuilder;
}) => {
  const [isUnique, setIsUnique] = useState<boolean>(true);

  useEffect(() => {
    async function checkUnique() {
      setIsUnique(
        await isPathUnique("", {
          document: { _id },
          path: ["x", language],
        }),
      );
    }

    checkUnique();
  }, []);

  if (isUnique) return null;

  return (
    <Card style={{ background: "transparent" }}>
      <Badge tone="caution" mode="outline">
        Path not unique
      </Badge>
    </Card>
  );
};
