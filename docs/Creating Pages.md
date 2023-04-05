## Steps to create a new page

Run this script:

```bash
yarn create-page
```

Typically you'd create an overview of something and a detail. This is a two-step action:

Create the overview:

```bash
> yarn create-page
> What is name of the page? blogs
> Is it a singleton? (Y/n) Y
> Add to desk structure? (Y/n) Y
```

Create the detail:

```bash
> yarn create-page
> What is name of the page? blog
> Is it a singleton? (Y/n) n
> If it has a parent, what is its type? (e.g `page.xxx`) page.blogs
> Add to desk structure? (Y/n) Y
```

or by hand:

- Create basic schema in `/studio/schemas/documents`. Be sure to follow the naming convention `page.lowercaseblockname`
  a. Set initial values where necessary
  b. Uppercase the title
  c. Use correct type (document or object)
  d. Add an icon from teenyicons.com to studio/utils/desk/DocumentIcon.tsx
  e. Use fieldsets to keep the interface tidy
- Add the schema name to `/studio/schemas/schemas.ts`
  a. Import it
  b. Add it to the `createSchema.types` array
  c. Sort both alphabetically
- Add the schema name to types `/types.sanity.ts`
  a. Add in `SCHEMAS[]`
  b. Add to `LINKABLE_SCHEMAS[]`
  c. Sort both alphabetically
- Add a query in queries/sitemap.ts
- Add to Sanity desk structure
