import { IconLoader } from "../../components/images/IconLoader";
import { IconType, ICONS } from "../../types";
import { Autocomplete, Card, Text, Flex } from "@sanity/ui";
import React, { ComponentType, useCallback, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { set } from "sanity";

const queryClient = new QueryClient();

type OptionType = {
  value: string;
  icon: IconType;
  label: string;
};

const IconPicker: ComponentType<any> = (props) => {
  const { value, onChange, onFocus, onBlur }: any = props;

  const options: OptionType[] = Object.entries(ICONS).map(([key, value]) => ({
    label: key,
    value: key,
    icon: key as IconType,
  }));
  const [state, setState] = useState<"default" | "loading">("default");

  const onSelect = useCallback(
    (newValue: string) => {
      setState("loading");
      onChange(set(newValue));
      setState("default");
    },
    [onChange, value, setState]
  );

  return (
    <QueryClientProvider client={queryClient}>
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
              <IconLoader
                domain={(import.meta as any).env.SANITY_STUDIO_PROJECT_PATH}
                icon={option.icon}
                style={{ width: 30, height: 30, color: "#333" }}
              />
              <Text size={2}>{option.label}</Text>
            </Flex>
          </Card>
        )}
        value={value}
        icon={
          <IconLoader
            domain={(import.meta as any).env.SANITY_STUDIO_PROJECT_PATH}
            icon={
              (options.find((option) => value === option.value)
                ?.icon as IconType) || "magnifying-glass"
            }
            style={{
              color: "#333",
              display: "block",
              width: 16,
              height: 16,
              translate: "0 3px",
            }}
          />
        }
        id="autocomplete"
        openButton
        options={options}
        placeholder="Search icons"
        onSelect={onSelect}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onSelect}
        loading={state === "loading"}
      />
    </QueryClientProvider>
  );
};

export default IconPicker;
