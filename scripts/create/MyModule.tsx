import React from 'react';

import { Wrapper } from '../../components/module/Wrapper';
import { BackgroundColorType } from '../../components/module/BackgroundOptions';
import { ColorType, HeadingLevelType } from '../../types';
import { SpaceType } from '../../components/module/SpacingOptions';
import { TitleSizeType } from './MyModuleOptions';
/*IMPORT*/

export type MyModuleProps = {
  theme?: {
    module?: {
      background?: BackgroundColorType;
      space?: SpaceType;
    }
    title?: {
      color?: ColorType;
      size?: TitleSizeType;
      level?: HeadingLevelType
    },
    text?: {
      color?: ColorType;
    },
  };
  /*TYPE*/
};

export const MyModule = ({ theme/*PROPS*/ }: MyModuleProps) => {
  return (
    <Wrapper
      theme={{
        ...theme?.module
      }}
    >
      /*JSX*/
    </Wrapper>
  );
};

export default React.memo(MyModule);
