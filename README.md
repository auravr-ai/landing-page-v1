## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase + Prisma Setup

This project writes waitlist entries through Prisma to Supabase Postgres.

1. In Supabase, open `Project Settings -> Database -> Connection string`.
2. Copy both URLs:
   - pooled connection (`6543`) for `DATABASE_URL`
   - direct connection (`5432`) for `DIRECT_URL` (used by Prisma schema changes)
3. Add to `.env.local`:

```bash
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
DIRECT_URL="postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres?sslmode=require"
```

Use your real database password from Supabase. Do not leave placeholders like `[YOUR-PASSWORD]`.

4. Run:

```bash
npm run prisma:generate
npm run prisma:push
```

These scripts load variables from `.env.local` automatically.

5. Start the app with `npm run dev`.

## Waitlist Table

Prisma model: `prisma/schema.prisma` (`Waitlist`, mapped to table `waitlist`).
