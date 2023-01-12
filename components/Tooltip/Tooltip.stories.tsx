import { Meta } from '@storybook/react';
import React from 'react';

import { Tooltip } from './Tooltip';

export default {
  component: Tooltip,
  title: 'Components/Tooltip',
} as Meta;

export const Simple = () => <Tooltip title="Tooltip">hover me</Tooltip>;
