import { LinkableSchemaName, LINKABLE_SCHEMAS } from "../../../types.sanity";

export const getLinkableTypes = (): { type: LinkableSchemaName }[] =>
  Object.keys(LINKABLE_SCHEMAS).map((type: LinkableSchemaName) => ({ type }));
