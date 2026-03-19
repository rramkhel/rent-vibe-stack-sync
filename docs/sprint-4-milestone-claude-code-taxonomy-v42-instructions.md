# Claude Code Instructions: Property Taxonomy v4.2 Presentation Site

## Overview

Build a multi-file static HTML/CSS/JS site that presents the RentSync property taxonomy v4.2 to internal PM stakeholders. This replaces the previous single-file `property-taxonomy-v4.html`. The site is a **communication tool** — it explains the taxonomy system, demonstrates how it works interactively, and provides full reference data. It is NOT a data dump; the spreadsheet serves that role.

**Deploy target:** This goes into the existing `rent-vibe-stack-sync` Vercel/GitHub repo, under a `/property-taxonomy/` directory (or whatever the existing path is — check the repo structure first).

**Audience:** Internal PMs, CPO, ILS Team Lead, Designer — people who need to understand what the taxonomy is, why it works this way, and what decisions still need input.

---

## File Structure

```
property-taxonomy/
├── index.html              ← Container: CSS design system, header, nav, tab shell, loads tab content
├── tabs/
│   ├── tab1-solution.html  ← Tab 1: The Solution (7 sections)
│   ├── tab2-builder.html   ← Tab 2: Interactive Listing Builder
│   ├── tab3-reference.html ← Tab 3: Full Reference (4 sub-tabs)
│   ├── tab4-metadata.html  ← Tab 4: Metadata (3 sub-tabs)
│   └── tab5-decisions.html ← Tab 5: Decisions & Open Questions
├── js/
│   ├── nav.js              ← Tab switching + sub-tab logic
│   ├── taxonomy-data.js    ← Complete TAXONOMY data model (shared)
│   ├── builder.js          ← Listing Builder interactive logic
│   └── community-demo.js   ← Community demo interactions (Tab 4)
└── css/
    └── styles.css          ← Complete design system
```

Tab content is loaded via fetch() and injected into tab panel divs. Load Tab 1 on page load; lazy-load others on first click.

---

## Design System

### CRITICAL: Preserve existing visual language
The existing `property-taxonomy-v4.html` file (in the repo) has a complete, working design system. **Preserve its visual language exactly** — the teal/slate palette, the badge system, the sentence formula styling, the platform cards, the data tables, the dimension cards. Do NOT redesign these components. Extract the CSS from that file as the starting point.

### Key CSS Variables
```css
:root {
  --teal: #0f766e; --teal-light: #ccfbf1; --teal-dark: #115e59;
  --dim-sector: #8b5cf6;       --dim-sector-light: #ede9fe;
  --dim-structure: #f59e0b;    --dim-structure-light: #fef3c7;
  --dim-subtype: #f97316;      --dim-subtype-light: #ffedd5;
  --dim-variant: #06b6d4;      --dim-variant-light: #cffafe;
  --dim-unit: #0f766e;         --dim-unit-light: #ccfbf1;
  --dim-transaction: #22c55e;  --dim-transaction-light: #dcfce7;
  --dim-purpose: #ec4899;      --dim-purpose-light: #fce7f3;
  --platform-ils: #22c55e;         --platform-ils-light: #dcfce7;
  --platform-enterprise: #0891b2;  --platform-enterprise-light: #cffafe;
  --platform-commercial: #d97706;  --platform-commercial-light: #fef3c7;
  --platform-mls: #8b5cf6;        --platform-mls-light: #ede9fe;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', 'Consolas', monospace;
}
```

Do NOT use Inter, Roboto, or generic AI-aesthetic fonts.

### 4 Callout Types (NEW — replaces old uniform callout)

The old site had 11 identical big colored callout blocks. v4.2 uses 4 distinct treatments:

**Type 1: Key Insight** `.callout-insight` (use 2-3 max across ENTIRE site)
- Full colored background, left border accent, prominent text
- For: "The Condo Problem — solved" (purple), "The Pattern" (teal)
```css
.callout-insight {
  background: var(--dim-sector-light); border: 1px solid var(--dim-sector-light);
  border-left: 3px solid var(--dim-sector);
  border-radius: 0 10px 10px 0; padding: 20px 24px; margin-bottom: 24px;
}
.callout-insight .callout-title { font-size: 14px; font-weight: 600; color: #6d28d9; margin-bottom: 8px; }
.callout-insight .callout-text { font-size: 14px; color: #5b21b6; line-height: 1.6; }
.callout-insight.teal { background: var(--teal-light); border-color: var(--teal-light); border-left-color: var(--teal); }
.callout-insight.teal .callout-title { color: var(--teal-dark); }
.callout-insight.teal .callout-text { color: var(--teal-dark); }
```

**Type 2: Inline Note** `.inline-note` (for technical clarifications)
- Subtle left border, no background, smaller text
- For: "Property Type is optional...", "Same model, same database...", "Platform mappings are configuration...", "Migration is deterministic"
```css
.inline-note {
  border-left: 2px solid var(--gray-300); padding: 12px 20px;
  margin-bottom: 20px; font-size: 13px; color: var(--gray-500); line-height: 1.6;
}
.inline-note strong { color: var(--gray-600); }
```

**Type 3: Comparison Cards** `.compare-grid > .compare-card` (side-by-side)
- Two compact cards in a row with colored top border
- For: Unit-First vs Structure-First path definitions

**Type 4: Compact Utility** `.utility-bar` (links, status banners)
- Single-line strip, minimal
- For: spreadsheet link, "What's Blocking Launch?"
```css
.utility-bar {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 20px; background: var(--gray-100); border-radius: 8px;
  font-size: 13px; color: var(--gray-600); margin-bottom: 24px;
}
.utility-bar a { color: var(--teal); font-weight: 600; }
.utility-bar.amber { background: var(--dim-structure-light); color: #92400e; }
```

### Other design principles
- Desktop-optimized, don't worry about mobile
- Clean, restrained, professional — not flashy
- No emojis in platform card headers (the old file had them, remove them)
- The property hierarchy tree is the ONE place where color earns its keep — use sector-colored backgrounds there
- No generic AI aesthetics

---

## Container: index.html

### Header
```html
<header class="site-header">
  <div class="site-logo">RS</div>
  <div>
    <div class="site-title">Property Classification System</div>
    <div class="site-subtitle">Universal Taxonomy for All Platforms</div>
  </div>
  <div class="site-version">v4.2 — Feb 2026</div>
</header>
```

### Navigation (5 tabs, sticky)
1. The Solution
2. Listing Builder
3. Full Reference
4. Metadata ← (was "Community & Metadata", now just "Metadata")
5. Decisions & Open Questions

### Tab panels
5 empty divs that get populated via fetch(). Tab 1 loads immediately. Others load on first click.
# Tab 1: The Solution (`tab1-solution.html`)

This is the narrative tab — it sells the model. 7 sections.

