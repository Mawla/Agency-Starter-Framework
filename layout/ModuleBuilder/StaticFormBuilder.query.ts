import { richTextQuery } from "../../components/portabletext/portabletext.query";

export const staticFormQuery = `
form->{
  name,
  formId,
  success[] ${richTextQuery},
  error[] ${richTextQuery},
  options
}`;
