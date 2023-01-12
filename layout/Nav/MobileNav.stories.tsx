import { Meta } from '@storybook/react';
import React from 'react';

import { ButtonProps } from '../../components/buttons/Button';
import { MobileNav } from './MobileNav';
import { NavItem } from './Nav';

export default {
  component: MobileNav,
  title: 'Components/MobileNav',
} as Meta;

const items: NavItem[] = [
  {
    label: 'Product',
    children: [
      {
        label: 'Product 1',
        href: '',
      },
      {
        label: 'Product 2',
        href: '',
      },
    ],
  },
  {
    label: 'Pricing',
    href: '/',
  },
  {
    label: 'Solutions',
    children: [
      {
        label: 'Business cases',
        href: '',
        current: true,
      },
      {
        label: 'Industries',
        href: '',
      },
    ],
  },
  {
    label: 'Resources',
    href: '/',
  },
  {
    label: 'Support',
    href: '/',
  },
];

const buttons: ButtonProps[] = [
  {
    label: 'Download now',
    href: '/download',
  },
  {
    label: 'Sign in',
    href: '/',
  },
];

export const Default = () => (
  <MobileNav items={items} buttons={buttons} open={true} />
);
