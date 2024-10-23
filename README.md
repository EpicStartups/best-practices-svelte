# how to build

## requirements

- docker && docker compose
- npm / pnpm / bun

## getting started

1. pnpm install (install dependencies)
2. pnpm run build-db (build db from docker compose)
3. npx drizzle-kit migrate (migrate empty db)
4. pnpm run studio (start drizzle studio)
5. open https://local.drizzle.studio (verify tables)
6. copy over env.local to .env (and fill in the missing blanks)
7. pnpm run dev (start dev server)
