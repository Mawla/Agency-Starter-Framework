import { Meta } from '@storybook/react';
import React from 'react';

import { STORYBOOK_COLORS_SUBSET } from '../../colors';
import { ColorType } from '../../types';
import { MyModule } from './MyModule';

export default {
  component: MyModule,
  title: 'Modules/MyModule',
} as Meta;

export const Default = () => <MyModule title="MyModule" />;

export const Colors = () => (
  <>
    {Object.keys(STORYBOOK_COLORS_SUBSET).map((background: ColorType) =>
      Object.keys(STORYBOOK_COLORS_SUBSET).map((text: ColorType) => (
        <div key={`${text}${background}`} className="mb-10">
          <MyModule title="MyModule" theme={{ background, text }} />
        </div>
      )),
    )}
  </>
);
