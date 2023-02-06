import { Meta } from '@storybook/react';
import React from 'react';

import {
  demoImage,
  demoImage2,
  demoImage3,
  demoImage4,
} from '../../stories/content';
import { Slides } from './Slides';

export default {
  component: Slides,
  title: 'Modules/Slides',
} as Meta;

export const Default = () => (
  <Slides
    title="Our Values"
    eyebrow="Seven values, one team"
    intro={<p>…</p>}
    items={[
      {
        _key: '1',
        image: demoImage2,
        label: '1',
        title: 'We make it happen',
        text: 'We are persistent in reaching our goals and we evaluate ourselves based on the results we achieve.',
      },
      {
        _key: '2',
        image: demoImage3,
        label: '2',
        title: 'We enrich ourselves through diversity',
        text: 'We believe in diversity as an element of strength, we encourage open debate and we welcome others’ points of view.',
      },
      { _key: '3', image: demoImage, label: 'hello', text: 'hello' },
      { _key: '4', image: demoImage2, title: 'Prima', text: '' },
    ]}
    buttons={[
      {
        label: 'View all',
        href: 'https://www.google.com',
        variant: 'primary',
      },
    ]}
  />
);
