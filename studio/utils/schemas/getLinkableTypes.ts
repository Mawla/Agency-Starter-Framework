import { LinkableSchemaName, LINKABLE_SCHEMAS } from "../../../types.sanity";

export const getLinkableTypes = (): { type: LinkableSchemaName }[] =>
  (Object.keys(LINKABLE_SCHEMAS) as LinkableSchemaName[]).map(
    (type: LinkableSchemaName) => ({ type })
  );
