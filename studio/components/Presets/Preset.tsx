import { LanguageType } from "../../../languages";
import { BlockSchemaName, SANITY_API_VERSION } from "../../../types.sanity";
import { SyncIcon, SearchIcon, AddIcon } from "@sanity/icons";
import {
  Autocomplete,
  Card,
  Checkbox,
  Text,
  Flex,
  Stack,
  Box,
  Button,
  useToast,
} from "@sanity/ui";
import { nanoid } from "nanoid";
import React, {
  ComponentType,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClient, useFormValue, useSchema } from "sanity";
import { IntentLink } from "sanity/router";

type OptionType = {
  _id: string;
  type: BlockSchemaName;
  title: string;
  value: string;
  description: string;
  label: string;
  preset?: {
    _type: BlockSchemaName;
    _id: string;
    language: LanguageType;
    [key: string]: any;
  };
  usedBy?: number;
  icon?: React.ReactElement;
  image?: string;
};

const Preset: ComponentType<any> = (props) => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const document = useFormValue([]) as {
    _id: string;
    _type: string;
    [key: string]: any;
  };
  const allSchemas = useSchema()._registry;

  const containerName = props.path[0];
  const containerValue = useFormValue([containerName]) as {
    _key: string;
    _type: string;
    [key: string]: any;
  }[];

  const parent = containerValue.find(({ _key }) => _key === props.path[1]._key);

  const { value, type } = props;
  const [list, setList] = useState<OptionType[]>([]);
  const [state, setState] = useState<"default" | "loading">("default");
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [originalPresetTitle, setOriginalPresetTitle] = useState<string | null>(
    null,
  );

  const [checked, setChecked] = useState<string[]>([]);

  const toggleCheckbox = (key: string) => {
    if (checked.includes(key)) {
      setChecked(checked.filter((item) => item !== key));
    } else {
      setChecked([...checked, key]);
    }
  };

  const exportPresetId = nanoid();
  const exportPresetLink = useRef<HTMLAnchorElement>(null);

  const toast = useToast();

  const draftId = document._id?.startsWith("drafts.")
    ? document._id
    : `drafts.${document._id}`;

  /**
   * Get a list of presets matching the type
   */

  useEffect(() => {
    setState("loading");
    async function getPresets() {
      const compatiblePresets: OptionType[] = await client.fetch(
        `*[_type == 'preset.blocks' && defined(${containerName}) && !(_id in path("drafts.*")) && ${containerName}[0]._type == '${parent?._type}'] { 
          _id, 
          _type, 
          _updatedAt,
          title, 
          description, 
          "value": _id, 
          "label": title,
          "preset": ${containerName}[0],
          "usedBy": count(*[references(^._id)]),
          "image": image.asset->url
        } | order(usedBy desc)`,
      );
      const options = compatiblePresets.map((item) => ({
        ...item,
        icon: item.preset?._type
          ? allSchemas[item.preset?._type].get()?.icon()
          : null,
      }));

      setList(options);
      setState("default");
    }

    getPresets();
  }, [parent]);

  /**
   * Fetch the name of the preset that was used before
   * the value of this field in sanity is a reference to that preset
   */

  useEffect(() => {
    async function getOriginalPresetTitle() {
      const originalPreset = await client.fetch(
        `*[_type == 'preset.blocks' && _id == "${value?._ref}"] { title }.title`,
      );
      setOriginalPresetTitle(originalPreset);
    }

    getOriginalPresetTitle();
  }, [value]);

  /**
   * this onSelect seems to run multiple times, so we need to debounce it
   */

  function onSelect(presetId: string) {
    setSelectedPresetId(presetId);
  }

  /**
   * Do fuzzy search
   */

  const search = useCallback(
    (query: string, option: { label: string; description: string }) => {
      const fuzzyMatch = (pattern: string, str: string) => {
        if (!pattern || !str) return false;
        pattern = ".*" + pattern.split("").join(".*") + ".*";
        const re = new RegExp(pattern, "i");
        return re.test(str.trim());
      };
      return (
        fuzzyMatch(query, option.label) || fuzzyMatch(query, option.description)
      );
    },
    [],
  );

  /**
   * Pull data in from preset
   */

  const importPreset = useCallback(async () => {
    const preset = list.find(({ _id }) => _id === selectedPresetId)?.preset;

    if (!preset) {
      // TODO: error message?
      return null;
    }

    // want to have sanity generate fresh keys so removing them here
    function freshKeys(obj: { [key: string]: any }) {
      for (let prop in obj) {
        if (prop === "_key") obj[prop] = nanoid();
        else if (typeof obj[prop] === "object") freshKeys(obj[prop]);
      }
    }

    freshKeys(preset);

    try {
      /**
       * need to create a draft if it doesn't exist, otherwise changes would instantly be published
       * (if the state of the document is published)
       */

      await client.createIfNotExists({
        ...document,
        _id: draftId,
      });

      let presetObj: any = { ...preset };
      if (!checked.includes("content")) {
        // remove all fields except theme, decorations
        presetObj = Object.keys(presetObj).reduce((acc, key) => {
          if (["theme", "decorations"].includes(key)) {
            acc[key] = presetObj[key];
          }
          return acc;
        }, {} as { [key: string]: any });
      }

      if (!checked.includes("theme")) delete presetObj.theme;
      if (!checked.includes("decorations")) delete presetObj.decorations;

      await client
        .patch(draftId)
        .insert("replace", `${containerName}[_key=="${parent?._key}"]`, [
          {
            ...parent,
            ...presetObj,
            _key: parent?._key,
            preset: { _ref: selectedPresetId, _weak: true },
          },
        ])
        .commit({
          /**
           * setting this to true leads to a bug when other blocks are duplicated
           * apparently they then have duplicated keys for things in lists or portable text and those are duplicated as well.
           * When auto generating new ones these are seen as bad values and this generates a message
           * like `Document \"drafts.page_homepage\" has duplicate array _key \"d6148fef5908\" at blocks[0].text[0]._key and blocks[1].text[0]._key`
           *
           * We can set the following to true if this test case passes:
           * - create a block with array items (e.g buttons)
           * - duplicate that block using the Sanity interface
           * - add a new block
           * - no error appears and the block is added successfully
           */
          autoGenerateArrayKeys: false,
        });
    } catch (err) {
      console.error(err);
      toast.push({
        status: "error",
        title: `Something went wrong.`,
      });
    }

    toast.push({
      status: "success",
      title: `Successfully imported preset`,
    });
    setSelectedPresetId(null);
  }, [
    selectedPresetId,
    document._id,
    parent?._key,
    containerName,
    list,
    checked,
  ]);

  /**
   * Export preset
   */

  const exportPreset = useCallback(async () => {
    const obj = JSON.parse(JSON.stringify(parent));

    await client.create({
      _id: exportPresetId,
      _type: "preset.blocks",
      [containerName]: [obj],
    });

    exportPresetLink?.current?.click();
  }, [parent, exportPresetId]);

  /**
   * Import again
   */

  const reImportPreset = useCallback(() => {
    if (!value?._ref) return;
    setSelectedPresetId(value._ref);
  }, [value?.ref]);

  return (
    <Card>
      <Stack space={4}>
        <Stack space={2}>
          <Text size={1} weight="bold">
            Preset
          </Text>
          <Text size={1} muted>
            Create a preset from this block or import data from an existing
            preset.
          </Text>
        </Stack>

        {!selectedPresetId && (
          <Flex gap={2}>
            {Boolean(list?.length) && (
              <Card flex={3}>
                <Autocomplete
                  id="blockSelect"
                  filterOption={search}
                  fontSize={2}
                  radius={0}
                  icon={SearchIcon}
                  openButton
                  options={list}
                  padding={3}
                  placeholder="Import preset"
                  renderOption={(option: OptionType) => {
                    return (
                      <Card as="button">
                        <Flex align="center" padding={1}>
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

                          {!option.image && option.icon && (
                            <Box paddingY={1}>
                              <div
                                style={{
                                  fontSize: 0,
                                  border: "1px solid lightgray",
                                  padding: 6,
                                }}
                              >
                                {option.icon}
                              </div>
                            </Box>
                          )}

                          <Box flex={1} paddingX={2}>
                            <Stack space={2}>
                              <Text size={2}>{option.title}</Text>
                              <Text size={1} muted>
                                {option.preset?.language && (
                                  <span>[{option.preset.language}]</span>
                                )}{" "}
                                {option.description}
                              </Text>
                            </Stack>
                          </Box>
                        </Flex>
                      </Card>
                    );
                  }}
                  renderValue={(value, option) => value}
                  loading={state === "loading"}
                  onSelect={onSelect}
                />
              </Card>
            )}
            <Card flex={1}>
              <Button
                text="Create preset"
                icon={AddIcon}
                mode="ghost"
                onClick={exportPreset}
              />

              {/* add hidden intentlink for navigating to the newly created preset */}
              <IntentLink
                style={{ display: "none" }}
                intent="edit"
                params={{ id: exportPresetId, type: "preset.blocks" }}
                target="_blank"
                rel="noopener noreferrer"
                ref={exportPresetLink}
              />
            </Card>
          </Flex>
        )}

        {selectedPresetId && (
          <Card padding={[3, 3, 4]} radius={2} shadow={1} tone="caution">
            <Stack space={4}>
              <Box>
                <Stack space={4}>
                  <Text>
                    Are you sure you want to proceed? This will overwrite
                    existing content.
                  </Text>
                  <Card padding={4} shadow={1} tone="default">
                    <Stack space={2}>
                      <Flex align="center">
                        <Checkbox
                          id="content"
                          checked={checked.includes("content")}
                          onChange={() => toggleCheckbox("content")}
                        />
                        <Box flex={1} paddingLeft={3}>
                          <Text>
                            <label htmlFor="content">Content</label>
                          </Text>
                        </Box>
                      </Flex>
                      <Flex align="center">
                        <Checkbox
                          id="theme"
                          checked={checked.includes("theme")}
                          onChange={() => toggleCheckbox("theme")}
                        />
                        <Box flex={1} paddingLeft={3}>
                          <Text>
                            <label htmlFor="theme">Theme</label>
                          </Text>
                        </Box>
                      </Flex>
                      <Flex align="center">
                        <Checkbox
                          id="decorations"
                          checked={checked.includes("decorations")}
                          onChange={() => toggleCheckbox("decorations")}
                        />
                        <Box flex={1} paddingLeft={3}>
                          <Text>
                            <label htmlFor="decorations">Decorations</label>
                          </Text>
                        </Box>
                      </Flex>
                    </Stack>
                  </Card>
                </Stack>
              </Box>

              <Stack>
                <Flex gap={2}>
                  <Button text="Import" onClick={importPreset} />
                  <Button
                    text="Cancel"
                    onClick={() => setSelectedPresetId(null)}
                  />
                </Flex>
              </Stack>
            </Stack>
          </Card>
        )}

        {!selectedPresetId && value?._ref && originalPresetTitle && (
          <Stack space={3}>
            <Card>
              <Text muted size={1}>
                Based on:{" "}
                <IntentLink
                  intent="edit"
                  params={{ id: value._ref, type: "preset.blocks" }}
                >
                  {originalPresetTitle}
                </IntentLink>
              </Text>
            </Card>

            <Card>
              <Button
                text="Import again"
                mode="ghost"
                onClick={reImportPreset}
                icon={SyncIcon}
                fontSize={1}
                padding={3}
              />
            </Card>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default Preset;

export const PresetWrapper: ComponentType<any> = (props) => {
  return <div>{props.children}</div>;
};
