import { COLORS } from "../../../theme";
import { ColorType } from "../../../types";
import { getSchemaDefinition, matchSchema } from "../CopyPaste/match-schema";
import { ColorPicker } from "./ColorPicker";
import { Select } from "./Select";
import { Space } from "./Space";
import { TextInput } from "./TextInput";
import {
  ThemePresetSelect,
  ThemePresetSelectOptionType,
} from "./ThemeImportSelect";
import { Toggle } from "./Toggle";
import { toSentenceCase } from "./utils";
import { ArchiveIcon, CopyIcon } from "@sanity/icons";
import { Button, Card, Flex, Grid, Stack, Text, useToast } from "@sanity/ui";
import React, { useCallback, useEffect, useState } from "react";
import { ObjectInputProps, set } from "sanity";

const ACTION_ID = "sanityCopyPasteObject";
const READ_PASTE_TIMEOUT = 1000;

export type StyleItemProps = {
  value?: any;
  onChange: (name: string, val: any) => void;
  title?: string;
  name: string;
  type: "color" | "boolean" | "select" | "string" | "topbottom";
  options?: {
    colors?: { [key: string]: ColorType };
    list?: { title: string; value: string }[];
  };
};

const StylesPanel = (props: ObjectInputProps) => {
  const { value, onChange, schemaType } = props;
  const toast = useToast();
  const [isCompatiblePasteData, setIsCompatiblePasteData] = useState(false);

  const handleChange = useCallback(
    (name: string, val: any) => {
      const newValue = {
        ...JSON.parse(JSON.stringify(value || {})),
        [name]: val,
      };
      onChange(set(newValue));
    },
    [onChange, value],
  );

  const importPreset = useCallback(
    (preset: ThemePresetSelectOptionType, presetId: string) => {
      const newValue = {
        ...preset,
        preset: {
          _ref: presetId,
        },
      };

      onChange(set(newValue));
    },
    [onChange, value],
  );

  /**
   * Copy to clipboard
   */

  const onCopy = useCallback(() => {
    const schemaDefinition = getSchemaDefinition(
      schemaType?.options?.fields,
      null,
    );

    navigator.clipboard.writeText(
      JSON.stringify({
        date: new Date(),
        action: ACTION_ID,
        data: value,
        schema: schemaDefinition,
      }),
    );

    toast.push({
      status: "success",
      title: `Copied theme to clipboard`,
    });
  }, [value]);

  /**
   * Paste from clipboard
   */

  const onPaste = useCallback(async () => {
    const obj = await getClipboardObj();
    if (!obj?.data) return;
    onChange(set(obj?.data));
  }, [isCompatiblePasteData]);

  /**
   * Check if data on clipboard is a match with parent type
   */

  const getClipboardObj = async () => {
    const data = await navigator.clipboard.readText();
    if (!data) return null;

    let obj;
    try {
      obj = JSON.parse(data);
    } catch (err) {
      return null;
    }
    return obj;
  };

  const checkCompatiblePasteData = async () => {
    const obj = await getClipboardObj();

    if (!obj) return false;

    // no sanity copy paste action
    if (obj.action !== ACTION_ID) return false;

    const schemaDefinition = getSchemaDefinition(
      schemaType?.options?.fields,
      null,
    );

    // check if obj.data partially matches the schema definition
    const errors = matchSchema(obj.schema, schemaDefinition);
    if (errors.length) {
      return false;
    }

    return true;
  };

  /**
   * Read clipboard periodically to enable/disable paste
   */

  useEffect(() => {
    if (schemaType?.options.allowCopyPaste === false) return;
    async function readClipboard() {
      if (!window?.document?.hasFocus()) return;
      const isCompatible = await checkCompatiblePasteData();
      setIsCompatiblePasteData(isCompatible);
    }

    let interval = setInterval(readClipboard, READ_PASTE_TIMEOUT);
    return () => clearInterval(interval);
  }, []);

  if (!schemaType?.options?.fields?.length)
    return (
      <Card padding={[3, 3, 4]} radius={2} shadow={1} tone="caution">
        <Text align="center" size={2}>
          No options are defined for this field.
        </Text>
      </Card>
    );

  // group fields
  const groups = schemaType?.options.fields
    .reduce((acc: any, curr: any) => {
      if (acc.indexOf(curr.group) > -1) return [...acc];
      return [...acc, curr.group];
    }, [])
    ?.filter(Boolean);

  return (
    <Stack space={2}>
      {/* moving these styles inline pending https://github.com/sanity-io/sanity/issues/3972#issuecomment-1422802293 */}
      <style>
        {`
        /* Popover */
        .stylespanel_popover {
          z-index: 100;
          background: var(--card-bg-color);
          border: 1px solid var(--card-shadow-outline-color);
          padding: 0;
          box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.1);
        }

        .stylespanel_popoverButton {
          border: 0;
          background: var(--card-bg-color);
          display: block;
          padding: 0;
        }

        .stylespanel_preview {
          width: 32px;
          height: 32px;
          border: 0;
          box-shadow: inset 0 0 0 1px var(--card-shadow-outline-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--card-bg-color);
          transition: box-shadow 0.15s;
          border-radius: 1px;
        }

        .stylespanel_preview:hover {
          box-shadow: inset 0 0 0 1px var(--card-shadow-outline-color), inset 0 0 0 1px var(--card-shadow-outline-color);
        }

        .stylespanel_preview > * {
          opacity: 0.75;
          transition: opacity 0.15s;
        }

        .stylespanel_preview:hover > * {
          opacity: 1;
        }

        .stylespanel_previewColorEmpty {
          background-color: transparent;
          background-image: linear-gradient(45deg, var(--card-shadow-outline-color) 25%, transparent 25%),
            linear-gradient(-45deg, var(--card-shadow-outline-color) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, var(--card-shadow-outline-color) 75%),
            linear-gradient(-45deg, transparent 75%, var(--card-shadow-outline-color) 75%);
          background-size: 10px 10px;
          background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
        }

        /* Color */
        .stylespanel_colorItemWrapper {
          width: 32px;
          height: 32px;
          align-items: flex-start;
          display: inline-block;
          border: 0;
          position: relative;
          background: var(--card-bg-color);
        }

        .stylespanel_colorItem,
        .stylespanel_colorItemActive,
        .stylespanel_colorItemClearActive,
        .stylespanel_colorItemClear {
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          cursor: pointer;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.075);
          border-radius: 1px;
        }

        .stylespanel_colorItemClearActive,
        .stylespanel_colorItemActive {
          z-index: 1;
          box-shadow: none;
          border: 4px solid white;
          top: -6px;
          right: -6px;
          bottom: -6px;
          left: -6px;
          outline: 1px solid rgba(0, 0, 0, 0.075);
          box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
        }

        .stylespanel_colorItemClearActive,
        .stylespanel_colorItemClear {
          background-color: transparent;
          background-image: linear-gradient(45deg, #ddd 25%, transparent 25%),
            linear-gradient(-45deg, #ddd 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ddd 75%),
            linear-gradient(-45deg, transparent 75%, #ddd 75%);
          background-size: 10px 10px;
          background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
        }

        /* Select */

        .stylespanel_select--large {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
        }

        .stylespanel_select--small {
          display: flex;
          flex-wrap: wrap;
        }
        
        .stylespanel_select--small .stylespanel_selectOption {
          border-right: 1px solid var(--card-shadow-outline-color);
        }

        .stylespanel_select--large .stylespanel_selectOption {
          border-bottom: 1px solid var(--card-shadow-outline-color);
        }

        .stylespanel_selectOption {
          padding: 10px 10px 11px 10px;
          display: flex;
          align-items: center;
          gap: 4px;
          position: relative;
        }

        .stylespanel_selectOption:hover {
          background-color: var(--card-code-bg-color);
          color: var(--card-fg-color);
          cursor: pointer;

        }

        .stylespanel_selectOption:last-of-type {
          border: 0;
        }

        .stylespanel_selectCheck {
          width: 16px;
        }

        .stylespanel_selectCheck > * {
          position: absolute;
          top: 7px;
          left: 10px;
        }

        /* Text field */

        .stylespanel_textInput {
          padding: 3px;
        }`}
      </style>

      {Boolean(schemaType?.title?.trim().length) && (
        <Flex align="baseline" gap={1} wrap="wrap">
          <Text size={1} weight="semibold">
            {schemaType?.title}
          </Text>

          <Flex style={{ marginLeft: "auto" }}>
            {schemaType?.options.importType && (
              <Card>
                <ThemePresetSelect
                  type={schemaType?.options.importType}
                  onChange={importPreset}
                />
              </Card>
            )}

            {schemaType?.options.allowCopyPaste !== false && (
              <>
                <Button
                  icon={CopyIcon}
                  text=""
                  fontSize={1}
                  padding={2}
                  mode="bleed"
                  tone="primary"
                  onClick={onCopy}
                />
                <Button
                  icon={ArchiveIcon}
                  text=""
                  fontSize={1}
                  padding={2}
                  mode="bleed"
                  tone="primary"
                  disabled={!isCompatiblePasteData}
                  onClick={onPaste}
                />
              </>
            )}
          </Flex>
        </Flex>
      )}

      {schemaType?.description && (
        <Text size={1} muted>
          {schemaType?.description}
        </Text>
      )}

      <div>
        {groups.map((group: string) => (
          <Stack space={2} key={group} marginTop={4}>
            {group && (
              <Text size={1} weight="semibold">
                {toSentenceCase(group)}
              </Text>
            )}
            <Grid
              columns={schemaType.options.columns || 1}
              marginTop={1}
              gap={2}
            >
              {schemaType.options.fields
                ?.filter((x: any) => x.group === group)
                ?.map((item: StyleItemProps) => {
                  return (
                    <StyleItem
                      key={item.title}
                      {...item}
                      onChange={handleChange}
                      value={value}
                    />
                  );
                })}
            </Grid>
          </Stack>
        ))}

        {Boolean(
          schemaType.options.fields?.filter((x: any) => !Boolean(x.group))
            .length,
        ) && (
          <Stack space={2}>
            {groups.length > 0 && (
              <Text size={1} weight="semibold" style={{ marginTop: 16 }}>
                Other
              </Text>
            )}

            <Stack marginTop={1} space={2}>
              <Grid
                columns={schemaType.options.columns || 1}
                marginTop={1}
                gap={2}
              >
                {schemaType.options.fields
                  ?.filter((x: any) => !Boolean(x.group))
                  ?.map((item: StyleItemProps) => {
                    return (
                      <StyleItem
                        key={item.title}
                        {...item}
                        onChange={handleChange}
                        value={value}
                      />
                    );
                  })}
              </Grid>
            </Stack>
          </Stack>
        )}
      </div>
    </Stack>
  );
};

