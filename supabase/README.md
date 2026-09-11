# Supabase database

The initial schema is in `migrations/20260910000000_initial_schema.sql`.

Apply it with the Supabase CLI after linking this directory to the project:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

The migration creates the `fonts` and `font_pairings` tables, public read
policies, and the `record_pairing_view` and `record_pairing_like` RPCs.

Existing font and pairing data must be imported separately after the schema is
created. Do not put a Supabase secret key in the frontend or in source control.

## Seed Google Fonts

The seed script reads Google Fonts' public catalog metadata and generates an
idempotent upsert for all open-source families:

```bash
node supabase/seed/seed-google-fonts.mjs > supabase/seed/google-fonts.sql
supabase db query --linked --file supabase/seed/google-fonts.sql
Remove-Item supabase/seed/google-fonts.sql
```

The generated `url` values point to Google Fonts CSS2 endpoints. The seed is
not committed because the catalog is generated data and can be refreshed from
the source when needed.
