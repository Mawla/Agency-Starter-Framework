import { Meta } from '@storybook/react';
import React from 'react';

import { NewsLetterSignUpForm as NewsLetterSignUpFormComponent } from './NewsLetterSignUpForm';

export default {
  component: NewsLetterSignUpFormComponent,
  title: 'Forms/NewsLetterSignUpForm',
} as Meta;

export const NewsLetterSignUpForm = () => <NewsLetterSignUpFormComponent />;
