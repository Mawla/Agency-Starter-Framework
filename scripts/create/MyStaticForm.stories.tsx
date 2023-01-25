import { Meta } from '@storybook/react';
import React from 'react';

import { MyStaticForm as MyStaticFormComponent } from './MyStaticForm';

export default {
  component: MyStaticFormComponent,
  title: 'Forms/MyStaticForm',
} as Meta;

export const MyStaticForm = () => <MyStaticFormComponent />;
