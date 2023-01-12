import richTextBasicSchema from '../objects/richtext.basic';

export default {
  name: 'richtext.simple',
  title: 'Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      title: 'Rich text',
      styles: [],
      lists: [],
      marks: {
        decorators: [...richTextBasicSchema.of[0].marks.decorators],
        annotations: [...richTextBasicSchema.of[0].marks.annotations],
      },
    },
  ],
};
