import { richTextQuery } from './richText';

export const staticFormQuery = `
->{
  name,
  formId,
  success[] ${richTextQuery},
  error[] ${richTextQuery},
  options
}`;
