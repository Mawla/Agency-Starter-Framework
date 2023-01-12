import { Meta } from '@storybook/react';
import React from 'react';

import { Slider } from './Slider';

export default {
  component: Slider,
  title: 'Components/Slider',
} as Meta;

export const Default = () => <Slider />;
