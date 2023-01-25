import React from 'react';

import { baseLanguage } from '../../../languages';
import { SchemaName } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { ORDER_PUBLISHED_DESC, pageBase, PUBLISHED_AT_FIELD } from './_page';

export const SCHEMA_NAME: SchemaName = 'MyPageSchema';

export default {
  name: SCHEMA_NAME,
  title: 'MyPageTitle',
  type: 'document',
  singleton: true,
  orderings: [ORDER_PUBLISHED_DESC],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: 'hero.0.visual.image1',
    },
  },
  icon: () => <DocumentIcon type="page" />,
  initialValue: {
    ...pageBase.initialValue,
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [...pageBase.fields, PUBLISHED_AT_FIELD],
};
