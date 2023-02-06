import { richTextQuery } from "../../components/PortableText/PortableText.query";

export const staticFormQuery = `
form->{
  name,
  formId,
  success[] ${richTextQuery},
  error[] ${richTextQuery},
  options
}`;
