import { Autocomplete, Card, Text, Flex } from "@sanity/ui";
import React, { ComponentType, useCallback, useEffect, useState } from "react";
import { set, useClient } from "sanity";
import { SANITY_API_VERSION } from "../../types.sanity";

type OptionType = {
  value: string;
  icon: string;
  label: string;
};

const IconPicker: ComponentType<any> = (props) => {
  const { value, onChange, onFocus, onBlur }: any = props;
  const client = useClient({ apiVersion: SANITY_API_VERSION});

  const [state, setState] = useState<"default" | "loading">("default");
  const [items, setItems] = useState<OptionType[]>([]);

  const currentIcon = items.find((option) => value === option.value)?.icon;

  useEffect(() => {
    async function getItems() {
      const icons = await client.fetch(`
        *[_id == 'config_icons'][0] {
          predefined,
          rest[]
        }`);

      if (!icons) return;

      const allIcons: OptionType[] = [
        ...Object.entries((icons || {}).predefined || {}).map(
          ([key, value]) => ({
            label: key,
            value: key,
            icon: value,
          }),
        ),
        ...((icons || {}).rest || []).map((item: any) => ({
          label: item.title,
          value: item.slug.current,
          icon: item.icon,
        })),
      ];

      setItems(allIcons);
    }

    getItems();
  }, []);

  const onSelect = useCallback(
    (newValue: string) => {
      setState("loading");
      onChange(set(newValue));
      setState("default");
    },
    [onChange, value, setState],
  );

  return (
    <Autocomplete
      radius={0}
      fontSize={2}
      filterOption={(query, option) =>
        option.value?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        option.label?.toLowerCase().indexOf(query.toLowerCase()) > -1
      }
      renderOption={(option) => (
        <Card as="button">
          <Flex padding={1} gap={3} align="center">
            <span dangerouslySetInnerHTML={{ __html: option.icon }}></span>
            <Text size={2}>{option.label}</Text>
          </Flex>
        </Card>
      )}
      value={value}
      icon={
        currentIcon ? (
          <span dangerouslySetInnerHTML={{ __html: currentIcon }}></span>
        ) : null
      }
      id="autocomplete"
      openButton
      options={items}
      placeholder="Search icons"
      onSelect={onSelect}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onSelect}
      loading={state === "loading"}
    />
  );
};

export default IconPicker;
