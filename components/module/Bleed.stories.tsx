import { Meta } from '@storybook/react';
import React from 'react';

import { Bleed as BleedComponent } from './Bleed';

export default {
  component: BleedComponent,
  title: 'Components/Module/Bleed',
} as Meta;

export const BleedNone = () => (
  <div className="bg-neutral-95">
    <BleedComponent bleed="none">
      <div className="bg-neutral-25 p-10" />
    </BleedComponent>
  </div>
);

export const BleedSmall = () => (
  <div className="bg-neutral-95">
    <BleedComponent bleed="sm">
      <div className="bg-neutral-25 p-10" />
    </BleedComponent>
  </div>
);

export const BleedDefault = () => (
  <div className="bg-neutral-95">
    <BleedComponent bleed="md">
      <div className="bg-neutral-25 p-10" />
    </BleedComponent>
  </div>
);

export const BleedLarge = () => (
  <div className="bg-neutral-95">
    <BleedComponent bleed="lg">
      <div className="bg-neutral-25 p-10" />
    </BleedComponent>
  </div>
);