## Section 1: What We're Solving
Brief problem statement (2 short paragraphs, use `.section-intro` class):
- 47+ inconsistent property types across BSTK, RentSync, ILS, Spacelist
- "Apartment" means different things on different platforms
- Rooms/basements forced into building-level classifications
- No clean way to represent loft vs studio vs garden suite
- Solution: one canonical data model with 6 orthogonal dimensions + platform mapping layer. Store once, display everywhere.

## Section 2: The 6-Dimension Model

**6 dimension cards** in a row (grid-template-columns: repeat(6, 1fr)):

| # | Name | Color class | Count | Label |
|---|---|---|---|---|
| 1 | Sector | dim-sector (purple) | 4 | values |
| 2 | Property Type | dim-structure (amber) | 14 | types |
| 3 | Subtype | dim-subtype (orange) | 45+ | subtypes |
| 4 | Variant | dim-variant (cyan) | 15+ | styles |
| 5 | Unit Type | dim-unit (teal) | 11 | types |
| 6 | Transaction | dim-transaction (green) | 3 | types |

**Important:** There is NO Purpose card. Purpose is metadata, not a dimension.

**Subtitle callout:** "Purpose, Ownership, and Community live alongside the taxonomy as metadata — they describe context, not classification."

**Dimensions table** (inside a `.card` component):
Title: "The Six Dimensions" / Subtitle: "Think of them as questions we answer about each listing."

| Dimension (badge) | Question It Answers | Example Values | Required? |
|---|---|---|---|
| Sector (purple) | What broad category? | residential, commercial, recreation, other | Required |
| Property Type (amber) | What kind of property? | house, townhouse_plex, apartment_bldg, office, retail | Optional* |
| Subtype (orange) | What specific variation? | detached, mobile, cabin, low_rise, duplex, class_a | Optional |
| Variant (cyan) | What style or refinement? | loft, studio, penthouse, bachelor, bungalow | Optional |
| Unit Type (teal) | What are you listing? | apartment, basement, room, entire, suite, spot | Required |
| Transaction (green) | What's the deal? | rent, sale, lease | Required |

After the table, use an **Inline Note (Type 2):**
"**\* Property Type is optional for "unit-first" listings.** Some listings are defined by the unit, not the building. When someone lists "an apartment" or "a room for rent," they don't always know or care whether it's in a low-rise or high-rise. For these **unit-first** listings (apartment, basement, room, office, parking), Property Type is nullable — the unit type IS the classification. When the building info is known, it's stored as enrichment."

## Section 3: The Listing Sentence — Anatomy

**Lead with the full sentence** showing all 6 dimensions populated. Use the `.sentence-box` component with colored `.dim` badges:

```
A [Sector] [Property Type] [Subtype] [Variant] [Unit Type] for [Transaction]
```

Show the "perfect" example where every slot fills in:
```
A Residential House Detached Bungalow Basement for rent
```
Each word gets its dimension-colored badge. Below the sentence, show the metadata line in lighter italic text:
```
Residential · Rental · Standard
```

Then explain: "In practice, natural language collapses the redundant parts. The system stores the full canonical data; humans only say what's meaningful."

**Collapse patterns table** (in a `.card`):

| Scenario | What collapses | Sentence shape | Example |
|---|---|---|---|
| Unit-first, simple | Property Type, Subtype, Variant hidden | [unit type] for [transaction] | "Apartment for rent" |
| Unit-first + variant | Property Type, Subtype hidden | [variant] [unit type] for [transaction] | "Loft apartment for rent" |
| Structure-first, entire | Unit Type ("entire") hidden | [subtype] or [variant] for [transaction] | "Townhouse for rent" / "Bungalow for sale" |
| Structure-first, portion | Preposition joins unit to structure | [unit type] in/of/at [subtype] for [transaction] | "Suite in triplex for rent" |
| Accessory dwelling | Property Type hidden | [variant] [unit type] for [transaction] | "Garden suite for rent" |

## Section 3.5: Two Paths to a Listing

**Comparison Cards (Type 3):** Two cards side by side.

**Unit-First card** (teal top border):
- Header: "Unit-First" + badge "Property Type optional"
- Body: "'I'm listing an apartment' — the unit IS the product. Building details are background context."
- Badges: Apartment, Basement, Room, Office, Parking
- Example: "2BR apartment for rent" — renter doesn't care if it's low-rise or mid-rise

**Structure-First card** (amber top border):
- Header: "Structure-First" + badge "Property Type required"
- Body: "'I'm listing my house' — the building IS the product. Unit type tells you what portion."
- Badges: Entire, Main Floor, Suite, Floor, Spot
- Example: "3BR detached house for rent" — the house IS the listing

After the cards, **Inline Note (Type 2):**
"**Same model, same database — just two entry points.** Both paths store data in the same 6 dimensions. The only difference is whether Property Type is required (structure-first) or nullable (unit-first). When a unit-first listing does have building info — '2BR apartment in a mid-rise' — we store it as enrichment. Nothing is lost."

## Section 4: How It Works — 6 Examples

Each example is a `.card` with:
1. **Header:** The listing description as title + subtitle describing the pattern + badge (Unit-first or Structure-first)
2. **Collapsed sentence** in a `.sentence-box` with colored badges + metadata line below
3. **Two-column layout** (`.grid-2`): Left = Canonical Storage, Right = Platform Display

**Canonical Storage format:** Each dimension as a badge + value. After the 6 dimensions, add a dashed divider (`<hr class="meta-divider">`) then show Purpose and Ownership as metadata rows.

**Platform Display:** 4 platform cards stacked vertically:
- BSTK / RentSync (enterprise header)
- Rentals.ca / RentFaster (ils header)
- Spacelist (commercial header)
- MLS / Roomies (mls header)

### The 6 examples:

**Example 1: "Apartment for rent"** — Unit-first, most common
- Sentence: `[Apartment] for [rent]` / Meta: Residential · Rental
- Canonical: Sector=Residential, Property Type=null, Subtype=null, Variant=null, Unit Type=apartment, Transaction=rent, Purpose=standard, Ownership=rental
- BSTK: Property Type: Apartment / ILS: Property Type: Apartment / Spacelist: Not displayed (residential) / MLS: Maps to: Apartment

**Example 2: "Loft apartment for rent"** — Unit-first + variant
- Sentence: `[Loft] [apartment] for [rent]` / Meta: Residential · Rental
- Canonical: Sector=Residential, Property Type=apartment_bldg, Subtype=mid_rise, Variant=loft, Unit Type=apartment, Transaction=rent, Purpose=standard, Ownership=rental
- BSTK: Property Type: Apartment — Loft / ILS: Property Type: Apartment + Apt Type: "Loft" / Spacelist: Not displayed / MLS: Maps to: Apartment + loft tag

**Example 3: "Basement for rent"** — Unit-first, very common
- Sentence: `[Basement] for [rent]` / Meta: Residential · Rental · Student
- Canonical: Sector=Residential, Property Type=null, Subtype=null, Variant=null, Unit Type=basement, Transaction=rent, Purpose=student, Ownership=rental
- BSTK: Basement / ILS: Basement + Student Housing filter / Spacelist: Not displayed / MLS: Basement Unit

