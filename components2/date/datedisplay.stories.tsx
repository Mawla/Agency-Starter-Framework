import { Meta } from '@storybook/react';
import React from 'react';

import { DateDisplay } from './DateDisplay';

export default {
  component: DateDisplay,
  title: 'Components/DateDisplay',
} as Meta;

export const Default = () => <DateDisplay datetime="2012-01-01" />;

export const Inline = () => (
  <div>
    <DateDisplay datetime="2012-01-01" inline />
    <span>…</span>
  </div>
);

export const Block = () => (
  <div>
    <DateDisplay datetime="2012-01-01" inline={false} />
    <span>…</span>
  </div>
);

export const Format = () => (
  <>
    <DateDisplay
      datetime="2012-01-01"
      inline={false}
      format={{ year: 'numeric', month: 'short' }}
      locale="nl-NL"
    />
    <DateDisplay
      datetime="2012-01-01"
      inline={false}
      format={{ year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit' }}
      locale="de-DE"
    />
  </>
);
