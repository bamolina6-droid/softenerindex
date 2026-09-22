---
title: "Dallas–Fort Worth, Texas water softeners and installers"
description: "DFW hard-water context from Fort Worth’s published hardness ranges and Dallas Water Utilities reports, plus Texas plumbing-license research rules. SoftenerIndex leaves numeric hardness and dealer rosters blank until a single sourced figure or license row can be attached."
city: Dallas-Fort Worth
state: Texas
stateAbbr: TX
published: 2026-09-06
lastVerified: 2026-09-06
listingStatus: research
hardnessNote: "Dallas–Fort Worth is a multi-utility metro. SoftenerIndex does not publish a single grains-per-gallon or mg/L figure for the whole metro. Fort Worth Water’s 2025 Water Quality Report (secondary constituents) lists Total Hardness as CaCO3 at 108 to 150 ppm and Total Hardness in grains at 6 to 9 grains/gallon — a range, not one set-point SoftenerIndex can put in the data box. Dallas Water Utilities’ current Consumer Confidence Report materials on the city’s water-quality reports page do not state a hardness number SoftenerIndex can cite as a single frontmatter value. Start with your utility’s current CCR, then test the tap before you size resin."
installerSources:
  - name: Texas State Board of Plumbing Examiners
    url: https://tsbpe.texas.gov/
    retrieved: 2026-09-06
    notes: State licensing authority for plumbers. Use Find a License / Public License Search from the TSBPE site. Not a SoftenerIndex endorsement list.
  - name: TSBPE Public License Search (how-to)
    url: https://tsbpe.texas.gov/wp-content/uploads/2023/05/TSBPE_HowTo_PublicLicenseSearch.pdf
    retrieved: 2026-09-06
    notes: Official how-to for the public license search (name or license number). Status changes; look it up at bid time.
installers: []
sources:
  - name: Fort Worth Water — Water Quality Reports (2025 WQR)
    url: https://www.fortworthtexas.gov/departments/water/water-quality
    retrieved: 2026-09-06
    notes: Official Fort Worth Water quality reports hub. 2025 interactive/PDF report includes secondary constituents Total Hardness as CaCO3 108–150 ppm and Total Hardness in grains 6–9 gpg (ranges). Direct PDF also linked from that page as 2025 Water Quality Report.
  - name: Fort Worth 2025 Water Quality Report (PDF)
    url: https://www.fortworthtexas.gov/files/assets/public/v/1/water/documents/drinking-water/wqr/2025-wqr_web.pdf
    retrieved: 2026-09-06
    notes: Primary Fort Worth hardness range source (secondary constituents table). Do not collapse the range into a fake citywide average.
  - name: Dallas Water Utilities — Drinking Water Quality Reports
    url: https://dallascityhall.com/departments/waterutilities/Pages/water_quality_reports.aspx
    retrieved: 2026-09-06
    notes: Official index of Dallas Consumer Confidence / Water Quality Reports (2025 and prior years). SoftenerIndex reviewed the 2024 English report PDF and did not find a hardness table SoftenerIndex can attach as hardnessGpg/hardnessMgL.
  - name: City of Dallas Water Quality Report 2024 (PDF)
    url: https://dallascityhall.com/departments/waterutilities/Documents/COD25-WQR2024-Report-ENG-Final.pdf
    retrieved: 2026-09-06
    notes: Current-cycle Dallas CCR PDF linked from the city’s reports page. Contaminant tables reviewed; no SoftenerIndex hardness number attached.
  - name: Texas State Board of Plumbing Examiners
    url: https://tsbpe.texas.gov/
    retrieved: 2026-09-06
    notes: Verify anyone who cuts into your plumbing is a licensed Texas plumber. License status changes; look it up at bid time.
relatedGuides:
  - water-softener-cost-2026
  - how-to-read-a-dealer-quote
  - salt-based-vs-salt-free
affiliateOffers:
  - home-water-test
  - compare-local-quotes
---

Dallas–Fort Worth is SoftenerIndex’s Texas metro page: a sprawling housing market where scale on fixtures, spotted glass, and softener pitches show up in ordinary home talk — and where **which utility serves your address** matters more than a blog’s “DFW is X grains” claim. That is not a SoftenerIndex hardness number, installer count, or market price. Numeric hardness and installer rows stay empty until the nightly frontmatter workflow can point at a primary source that fits the schema.