**Example 4: "Detached house for rent"** — Structure-first, entire
- Sentence: `[Detached] [house] for [rent]` / Meta: Residential · Rental
- Canonical: Sector=Residential, Property Type=house, Subtype=detached, Variant=null, Unit Type=entire, Transaction=rent, Purpose=standard, Ownership=freehold
- BSTK: House — Detached / ILS: House / Spacelist: Not displayed / MLS: Single Family Detached

**Example 5: "Bungalow for sale"** — Structure-first + variant, sale
- Sentence: `[Bungalow] for [sale]` / Meta: Residential · Freehold
- Canonical: Sector=Residential, Property Type=house, Subtype=detached, Variant=bungalow, Unit Type=entire, Transaction=sale, Purpose=standard, Ownership=freehold
- BSTK: House — Detached (Bungalow) / ILS: House, Transaction: Sale / Spacelist: Not displayed / MLS: Single Family Detached

**Example 6: "Class A office for lease"** — Commercial, structure-first, lease
- Sentence: `[Class A] [office] for [lease]` / Meta: Commercial · Corporate
- Canonical: Sector=Commercial, Property Type=office, Subtype=class_a, Variant=null, Unit Type=floor, Transaction=lease, Purpose=corporate, Ownership=leasehold
- BSTK: Office — Class A / ILS: Not displayed (commercial) / Spacelist: Office — Class A, Lease — Floor / MLS: Commercial Office

## Section 5: How Data Moves

Syndication diagram (centered layout):
- Top: "The Canonical System — Single Source of Truth — 6 Dimensions + Metadata" (teal box)
- Arrow: ↕
- Bottom: 5 platform boxes in a row:
  1. BSTK/RentSync (enterprise color) — ↕ bidirectional
  2. ILS Network / Rentals.ca, RentFaster (ils color) — ↓ outbound
  3. Spacelist / Commercial (commercial color) — ↓ outbound
  4. MLS (mls color) — → inbound
  5. Roomies (mls color) — → inbound

**Inline Note:** "**Platform mappings are configuration, not code.** Each platform has a mapping table that translates canonical values to its display vocabulary. When we acquire a new platform, we add a mapping table — we don't restructure the data model."

## Section 6: Cardinality & Uniqueness

Table in a `.card`:

| Dimension | Cardinality | Unique to parent? | Notes |
|---|---|---|---|
| Sector (purple badge) | 1:1 | — (top level) | |
| Property Type (amber badge) | 1:1 (nullable) | **Yes** (green) | Each type belongs to exactly one sector |
| Subtype (orange badge) | 1:1 | **Yes** (green) | Each subtype belongs to exactly one type |
| Variant (cyan badge) | 1:1 (nullable) | **No** (orange) | Variants can appear under multiple subtypes (e.g., Bachelor → Low/Mid/High Rise, Walk-up) |
| Unit Type (teal badge) | 1:1 | **No** (orange) | Unit types are valid across multiple property types |
| Transaction (green badge) | 1:1 | **No** (orange) | rent/sale/lease valid across property types |

**Inline Note:** "**What the uniqueness break at Variant means in practice:** when a renter searches for 'bachelor,' the system returns results across all Apt Bldg subtypes because Bachelor isn't unique to one subtype. This is intentional — variants describe style, and the same style can occur across different building sizes."

## Section 7: Backwards Compatibility

3 stat cards in a row:
- "1:1" — each old type has one canonical mapping
- "0" — data loss during migration
- "Other" — catch-all at every level for unrecognized values

**Inline Note:** "**Migration is deterministic.** Every existing property type (from BSTK, RentSync, ILS, Spacelist) has exactly one canonical mapping. 'Other' values at every level catch anything that doesn't map cleanly — this also future-proofs for new property types from acquisitions. Full migration table available in the reference spreadsheet."
# Tab 2: Interactive Listing Builder (`tab2-builder.html`)

The "aha moment" tool. Let someone build a listing and see how data flows. Demonstrates both classification and metadata.

## Layout
Two-column: Left (380px sticky sidebar) = Inputs. Right (flex) = Live output.

## Left Side: Inputs

### Path Selector
Two buttons: "Unit-First" (active by default, teal) and "Structure-First" (gray). Clicking switches which input fields are shown.

### Classification (the 6 dimensions)

