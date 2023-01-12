import { Meta } from '@storybook/react';
import React from 'react';

import { DEMO_SITEMAP } from '../../test/fixtures/sitemap';
import { Breadcrumb as BreadcrumbComponent } from './Breadcrumb';

export default {
  title: 'Components/Breadcrumb',
} as Meta;

export const Breadcrumb = () => {
  return <BreadcrumbComponent path={DEMO_SITEMAP} />;
};

export const BreadcrumbLevel1 = () => {
  return <BreadcrumbComponent path={[DEMO_SITEMAP[0]]} />;
};

BreadcrumbLevel1.story = {
  parameters: {
    nextRouter: {
      asPath: '/page1',
    },
  },
};

export const BreadcrumbLevel2 = () => {
  return <BreadcrumbComponent path={DEMO_SITEMAP} />;
};

BreadcrumbLevel2.story = {
  parameters: {
    nextRouter: {
      asPath: '/page1/page2',
    },
  },
};
