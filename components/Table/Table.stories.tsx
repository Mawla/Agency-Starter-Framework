import { Meta } from '@storybook/react';
import React from 'react';

import { Table } from './Table';

export default {
  title: 'Components / Table',
} as Meta;

export const Default = () => (
  <Table
    file="https://www.papaparse.com/resources/files/normal.csv"
    fileName="Sample spreadsheet"
  />
);

export const Error = () => <Table file="nope" fileName="Sample spreadsheet" />;
