import React from 'react'

import {SchemaName} from '../../../types.sanity'
import Warning from '../../components/Warning'
import {DocumentIcon} from '../../utils/DocumentIcon'

export const SCHEMA_NAME: SchemaName = 'config.integrations'

export default {
  name: SCHEMA_NAME,
  title: 'Integrations',
  type: 'document',
  singleton: true,
  icon: () => <DocumentIcon type="integrations" />,
  initialValue: {},
  preview: {
    prepare() {
      return {
        title: `Integrations configuration`,
      }
    },
  },
  fields: [
    {
      name: 'warning',
      title: 'Warning',
      type: 'string',
      localize: false,
      components: {field: Warning},
      message:
        'Updates to configuration will trigger a new deployment on the build server and will take a few minutes to be in effect.',
    },
    {
      name: 'gtmid',
      title: 'Google Tag Manager ID',
      type: 'string',
      description: 'Formatted as `GTM-XXXXXX`.',
    },
  ],
}
