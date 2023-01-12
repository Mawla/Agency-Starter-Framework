import React from 'react'

import StylesPanel from '../../components/StylesPanel/StylesPanel'
import {DocumentIcon} from '../../utils/DocumentIcon'

export const schema = {
  name: 'styles',
  title: 'Styles',
  type: 'object',
  icon: () => <DocumentIcon type="paint" />,
  components: {
    field: ({children}: {children?: React.ReactElement}) => <div>{children}</div>,
    input: StylesPanel,
  },
  options: {
    title: 'Theme',
    fields: [],
  },
  fields: [
    {
      name: 'void',
      title: 'Void',
      type: 'string',
    },
  ],
}

export default schema
