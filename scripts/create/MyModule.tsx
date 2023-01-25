import React from 'react';

import { Wrapper } from '../../components/module/Wrapper';
import { BackgroundColorType } from '../../components/module/BackgroundOptions';
import { ColorType } from '../../types';
import { SpaceType } from '../../components/module/SpacingOptions';
/*IMPORT*/

export type MyModuleProps = {
  theme?: {
    title?: ColorType;
    text?: ColorType;
    background?: BackgroundColorType;
    space?: SpaceType;
  };
  /*TYPE*/
};

export const MyModule = ({ theme/*PROPS*/ }: MyModuleProps) => {
  return (
    <Wrapper theme={theme}>
      /*JSX*/
    </Wrapper>
  );
};

export default React.memo(MyModule);
