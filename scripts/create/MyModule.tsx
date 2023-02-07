import React, { ComponentType, lazy } from "react";

import {  WrapperProps } from '../../components/module/Wrapper';
import { BackgroundColorType } from '../../components/module/background.options';
import { ColorType, HeadingLevelType } from '../../types';
import { SpaceType } from '../../components/module/spacing.options';
import { TitleSizeType } from './mymodule.options';

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () => import(/* webpackChunkName: "Wrapper" */ "../../components/module/Wrapper"),
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
