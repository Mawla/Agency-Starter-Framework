import { Meta } from '@storybook/react';
import React from 'react';

import { ButtonProps } from '../../components/buttons/Button';
import { Nav, NavItem } from './Nav';

export default {
  component: Nav,
  title: 'Components/Nav',
} as Meta;

const items: NavItem[] = [
  {
    label: 'Product',
    children: [
      {
        label: 'Product 1',
        description: 'Tagline goes here',
        href: '',
      },
      {
        label: 'Product 2',
        description: 'with description',
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

export const Default = () => <Nav items={items} buttons={buttons} />;

export const ScrollBehavior = () => (
  <div>
    <Nav items={items} buttons={buttons} />
    <div style={{ height: '50vh' }} className="bg-neutral-95" />
    <div style={{ height: '50vh' }} className="bg-white" />
    <div style={{ height: '50vh' }} className="bg-neutral-50" />
    <div style={{ height: '50vh' }} className="bg-white" />
    <div style={{ height: '50vh' }} className="bg-neutral-50" />
    <div style={{ height: '50vh' }} className="bg-white" />
    <div style={{ height: '50vh' }} className="bg-neutral-50" />
    <div style={{ height: '50vh' }} className="bg-white" />
    <div style={{ height: '50vh' }} className="bg-neutral-95" />
  </div>
);
