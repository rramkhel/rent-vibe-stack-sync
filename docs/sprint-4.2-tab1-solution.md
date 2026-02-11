# Sprint 4.2: Tab 1 — The Solution

## Overview

Build Tab 1 (`tabs/tab1-solution.html`). This is the narrative tab — it sells the model. 7 sections.

---

## Section 1: What We're Solving

Brief problem statement (2 short paragraphs, use `.section-intro` class):
- 47+ inconsistent property types across BSTK, RentSync, ILS, Spacelist
- "Apartment" means different things on different platforms
- Rooms/basements forced into building-level classifications
- No clean way to represent loft vs studio vs garden suite
- Solution: one canonical data model with 6 orthogonal dimensions + platform mapping layer. Store once, display everywhere.

---

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

---

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

---

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

---

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

---

## Section 5: How Data Moves

Syndication diagram (centered layout):
- Top: "The Canonical System — Single Source of Truth — 6 Dimensions + Metadata" (teal box)
- Arrow: up-down
- Bottom: 5 platform boxes in a row:
  1. BSTK/RentSync (enterprise color) — bidirectional
  2. ILS Network / Rentals.ca, RentFaster (ils color) — outbound
  3. Spacelist / Commercial (commercial color) — outbound
  4. MLS (mls color) — inbound
  5. Roomies (mls color) — inbound

**Inline Note:** "**Platform mappings are configuration, not code.** Each platform has a mapping table that translates canonical values to its display vocabulary. When we acquire a new platform, we add a mapping table — we don't restructure the data model."

---

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

---

## Section 7: Backwards Compatibility

3 stat cards in a row:
- "1:1" — each old type has one canonical mapping
- "0" — data loss during migration
- "Other" — catch-all at every level for unrecognized values

**Inline Note:** "**Migration is deterministic.** Every existing property type (from BSTK, RentSync, ILS, Spacelist) has exactly one canonical mapping. 'Other' values at every level catch anything that doesn't map cleanly — this also future-proofs for new property types from acquisitions. Full migration table available in the reference spreadsheet."

---

## Testing Checklist

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
