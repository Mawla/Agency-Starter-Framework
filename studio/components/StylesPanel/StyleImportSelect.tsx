import { DownloadIcon } from "@sanity/icons";
import { Button, Flex, Stack, Text, Autocomplete } from "@sanity/ui";
import React, { useEffect, useState } from "react";
import { useClient } from "sanity";

type Props = {
  type: "preset.theme.text" | "preset.theme.title" | "preset.theme.block";
  onChange: (value: any) => void;
};

type OptionType = {
  _id: string;
  _type: string;
  value: string;
  title: string;
  image?: string;
  theme?: any;
};

export const StyleImportSelect = ({ type, onChange }: Props) => {
  const client = useClient({ apiVersion: "vX" });

  const [state, setState] = useState<"default" | "loading">("default");
  const [show, setShow] = useState(false);
  const [presets, setPresets] = useState<OptionType[]>([]);

  useEffect(() => {
    async function getPresets() {
      setState("loading");
      const presets = await client.fetch(
        `*[_type match '${type}'] {
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
    onChange(presets.find((option) => option._id === presetId)?.theme);
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
      id="preset-import"
      filterOption={(query, option: any) =>
        option.title.toLowerCase().indexOf(query.toLowerCase()) > -1
      }
      fontSize={1}
      icon={DownloadIcon}
      padding={3}
      openButton
      options={presets}
      placeholder=""
      renderOption={(option: any) => (
        <Flex gap={2} align="center">
          {option.image && (
            <img src={option.image} style={{ width: 50, height: 50 }} />
          )}

          <Stack space={3}>
            <Text weight="semibold">{option.title}</Text>
            <Text muted size={1}>
              {option.theme?.size} {option.theme?.weight} {option.theme?.font}{" "}
              {option.theme?.color}
            </Text>
          </Stack>
        </Flex>
      )}
      loading={state === "loading"}
      onSelect={onSelect}
      renderValue={(value, option) => option.title}
    />
  );
};
