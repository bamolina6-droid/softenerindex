# SoftenerIndex

Hard water, fair prices, local pros — not a door-to-door quote.

SoftenerIndex is an Astro static site: an editorial hard-water / water-softener directory published by **Bob Molina**. Guides teach quote literacy. City pages hold sourced local facts or stay visibly empty. Affiliate partners are reserved under `/go` and labeled for FTC disclosure.

This is not a dealer website. `npm run build` emits HTML into `dist/`.

## Principles

- **Never invent hardness, installer, or price numbers.** If a figure is not in frontmatter with a named source, the page must not display one.
- **Research is a valid listing status.** An empty installer array is correct until a license lookup supports a row.
- **Affiliate URLs never live in article prose.** Articles reference collection IDs; `/go/[id]` is the only outbound hop.

## Pages

| Route | Source |
| --- | --- |
| `/` | Home |
| `/guides/water-softener-cost-2026` | `src/content/guides/water-softener-cost-2026.md` |
| `/guides/how-to-read-a-dealer-quote` | `src/content/guides/how-to-read-a-dealer-quote.md` |
| `/guides/salt-based-vs-salt-free` | `src/content/guides/salt-based-vs-salt-free.md` |
| `/guides/hardness-test-kits-vs-lab-tests` | `src/content/guides/hardness-test-kits-vs-lab-tests.md` |
| `/guides/well-water-softener-iron-filter` | `src/content/guides/well-water-softener-iron-filter.md` |
| `/guides/best-water-softeners-under-2000` | `src/content/guides/best-water-softeners-under-2000.md` |
| `/az/phoenix` | `src/content/cities/phoenix-az.md` |
| `/az/tucson` | `src/content/cities/tucson-az.md` |
| `/tx/dallas-fort-worth` | `src/content/cities/dallas-fort-worth-tx.md` |
| `/co/denver` | `src/content/cities/denver-co.md` |
| `/nm/albuquerque` | `src/content/cities/albuquerque-nm.md` |
| `/ok/oklahoma-city` | `src/content/cities/oklahoma-city-ok.md` |
| `/nv/las-vegas` | `src/content/cities/las-vegas-nv.md` |
| `/in/indianapolis` | `src/content/cities/indianapolis-in.md` |
| `/go/home-water-test`, `/go/compare-local-quotes` | `src/content/affiliates/*.md` |
| `/disclosure` | FTC advertising disclosure |
| `/methodology` | Public version of the data rules |

## Markdown collections

Defined in `src/content.config.ts`:

| Collection | Folder | Purpose |
| --- | --- | --- |
| `guides` | `src/content/guides/` | Evergreen articles |
| `cities` | `src/content/cities/` | City / installer pages |
| `affiliates` | `src/content/affiliates/` | `/go` destinations |

The Zod schema **rejects** `hardnessGpg` or `hardnessMgL` without `hardnessSource`, and rejects `listingStatus: listed` with an empty `installers` array. There is no price field on purpose.

## Nightly frontmatter workflow

Run this as a human checklist or as an agent job against the Markdown files. The point is to refresh **metadata**, not to invent copy so the page looks “done.”

### 1. Open the city files

For each file in `src/content/cities/`:

1. Open every URL in `sources` and `installerSources`.
2. Confirm the page still exists. If a URL moved, update `url` and say so in `notes`.
3. Set `lastVerified` to today’s UTC date **even if nothing else changed**. That date means “we looked,” not “we found a number.”

### 2. Hardness (optional fields only)

Only fill `hardnessGpg` and/or `hardnessMgL` when the **current** utility document prints that figure for a stated area or system.

Required companion object:

```yaml
hardnessSource:
  name: City of Phoenix Water Quality report (example)
  url: https://www.example.com/the-actual-pdf-or-html
  retrieved: YYYY-MM-DD
  notes: Quote the table title and units. Note if the figure is system-wide vs a sample site.
```

Rules:

- Do not convert “hard” / “very hard” into grains.
- Do not reuse last year’s number if this year’s report is out.
- Do not average sample sites into a fake citywide grain count unless the source itself publishes that average.
- If the report is ambiguous, leave the numeric fields absent and keep `hardnessNote` qualitative.
- `npm run build` must fail if a hardness number lands without `hardnessSource`.

### 3. Installers

Leave `installers: []` and `listingStatus: research` until each row can be tied to a public license record (Arizona: [ROC](https://roc.az.gov/)).

A legal row looks like:

```yaml
listingStatus: listed
installers:
  - name: Legal name as on the license
    licenseId: "ROC-000000"
    website: https://example.com
    sourceName: Arizona Registrar of Contractors
    notes: Looked up YYYY-MM-DD; not an endorsement.
```

Rules:

- No “top 10,” no ratings, no invented years in business.
- Map-pack and directory sites are not sources.
- Door-to-door brands still need a license row before they appear.
- Never add a count of installers except `installers.length` derived from this array.

### 4. Prices

Do not add price fields to city or guide frontmatter. If a future dataset exists, it needs its own collection with invoice-level sources — not a round range in a kicker.

### 5. Affiliates

In `src/content/affiliates/`:

- Keep `status: placeholder` and `destinationUrl` on `example.com` until a contract exists.
- When a partner goes live: set `status: live`, the real HTTPS URL, and refresh `disclosure`.
- Do not paste the vendor URL into Markdown articles; keep `affiliateOffers` as references.

### 6. Build gate

```sh
npm ci
npm run build
```

Schema errors are the workflow failing closed. Do not weaken `src/content.config.ts` to sneak a number through.

### 7. Suggested nightly order

1. Phoenix (and any later cities) `lastVerified` + source HEAD checks.
2. Hardness table, only if the document is explicit.
3. Installer license re-check for existing rows (drop revoked licenses).
4. Affiliate placeholder URLs still 200 on the interstitial page (they may 404 on example.com; that is OK).
5. Commit frontmatter-only changes with a message like `content: nightly verify Phoenix 2026-09-04`.

## Local development

Requires Node 22.12+.

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Disclosure

Affiliate placeholders and any future live `/go` links are disclosed in the footer, in affiliate modules, on each `/go` interstitial, and at `/disclosure`.