import { EllipsisVerticalIcon } from '@sanity/icons';
import React from 'react';

import { SPACE_OPTIONS } from '../../../components/module/SpacingOptions';
import { MyModuleProps } from '../../../modules/MyModule/MyModule';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { optionsToList } from '../../utils/fields/optionsToList';
import { prefixWithLanguage } from '../../utils/language/prefix-with-language';

type SchemaType = SanitySchemaType & {
  type: 'object';
  fields: ({
    name: keyof MyModuleProps | 'language' | 'preset' | 'copyPaste';
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'MyModuleSchema',
  title: 'MyModuleTitle',
  type: 'object',
  icon: () => <DocumentIcon type="page" />,
  description: '/*DESCRIPTION*/',
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({ title = 'MyModuleTitle', language }) {
      return {
        title: title,
        subtitle: prefixWithLanguage(language),
      };
    },
  },
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'theme',
      title: 'Theme',
    },
    {
      name: 'language',
      title: 'Language',
    },
    {
      name: 'tools',
      title: ' ',
      icon: EllipsisVerticalIcon,
    },
  ],
  fields: [
    /*FIELDS*/
    {
      name: 'language',
      title: 'Language',
      type: 'language',
      group: 'language',
    },
    {
      name: 'preset',
      title: 'Preset',
      type: 'preset',
      group: 'tools',
    },
    {
      name: 'copyPaste',
      title: 'Copy Paste',
      type: 'copyPaste',
      group: 'tools',
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'styles',
      group: 'theme',
      options: {
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'color',
          },
          {
            name: 'text',
            title: 'Text',
            type: 'color',
          },
          {
            name: 'background',
            title: 'Background',
            type: 'color',
          },
          {
            name: 'space',
            title: 'Space',
            type: 'space',
            options: {
              list: optionsToList(SPACE_OPTIONS),
            },
          },
        ],
      },
    },
  ],
};

export default schema;
