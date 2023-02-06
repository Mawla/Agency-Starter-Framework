import { Meta } from '@storybook/react';
import React from 'react';

import { demoImage, demoImage2, demoImage3 } from '../../stories/content';
import { Gallery } from './Gallery';

export default {
  component: Gallery,
  title: 'Modules/Gallery',
} as Meta;

export const Default = () => (
  <Gallery
    title="Milan Showcase"
    eyebrow="Italy locations"
    intro={
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
        accumsan, risus sem sollicitudin lacus. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>
    }
    items={[
      { _key: '1', image: demoImage },
      { _key: '2', image: demoImage2 },
      { _key: '3', image: demoImage3 },
      { _key: '4', image: demoImage },
    ]}
  />
);
