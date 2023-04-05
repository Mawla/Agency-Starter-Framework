# Engine

## Stack

The Engine is built using these technologies:

- [Next.js](https://nextjs.org/) Frontend
- [Sanity.io](https://www.sanity.io/) CMS
- [GROQ](https://www.sanity.io/docs/overview-groq) Query Language
- [Storybook](https://storybook.js.org/) Static module development
- [Typescript](https://www.typescriptlang.org/) Javascript Type Checking
- [TailwindCSS](https://tailwindcss.com/) Interface styling
- [Sentry](https://getsentry.com/) Error tracking

Both the frontend app and the Sanity Studio are hosted on the same domain on vercel.

## CLI

The CLI is what speeds up all of the development work. Using the CLI you can add new modules, page types and dialogs without doing any coding. Once the initial setup is done you can confidently start styling and adding logic.

## Sitemap

Routes are at the core of the engine. The engines uses one catch all slug for all routes. All routes are directly resolved in the page query.

## Next.js

While Next.js is used as a framework, there is not much specific Next.js knowledge needed to get a project off the ground. Because we use a single catch all slug next.js page for all routes, there is no need to get into the page rendering logic unless you really want to.

## Previews

- Every page can be previewed before it's published.
- Each time preview mode is opened, a draft will be created, even if it's published.
- The sitemap, navigation, footer and site config aren't available in preview mode (yet). That's why there will be a preview missing for modules like the breadcrumb.

### Conventions

- Schema names are prefixed with their type: 'page._', 'module._', 'dialog.\_'.
- Article names are the single form of the type: 'page.blog', 'page.pressrelease'.
- Overview names are the plural form of the type: `page.blogs`, 'page.pressreleases'.
