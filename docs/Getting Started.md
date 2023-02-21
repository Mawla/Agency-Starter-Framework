# Getting started

1. On Github click 'use this template' in the mawla-engine repository.
2. Connect the Github project in Vercel through the Vercel web interface. The first deployment will fail because it doesn't have env vars and it's not connected to Sentry.
3. Connect Sentry
   a. Allow access in the Vercel organisation integrations dialog.
   b. Connect Sentry project and Vercel project in https://sentry.io/settings/mawla/integrations/vercel/117885/

4. Follow the steps 👇

---

### Create project

```
npm install -g vercel
vercel link
yarn
npx sanity login
sh ./cli/setup.sh
sh ./cli/setup-env.sh
```

### Sanity: Add on demand Revalidation webhook

Add a webhook to `xxx.vercel.app/api/revalidate` on publish.

| field      | value                                 |
| ---------- | ------------------------------------- |
| name       | Next.js Revalidate                    |
| dataset    | production                            |
| url        | https://xxx.vercel.app/api/revalidate |
| trigger    | create + update + delete              |
| method     | post                                  |
| filter     | `_id match "page*"`                   |
| projection | `{ _id, _type, language }`            |
| secret     | .env SANITY_WEBHOOK_SECRET            |

### Sanity: Add redeploy hook

Redirects need a redeployment before they work:

Make

Add a webhook to `xxx.vercel.app/api/revalidate` on publish.

| field      | value                                 |
| ---------- | ------------------------------------- | --- | ----------------------- | --- | ---------------------------------- | --- | ------------------------ |
| name       | Next.js Revalidate                    |
| dataset    | production                            |
| url        | https://xxx.vercel.app/api/revalidate |
| trigger    | create + update + delete              |
| method     | post                                  |
| filter     | `\_type == 'redirect'                 |     | \_type match 'config\*' |     | \_type match '\_type:navigation\*' |     | \_type match 'footer\*'` |
| projection | `{ _id, _type }`                      |
| secret     | .env SANITY_WEBHOOK_SECRET            |

### Vercel: Add domains

Add `staging-xxx.vercel.app` (git branch 'staging') and `development-xxx.vercel.app` (git branch 'development') to the domains in Vercel https://vercel.com/mawla-team/xxx/settings/domains

---

## Run locally

Now you can run the project locally:

### Next.js frontend

First, run the development server:

```bash
> yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Sanity CMS interface

Run Sanity local server to see the for CMS UI

```bash
> yarn cms
```

### Storybook

Run storybook locally to start working on modules statically.

```bash
> yarn storybook
```

---

## Set up chromatic

Create a project on Chromatic to host Storybook there. Replace the `--project-token=xxx` token in package.json.

---

# Start building

Run `yarn dev`, `yarn cms` and `yarn storybook` in three terminal tabs and start building.

- load demo data `sanity dataset import ./development-demo.tar.gz development`
- add favicons in `public/favicon` using https://realfavicongenerator.com
- add navigation items in cms
- add footer items in cms
- add config data in cms
- configure colors in `colors.ts` and `tailwind.config.ts`
- start creating custom page types `yarn create-page`
- start creating modules `yarn create-module`
- start creating heroes `yarn create-hero`

Later

- start creating dialogs `yarn create-dialog`
- start creating forms `yarn create-form`
