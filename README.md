# SoftenerIndex

Hard water, fair prices, local pros — not a door-to-door quote.

SoftenerIndex is an Astro static site: an editorial hard-water / water-softener directory published by **Bob Molina**. It is not a dealership and not a door-to-door funnel.

## Pages

| Path | What it is |
| --- | --- |
| `/` | Home |
| `/guides/water-softener-cost-2026` | Water Softener Cost 2026 fair quote guide |
| `/guides/how-to-read-a-dealer-quote` | How to read a dealer quote |
| `/guides/salt-based-vs-salt-free` | Salt-based vs salt-free |
| `/cities/phoenix-az` | Phoenix, AZ city / installers file |
| `/methodology` | Numbers policy |
| `/disclosure` | FTC affiliate disclosure |
| `/go/<slug>` | Affiliate hops (placeholders until `status: live`) |

Shortcuts: `/cost`, `/quote`, `/salt`, `/phoenix`.

## Rule: never invent numbers

Do not invent **hardness**, **installer**, or **price** figures — not in Markdown body copy, not in frontmatter, not in UI fallbacks.

- If a number is not copied from a named document on a named date, **omit the field**.
- Empty sourced-figure boxes on city and cost pages are intentional.
- Installer cards render only when `listed: true` **and** `source_url` + `verified_on` are set.

Templates for allowed keys live in [`src/content/_templates/`](src/content/_templates/).

## Markdown content collections

Collections are defined in [`src/content.config.ts`](src/content.config.ts):

| Collection | Directory | Use |
| --- | --- | --- |
| `guides` | `src/content/guides/` | Longform editorial |
| `cities` | `src/content/cities/` | City dossiers |
| `installers` | `src/content/installers/` | One file per verified company |
| `affiliates` | `src/content/affiliates/` | `/go` hop metadata |

## Nightly frontmatter workflow

Run this as a checklist, not as a writing exercise. The job is to **copy and date**, or to **leave fields blank**.

1. **Pull latest sources**
   - Cities: open the municipal water-quality / CCR URL already stored as `ccr_url` (or find the current official PDF/HTML).
   - Installers: open the state license lookup already stored as `license_lookup_url` on the city file.
   - Prices: only if you have a *document* (public filing, dated invoice you are allowed to cite, or a published dataset). Kitchen-table memory does not count.

2. **Update city frontmatter** (`src/content/cities/*.md`)
   - Set `hardness_gpg` **or** `hardness_ppm` only if the report prints that figure.
   - Set `hardness_source_url` to the exact report URL (prefer a dated PDF).
   - Set `hardness_verified_on` to today’s date (ISO `YYYY-MM-DD`).
   - If the report is missing, paywalled, or ambiguous, **delete** hardness keys rather than interpolating a typical value.
   - Refresh `updated` when you touch the file.

3. **Update installer files** (`src/content/installers/*.md`)
   - Create files from `_templates/installer.md`.
   - Copy `license_number`, legal name, and (if published) address/phone/website from the lookup or the company’s own site.
   - Set `source_url` and `verified_on`.
   - Set `listed: true` only when those fields are present and the license is active for the work described.
   - Never add star ratings, review counts, or “from $X installed.”
   - If a listing cannot be re-verified tonight, set `listed: false` or delete the file.

4. **Update price fields on the cost guide** (only when citing)
   - `published_price_low` / `published_price_high` / `price_currency` / `price_unit`
   - `price_source_url` / `price_verified_on` / `price_notes`
   - If you cannot point to a document, leave every price key off. Do not round a remembered range into the body copy either.

5. **Affiliate hops** (`src/content/affiliates/*.md`)
   - Keep `status: placeholder` until a real destination exists.
   - Live hops require `destination` (enforced by schema).
   - Do not use a hop to smuggle a fake price or a fake hardness claim.

6. **Build**
   ```bash
   npm ci
   npm run build
   ```
   Fix schema errors. Do not weaken the schema to let an unsourced number through.

7. **Ship**
   Commit only the frontmatter (and body sentences that quote the source). The commit message should name the source date, e.g. `Verify Phoenix CCR hardness, 2026-09-04`.

Suggested cadence: one pass per night when reports or licenses may have changed; skip the pass rather than filling gaps.

## Affiliate `/go` placeholders and FTC disclosure

In-content CTAs point at `/go/water-test-kit`, `/go/local-installer-match`, and `/go/salt-delivery`. Those routes render a non-redirecting placeholder until frontmatter is `status: live`. Every page carries a disclosure banner; the full notice is at `/disclosure`.

## Develop

```bash
npm install
npm run dev
```

Production build (required to succeed):

```bash
npm run build
```

Preview the static output:

```bash
npm run preview
```

Requires Node 22+. Default `site` in `astro.config.mjs` is `https://softenerindex.com` (canonical URLs and sitemap). Change it if the production host differs.
