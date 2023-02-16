import { blocksToText } from "../utils/portableText/portableTextToText";
import { SearchIcon } from "@sanity/icons";
import { Autocomplete, Stack, Card, Text } from "@sanity/ui";
import React, { ComponentType, useCallback, useState } from "react";
import { set, useFormValue } from "sanity";

const DialogSelect: ComponentType<any> = (props) => {
  const { value, onFocus, onBlur, onChange } = props;

  const document = useFormValue([]) as {
    dialogs?: {
      slug: { current: string };
      content: { _type: string; children: { _type: string; text: string }[] }[];
    }[];
  };

  const [options] = useState<{ value: string; description: string }[]>(
    (document.dialogs || []).map(({ slug, content = [] }) => ({
      value: slug?.current,
      description: `${blocksToText(content)?.slice(0, 75)}…`,
    })),
  );

  const onSelect = useCallback(
    (newValue: string) => {
      onChange(set(newValue));
    },
    [onChange, value],
  );

  return (
    <Autocomplete
      radius={0}
      fontSize={2}
      filterOption={(query, option) =>
        option.value?.toLowerCase().indexOf(query.toLowerCase()) > -1
      }
      renderOption={(option) => (
        <Card as="button">
          <Stack padding={3} space={3}>
            <Text size={2}>{option.value}</Text>
            {option.description && (
              <Text size={1} muted>
                {option.description}
              </Text>
            )}
          </Stack>
        </Card>
      )}
      value={value}
      icon={SearchIcon}
      id="autocomplete"
      openButton
      options={options}
      placeholder="Search dialogs"
      onSelect={onSelect}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onSelect}
    />
  );
};

export default DialogSelect;

export const DialogSelectWrapper: ComponentType<any> = (props) => {
  const { children } = props;

  const document = useFormValue([]) as {
    dialogs?: {
      slug: { current: string };
    }[];
  };

  if (!document?.dialogs?.length) return null;

  return <div>{children}</div>;
};
