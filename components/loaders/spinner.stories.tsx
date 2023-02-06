import { Meta } from '@storybook/react';
import React from 'react';

import { Spinner as SpinnerComponent } from './Spinner';

export default {
  component: SpinnerComponent,
  title: 'Components/loaders',
} as Meta;

export const Spinner = () => (
  <div className="w-12 h-12">
    <SpinnerComponent />
  </div>
);