**Unit-First path:**
1. Unit Type dropdown (required): optgroup "Self-sufficient (no building needed)" → Apartment, Basement, Room (Private), Room (Shared), Office Space, Parking
2. When unit selected, show checkbox: "Know the building type? (optional)"
3. If checked, show: Property Type dropdown (pre-populated based on unit's implied sector) → Subtype dropdown → Variant dropdown (if variants exist for selected subtype)

**Structure-First path:**
1. Sector dropdown (required): Residential, Commercial, Recreation, Other
2. Property Type dropdown (populates based on sector)
3. Subtype dropdown (populates based on property type)
4. Variant dropdown (populates based on subtype, only shows if variants exist)
5. Unit Type dropdown (populates valid unit types for the selected property type/subtype)

### Divider line

### Transaction Type dropdown: Rent, Sale, Lease

### Divider line (labeled "Metadata")

### Metadata section (NEW — was not in old builder)
- Purpose dropdown: Standard (default), Student, Senior, Military/Veteran, Corporate, Vacation, Short-Term
- Ownership dropdown: Rental (default), Freehold, Condo, Co-op, Leasehold, Lease-to-Own, Rent-to-Own
- Community toggle: Off by default. When toggled on, show a text input for community name.

## Right Side: Live Output (updates on every change)

### Section A: The Collapsed Sentence
A `.sentence-box` showing the natural-language sentence with colored dimension badges. Follows the collapse patterns from Tab 1. Below the sentence, show the metadata line in italic.

Updates live as selections change. When nothing is selected yet, show placeholder text.

### Section B: Canonical Storage (with Visual/JSON toggle)

Toggle buttons in the card header: [Visual] [JSON] — small pill toggle, Visual active by default.

**Visual view:**
Each dimension as a badge + value (same format as the examples in Tab 1). After the 6 dimensions, a dashed divider, then Purpose, Ownership, and Community as metadata rows. Null values shown in gray italic.

**JSON view:**
```json
{
  "sector": "residential",
  "property_type": "apartment_bldg",
  "subtype": "low_rise",
  "variant": "loft",
  "unit_type": "apartment",
  "transaction": "rent",
  "metadata": {
    "purpose": "student",
    "ownership": "rental",
    "community": null
  }
}
```
Dark background (gray-900), syntax-highlighted: keys in blue, string values in green, null in gray.

### Section C: Platform Display

4 platform cards in a 2x2 grid:
1. BSTK / RentSync (enterprise header)
2. Rentals.ca / RentFaster (ils header)
3. Spacelist (commercial header)
4. MLS / Roomies (mls header)

Each shows how the listing would display on that platform. Update live.

When Community is toggled on, the platform cards should show how the display changes (building bumped down, community becomes top-level).

When nothing is selected, each card shows "Select a listing type to see output" in gray italic.

## Data Model (taxonomy-data.js)

The TAXONOMY object needs to be updated from the old version. Key changes:

1. **Naming:** All references to "structure" in variable names should logically represent "property_type" but the JS object keys can stay as-is for simplicity — the labels are what matter.

2. **New entries to add:**
   - `bachelor` variant for Low Rise, Mid Rise, High Rise, Walk-up
   - `loft` variant for Walk-up (was missing, now intentionally included)
   - `cottage` variant for Cabin subtype
   - `manufactured` variant for Mobile subtype
   - `row_house` variant for Townhouse subtype
   - `other_res` property type under Residential (subtypes: office, parking, other_residential)
   - `other_commercial` property type under Commercial
   - `other_recreation` property type under Recreation
   - `other` entries at every level for Other subtypes
   - `specialty` property type under Other sector
   - `other_other` property type under Other sector (subdivision subtype)

3. **Full updated TAXONOMY object:**

```javascript
const TAXONOMY = {
  residential: {
    label: 'Residential',
    types: {
      house: {
        label: 'House',
        subtypes: {
          detached: { label: 'Detached', variants: ['bungalow','split_level','two_storey','garden_home'], unitTypes: ['entire','main_floor','suite','basement','room_private','room_shared'] },
          mobile: { label: 'Mobile', variants: ['manufactured'], unitTypes: ['entire'] },
          cabin: { label: 'Cabin', variants: ['cottage'], unitTypes: ['entire'] },
          house_other: { label: 'Other (House)', variants: ['garage_suite'], unitTypes: ['entire','main_floor','suite','basement','room_private','room_shared'] }
        }
      },
      townhouse_plex: {
        label: 'Townhouse / Plex',
        subtypes: {
          semi: { label: 'Semi-Detached', variants: [], unitTypes: ['entire','main_floor','suite','basement','room_private','room_shared'] },
          townhouse: { label: 'Townhouse', variants: ['row_house'], unitTypes: ['entire','main_floor','suite','basement','room_private','room_shared'] },
          duplex: { label: 'Duplex', variants: [], unitTypes: ['entire','suite','basement'] },
          triplex: { label: 'Triplex', variants: [], unitTypes: ['entire','suite','basement'] },
          fourplex: { label: 'Fourplex', variants: [], unitTypes: ['entire','suite','basement'] },
          multiplex: { label: 'Multiplex', variants: [], unitTypes: ['entire','suite','basement'] },
          tp_other: { label: 'Other (Townhouse/Plex)', variants: [], unitTypes: ['entire','suite','basement','room_private','room_shared'] }
        }
      },
      apartment_bldg: {
        label: 'Apartment Building',
        subtypes: {
          low_rise: { label: 'Low Rise (1-4 fl)', variants: ['loft','studio','penthouse','bachelor'], unitTypes: ['entire','suite','basement','apartment','room_private','room_shared'] },
          mid_rise: { label: 'Mid Rise (5-12 fl)', variants: ['loft','studio','penthouse','bachelor'], unitTypes: ['entire','suite','apartment','room_private','room_shared'] },
          high_rise: { label: 'High Rise (13+ fl)', variants: ['loft','studio','penthouse','bachelor'], unitTypes: ['entire','suite','apartment','room_private','room_shared'] },
          walkup: { label: 'Walk-up', variants: ['loft','studio','bachelor'], unitTypes: ['entire','suite','apartment','room_private','room_shared'] },
          apt_other: { label: 'Other (Apt Bldg)', variants: [], unitTypes: ['entire','suite','apartment','room_private','room_shared'] }
        }
      },
      other_res: {
        label: 'Other Residential',
        subtypes: {
          res_office: { label: 'Office', variants: [], unitTypes: ['office'] },
          res_parking: { label: 'Parking', variants: [], unitTypes: ['parking'] },
          res_other: { label: 'Other (Residential)', variants: [], unitTypes: ['entire'] }
        }
      }
    }
  },
  commercial: {
    label: 'Commercial',
    types: {
      office: {
        label: 'Office',
        subtypes: {
          class_a: { label: 'Class A', variants: [], unitTypes: ['entire','suite','floor','office'] },
          class_b: { label: 'Class B', variants: [], unitTypes: ['entire','suite','floor','office'] },
          class_c: { label: 'Class C', variants: [], unitTypes: ['entire','suite','floor','office'] },
          coworking: { label: 'Co-working', variants: ['desk'], unitTypes: ['suite','spot','office'] },
          office_other: { label: 'Other (Office)', variants: [], unitTypes: ['entire','suite','floor','office'] }
        }
      },
      retail: {
        label: 'Retail',
        subtypes: {
          storefront: { label: 'Storefront', variants: [], unitTypes: ['entire','suite'] },
          mall: { label: 'Mall / Shopping Ctr', variants: [], unitTypes: ['suite'] },
          strip_mall: { label: 'Strip Mall', variants: [], unitTypes: ['suite'] },
          retail_other: { label: 'Other (Retail)', variants: [], unitTypes: ['entire','suite'] }
        }
      },
      industrial: {
        label: 'Industrial',
        subtypes: {
          warehouse: { label: 'Warehouse', variants: [], unitTypes: ['entire','floor'] },
          manufacturing: { label: 'Manufacturing', variants: [], unitTypes: ['entire'] },
          flex: { label: 'Flex Space', variants: [], unitTypes: ['entire','suite'] },
          storage: { label: 'Storage Facility', variants: [], unitTypes: ['entire','suite'] },
          construction: { label: 'Construction / New Dev', variants: [], unitTypes: ['entire'] },
          industrial_other: { label: 'Other (Industrial)', variants: [], unitTypes: ['entire'] }
        }
      },
      parking_pty: {
        label: 'Parking',
        subtypes: {
          parking_garage: { label: 'Garage', variants: [], unitTypes: ['entire','floor','spot','parking'] },
          surface_lot: { label: 'Surface Lot', variants: [], unitTypes: ['entire','spot','parking'] },
          parking_other: { label: 'Other (Parking)', variants: [], unitTypes: ['entire','spot','parking'] }
        }
      },
      other_commercial: {
        label: 'Other Commercial',
        subtypes: {
          commercial_other: { label: 'Other (Commercial)', variants: [], unitTypes: ['entire'] }
        }
      }
    }
  },
  recreation: {
    label: 'Recreation',
    types: {
      hospitality: {
        label: 'Hospitality',
        subtypes: {
          hotel: { label: 'Hotel', variants: [], unitTypes: ['entire'] },
          motel: { label: 'Motel', variants: [], unitTypes: ['entire'] },
          bnb: { label: 'B&B', variants: [], unitTypes: ['entire'] },
          inn: { label: 'Inn', variants: [], unitTypes: ['entire'] },
          hospitality_other: { label: 'Other (Hospitality)', variants: [], unitTypes: ['entire'] }
        }
      },
      leisure: {
        label: 'Leisure',
        subtypes: {
          marina: { label: 'Marina', variants: [], unitTypes: ['spot'] },
          campground: { label: 'Campground', variants: [], unitTypes: ['spot'] },
          stable: { label: 'Stable', variants: [], unitTypes: ['spot'] },
          leisure_other: { label: 'Other (Leisure)', variants: [], unitTypes: ['spot'] }
        }
      },
      other_rec: {
        label: 'Other Recreation',
        subtypes: {
          rec_other: { label: 'Other (Recreation)', variants: [], unitTypes: ['entire'] }
        }
      }
    }
  },
  other: {
    label: 'Other',
    types: {
      land: {
        label: 'Land',
        subtypes: {
          agricultural: { label: 'Agricultural', variants: [], unitTypes: ['entire'] },
          acreage: { label: 'Acreage', variants: [], unitTypes: ['entire'] },
          vacant: { label: 'Vacant Lot', variants: [], unitTypes: ['entire'] },
          land_other: { label: 'Other (Land)', variants: [], unitTypes: ['entire'] }
        }
      },
      specialty: {
        label: 'Specialty',
        subtypes: {
          specialty_tbd: { label: 'TBD', variants: [], unitTypes: ['entire'] },
          specialty_other: { label: 'Other (Specialty)', variants: [], unitTypes: ['entire'] }
        }
      },
      other_other: {
        label: 'Other',
        subtypes: {
          subdivision: { label: 'Subdivision', variants: [], unitTypes: ['entire'] },
          other_other_other: { label: 'Other (Other)', variants: [], unitTypes: ['entire'] }
        }
      }
    }
  }
};

const SELF_SUFFICIENT = {
  apartment: { label: 'Apartment', sector: 'residential', impliedStruct: 'apartment_bldg' },
  basement: { label: 'Basement', sector: 'residential', impliedStruct: 'house' },
  room_private: { label: 'Room (Private)', sector: 'residential', impliedStruct: null },
  room_shared: { label: 'Room (Shared)', sector: 'residential', impliedStruct: null },
  office: { label: 'Office', sector: 'commercial', impliedStruct: 'office' },
  parking: { label: 'Parking', sector: 'commercial', impliedStruct: 'parking_pty' }
};

const UNIT_LABELS = {
  entire: 'Entire', main_floor: 'Main Floor', suite: 'Suite', basement: 'Basement',
  apartment: 'Apartment', room_private: 'Room (Private)', room_shared: 'Room (Shared)',
  office: 'Office', parking: 'Parking', floor: 'Floor', spot: 'Spot'
};

const VARIANT_LABELS = {
  loft: 'Loft', studio: 'Studio', penthouse: 'Penthouse', bachelor: 'Bachelor',
  bungalow: 'Bungalow', split_level: 'Split-level', two_storey: 'Two-storey',
  garden_home: 'Garden Home', garden_suite: 'Garden Suite', garage_suite: 'Garage Suite',
  cottage: 'Cottage', manufactured: 'Manufactured', row_house: 'Row House',
  desk: 'Desk'
};
```

### Sentence builder logic

The builder needs to construct the collapsed sentence based on current selections. Rules:

1. If unit-first with no variant: show just `[unit_type] for [transaction]`
2. If unit-first with variant: show `[variant] [unit_type] for [transaction]`
3. If structure-first with unit_type=entire and variant: show `[variant] for [transaction]`
4. If structure-first with unit_type=entire and no variant: show `[subtype] [property_type] for [transaction]` (but hide property_type if subtype alone is clear, e.g., "Townhouse" not "Townhouse Townhouse/Plex")
5. If structure-first with unit_type != entire: show `[unit_type] in [subtype] for [transaction]`

Metadata line below: show Sector + non-default Ownership + non-default Purpose. Skip "standard" purpose and "rental" ownership as they're implied defaults.

### Platform mapping logic
Port the `getPlatformDisplay()` function from the existing file. It works well — just needs the variable name updates for "property_type" instead of "structure".

### JSON output
Include metadata in the JSON:
```json
{
  "sector": "...",
  "property_type": "...",
  "subtype": "...",
  "variant": "...",
  "unit_type": "...",
  "transaction": "...",
  "metadata": {
    "purpose": "...",
    "ownership": "...",
    "community": null
  }
}
```
# Tab 3: Full Reference (`tab3-reference.html`)

Complete data for due diligence. 4 sub-tabs via floating pill bar.

## Sub-tab bar
Centered pill bar: Property Hierarchy | Unit Types | Transaction Types | Platform Mappings

## Sub-tab 1: Property Hierarchy

Complete tree for all 4 sectors. Use sector-colored header bars:
- Residential → purple bg (dim-sector-light)
- Commercial → orange bg (dim-subtype-light)
- Recreation → amber bg (dim-structure-light)
- Other → gray bg (gray-100)

Under each sector, show property types as bold rows, then subtypes indented with their variants in a third column. Use the tree data from taxonomy-data.js.

Format: 3-column grid rows: Subtype | Variant(s) | Notes

### Full hierarchy (from the spreadsheet):

**RESIDENTIAL**
- House: Detached (→ Bungalow, Split-level, Two-storey, Garden Home), Mobile (→ Manufactured), Cabin (→ Cottage), Other House (→ Garage Suite)
- Townhouse/Plex: Semi-Detached, Townhouse (→ Row House), Duplex, Triplex, Fourplex, Multiplex, Other T/P
- Apartment Building: Low Rise 1-4fl (→ Loft, Studio, Penthouse, Bachelor), Mid Rise 5-12fl (→ same), High Rise 13+fl (→ same), Walk-up (→ Loft, Studio, Bachelor), Other Apt Bldg
- Other Residential: Office, Parking, Other (backwards compat catch-all)

**COMMERCIAL**
- Office: Class A, B, C, Co-working (→ Desk variant), Other Office
- Retail: Storefront, Mall/Shopping Ctr, Strip Mall, Other Retail
- Industrial: Warehouse, Manufacturing, Flex Space, Storage, Construction/New Dev, Other Industrial
- Parking: Garage, Surface Lot, Other Parking
- Other Commercial

**RECREATION**
- Hospitality: Hotel, Motel, B&B, Inn, Other Hospitality
- Leisure: Marina, Campground, Stable, Other Leisure
- Other Recreation

**OTHER**
- Land: Agricultural, Acreage, Vacant Lot, Other Land
- Specialty: TBD, Other Specialty
- Other: Subdivision, Other

## Sub-tab 2: Unit Types

Validation matrix showing which unit types are valid per property type/subtype.

Two sections:
1. **Self-sufficient unit types** (apartment, basement, room_private, room_shared, office, parking) — these work without a property type. Show a simple table explaining each.
2. **Structure-dependent unit types** (entire, main_floor, suite, floor, spot) — show a matrix of property types x these unit types with ✓/✗.

Pull the validation data from the TAXONOMY data model (each subtype has a `unitTypes` array).

## Sub-tab 3: Transaction Types

Table showing Rent/Sale/Lease validity per property type. From the spreadsheet:

| Property Type | Subtype | Rent | Sale | Lease | Notes |
|---|---|---|---|---|---|
| **RESIDENTIAL (structure-first)** |
| House | All | ✓ | ✓ | ✗ | |
| Townhouse/Plex | All | ✓ | ✓ | ✗ | |
| Apartment Bldg | All | ✓ | ✗ | ✗ | Sale via condo ownership attr |
| **RESIDENTIAL (unit-first)** |
| (any) | Apartment | ✓ | ✓ | ✗ | |
| (any) | Basement | ✓ | ✗ | ✗ | |
| (any) | Room | ✓ | ✗ | ✗ | |
| **COMMERCIAL (structure-first)** |
| Office | Class A/B/C | ✓ | ✓ | ✓ | |
| Industrial | Construction | ✗ | ✓ | ✗ | Sale only (pre-sale) |
| Parking | Garage/Surface | ✗ | ✗ | ✓ | |
| Retail | All | ✗ | ✓ | ✓ | |
| Industrial | Warehouse/Mfg/Flex/Storage | ✗ | ✓ | ✓ | |
| **COMMERCIAL (unit-first)** |
| (any) | Office | ✓ | ✗ | ✓ | |
| Office | Co-working | ✓ | ✗ | ✓ | |
| (any) | Parking | ✓ | ✗ | ✓ | |
| **RECREATION** |
| Hospitality | All | ✗ | ✓ | ✓ | Sale/lease of property |
| Leisure | Marina/Campground/Stable | ✗ | ✗ | ✓ | Lease (spot) |
| **OTHER** |
| Land | All | ✗ | ✓ | ✓ | Sale or lease |
| Other | Subdivision | ✗ | ✓ | ✗ | Sale (development) |

## Sub-tab 4: Platform Mappings

Placeholder content for now — this will be filled in later. Show a placeholder box:
"Platform mapping rules — coming soon. The canonical-to-platform translation tables will be documented here."

## After sub-tabs: Spreadsheet link

**Utility Bar (Type 4):**
"📊 This page explains the system. For the full canonical data, validation rules, and platform mappings: [Link to Google Sheet — placeholder]"

---

# Tab 4: Metadata (`tab4-metadata.html`)

Everything that orbits the taxonomy but isn't a classification dimension. 3 sub-tabs.

## Sub-tab bar
Centered pill bar: Ownership | Purpose | Community

## Sub-tab 1: Ownership

### Intro text
"Ownership describes *how* a property is held — not what the building looks like. A detached house can be freehold, condo, or co-op. A unit in a high-rise can be a condo or a rental. Ownership is tracked as a separate attribute, not as part of the taxonomy."

### Key Insight callout (Type 1, purple) — THE CONDO PROBLEM
This is one of the 2-3 callouts in the entire site that gets the full treatment:

Title: "The 'Condo Problem' — solved"
Text: "In the old system, 'Condo' was a property type alongside 'Apartment' and 'House.' But a condo isn't a type of building — it's a legal ownership model. A condo unit can be in a high-rise, a townhouse, or a detached house. By separating ownership from structure, we stop conflating two different questions: 'what does the building look like?' and 'who owns it?'"

### Ownership table (in a card)
Title: "Ownership Values" / Subtitle: "One per property — tracked independently from all 6 taxonomy dimensions"

| Value | Code | Description | Example | ILS Impact |
|---|---|---|---|---|
| Freehold | freehold | Own the land and building | 3BR detached house | No special filter |
| Condo | condo | Own unit, share common areas | 1BR in high-rise | ILS shows 'Condo' as searchable filter |
| Co-op | coop | Own shares in corporation | Unit in co-op building | Potentially |
| Leasehold | leasehold | Own building, lease the land | Commercial property | No |
| Rental | rental | Renting, no ownership | Most ILS listings | No (default — implied) |
| Lease-to-Own | lease_to_own | Lease ending in ownership | Niche commercial | Maps to lease |
| Rent-to-Own | rent_to_own | Rent ending in ownership | Niche residential | Maps to rent |

## Sub-tab 2: Purpose

### Intro text
"Purpose describes the audience or use case of a listing, not what the property physically is. A basement apartment near campus is structurally identical whether it's listed as 'student' or 'standard.' Purpose is a filter and tag, not a classification axis."

### Purpose values table

| Value | Code | Description |
|---|---|---|
| Standard | standard | Default — general market |
| Student | student | Near campuses, student-friendly |
| Senior | senior | Senior living, 55+ |
| Military/Veteran | military_veteran | Military housing |
| Corporate | corporate | Corporate housing/relocation |
| Vacation | vacation | Vacation rental |
| Short-Term | short_term | Short-term rental |

## Sub-tab 3: Community

### Simple explanation
"Community is a display wrapper that groups multiple buildings under one brand name. It bumps the building down one level in the ILS search results — the community becomes the top-level card instead of individual buildings."

### Three wrapping examples (in a card)
Show 3 simple before/after examples:

1. **Condo building** → "Maple Heights" community wraps 2 condo buildings
2. **Apartment buildings** → "Riverside Gardens" community wraps 3 apt buildings
3. **Townhouses** → "Oakwood Commons" community wraps a row of townhouses

For each, show:
- Without community: [Building card] → [Units]
- With community: [Community card] → [Buildings] → [Units]

### Visual hierarchy (reuse from existing file)
The existing `property-taxonomy-v4.html` has great "Without Community" and "With Community" visual hierarchy diagrams. Reuse those — they're the stacked card layouts showing search result → buildings → units. Just update the text to reference 6 dimensions instead of 7.

### Brief note
"Open questions around community (mixed property types, billing, who creates) are being worked through separately."

Do NOT include the 6 detailed community open questions that were in the old version — those are being handled elsewhere.

Do NOT include a "What Community Is Not" section or a community syndication comparison table — keep it simple.

---

# Tab 5: Decisions & Open Questions (`tab5-decisions.html`)

## Section 1: Problems Solved & Tradeoffs

Title: "Problems Solved & Tradeoffs"
Subtitle: "The thinking behind the model. Each row is a real problem we hit and how v4.2 resolves it."

Table in a card (title: "10 Problems, 10 Solutions" + badge "All resolved in v4.2"):

| Problem | Solution | Rationale |
|---|---|---|
| "Apartment" was both a building type and a listing concept | Split: Apt Bldg = property type, Apartment = self-sufficient unit type | Renters search for "apartment," not "apartment building → mid rise → entire" |
| Loft/Studio were unit types but describe layouts, not portions | Moved to Property Variant | A loft is a style of apartment, not a portion of a building like "basement" |
| Garden Suite/Garage Suite were unit types but are accessory dwellings | Moved to Property Variant of House | They describe a secondary structure on the property, not a portion |
| Rooms don't care about building type | Room is self-sufficient — property type optional | Nobody listing a room cares if it's in a house or townhouse |
| Cabin/Cottage had its own Property Type for just 2 values | Merged as House subtypes | Physically standalone dwellings. Only 2 values doesn't justify top-level type |
| Some listings are "building-first," others "unit-first" | Unit Types split into self-sufficient vs structure-dependent | Same model — property type just becomes nullable |
| 47+ inconsistent property types across platforms | 6 orthogonal dimensions + platform mapping layer | Store canonically, display per-platform via configuration |
| Regional naming (cabin vs cottage, townhouse vs rowhouse) | Synonym groups concept (future) | Same thing for search, landlord picks their label |
| Purpose was a classification dimension but doesn't describe physical properties | Moved to metadata alongside Ownership | A basement is structurally identical whether "student" or "standard" |
| "Condo" was treated as a property type on some platforms | Condo is an Ownership value, not a property type | A condo can be in a high-rise, townhouse, or detached house |

### Key Insight callout (Type 1, teal) — THE PATTERN
Second of the 2-3 key insight callouts in the entire site:

Title: "The Pattern"
Text: "Most of these problems came from conflating different concepts into a single 'property type' field. The fix is always the same: separate the concepts into distinct dimensions, each answering one question. Property Type tells you what the building is. Unit Type tells you what you're renting. Variant tells you the style. They're orthogonal."

## Section 2: Open Questions

Title: "Open Questions"
Subtitle: "Items that need PM input before finalizing. Each includes a recommendation — flag anything you disagree with."

Summary stats: two cards side by side
- "11" — Open questions (teal bg)
- "3" — Categories (gray bg)

### Grouped by category:

**Category: Structure & Classification**

1. **Multiplex — subtype or container?**
   Options: A) Sibling subtype (standalone 5+ plex) / B) Parent container for all plexes
   Rec: A — standalone subtype. Keeps tree flat and predictable.
   Needs: Su, Steven

