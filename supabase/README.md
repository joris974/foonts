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
