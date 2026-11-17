# Recall ↔ altioraai.com: beta "Join / Request" link-up

From: the Altiora website session (altioraai.com, Webflow, Alto assistant)
To: the Recall app session
Owner decisions are marked **Ask the owner**.

## The goal

On altioraai.com (Labs page button and the Alto assistant):

- While the Recall beta has places: show **Join the free beta**, linking straight to the Recall app sign-up.
- Once it is full: show **Request to join the beta**. This opens an email to hello@altioraai.com with the subject
  "Request to join the Recall beta" already filled in (the person writes the rest).
- The switch happens automatically, using the same limit Recall already enforces.

Recall already enforces the limit. `public.join_with_email` returns `{"error":"beta_full"}` once
`count(public.people) >= beta_settings.max_people`. Today max_people is 105 and 8 people have joined
(Supabase project `altiora-recall-test`, ref `sijjjhnqfldfnxhhzzdh`). The website just cannot see that state yet.

## What Recall needs to do

### 1. Add one public, read-only status function (new numbered migration)

Follow your own migration numbering and conventions; this is the shape the website will call:

```sql
-- Public beta status for altioraai.com. Reveals only open/full and places left, never any personal data.
alter table public.beta_settings add column if not exists join_url text;

create or replace function public.beta_status()
returns json
language sql
stable
security definer
set search_path = ''
as $$
  select json_build_object(
    'open',        (select count(*) from public.people) < coalesce(s.max_people, 2147483647),
    'places_left', greatest(coalesce(s.max_people, 0) - (select count(*) from public.people), 0),
    'join_url',    s.join_url
  )
  from public.beta_settings s
  where s.id;
$$;

revoke all on function public.beta_status() from public;
grant execute on function public.beta_status() to anon, authenticated;
```

Requirements:

- It must use **the same count and limit** as `join_with_email` (and `join_person`, if that path can still create
  people). If you change how places are counted, change both together so the website and the app never disagree.
- Return nothing else: no names, emails, ids or exact totals beyond `places_left`.
- `join_url` lets the owner change the sign-up link in one place without touching the website.
  **Ask the owner** which link to store: `https://altiora-recall.expo.app` today, or `https://recall.altioraai.com`
  once that domain exists. It is fine to leave it null for now; the website will fall back to the expo link.

### 2. Apply it to the database the live beta actually uses

**Ask the owner** to confirm that `altiora-recall-test` (`sijjjhnqfldfnxhhzzdh`) is the live beta database. If it is
not, apply the migration there instead and report the right project ref.

### 3. In the app: offer the request when the beta is full

Where the app handles `{"error":"beta_full"}`, add a button:
**Request to join the beta**, which opens
`mailto:hello@altioraai.com?subject=Request%20to%20join%20the%20Recall%20beta`
so the app and the website behave the same. Keep the existing calm wording.

### 4. Raising the limit later

No code change is needed: the owner (or you) updates `beta_settings.max_people`. Both the app and the website follow
it at once.

### 5. Test, then report back

- As an anonymous caller: `POST https://<ref>.supabase.co/rest/v1/rpc/beta_status` with header
  `apikey: <publishable/anon key>` and body `{}` returns `{"open":true,"places_left":97,"join_url":...}`.
- Temporarily set `max_people` to the current count and check that it returns `open:false`. Check also that
  `join_with_email` returns `beta_full` at the same moment. Then put the limit back.
- Confirm that an anonymous caller still cannot read `people`, `testers` or `beta_settings` directly.

When done, send the Altiora website session (`session_01G2WUD8VaKDXRLBaFbXFHsW`):

1. The project ref that runs the live beta.
2. That `beta_status()` is live and tested.
3. The publishable (anon) key the website may use. It is public by design; never send the service-role key.
4. The `join_url` you stored, if any.

## What the website will do (for your information)

- On page load and when Alto answers a Recall question, call `beta_status()`.
- `open:true`: "Join the free beta" goes to `join_url` (or `https://altiora-recall.expo.app`), plus "X places left"
  if the owner wants it shown.
- `open:false`, or the call fails or times out (3 seconds): "Request to join the beta" goes to the email above.
  Failing to "request" means nobody is ever sent to a sign-up that turns them away.
- All six site languages are covered.
