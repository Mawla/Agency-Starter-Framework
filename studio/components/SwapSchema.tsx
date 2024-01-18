import { SANITY_API_VERSION } from "../../types.sanity";
import { SearchIcon } from "@sanity/icons";
import { Stack } from "@sanity/ui";
import { Autocomplete, Card, Box, Flex, Text } from "@sanity/ui";
import { StarBookmark } from "@vectopus/atlas-icons-react";
import React, { useCallback, useState } from "react";
import { ComponentType } from "react";
import { useClient, useFormValue, useSchema, FormSetPatch } from "sanity";

export type swapSchemaProps = {
  value?: any;
  path?: { _key: string }[];
  document?: { _type: string; _id: string };
  onChange: (set: FormSetPatch) => void;
  schemaType?: {
    options?: {
      max?: number | string;
    };
  };
};

export const swapSchema: ComponentType<any> = (props: swapSchemaProps) => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const [state, setState] = useState<"loading" | "ready">("ready");

  const document = useFormValue([]) as {
    _id: string;
    _type: string;
    [key: string]: any;
  };
  const allSchemas = useSchema()._registry;
  const blockTypes = Object.keys(allSchemas)
    .filter((type) => type.startsWith("block."))
    .map((type) => {
      const schema = allSchemas[type].get(type);
      return {
        label: schema.title,
        description: schema.description,
        value: schema.name,
        icon: schema.icon,
      };
    })
    .sort((a, b) => a.label?.localeCompare(b.label));

  const allBlocksValues = useFormValue(["blocks"]) as {
    _key: string;
    _type: string;
    [key: string]: any;
  }[];

  const parentValue = allBlocksValues.find(
    ({ _key }) => _key === props?.path?.[1]?._key,
  );

  const draftId = document._id?.startsWith("drafts.")
    ? document._id
    : `drafts.${document._id}`;

  const onSelect = async (selectedSchemaType: string) => {
    if (!selectedSchemaType) return;
    setState("loading");

    try {
      /**
       * need to create a draft if it doesn't exist, otherwise changes would instantly be published
       * (if the state of the document is published)
       */

      await client.createIfNotExists({
        ...document,
        _id: draftId,
      });

      await client
        .patch(draftId)
        .insert("replace", `blocks[_key=="${parentValue?._key}"]`, [
          {
            ...parentValue,
            _type: selectedSchemaType,
          },
        ])
        .commit({
          autoGenerateArrayKeys: false,
        });
      setState("ready");
    } catch (err) {
      setState("ready");
      console.error(err);
    }
  };

  /**
   * Do fuzzy search based on title, description and more
   */

  const search = useCallback((query: string, option: any) => {
    const fuzzyMatch = (pattern: string, str: string) => {
      if (!pattern || !str) return false;
      pattern = ".*" + pattern.split("").join(".*") + ".*";
      const re = new RegExp(pattern, "i");
      return re.test(str.trim());
    };
    return (
      fuzzyMatch(query, option.label) ||
      fuzzyMatch(query, option.description) ||
      fuzzyMatch(query, option.value) ||
      fuzzyMatch(query, option.schemaTitle) ||
      fuzzyMatch(query, option._type)
    );
  }, []);

  return (
    <Card>
      <Stack space={2}>
        <Text size={1} weight="bold">
          Change block type
        </Text>
        <Text size={1} muted>
          Warning: Not all data will be compatible between blocks.
        </Text>

        <Autocomplete
          id="schemaTypeSelect"
          filterOption={search}
          fontSize={2}
          radius={0}
          icon={SearchIcon}
          openButton
          options={blockTypes}
          renderOption={(option: any) => {
            return (
              <Card as="button">
                <Flex align="center" padding={1} gap={2}>
                  <Box paddingY={1}>
                    <div
                      style={{
                        fontSize: 0,
                        padding: 6,
                      }}
                    >
                      {option.icon?.() || (
                        <StarBookmark weight="thin" size={20} />
                      )}
                    </div>
                  </Box>

                  <Box flex={1} padding={2}>
                    <Stack space={2}>
                      <Text size={2}>{option.label}</Text>
                      {option.description && (
                        <Text size={1} muted>
                          {option.description}
                        </Text>
                      )}
                    </Stack>
                  </Box>
                </Flex>
              </Card>
            );
          }}
          padding={3}
          placeholder="Type to search…"
          renderValue={(value) => ""}
          onSelect={onSelect}
          loading={state === "loading"}
        />
      </Stack>
    </Card>
  );
};

export default swapSchema;
