import { CheckIcon, BorderSolidIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import { Button } from 'reakit/Button';
import { Checkbox } from 'reakit/Checkbox';

import styles from './stylespanel.module.css';

export const Toggle = ({ value, onChange = (value) => {} }) => {
  const [checked, setChecked] = useState(value);

  const toggle = () => {
    let newChecked = !checked;
    if (checked === false) newChecked = null;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <Checkbox
      as={Button}
      checked={checked}
      onChange={toggle}
      className={styles.preview}
    >
      {checked === true && <CheckIcon />}
      {checked === false && <BorderSolidIcon />}
    </Checkbox>
  );
};
