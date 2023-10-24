import { BlockSchemaName, SANITY_API_VERSION } from "../../types.sanity";
import { SearchIcon } from "@sanity/icons";
import {
  Badge,
  Autocomplete,
  Card,
  Text,
  Flex,
  Stack,
  Box,
  useToast,
} from "@sanity/ui";
import { StarBookmark } from "@vectopus/atlas-icons-react";
import { nanoid } from "nanoid";
import React, { ComponentType, useCallback, useEffect, useState } from "react";
import { FormSetPatch, set, useClient, useFormValue, useSchema } from "sanity";

/**
 * Usage:
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 */

export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

type OptionType = {
  _type: BlockSchemaName | "preset.blocks";
  schemaTitle: string;
  value: BlockSchemaName | string;
  icon: React.ReactElement;
  label: string;
  description: string;
  hidden?: (pageType: string) => boolean;
  borderTop?: boolean;
  image?: string;
  initialValue?: {};
  blocks?: any[];
};

export type BlockSelectProps = {
  onChange?: (set: FormSetPatch) => void;
  value?: any;
  document?: { _type: string; _id: string };
  schemaType: {
    options?: {
      filterType?: RegExp;
      updateField?: string;
      placeholder?: string;
    };
  };
};

const BlockSelect: ComponentType<any> = (props: BlockSelectProps) => {
  const { schemaType, onChange, value } = props;
  const document = useFormValue([]) as {
    _id?: string;
    _type: string;
    [key: string]: any;
  };

  const allSchemas = useSchema()._registry;

  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const toast = useToast();

  const [options, setOptions] = useState<OptionType[]>([]);
  const [state, setState] = useState<"default" | "loading">("default");

  const typeFilter: RegExp = schemaType?.options?.filterType || /.*/;
  const updateField: string = schemaType?.options?.updateField || "blocks";

  /**
   * Get list of options:
   * - blocks
   * - studio blocks
   * - presets
   */

  useEffect(() => {
    async function getOptions() {
      /**
       * All blocks schemas filtered by type
       */

      const blockTypes = Object.keys(allSchemas)
        .filter((type) =>
          typeFilter ? new RegExp(typeFilter).test(type) : true,
        )
        .filter((type) => !type.startsWith("preset."))
        .filter((type) => !type.startsWith("studio."))
        .filter((type) => type !== "block")
        .map((type) => allSchemas[type].get(type))
        .sort((a, b) => a.title?.localeCompare(b.title));

      /**
       * Studio blocks
       */

      const studioTypes = Object.keys(allSchemas)
        .filter((type) => type.startsWith("studio."))
        .map((type) => allSchemas[type].get(type));

      /**
       * All presets filtered by type
       */

      let presets: {
        title?: string;
        _id?: string;
        _type?: "preset.blocks";
        name?: string;
        description?: string;
        blocks?: any[];
        usedBy?: number;
        image?: string;
      }[] = await client.fetch(`
        *[_type == 'preset.blocks' && defined(blocks) && !(_id in path("drafts.*"))] {
          title,
          _id,
          _type,
          "name": _id,
          description,
          "usedBy": count(*[references(^._id)]),
          "image": image.asset->url,
          blocks[],
        } | order(usedBy desc)`);

      presets = presets
        .map((preset) => ({
          ...preset,
          blocks: preset?.blocks
            ?.map((block) => ({
              ...block,
              icon: allSchemas[block?._type]?.get()?.icon,
              hidden: allSchemas[block?._type]?.get()?.hidden,
            }))
            .filter(({ _type }) =>
              typeFilter ? new RegExp(typeFilter).test(_type) : true,
            ),
        }))
        .filter(({ blocks }) => Boolean(blocks?.length));

      /**
       * Make list of options
       */

      const options: (OptionType | null)[] = [
        ...presets,
        ...blockTypes,
        ...studioTypes,
      ].map(
        ({
          _type,
          title,
          name,
          icon,
          description,
          initialValue,
          image,
          hidden,
          blocks,
        }) => {
          // for the current page type (unless we're looking at presets) call the hide function on the option schema
          if (document._type !== "preset.blocks" && hidden?.(document._type)) {
            return null;
          }

          const obj: OptionType = {
            _type: _type || name,
            value: name,
            schemaTitle: allSchemas[_type || name]?.get()?.title,
            icon: icon?.(),
            label: title,
            description,
            initialValue,
            image,
            blocks,
          };

          return obj;
        },
      );

      const filteredOptions: OptionType[] = options.filter(
        Boolean,
      ) as OptionType[];

      /**
       * Add divider to first studio block and preset
       */

      const firstStudioBlockIndex = filteredOptions.findIndex(({ _type }) =>
        _type.startsWith("studio."),
      );
      const firstPresetIndex = filteredOptions.findIndex(({ _type }) =>
        Boolean(_type !== "preset.blocks"),
      );

      if (firstStudioBlockIndex > -1) {
        filteredOptions[firstStudioBlockIndex].borderTop = true;
      }
      if (firstPresetIndex > -1) {
        filteredOptions[firstPresetIndex].borderTop = true;
      }

      // remove hidden options
      setOptions(filteredOptions);
    }
    getOptions();
  }, [typeFilter, allSchemas]);

  /**
   * this onSelect seems to run multiple times, so we need to debounce it
   */

  function onSelect(value: string) {
    setState("loading");
    patchBlocks(value);
  }

  /**
   * Save
   */

  async function patchBlocks(selectedValue: string) {
    if (!onChange) return;
    if (!selectedValue) return setState("default");

    const selectedOption = options.find(({ value }) => value === selectedValue);
    if (!selectedOption) return;

    const selectedType: BlockSchemaName | "preset.blocks" | undefined =
      selectedOption?._type;
    const presetId =
      selectedOption._type == "preset.blocks" ? selectedValue : null;

    if (!selectedType) return;

    let newBlocks: {
      _key?: string;
      _type: BlockSchemaName;
      preset?: { _ref: string; _weak: boolean };
    }[] = [];

    if (presetId) {
      newBlocks = [...(selectedOption?.blocks || [])].map((block) => {
        const data = { ...block };
        delete data.hidden;
        delete data.icon;

        return {
          _type: selectedType as BlockSchemaName,
          ...data,
        };
      });
    } else {
      newBlocks = [
        {
          _type: selectedType as BlockSchemaName,
          ...selectedOption?.initialValue,
        },
      ];
    }

    // want to have sanity generate fresh keys so removing them here
    function freshKeys(obj: { [key: string]: any }) {
      for (let prop in obj) {
        if (prop === "_key") obj[prop] = nanoid();
        else if (typeof obj[prop] === "object") freshKeys(obj[prop]);
      }
    }

    newBlocks = newBlocks.map((block) => {
      const blockSchema = allSchemas[block._type]?.get();

      freshKeys(block);
      block._key = nanoid();

      // add back link to preset
      if (presetId) {
        block.preset = { _ref: presetId, _weak: true };
      }

      return block;
    });

    const currentFieldBlocks = newBlocks.filter(({ _type }) =>
      typeFilter ? new RegExp(typeFilter).test(_type) : true,
    );

    try {
      onChange(set([...(value || []), ...currentFieldBlocks]));
      // click the last item in the list to open the editor dialog
      if (newBlocks?.length === 1) {
        setTimeout(() => {
          const items = window.document.querySelectorAll(
            `[id="${updateField}"] [data-testid="default-preview"]`,
          ) as NodeList;
          const lastItem = items[items.length - 1] as HTMLElement;
          lastItem?.click();
        }, 0);
      }
    } catch (err) {
      console.error(err);
      toast.push({
        status: "error",
        title: `Something went wrong.`,
      });
    }

    setState("default");
  }

  /**
   * Do fuzzy search based on title, description and more
   */

  const search = useCallback((query: string, option: OptionType) => {
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
    <Autocomplete
      id="blockSelect"
      filterOption={search}
      fontSize={2}
      radius={0}
      icon={SearchIcon}
      openButton
      options={options}
      padding={3}
      placeholder="Type to search…"
      renderOption={(option: OptionType) => {
        return (
          <Card
            as="button"
            style={{
              borderTop: option.borderTop ? "1px solid lightgray" : "none",
            }}
          >
            <Flex align="center" padding={1} gap={2}>
              {option.image && (
                <Box>
                  <img
                    src={`${option.image}?w=100&h=75&q=75`}
                    alt=""
                    style={{
                      border: "1px solid rgba(0,0,0,.1)",
                      padding: 1,
                      background: "white",
                    }}
                  />
                </Box>
              )}

              {!option.image && (
                <Box paddingY={1}>
                  <div
                    style={{
                      fontSize: 0,
                      padding: 6,
                    }}
                  >
                    {option.icon || <StarBookmark weight="thin" size={20} />}
                  </div>
                </Box>
              )}

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

              {option._type == "preset.blocks" && (
                <Badge mode="outline">preset</Badge>
              )}
            </Flex>
          </Card>
        );
      }}
      renderValue={(value) => ""}
      loading={state === "loading"}
      onSelect={onSelect}
    />
  );
};

export default BlockSelect;
