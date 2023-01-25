import { EllipsisVerticalIcon } from '@sanity/icons';
import React from 'react';

import { BackgroundColorType } from '../../../components/module/BackgroundOptions';
import { MyHeroProps } from '../../../heroes/MyHero';
import { ColorType } from '../../../types';
import { SanityFieldType, SanitySchemaType } from '../../../types.sanity';
import { DocumentIcon } from '../../utils/DocumentIcon';
import { optionsToList } from '../../utils/fields/optionsToList';
import { prefixWithLanguage } from '../../utils/language/prefix-with-language';

type SchemaType = SanitySchemaType & {
  type: 'object';
  initialValue: {
    theme?: {
      title?: ColorType;
      text?: ColorType;
      background?: BackgroundColorType;
    };
  };
  fields: ({
    name: keyof MyHeroProps | 'language' | 'preset' | 'copyPaste';
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: 'MyHeroSchema',
  title: 'MyHero',
  type: 'object',
  icon: () => <DocumentIcon type="image" />,
  initialValue: {
    theme: {
      background: 'white',
      title: 'black',
      text: 'black',
    },
  },
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({ title, language }) {
      return {
        title: `${title}`,
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
      options: {
        updateField: 'hero',
      },
    },
    {
      name: 'copyPaste',
      title: 'Copy Paste',
      type: 'copyPaste',
      group: 'tools',
      options: {
        updateField: 'hero',
      },
    },
    /*FIELDS*/
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
        ],
      },
    },
  ],
};

export default schema;
