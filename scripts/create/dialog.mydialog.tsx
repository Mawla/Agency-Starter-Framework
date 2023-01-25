import React from 'react';

import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { prefixWithLanguage } from '../../utils/language/prefix-with-language';
import { validate } from '../../utils/validate';

type SchemaType = SanitySchemaType & {
  type: 'object';
  fields: ({
    name: 'title' | 'slug' | 'language';
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'MyDialogSchema',
  title: 'MyDialogTitle',
  type: 'object',
  icon: () => <DocumentIcon type="dialog" />,
  preview: {
    select: {
      language: 'language',
    },
    prepare({ language }) {
      return {
        subtitle: prefixWithLanguage(language),
      };
    },
  },
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'language',
    },
    {
      name: 'slug',
      title: 'Identifier',
      type: 'slug',
      validation: validate({ required: true }),
      description:
        'Unique identifier used to link to this dialog from a button. Only lowercase and no special characters except -',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
};

export default schema;