2. **Luxury — where does it live?**
   Options: A) Variant of Apt Bldg subtypes / B) Quality attribute on any structure / C) Remove
   Rec: B — attribute, not structural
   Needs: Product team

3. **Construction/New Dev — building type or lifecycle attribute?**
   Options: A) Keep under Industrial / B) Move to Other / C) Lifecycle attribute
   Rec: C — it's a state, not a building type. Parked under Industrial for now.
   Needs: Product team

4. **Specialty category — what goes here?**
   Rec: Keep as placeholder, define values as encountered.
   Needs: Pablo, Su

5. **'Other' at every level?**
   Options: A) Every dimension gets Other / B) Only Property Type + Subtype / C) Case by case
   Rec: A — needed for backwards compat + futureproofing
   Needs: Stan, dev team

**Category: Transaction & Lifecycle**

6. **Sublet — add back or keep removed?**
   Options: A) Add as Transaction Type / B) Keep removed / C) Purpose flag
   Rec: B — keep removed for now
   Needs: Pablo

7. **Lease-to-Own / Rent-to-Own — deprecate?**
   Options: A) Add as Transaction Types / B) Deprecate / C) Composite flag
   Rec: B — deprecate (low volume)
   Needs: Steven, data team

**Category: Ownership & Metadata**

8. **Co-op — where does it live?**
   Options: A) Ownership attribute (like Condo) / B) Purpose / C) Structure attribute
   Rec: A — ownership model
   Needs: Su

