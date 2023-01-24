import { COLORS } from "../../../colors";
import { ColorType } from "../../../types";
import { ColorPicker } from "./ColorPicker";
import { Select } from "./Select";
import { Space } from "./Space";
import { TextInput } from "./TextInput";
import { Toggle } from "./Toggle";
import { toSentenceCase } from "./utils";
import { Card, Flex, Grid, Stack, Text } from "@sanity/ui";
import React, { useCallback } from "react";
import { ObjectInputProps, set } from "sanity";

export type StyleItemProps = {
  value?: any;
  onChange: (name: string, val: any) => void;
  title?: string;
  name: string;
  type: "color" | "boolean" | "select" | "string" | "space";
  options?: {
    colors?: { [key: string]: ColorType };
    list?: { title: string; value: string }[];
  };
};

const StylesPanel = (props: ObjectInputProps) => {
  const { value, onChange, schemaType } = props;

  const handleChange = useCallback(
    (name: string, val: any) => {
      const newValue = {
        ...JSON.parse(JSON.stringify(value || {})),
        [name]: val,
      };
      onChange(set(newValue));
    },
    [onChange, value]
  );

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
      {Boolean(schemaType?.title?.trim().length) && (
        <Text size={1} weight="semibold">
          {schemaType?.title}
        </Text>
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
            .length
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

    {type === "space" && (
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

  if (type === "space") {
    let val = [];
    if (value?.top) val.push(`top: ${value?.top}`);
    if (value?.bottom) val.push(`bottom: ${value?.bottom}`);
    return val.join(", ");
  }

  return value;
};