## Listing status: research

This page is in `research` status. The `installers` array in frontmatter is empty on purpose. We will not invent a “top Dallas water softener companies” list, scrape map-pack directories, or guess how many dealers serve the metroplex.

When a licensed plumber or plumbing company is added, each row must include a name and the Texas State Board of Plumbing Examiners (TSBPE) public lookup it was verified against. Until then, treat every door-to-door pitch as unverified.

## Hardness: what SoftenerIndex will and will not publish

DFW is **multi-utility**. Dallas Water Utilities, Fort Worth Water, and dozens of suburb systems treat different source mixes. A number from one city is not a metro set-point.

**Fort Worth Water** publishes hardness as a **range** in the secondary-constituents section of its [2025 Water Quality Report](https://www.fortworthtexas.gov/files/assets/public/v/1/water/documents/drinking-water/wqr/2025-wqr_web.pdf) (also linked from the [Fort Worth water-quality reports page](https://www.fortworthtexas.gov/departments/water/water-quality)):

- Total Hardness as CaCO₃: **108 to 150 ppm**
- Total Hardness in grains: **6 to 9 grains/gallon**

SoftenerIndex records that range in this page’s notes and sources. It does **not** put a single `hardnessGpg` / `hardnessMgL` in the data box, because the Zod schema (and the product rules) require a named single figure — not an average SoftenerIndex invents from a range.

**Dallas Water Utilities** publishes annual [Drinking Water Quality Reports](https://dallascityhall.com/departments/waterutilities/Pages/water_quality_reports.aspx). SoftenerIndex reviewed the [2024 English CCR PDF](https://dallascityhall.com/departments/waterutilities/Documents/COD25-WQR2024-Report-ENG-Final.pdf) and did not find a hardness table we can attach as frontmatter numbers. If a later Dallas report prints an explicit hardness figure SoftenerIndex can cite without guessing, the nightly workflow can add it with `hardnessSource`.

To get a number you can hand a dealer:

1. Confirm your retail water utility (Dallas, Fort Worth, or a suburb wholesaled from either).
2. Open that utility’s **current** Consumer Confidence / Water Quality Report.
3. If the document only gives a range or says “moderately hard,” do not convert adjectives into grains.
4. A test at your tap (titration kit or lab) is the figure that actually sizes a resin bed.

When we attach a single figure, it will appear in the data box with the source name, URL, and retrieved date. If that box still says “not sourced,” there is no SoftenerIndex metro hardness number.

## Finding an installer without a fake roster

Use the [Texas State Board of Plumbing Examiners](https://tsbpe.texas.gov/) public license tools (Find a License / Public License Search — see the [TSBPE how-to PDF](https://tsbpe.texas.gov/wp-content/uploads/2023/05/TSBPE_HowTo_PublicLicenseSearch.pdf)). Confirm:

- The legal name matches the quote.
- The license type covers the work (and any Responsible Master Plumber association for the company).
- The license is current on the day you sign.
- Local city registration or permits, if your suburb requires them on top of the state license.

Then run the quote through [How to read a dealer quote](/guides/how-to-read-a-dealer-quote). Demand brand, model, grain capacity, and a hardness input (your utility’s published range or your own test). Compare more than one written bid using the [2026 fair-quote guide](/guides/water-softener-cost-2026).

Door-to-door is common in hard-water markets. It is not a credential.

## Local questions that are not numbers

Ask DFW-area bidders things that do not require SoftenerIndex to invent data:

- Where will the tank sit (garage slab, closet, exterior), and what heat / freeze exposure does that imply in North Texas?
- How will regeneration reach a drain, and has the bidder confirmed local rules for brine discharge?
- Is the pitch salt-based ion exchange or a salt-free conditioner? Read [salt-based vs salt-free](/guides/salt-based-vs-salt-free) if the language is muddy.
- Who pulls any required permit for your city?

## What will change on this page

The nightly workflow (see the project README) re-checks `lastVerified`, sources, and whether a single hardness figure or installer row can be added **without guessing**. If nothing new is sourced, the page stays research and the date still moves. Blank fields are the product.
