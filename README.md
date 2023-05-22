![logo](https://jornadayu.com/wp-content/uploads/2022/03/cropped-favicon-yu-32x32.png)

# T3-YU-STACK

## About

It uses [Turborepo](https://turborepo.org/) and contains:

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  └─ nextjs
      ├─ Next.js 13
      ├─ React 18
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition and authentication using clerk
 ├─ dayjs
 |   └─ Dayjs configured with various locales and extends
 ├─ config
 |   └─ Eslint - Tailwind
 ├─ validators
 |   └─ Zod validations shared between apps and api
 └─ prisma
     └─ typesafe db-calls using Prisma
```

> In this template, we use `@yu` as a placeholder for package names. As a user, you might want to replace it with your own organization or project name. You can use find-and-replace to change all the instances of `@yu/` to something like `@my-company/` / `@project-name/`.

## Quick Start

To get it running, follow the steps below:

### Requirements

- [Docker Compose](https://docs.docker.com/engine/install/)
- [Pnpm](https://pnpm.io/pt/installation)

### Setup dependencies

```diff
# Install dependencies
pnpm i

# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env
cp .env.test.example .env.test

# fill clerk variables
#
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# CLERK_SECRET_KEY
#
# ( https://clerk.com/ )

# Setup Prisma database
pnpm db-setup
```

### Development

**To run:**

```
pnpm dev
```

**To run unit tests:**

```
pnpm test
```

## Deployment

### Next.js

#### Prerequisites

_We do not recommend deploying a SQLite database on serverless environments since the data wouldn't be persisted. I provisioned a quick Postgresql database on [Railway](https://railway.app), but you can of course use any other database provider. Make sure the prisma schema is updated to use the correct database._

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com/). If you have ever deployed a Turborepo app there, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory and apply the following build settings:

<img width="927" alt="Vercel deployment settings" src="https://user-images.githubusercontent.com/11340449/201974887-b6403a32-5570-4ce6-b146-c486c0dbd244.png">

2. Add your `DATABASE_URL` environment variable.

3. Done! Your app should successfully deploy.

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).
