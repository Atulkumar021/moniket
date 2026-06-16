# Moniket Technologies — Next.js

Infrastructure / DevOps / SecOps consultancy site **and** admin panel, rebuilt from the
original HTML mockup as a **Next.js 14 (App Router) + TypeScript** app with a **Next.js API
backend** and a **JSON file data store**.

## Run it

```bash
npm install      # already done
npm run dev      # http://localhost:3000   (hot reload)
# or
npm run build && npm start
```

The website content manager uses the MongoDB CMS in `server/`.

```bash
copy .env.example .env.local
cd server
copy .env.example .env
npm install
npm run seed
npm run dev
```

MongoDB must be available at `MONGO_URI` before running `npm run seed`. The Next.js website reads
published sections and navigation from `NEXT_PUBLIC_CMS_API_URL`. The admin **Website Content**
screen writes to the same collections, so published changes appear without changing the public UI.

- Public site: <http://localhost:3000>
- Admin panel: <http://localhost:3000/admin> — demo login, **any credentials work**
  (the form is pre-filled with `manish@moniket.tech` / `demo`).

## How it's structured

```
app/
  page.tsx                 Home (hero, services, tracks, toolbox, about, blog/tutorial previews, FAQ, contact)
  blog/ , tutorials/       List + [id] article pages
  tracks/[domain]/         Guides filtered by learning-track domain
  admin/                   Admin SPA entry (renders components/admin/AdminApp)
  api/                     Backend — see below
components/                SiteHeader/Footer, Toolbox, Faq, LeadForm, ArticleCard/List/Body, admin/AdminApp
lib/
  store.ts                 JSON file store (read/write/mutate)  ->  data/store.json
  queries.ts               Server-side read helpers for public pages
  data/                    Seed data: 74 tools, 10 domains, 20 articles, leads/subs/settings/analytics
  types.ts
data/store.json            Auto-created on first run from the seed (git-ignored)
```

## API (backend in `app/api`)

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/auth/login` | Demo sign-in (accepts anything) |
| GET / POST | `/api/leads` | List leads / create from the contact form |
| PATCH / DELETE | `/api/leads/[id]` | Update status / delete |
| GET / POST | `/api/blogs` | List / create blog posts |
| PATCH / DELETE | `/api/blogs/[id]` | Edit, toggle publish, delete |
| GET | `/api/tutorials` | List tutorials |
| GET / POST | `/api/subscribers` | Newsletter subscribers |
| GET / PUT | `/api/settings` | Site settings |
| GET | `/api/stats` | Computed dashboard/analytics figures |

All writes persist to `data/store.json`, so admin edits (new posts, publish toggles, lead
status, settings) survive restarts **and show up on the public site** — public pages read the
same store and are rendered dynamically. Delete `data/store.json` to reset to the seed.

## Design

Soft-blue palette and tokens ported into `app/globals.css`; fonts are Plus Jakarta Sans +
JetBrains Mono via `next/font`. Interactivity (toolbox search/filter, FAQ accordion, lead form,
code-copy buttons, reveal-on-scroll, the whole admin) is in client components; everything else
is server-rendered.