9. **Condo Association — deprecate or remap?**
   Options: A) Deprecate / B) Map to Community wrapper + ownership=condo
   Rec: A — unclear use case, likely legacy
   Needs: Su, Steven

10. **Purpose cardinality — 1:1 or 1:N?**
    Options: A) One purpose per listing / B) Multiple (e.g., Student + Short-Term)
    Rec: TBD — defer until Purpose is more fleshed out
    Needs: Product team

11. **Synonym implementation — how?**
    Options: A) Metadata on subtypes / B) Separate synonym table / C) Defer
    Rec: C — concept agreed, implementation deferred
    Needs: Dev team

### Each question card format:
- Card with title = question number + text
- Badge: "Needs sign-off" (amber) or "Needs PM input" (gray)
- Body: Brief context paragraph, option pills (A/B/C), recommendation in a teal-bg strip, "Needs input from: **Names**" at bottom

### After all questions:

**Utility Bar (Type 4, amber):**
"⚠️ None of these open questions block the taxonomy model itself. Questions 1, 2, 3, 4, 5 should be resolved before implementation begins. The rest can be addressed during migration mapping or deferred."
# Implementation Notes & Testing Checklist

## Tab Loading Architecture

```javascript
// nav.js
const TAB_FILES = {
  solution: 'tabs/tab1-solution.html',
  builder: 'tabs/tab2-builder.html',
  reference: 'tabs/tab3-reference.html',
  metadata: 'tabs/tab4-metadata.html',
  decisions: 'tabs/tab5-decisions.html'
};

const loadedTabs = new Set();

async function loadTab(tabId) {
  if (loadedTabs.has(tabId)) return;
  const panel = document.getElementById(tabId);
  try {
    const resp = await fetch(TAB_FILES[tabId]);
    const html = await resp.text();
    panel.innerHTML = html;
    loadedTabs.add(tabId);
    // Initialize tab-specific JS after load
    if (tabId === 'builder') initBuilder();
    if (tabId === 'metadata') initCommunityDemo();
    if (tabId === 'reference') initReferenceTree();
  } catch(e) {
    panel.innerHTML = '<p style="color: red; padding: 40px;">Failed to load tab content.</p>';
  }
}

// Main nav click handler
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const tabId = tab.dataset.tab;
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    loadTab(tabId);
  });
});

// Load Tab 1 on page load
loadTab('solution');
```

