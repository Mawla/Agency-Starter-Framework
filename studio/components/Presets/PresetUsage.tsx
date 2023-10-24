import { SANITY_API_VERSION } from "../../../types.sanity";
import { ArrowTopRightIcon } from "@sanity/icons";
import { Text, Flex, Stack } from "@sanity/ui";
import React, { useEffect, useState } from "react";
import { useClient, useFormValue } from "sanity";
import { IntentLink } from "sanity/router";

const PresetUsage = () => {
  const document = useFormValue([]) as { _id: string };
  const client = useClient({ apiVersion: SANITY_API_VERSION });

  const [usage, setUsage] = useState<
    { _type: string; title: string; _id: string }[]
  >([]);

  useEffect(() => {
    if (!document._id) return;

    async function getUsage() {
      const usage = await client.fetch(
        `*[_type match 'page.*' && defined(blocks) && references($id)] {
          _id, 
          _type, 
          "title": title
        }`,
        {
          id: document._id.replace("drafts.", ""),
        },
      );

      const idDict = usage?.reduce(
        (acc: Record<string, { _id: string }>, page: { _id: string }) => {
          acc[page._id] = page;
          return acc;
        },
        {},
      );

      const pages = usage?.filter((page: { _id: string }) => {
        if (
          page._id.startsWith("drafts.") &&
          idDict[page._id.replace("drafts.", "")]
        ) {
          return false;
        }
        return page;
      });

      setUsage(pages);
    }

    getUsage();
  }, [document?._id]);

  if (!usage.length) return null;

  return (
    <Stack space={4}>
      <Text size={2} weight="semibold">
        Used on
      </Text>
      <Stack space={3}>
        {usage.map((page) => (
          <IntentLink
            key={page._id}
            intent="edit"
            params={{ id: page._id, type: page._type }}
            target="_blank"
            style={{
              color: "#111",
              border: 0,
              background: "transparent",
            }}
          >
            <Flex gap={2}>
              <Text size={2}>{page.title}</Text>
              <ArrowTopRightIcon />
            </Flex>
          </IntentLink>
        ))}
      </Stack>
    </Stack>
  );
};

export default PresetUsage;
