# Steps to create a new hero

Run this script:

```bash
yarn create-hero
```

or by hand:

Create the component in side `/heroes/ModuleName.tsx`.

- Create a hero file. Be sure to provide a memo'd export to be used in the builder. The memo is needed for the live preview in the cms. If the hero isn't memo'd there will be too many rerenders and the studio will freeze.
- Create a storybook file. Don't forget to add variants for things like background colors or columns.

- Create basic schema in `/studio/schemas/modules`. Be sure to follow the naming convention `hero.lowercasemodulename`
- Add the schema name to `/studio/schemas/schemas.ts`
  a. Import it
  b. Add it to the `createSchema.types` array
  c. Sort both alphabetically
- Add the schema name to types `/types.sanity.ts`
  a. Add in `SCHEMAS[]`
  b. Add to `HERO_SCHEMAS[]`
  c. Sort both alphabetically
- Add a query in queries/page.ts
- Add a renderer to layout/ModuleBuilder/HeroBuilder.tsx
