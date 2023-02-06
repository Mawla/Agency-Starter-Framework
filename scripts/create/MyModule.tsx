import React, { ComponentType, lazy } from "react";

import {  WrapperProps } from '../../components/module/Wrapper';
import { BackgroundColorType } from '../../components/module/BackgroundOptions';
import { ColorType, HeadingLevelType } from '../../types';
import { SpaceType } from '../../components/module/SpacingOptions';
import { TitleSizeType } from './MyModuleOptions';

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () => import(/* webpackChunkName: "Width" */ "../../components/module/Width"),
);


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
