import { SANITY_API_VERSION } from "../../../types.sanity";
import { DownloadIcon } from "@sanity/icons";
import { Button, Flex, Stack, Text, Autocomplete } from "@sanity/ui";
import React, { useEffect, useRef, useState } from "react";
import { useClient } from "sanity";

type Props = {
  type: "preset.theme.text" | "preset.theme.title" | "preset.theme.block";
  onChange: (theme: any, presetId: string) => void;
};

export type ThemePresetSelectOptionType = {
  _id: string;
  _type: string;
  value: string;
  title: string;
  image?: string;
  theme?: any;
};

export const ThemePresetSelect = ({ type, onChange }: Props) => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const inputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<"default" | "loading">("default");
  const [show, setShow] = useState(false);
  const [presets, setPresets] = useState<ThemePresetSelectOptionType[]>([]);

  useEffect(() => {
    if (show && inputRef.current) inputRef.current.focus();
  }, [show]);

  useEffect(() => {
    async function getPresets() {
      setState("loading");
      const presets = await client.fetch(
        `*[_type match '${type}' && !(_id match 'drafts.*')] {
          "value": _id,
          _id, 
          _type, 
          title,
          theme,
          "image": image.asset->url
        }`,
      );

      setPresets(presets);
      setState("default");
    }

    getPresets();
  }, [type]);

  const onSelect = (presetId: string) => {
    onChange(
      presets.find((option) => option._id === presetId)?.theme,
      presetId,
    );
    setShow(false);
  };

  if (!show) {
    return (
      <Button
        icon={DownloadIcon}
        text=""
        fontSize={1}
        padding={2}
        mode="bleed"
        tone="primary"
        onClick={() => setShow(true)}
      />
    );
  }

  if (!presets?.length) return null;

  return (
    <Autocomplete
      ref={inputRef}
      style={{ width: 400, maxWidth: "100%" }}
      id="preset-import"
      filterOption={(query, option: any) =>
        option.title.toLowerCase().indexOf(query.toLowerCase()) > -1
      }
      fontSize={1}
      padding={3}
      openButton
      options={presets}
      placeholder=""
      renderOption={(option: any) => (
        <Flex gap={2} align="center">
          {option.image && (
            <img
              src={option.image}
              style={{
                width: 100,
                height: 100,
                border: "1px solid rgba(0,0,0,.1)",
              }}
            />
          )}

          <Stack space={2}>
            <Text weight="semibold" size={1}>
              {option.title}
            </Text>
            <Text muted size={1}>
              {option.theme?.size} {option.theme?.weight} {option.theme?.font}{" "}
              {option.theme?.color}
            </Text>
          </Stack>
        </Flex>
      )}
      loading={state === "loading"}
      onSelect={onSelect}
      onBlur={() => setShow(false)}
      renderValue={(value, option) => option.title}
    />
  );
};