### Sub-tab navigation
Sub-tabs live inside each tab's HTML. The sub-tab JS should be generic — it looks for `.sub-tab` buttons with `data-subtab` and `data-parent` attributes and toggles `.sub-panel` visibility. Same pattern as the existing file.

## Script Load Order in index.html

```html
<!-- At end of body -->
<script src="js/taxonomy-data.js"></script>  <!-- TAXONOMY object, shared -->
<script src="js/nav.js"></script>             <!-- Tab switching, loads tab content -->
<script src="js/builder.js"></script>         <!-- Builder logic, called after tab2 loads -->
<script src="js/community-demo.js"></script>  <!-- Community demo, called after tab4 loads -->
```

## Builder Initialization

The builder tab HTML should include the form elements and output containers with specific IDs. The `builder.js` file provides the `initBuilder()` function that:

1. Sets up event listeners on all form elements
2. Implements `setBuilderPath(path)`, `updateBuilder()`, `toggleEnrich()`, etc.
3. Handles the Visual/JSON toggle for canonical storage
4. Generates the collapsed sentence with colored badges
5. Updates platform display cards

The builder logic from the existing file works well — port it over with these changes:
- Add metadata inputs (Purpose dropdown, Ownership dropdown, Community toggle)
- Include metadata in JSON output under a `metadata` key
- Show metadata below a dashed divider in the visual canonical view
- Build the collapsed sentence following the rules in Part 3

## Reference Tree Generation

The property hierarchy in Tab 3 should be generated from the TAXONOMY data model, not hardcoded. Write a `initReferenceTree()` function that:

1. Iterates through TAXONOMY sectors
2. Creates sector header divs with appropriate color class
3. Creates property type rows
4. Creates subtype rows with variants listed
5. Uses the `.tree-sector`, `.tree-type`, `.tree-row` CSS classes

