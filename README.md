# nexjts-supabase-todo-app

This project is a comprehensive demonstration of integrating Next.js with Supabase, Clerk, and Material UI to create a robust TODO application. It showcases CRUD operations, authentication, and a modern UI design.

![Todo App View](<todos-page-ss.png>)


## Overview

In this tutorial we will build a CRUD application by combining three major technologies. We will use Clerk for Auth, Supabase for database and Nextjs as a framework.
You will also learn in this guide:
 - How to create Route Handler with Nextjs 14 App Router?
 - How to set up Auth system with Clerk?
 - How to establish Supabase connection with JWT token?

For a detailed guide to this project: ['Todo App Guide with Nextjs 14, Clerk and Supabase'](https://alitunacanonar.medium.com/todo-app-guide-with-nextjs-14-clerk-and-supabase-95f5f17225d3)

## Features

- **CRUD Operations**: Create, read, update, and delete your TODOs.
- **Authentication**: Secure user authentication using Clerk.
- **Database**: Supabase integration for backend storage.
- **UI**: Sleek user interface with Material UI.

## Getting Started

- Node.js
- npm or yarn
- Clerk and Supabase installations must be done, there must be api keys in the .env.local file.

Clone the repository:

```bash
git clone https://github.com/Ali-Onar/nextjs-supabase-todo-app.git
 ```

Install dependencies:

```bash
npm install
# or
yarn install
```
Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
