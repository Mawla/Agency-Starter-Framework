import { PinBottomIcon, PinTopIcon } from '@radix-ui/react-icons';
import { Stack } from '@sanity/ui';
import React, { useCallback } from 'react';

import { Select } from './Select';

export const Space = ({
  options = [],
  value = { top: null, bottom: null },
  onChange = (value) => {},
}) => {
  const handleChange = useCallback(
    (key, newValue) => {
      onChange({
        ...value,
        [key]: newValue,
      });
    },
    [value],
  );

  return (
    <Stack space={1}>
      <Select
        options={options}
        value={value?.top}
        onChange={(value) => handleChange('top', value)}
        Icon={PinTopIcon}
      />
      <Select
        options={options}
        value={value?.bottom}
        onChange={(value) => handleChange('bottom', value)}
        Icon={PinBottomIcon}
      />
    </Stack>
  );
};
