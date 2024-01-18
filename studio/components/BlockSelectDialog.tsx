import { useSize } from "../../hooks/useSize";
import { BlockSchemaName, SANITY_API_VERSION } from "../../types.sanity";
import { AddIcon } from "@sanity/icons";
import {
  Button,
  Badge,
  Inline,
  Grid,
  Card,
  Text,
  Flex,
  Stack,
  Box,
  useToast,
  Dialog,
  Tab,
  TabList,
  TabPanel,
} from "@sanity/ui";
import { StarBookmark } from "@vectopus/atlas-icons-react";
import { nanoid } from "nanoid";
import React, {
  ComponentType,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FormSetPatch, set, useClient, useFormValue, useSchema } from "sanity";

export type BlockSelectDialogProps = {
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

type PresetType = {
  _id: string;
  _type: "preset.blocks";
  icon: React.ReactElement;
  title: string;
  description: string;
  hidden?: (pageType: string) => boolean;
  borderTop?: boolean;
  image?: string;
  blocks?: any[];
};

type BlockType = {
  _type: BlockSchemaName;
  icon: React.ReactElement;
  title: string;
  description: string;
  hidden?: (pageType: string) => boolean;
  borderTop?: boolean;
  image?: string;
  initialValue?: {};
  blocks?: any[];
};

const BlockSelectDialog: ComponentType<any> = (
  props: BlockSelectDialogProps,
) => {
  const [open, setOpen] = useState(false);
  const [blockInsertIndex, setBlockInsertIndex] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const toast = useToast();

  const { schemaType, onChange, value } = props;
  const document = useFormValue([]) as {
    _id?: string;
    _type: string;
    [key: string]: any;
  };
  const typeFilter: RegExp = schemaType?.options?.filterType || /.*/;
  const updateField: string = schemaType?.options?.updateField || "blocks";

  const [state, setState] = useState<"default" | "loading">("default");

  const [presets, setPresets] = useState<PresetType[]>([]);
  const [blocks, setBlocks] = useState<BlockType[]>([]);

  const allSchemas = useSchema()._registry;

  /**
   * Fetch data
   */

  useEffect(() => {
    async function getOptions() {
      /**
       * All presets filtered by type
       */

      let presets: PresetType[] = await client.fetch(`
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
              hidden: allSchemas[block?._type]?.get()?.hidden,
            }))
            .filter(({ _type }) =>
              typeFilter ? new RegExp(typeFilter).test(_type) : true,
            ),
        }))
        .filter(Boolean)
        .filter(({ blocks }) => Boolean(blocks?.length))
        .filter(({ hidden }) => !hidden?.(document._type));

      setPresets(presets);

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

      const studioBlocks = Object.keys(allSchemas)
        .filter((type) => type.startsWith("studio."))
        .map((type) => allSchemas[type].get(type));

      const allBlocks = [...blockTypes, ...studioBlocks]
        .filter(({ hidden }) => !hidden?.(document._type))
        .map(
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
            const obj: BlockType = {
              _type: _type || name,
              icon: icon?.(),
              title: allSchemas[_type || name]?.get()?.title,
              description,
              initialValue,
              image,
              blocks,
            };

            return obj;
          },
        )
        .filter(Boolean);

      setBlocks(allBlocks);
    }
    getOptions();
  }, [typeFilter, allSchemas]);

  const onPresetSelect = useCallback(
    (_id: string) => patchBlocks(_id),
    [value, blockInsertIndex, blocks, presets],
  );

  const onBlockSelect = useCallback(
    (_type: BlockSchemaName) => patchBlocks(_type),
    [value, blockInsertIndex, blocks, presets],
  );

  /**
   * Save
   */

  async function patchBlocks(selectedValue: string) {
    if (!onChange) return;
    if (!selectedValue) return setOpen(false);

    const selectedBlock = blocks.find(({ _type }) => selectedValue === _type);
    const selectedPreset = presets.find(({ _id }) => selectedValue === _id);

    const selectedOption = selectedBlock || selectedPreset;

    if (!selectedOption) {
      toast.push({
        status: "error",
        title: `Something went wrong.`,
      });
      return;
    }

    let newBlocks: {
      _key?: string;
      _type: BlockSchemaName;
      preset?: { _ref: string; _weak: boolean };
    }[] = [];

    if (selectedPreset) {
      newBlocks = [...(selectedPreset?.blocks || [])].map((block) => {
        const data = { ...block };
        delete data.hidden;
        delete data.icon;

        return {
          _type: selectedPreset._type as BlockSchemaName,
          ...data,
        };
      });
    }

    if (selectedBlock) {
      newBlocks = [
        {
          _type: selectedBlock._type as BlockSchemaName,
          ...selectedBlock?.initialValue,
        },
      ];
    }

    // want to have sanity generate fresh keys so removing them here
    function freshKeys(obj: { [key: string]: any }) {
      obj = { ...obj };
      for (let prop in obj) {
        if (prop === "_key") obj[prop] = nanoid();
        else if (typeof obj[prop] === "object") freshKeys(obj[prop]);
      }
    }

    newBlocks = newBlocks.map((block) => {
      freshKeys(block);
      block._key = nanoid();

      // add back link to preset
      if (selectedPreset) {
        block.preset = { _ref: selectedPreset._id, _weak: true };
      }

      return block;
    });

    const currentFieldBlocks = newBlocks.filter(({ _type }) =>
      typeFilter ? new RegExp(typeFilter).test(_type) : true,
    );

    try {
      if (blockInsertIndex === null) {
        onChange(set([...(value || []), ...currentFieldBlocks]));
      } else {
        onChange(
          set([
            ...(value || []).slice(0, blockInsertIndex + 1),
            ...currentFieldBlocks,
            ...(value || []).slice(blockInsertIndex + 1),
          ]),
        );
      }

      // click the last item in the list to open the editor dialog
      if (newBlocks?.length === 1) {
        setTimeout(() => {
          const items = window.document.querySelectorAll(
            `[id="${updateField}"] [data-testid="default-preview"]`,
          ) as NodeList;

          let item;
          if (blockInsertIndex === null) {
            item = items[items.length - 1] as HTMLElement;
          } else {
            item = items[blockInsertIndex + 1] as HTMLElement;
          }
          item?.click();
        }, 0);
      }
    } catch (err) {
      console.error(err);
      toast.push({
        status: "error",
        title: `Something went wrong.`,
      });
    }

    toast.push({
      status: "success",
      title: `Added ${selectedOption.title}`,
    });

    setOpen(false);
    setBlockInsertIndex(null);
    setState("default");
  }

  /**
   * Listen for click from preview block and insert block after
   */
  useEffect(() => {
    if (!buttonRef.current) return;

    function onBlockAddClick(e: any) {
      setOpen(true);
      setBlockInsertIndex(e.detail.afterIndex);
    }

    buttonRef.current.addEventListener("block-add-click", onBlockAddClick);
    () =>
      buttonRef?.current?.removeEventListener(
        "block-add-click",
        onBlockAddClick,
      );
  }, []);

  return (
    <Stack>
      <Button
        id="add-block"
        fontSize={2}
        icon={AddIcon}
        mode="ghost"
        padding={[3, 3, 4]}
        text="Add new block"
        onClick={() => setOpen(true)}
        style={{ borderRadius: 0, width: "calc(100% + 2px)" }}
        ref={buttonRef}
      />

      {open && (
        <BlockDialog
          onClose={() => setOpen(false)}
          presets={presets}
          blocks={blocks}
          onPresetSelect={onPresetSelect}
          onBlockSelect={onBlockSelect}
        />
      )}
    </Stack>
  );
};

export default BlockSelectDialog;

const BlockDialog = ({
  presets,
  blocks,
  onClose,
  onPresetSelect,
  onBlockSelect,
}: {
  presets: PresetType[];
  blocks: BlockType[];
  onClose: () => void;
  onPresetSelect: (id: string) => void;
  onBlockSelect: (_type: BlockSchemaName) => void;
}) => {
  const [id, setId] = useState<"preset" | "block">("preset");
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const { width } = useSize(dialogRef);

  return (
    <Dialog
      header="Add new block"
      id="add-block-dialog"
      onClose={onClose}
      zOffset={1000}
      width={1000}
      ref={dialogRef}
    >
      <Box padding={4}>
        {presets?.length && (
          <TabList space={2}>
            <Tab
              aria-controls="preset-panel"
              id="preset-tab"
              label="Presets"
              onClick={() => setId("preset")}
              selected={id === "preset"}
            />
            <Tab
              aria-controls="block-panel"
              id="block-tab"
              label="Empty block"
              onClick={() => setId("block")}
              selected={id === "block"}
            />
          </TabList>
        )}

        {presets?.length && (
          <TabPanel
            aria-labelledby="preset-tab"
            hidden={id !== "preset"}
            id="preset-panel"
          >
            <Grid columns={[1, 2]} gap={3} paddingTop={4}>
              {presets?.map(({ _id, image, title }) => (
                <Button
                  mode="ghost"
                  style={{
                    height: "100%",
                    borderRadius: 5,
                    gridColumn: width && width < 600 ? "span 2" : undefined,
                    display: "block",
                  }}
                  key={image}
                  tone="primary"
                  onClick={() => onPresetSelect(_id)}
                  padding={1}
                >
                  <Box>
                    {image && (
                      <img
                        src={`${image}?w=1024&h=768`}
                        alt=""
                        style={{ maxWidth: "100%" }}
                      />
                    )}

                    {title && (
                      <span
                        style={{
                          textTransform: "uppercase",
                          padding: "2px 4px",
                          fontSize: 11,
                          borderRadius: "0 0 5px 0",
                          fontWeight: 600,
                          background: "white",
                          color: "#111",
                          position: "absolute",
                          left: 4,
                          top: 4,
                        }}
                      >
                        {title}
                      </span>
                    )}
                  </Box>
                </Button>
              ))}
            </Grid>
          </TabPanel>
        )}

        <TabPanel
          aria-labelledby="preset-block"
          hidden={id !== "block"}
          id="block-panel"
        >
          <Flex
            gap={4}
            paddingTop={4}
            wrap="wrap"
            style={{
              alignItems: "stretch",
            }}
          >
            {blocks.map(({ _type, title, description, icon }) => (
              <Card
                key={_type}
                style={{
                  width: 150,
                  flexShrink: 0,
                  display: "block",
                }}
              >
                <Button
                  mode="ghost"
                  style={{
                    whiteSpace: "normal",
                    height: "100%",
                    width: "100%",
                  }}
                  onClick={() => onBlockSelect(_type)}
                >
                  <Stack key={_type} space={4}>
                    {icon || <StarBookmark weight="thin" size={20} />}
                    {title && <Text>{title}</Text>}
                    {description && (
                      <Text muted size={1}>
                        {description}
                      </Text>
                    )}
                  </Stack>
                </Button>
              </Card>
            ))}
          </Flex>
        </TabPanel>
      </Box>
    </Dialog>
  );
};
