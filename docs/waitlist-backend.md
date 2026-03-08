# Waitlist Backend — Supabase Integration

## Overview

When a user submits the waitlist form, the data is persisted to a **Supabase** (PostgreSQL) database via a Next.js API route. The request is made **server-side** — the client never talks to Supabase directly, and no database credentials are ever exposed to the browser.

---

## Architecture

```
Browser (client)
    │
    │  POST /api/waitlist  (JSON body)
    ▼
Next.js API Route  ─── Prisma ORM ───► Supabase (PostgreSQL)
    │
    └── Resend ───► Confirmation email to user
```

---

## Data Flow

1. The user fills out the waitlist form on `/waitlist`.
2. The form submits a `POST` request to `/api/waitlist` with a JSON body.
3. The API route (server-side) validates the payload using **Zod**, then writes to Supabase via **Prisma**.
4. On success, a confirmation email is sent via **Resend**.
5. The route returns `{ ok: true }` (201) or a structured error code.

---

## TypeScript Payload

The shape of the request body is defined and validated in [`lib/waitlist.ts`](../lib/waitlist.ts):

```ts
import { z } from "zod"

export const waitlistSchema = z.object({
  fullName:  z.string().trim().min(2).max(80),
  workEmail: z.string().trim().email(),
  company:   z.string().trim().min(2).max(120),
  role:      z.string().trim().min(2).max(80),
  teamSize:  z.enum(["1-5", "6-20", "21-50", "51-200", "201+"]),
  useCase:   z.string().trim().min(30).max(500),
})

export type WaitlistPayload = z.infer<typeof waitlistSchema>
```

`WaitlistPayload` is the single source of truth used by both the form and the API route.

---

## Database Schema

Managed with **Prisma** and hosted on Supabase. See [`prisma/schema.prisma`](../prisma/schema.prisma).

| Column       | Type      | Constraints          |
|--------------|-----------|----------------------|
| `id`         | `String`  | PK, UUID, auto       |
| `full_name`  | `String`  | required             |
| `work_email` | `String`  | required, **UNIQUE** |
| `company`    | `String?` | optional             |
| `role`       | `String?` | optional             |
| `team_size`  | `String?` | optional             |
| `use_case`   | `String?` | optional             |
| `created_at` | `DateTime`| auto                 |
| `updated_at` | `DateTime?`| optional            |

The `UNIQUE` constraint on `work_email` enforces deduplication at the database level, eliminating race conditions that a pre-insert existence check cannot prevent.

---

## Security

| Concern | How it's addressed |
|---|---|
| **SQL injection** | Prisma uses parameterised queries — raw SQL is never constructed from user input |
| **Credential exposure** | The API route runs server-side only; `DATABASE_URL` and `RESEND_API_KEY` are never sent to the browser |
| **Input validation** | All fields are validated with Zod before touching the database; invalid payloads return `400` |
| **Duplicate submissions** | Rejected at DB level via the `UNIQUE` index on `work_email` (P2002 → `409 DUPLICATE_EMAIL`) |
| **API endpoint exposure** | `/api/waitlist` only accepts `POST`; no read or delete operations are exposed |

---

## Environment Variables

```env
# .env.local
DATABASE_URL="postgresql://..."   # Supabase pooler URL (used by Prisma at runtime)
DIRECT_URL="postgresql://..."     # Supabase direct URL (used by Prisma for migrations)
RESEND_API_KEY="re_..."           # Resend API key for confirmation emails
```

---

## Applying Schema Changes

```bash
npm run prisma:push
```

This syncs the Prisma schema to the Supabase database. Run this whenever `prisma/schema.prisma` changes.
