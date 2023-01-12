import React from 'react';

import { DocumentIcon } from '../../utils/DocumentIcon';

export default {
  name: 'workable.monitor',
  title: 'Workable monitor',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: `Workable monitor`,
      };
    },
  },
  singleton: true,
  icon: () => <DocumentIcon type="log" />,
  fields: [
    {
      name: 'log',
      title: 'Log',
      type: 'array',
      of: [
        {
          name: 'item',
          title: 'Item',
          type: 'object',
          preview: {
            select: {
              success: 'success',
              date: 'date',
              type: 'type',
            },
            prepare({ success, date, type }) {
              return {
                title: new Date(date).toLocaleString(),
                subtitle: type,
                media: () => (success ? <span>✅</span> : <span>❌</span>),
              };
            },
          },
          fields: [
            {
              name: 'success',
              title: 'Success',
              type: 'boolean',
            },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
            },
            {
              name: 'date',
              title: 'Date',
              type: 'datetime',
            },
            {
              name: 'message',
              title: 'Message',
              type: 'text',
              rows: 30,
            },
          ],
        },
      ],
    },
  ],
};
