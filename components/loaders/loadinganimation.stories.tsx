import { Meta } from '@storybook/react';
import React from 'react';

import { LoadingAnimation as LoadingAnimationComponent } from './LoadingAnimation';

export default {
  component: LoadingAnimationComponent,
  title: 'Components/loaders',
} as Meta;

export const LoadingAnimation = () => <LoadingAnimationComponent />;