This ensures the tree always matches the data model.

## Community Demo

Port the community demo from the existing file. It has:
- Mock search results (clickable cards)
- Breadcrumb navigation
- "Without Community" side: Buildings → Units
- "With Community" side: Community → Buildings → Units
- Mock unit data (DEMO_UNITS object)

The existing implementation works well. Just update references from "7 dimensions" to "6 dimensions" in any text.

---

## Testing Checklist

After building, verify every item:

### Model accuracy (CRITICAL)
- [ ] 6 dimensions throughout (NOT 7)
- [ ] "Property Type" naming used everywhere (NOT "Structure Type")
- [ ] Property Type is Dim 2, not "Structure Type"
- [ ] Purpose does NOT appear as a dimension — it's under Metadata tab
- [ ] Sector values: residential, commercial, recreation, other (4 total)
- [ ] Bachelor variant present under Low Rise, Mid Rise, High Rise, Walk-up
- [ ] "Other" catch-all exists at every level (property type, subtype)
- [ ] Cottage is a variant of Cabin (not a separate subtype)
- [ ] Manufactured is a variant of Mobile (not a separate subtype)
- [ ] Garden Suite variant is under House → Other (not its own thing)

### Tab 1: The Solution
- [ ] Problem statement says "6" not "7"
- [ ] 6 dimension cards, no Purpose card
- [ ] Dimensions table has 6 rows, no Purpose row
- [ ] Sentence anatomy shows 6 badges (no Purpose badge in the sentence)
- [ ] Metadata line appears BELOW the sentence (italic, lighter text)
- [ ] Collapse patterns table has 5 rows
- [ ] Comparison cards for Unit-First vs Structure-First (not old-style callouts)
- [ ] 6 examples (not 5), with correct collapsed sentences
- [ ] Each example shows metadata (Purpose + Ownership) below a dashed divider
- [ ] Syndication diagram says "6 Dimensions + Metadata" (not "7 Dimensions")
- [ ] Cardinality table has 6 rows (no Purpose row)
- [ ] Uniqueness break explanation for Variant mentions Bachelor specifically
- [ ] Backwards compat section mentions "Other" catch-all pattern

### Tab 2: Listing Builder
- [ ] Both paths work (unit-first and structure-first)
- [ ] Metadata inputs visible: Purpose dropdown, Ownership dropdown, Community toggle
- [ ] Metadata appears in Visual view below dashed divider
- [ ] Metadata appears in JSON view under "metadata" key
- [ ] Visual/JSON toggle works
- [ ] Collapsed sentence generates correctly for all paths
- [ ] Metadata line below sentence (italic, shows non-default values)
- [ ] Platform cards update live
- [ ] Bachelor variant available when selecting Apt Bldg subtypes
- [ ] "Other" subtypes available for all property types

### Tab 3: Full Reference
- [ ] 4 sub-tabs all load and switch correctly
- [ ] Property Hierarchy tree uses sector-colored headers
- [ ] Tree generated from TAXONOMY data (not hardcoded)
- [ ] All 4 sectors represented with full hierarchy
- [ ] Unit Types sub-tab shows self-sufficient vs structure-dependent split
- [ ] Transaction Types sub-tab has validation matrix
- [ ] Platform Mappings shows placeholder
- [ ] Spreadsheet link utility bar present

### Tab 4: Metadata
- [ ] 3 sub-tabs: Ownership, Purpose, Community
- [ ] "The Condo Problem — solved" uses Key Insight callout (Type 1, purple) — not inline note
- [ ] Ownership table has all 7 values (freehold through rent-to-own)
- [ ] Purpose sub-tab explains why it's not a dimension
- [ ] Purpose table has 7 values
- [ ] Community sub-tab is SIMPLIFIED (not the 6 open questions from old version)
- [ ] Community demo with interactive breadcrumb navigation works

### Tab 5: Decisions & Open Questions
- [ ] Problems Solved table has 10 rows (not 8)
- [ ] "Purpose moved to metadata" is one of the 10 problems solved
- [ ] "Condo as ownership" is one of the 10 problems solved
- [ ] "The Pattern" uses Key Insight callout (Type 1, teal) — not inline note
- [ ] 11 open questions organized in 3 categories
- [ ] Each question has options, recommendation, and "needs input from" names
- [ ] "What's Blocking Launch" utility bar at bottom

### Callout treatment
- [ ] Only 2-3 Key Insight callouts (Type 1) in entire site: "Condo Problem" + "The Pattern"
- [ ] All technical clarifications use Inline Notes (Type 2) — no colored background
- [ ] Unit-First vs Structure-First uses Comparison Cards (Type 3)
- [ ] Spreadsheet link and "What's Blocking Launch" use Utility Bars (Type 4)
- [ ] NO old-style uniform teal/purple/amber callouts used anywhere

### Visual / Design
- [ ] No emojis in platform card headers (clean text labels only)
- [ ] Consistent badge colors throughout
- [ ] Property hierarchy tree is the primary place color is used extensively
- [ ] Professional, restrained — no flashy or AI-generic aesthetics
- [ ] System font stack used (no Inter, Roboto, etc.)

### Technical
- [ ] Tab lazy-loading works (Tab 1 loads on page open, others on first click)
- [ ] Sub-tab navigation works within Tabs 3 and 4
- [ ] All JS runs without console errors
- [ ] TAXONOMY data model is consistent across builder and reference tree
- [ ] No broken links or placeholder text left unintentionally

---

## What NOT to change

- Don't "redesign" the existing component styles (badges, cards, tables, platform cards, sentence boxes). They work and they're intentional.
- Don't add animations, transitions, or motion effects beyond what exists.
- Don't add responsive/mobile layouts — this is a desktop internal tool.
- Don't add a dark mode.
- Don't add a search feature.
- Don't make the hierarchy tree collapsible/expandable — show it all open.
- Don't add tooltips or popovers.
- Don't use any external fonts (Google Fonts etc).
- Don't use any framework (React, Vue, etc) — vanilla HTML/CSS/JS only.
- Don't use localStorage or sessionStorage.

## What to reference

The existing `property-taxonomy-v4.html` file in the repo is your design reference. Extract CSS from it. The components, color system, and overall visual language are established — you're updating the CONTENT and MODEL, not redesigning the interface.

The `taxonomy-validation-v4.2.xlsx` spreadsheet (8 tabs) is the canonical data source. If anything in these instructions conflicts with the spreadsheet, the spreadsheet wins.

---

## Assembly

Combine all 5 parts of these instructions:
1. **Part 1:** Overview, file structure, design system, container
2. **Part 2:** Tab 1 — The Solution (full spec)
3. **Part 3:** Tab 2 — Listing Builder (full spec + TAXONOMY data model)
4. **Part 4:** Tabs 3, 4, 5 — Reference, Metadata, Decisions (full specs)
5. **Part 5:** This file — implementation notes, testing checklist

Read all 5 parts before starting. Build the container first, then each tab file, then the shared JS.
