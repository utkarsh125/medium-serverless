# Serverless Blog Project

DEPLOYED ON: https://serverless-blog-seven.vercel.app/

Welcome to the **Serverless Blog Project**! This repository contains the source code and configuration for a highly scalable, serverless blog platform. The project uses modern technologies like Hono, Cloudflare Workers, Prisma Accelerate, and a custom package for shared types and schemas. The application is designed to be efficient, maintainable, and developer-friendly.

---

## Key Features

- **Serverless Architecture**: Powered by Cloudflare Workers for high availability and low latency.
- **Fast Development**: Uses Hono for a minimal and efficient backend framework.
- **Database Acceleration**: Prisma Accelerate optimizes database queries for performance.
- **Type Safety**: Shared Zod schemas and types ensure consistent validation and type safety across backend and frontend.
- **Custom Package**: A reusable package `@utkarsh125/blog-common` contains shared logic and types.

---

## Tech Stack

### Backend:
- **Hono**: A lightweight web framework for serverless environments.
- **Cloudflare Workers**: Serverless compute platform for globally distributed applications.

### Database:
- **Prisma Accelerate**: Enhances Prisma ORM for optimal performance in serverless environments.

### Shared Logic:
- **Zod**: For runtime validation and TypeScript schemas.
- **Custom Package**: Shared between backend and frontend via npm.

---

## Setup and Installation

### Prerequisites:
- Node.js v16+
- npm or Yarn
- Cloudflare account (for Workers setup)
- Postgres database (local or remote)

### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/serverless-blog.git
   cd serverless-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file at the root with the following:
   ```env
   DATABASE_URL="your-postgres-database-url"
   ```

4. Initialize Prisma:
   ```bash
   npx prisma db push
   ```

5. Install and build the shared package:
   ```bash
   cd common
   npm install
   npm run build
   cd ..
   ```

6. Deploy Cloudflare Workers:
   ```bash
   npm run deploy
   ```

---

## Folder Structure

```
medium-serverless/
├── common/               # Shared package (@utkarsh125/blog-common)
│   ├── schemas/          # Zod schemas for validation
│   ├── types/            # Shared TypeScript types
│   ├── package.json      # Package configuration
│   └── index.ts          # Package entry point
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma     # Database schema definition
├── src/                  # Source code for Cloudflare Workers
│   ├── routes/           # API routes
│   ├── middlewares/      # Hono middlewares
│   └── index.ts          # Entry point for the serverless application
├── package.json          # Root package configuration
├── .env                  # Environment variables
└── README.md             # Documentation
├── backend/... 
├── frontend/... 
```

---

## Deployment

### Local Development:
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application at `http://localhost:8787`.

### Production Deployment:
Use the following command to deploy to Cloudflare Workers:
```bash
npm run deploy
```

---

## API Endpoints

| Endpoint            | Method | Description               |
|---------------------|--------|---------------------------|
| `/blogs`            | GET    | Fetch all blog posts      |
| `/blog/:id`         | GET    | Fetch a single blog post  |
| `/publish`          | POST   | Create a new blog post    |
| `/blog/:id`         | PUT    | Update an existing post   |
| `/blog/:id`         | DELETE | Delete a blog post        |

---

Feel free to reach out!
utkarshpandey@gmail.com
