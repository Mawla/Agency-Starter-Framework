import { Autocomplete, Card, Text, Flex } from "@sanity/ui";
import React, { ComponentType, useCallback, useState } from "react";
import { set } from "sanity";

type OptionType = {
  value: string;
  icon: string;
  label: string;
};

const IconPicker: ComponentType<any> = (props) => {
  const { value, onChange, onFocus, onBlur, schemaType }: any = props;

  if (!schemaType?.options?.icons)
    return <div>Missing options.icons in the schema</div>;

  const items: OptionType[] = Object.entries(schemaType?.options?.icons).map(
    ([key, value]) => ({
      label: key,
      value: key,
      icon: key,
    }),
  );
  const [state, setState] = useState<"default" | "loading">("default");
  const currentIcon = items.find((option) => value === option.value)?.icon;

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
            <img
              style={{ width: 30, height: 30 }}
              src={`${import.meta.env.SANITY_STUDIO_PROJECT_PATH}icons/${
                schemaType?.options?.icons[option.icon]
              }`}
            />
            <Text size={2}>{option.label}</Text>
          </Flex>
        </Card>
      )}
      value={value}
      icon={
        currentIcon ? (
          <img
            style={{ width: 16, height: 16 }}
            src={`${import.meta.env.SANITY_STUDIO_PROJECT_PATH}icons/${
              schemaType?.options?.icons[currentIcon]
            }`}
          />
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