const StyleItem = ({
  name,
  title,
  type,
  options,
  onChange,
  value,
}: StyleItemProps) => (
  <Flex gap={3} align="center">
    {type === "color" && (
      <ColorPicker
        colors={options?.colors || COLORS}
        value={value?.[name]}
        onChange={(value) => onChange(name, value)}
      />
    )}

    {type === "boolean" && (
      <Toggle
        value={value?.[name]}
        onChange={(value) => onChange(name, value)}
      />
    )}

    {type === "string" && (
      <TextInput
        value={value?.[name]}
        onChange={(value) => onChange(name, value)}
      />
    )}

    {type === "select" && (
      <Select
        options={options?.list}
        value={value?.[name]}
        onChange={(value) => onChange(name, value)}
      />
    )}

    {type === "topbottom" && (
      <Space
        options={options?.list}
        value={value?.[name]}
        onChange={(value) => onChange(name, value)}
      />
    )}

    <Flex direction="column" gap={2}>
      <Text size={1} weight="bold">
        {title || toSentenceCase(name)}
      </Text>
      {value?.[name] !== null &&
        typeof value?.[name] !== "undefined" &&
        Boolean(value?.[name]?.toString().trim().length) && (
          <Text size={1} muted>
            {formatValue(value?.[name], type)}
          </Text>
        )}
    </Flex>
  </Flex>
);

export default StylesPanel;

const formatValue = (value: any, type: StyleItemProps["type"]) => {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return value;
  }

  if (type === "topbottom") {
    let val = [];
    if (value?.top) val.push(`top: ${value?.top}`);
    if (value?.bottom) val.push(`bottom: ${value?.bottom}`);
    return val.join(", ");
  }

  return value;
};
