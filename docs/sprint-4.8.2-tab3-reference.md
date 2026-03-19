# Sprint: Fill Tab 3 Sub-Tabs (Full Reference)

## Context

The file `property-taxonomy/tabs/tab3-reference.html` exists and has:
- Sub-tab navigation (4 pills: Property Hierarchy, Unit Types, Transaction Types, Platform Mappings) ✅
- Sub-tab switching JS ✅
- Property Hierarchy sub-tab with `initReferenceTree()` that generates from TAXONOMY data ✅
- **Unit Types** sub-tab — has a card header shell but **table content is incomplete/cut off**
- **Transaction Types** sub-tab — **completely empty**
- **Platform Mappings** sub-tab — **just a placeholder div**

Also reference these existing files in the repo for design patterns and data structure:
- `property-taxonomy/tabs/tab4-metadata.html` — good example of complete sub-tab content with tables
- `property-taxonomy/tabs/platform-mappings.html` — OLD version with outdated data but useful for table structure/CSS patterns. **Do NOT copy its data — it uses the old model with WoodCabins (fictional platform). Use the spreadsheet data below instead.**
- `property-taxonomy/css/layout.css` + `property-taxonomy/css/components.css` — existing styles for `.data-table`, `.card`, `.badge`, `.sub-tab`, `.sub-panel`, `.inline-note`, `.utility-bar`
- `property-taxonomy/js/taxonomy-data.js` — the TAXONOMY object, SELF_SUFFICIENT, UNIT_LABELS, etc.

## What to build

Replace the incomplete/empty content in the 3 sub-panels inside `tab3-reference.html`. Keep the existing section header, sub-tab nav, Property Hierarchy sub-tab, utility bar, and `<script>` block. Only replace/complete the inner content of the 3 sub-panels.

---

## Sub-tab 2: Unit Types (`#ref-units`)

Two sections inside this panel.

### Section A: Self-Sufficient Unit Types

Card with:
- Title: "Self-Sufficient Unit Types"
- Subtitle: "These work without a property type — the unit IS the listing"
- Badge: "Unit-First" (teal)

Table (`.data-table`):

| Unit Type | Code | Implied Sector | Implied Property Type | Description |
|---|---|---|---|---|
| **Apartment** | `apartment` | Residential | Apartment Building (when known) | Standard rental unit in a multi-unit building. Most common listing type. |
| **Basement** | `basement` | Residential | House (when known) | Below-grade unit, typically in a house. Very common in Canadian market. |
| **Room (Private)** | `room_private` | Residential | — (any) | Private room in a shared dwelling. Property type always optional. |
| **Room (Shared)** | `room_shared` | Residential | — (any) | Shared room in a shared dwelling. Property type always optional. |
| **Office Space** | `office` | Commercial | Office Building (when known) | Office unit — could be in a Class A tower or a co-working space. |
| **Parking** | `parking` | Commercial | Parking (when known) | Parking spot or space. |

After the table, add an inline note:
```html
<div class="inline-note">
    <strong>Why "self-sufficient"?</strong> These unit types carry enough meaning on their own that the building type is optional. When someone lists "a basement for rent," they rarely know or care whether it's in a detached house or a semi. When building info <em>is</em> known, it's stored as enrichment — nothing is lost.
</div>
```

### Section B: Structure-Dependent Unit Types — Validation Matrix

Card with:
- Title: "Structure-Dependent Unit Types"
- Subtitle: "These require a property type — the building defines the listing"
- Badge: "Structure-First" (amber)

Explanation paragraph before the table:
```html
<p class="mb-4" style="font-size: 13px; color: var(--gray-600);">
    Structure-dependent unit types describe <em>what portion</em> of a building is being listed. They only make sense in context of a specific property type. Not every combination is valid — the matrix below shows which unit types apply to each subtype.
</p>
```

Then a large validation matrix table. This is the core reference content.

**Table structure:** Rows = Property Type → Subtype. Columns = the 5 structure-dependent unit types (Entire, Main Floor, Suite, Basement, Room P/S) + the self-sufficient unit types that are also valid for some structures (Apartment, Office, Parking, Floor, Spot).

Use `✓` (green, `color: var(--teal)`) for valid and `—` (gray, `color: var(--gray-300)`) for invalid. For "Other" catch-all rows, show "any" in italic gray instead of individual checkmarks.

**Important CSS:** The table will be wide. Wrap it in a `<div style="overflow-x: auto;">` so it scrolls horizontally if needed. Use `font-size: 12px` for the table and `white-space: nowrap` on `<th>` elements.

Here is the EXACT validation data from the spreadsheet. Follow this precisely:

```
RESIDENTIAL
House
  Detached:        Entire ✓ | Main Fl ✓ | Suite ✓ | Basement ✓ | Apt — | Room ✓ | Office — | Parking — | Floor — | Spot —
  Mobile:          Entire ✓ | (all others —)
  Cabin:           Entire ✓ | (all others —)
  Other (House):   (all valid — free-input catch-all)

Townhouse / Plex
  Semi-Detached:   Entire ✓ | Main Fl ✓ | Suite ✓ | Basement ✓ | Apt — | Room ✓ | Office — | Parking — | Floor — | Spot —
  Townhouse:       Entire ✓ | Main Fl ✓ | Suite ✓ | Basement ✓ | Apt — | Room ✓ | Office — | Parking — | Floor — | Spot —
  Duplex:          Entire ✓ | Main Fl ✓ | Suite ✓ | Basement ✓ | Apt — | Room ✓ | Office — | Parking — | Floor — | Spot —
  Triplex:         Entire ✓ | Main Fl ✓ | Suite ✓ | Basement ✓ | Apt — | Room ✓ | Office — | Parking — | Floor — | Spot —
  Fourplex:        Entire ✓ | Main Fl ✓ | Suite ✓ | Basement ✓ | Apt — | Room ✓ | Office — | Parking — | Floor — | Spot —
  Multiplex:       Entire ✓ | Main Fl ✓ | Suite ✓ | Basement ✓ | Apt — | Room ✓ | Office — | Parking — | Floor — | Spot —
  Other (T/Plex):  (all valid — free-input catch-all)

Apartment Building
  Low Rise:        Entire — | Main Fl — | Suite ✓ | Basement — | Apt ✓ | Room ✓ | Office — | Parking — | Floor — | Spot —
  Mid Rise:        Entire — | Main Fl — | Suite ✓ | Basement — | Apt ✓ | Room ✓ | Office — | Parking — | Floor — | Spot —
  High Rise:       Entire — | Main Fl — | Suite ✓ | Basement — | Apt ✓ | Room ✓ | Office — | Parking — | Floor — | Spot —
  Walk-up:         Entire — | Main Fl — | Suite ✓ | Basement — | Apt ✓ | Room ✓ | Office — | Parking — | Floor — | Spot —
  Other (Apt Bldg): (all valid — free-input catch-all)

Other Residential
  Office:          Office ✓ | (all others —)
  Parking:         Parking ✓ | (all others —)
  Other (Res):     (all valid — free-input catch-all)

COMMERCIAL
Office
  Class A/B/C:     Entire ✓ | Main Fl — | Suite — | Basement — | Apt — | Room — | Office ✓ | Parking — | Floor ✓ | Spot —
  Co-working:      Entire — | Main Fl — | Suite — | Basement — | Apt — | Room — | Office ✓ | Parking — | Floor — | Spot ✓
  Other (Office):  (all valid — free-input catch-all)

Retail
  Storefront:      Entire ✓ | Main Fl — | Suite ✓ | Basement — | Apt — | Room — | Office — | Parking — | Floor — | Spot —
  Mall:            Entire — | Main Fl — | Suite ✓ | Basement — | Apt — | Room — | Office — | Parking — | Floor — | Spot —
  Strip Mall:      Entire — | Main Fl — | Suite ✓ | Basement — | Apt — | Room — | Office — | Parking — | Floor — | Spot —
  Other (Retail):  (all valid — free-input catch-all)

Industrial
  Warehouse:       Entire ✓ | Main Fl — | Suite — | Basement — | Apt — | Room — | Office — | Parking — | Floor ✓ | Spot —
  Manufacturing:   Entire ✓ | (all others —)
  Flex Space:      Entire ✓ | Main Fl — | Suite ✓ | Basement — | Apt — | Room — | Office — | Parking — | Floor — | Spot ✓
  Storage:         Entire ✓ | Main Fl — | Suite ✓ | Basement — | Apt — | Room — | Office — | Parking — | Floor — | Spot —
  Other (Indust.): (all valid — free-input catch-all)

Parking
  Garage:          Entire ✓ | Main Fl — | Suite — | Basement — | Apt — | Room — | Office — | Parking ✓ | Floor ✓ | Spot ✓
  Surface Lot:     Entire ✓ | Main Fl — | Suite — | Basement — | Apt — | Room — | Office — | Parking ✓ | Floor — | Spot ✓
  Other (Parking): (all valid — free-input catch-all)

RECREATION
Hospitality
  Hotel/Motel/B&B/Inn: Entire ✓ | (all others —)
  Other (Hosp.):  (all valid — free-input catch-all)

Leisure
  Marina/Campground/Stable: Spot ✓ | (all others —)
  Other (Leisure): (all valid — free-input catch-all)

OTHER
Land
  Agricultural/Acreage/Vacant: Entire ✓ | (all others —)
  Other (Land):   (all valid — free-input catch-all)

Specialty
  TBD:            (no validations yet)
  Other (Spec.):  (all valid — free-input catch-all)

Other
  Subdivision:    Entire ✓ | (all others —)
  Other (Other):  (all valid — free-input catch-all)
```

**Table formatting:**
- Group rows by sector with colored header rows (same colors as the Property Hierarchy tree)
- Within each sector, show Property Type as a bold sub-header row spanning all columns
- Subtypes as individual data rows, slightly indented (padding-left on first cell)
- "Other" catch-all rows: show italic text "any" in gray across all unit type columns
- Column headers should have abbreviated labels to save space:

```html
<thead>
    <tr>
        <th style="min-width: 180px;">Subtype</th>
        <th>Entire</th>
        <th>Main Fl</th>
        <th>Suite</th>
        <th>Bsmt</th>
        <th>Apt</th>
        <th>Room</th>
        <th>Office</th>
        <th>Parking</th>
        <th>Floor</th>
        <th>Spot</th>
    </tr>
</thead>
```

After the matrix, add an inline note:
```html
<div class="inline-note">
    <strong>"Other" catch-alls accept any unit type.</strong> Every property type has an "Other" subtype that serves as an escape hatch for unrecognized values from acquisitions or edge cases. These are intentionally permissive — validation tightens as values are properly classified.
</div>
```

---

## Sub-tab 3: Transaction Types (`#ref-transactions`)

Card with:
- Title: "Transaction Type Validation"
- Subtitle: "Which transaction types are valid per property type"

The table is organized by sector, then split into structure-first and unit-first sections within residential and commercial.

**EXACT data from the spreadsheet:**

```html
<!-- Residential Structure-First -->
<tr class="sector-header residential"><td colspan="5">Residential — Structure-First</td></tr>
House          | All subtypes      | ✓ Rent | ✓ Sale | — Lease |
Townhouse/Plex | All subtypes      | ✓ Rent | ✓ Sale | — Lease |
Apartment Bldg | All subtypes      | ✓ Rent | — Sale | — Lease | Note: Sale via condo ownership attribute

<!-- Residential Unit-First -->
<tr class="sector-header residential"><td colspan="5">Residential — Unit-First</td></tr>
(any)          | Apartment         | ✓ Rent | ✓ Sale | — Lease |
(any)          | Basement          | ✓ Rent | — Sale | — Lease |
(any)          | Room (P/S)        | ✓ Rent | — Sale | — Lease |

<!-- Commercial Structure-First -->
<tr class="sector-header commercial"><td colspan="5">Commercial — Structure-First</td></tr>
Office         | Class A/B/C       | ✓ Rent | ✓ Sale | ✓ Lease |
Industrial     | Construction/New  | — Rent | ✓ Sale | — Lease | Note: Sale only (pre-sale)
Parking        | Garage/Surface    | — Rent | — Sale | ✓ Lease |
Retail         | All               | — Rent | ✓ Sale | ✓ Lease |
Industrial     | Warehouse/Mfg/Flex/Storage | — Rent | ✓ Sale | ✓ Lease |

<!-- Commercial Unit-First -->
<tr class="sector-header commercial"><td colspan="5">Commercial — Unit-First</td></tr>
(any)          | Office (unit)     | ✓ Rent | — Sale | ✓ Lease |
Office         | Co-working        | ✓ Rent | — Sale | ✓ Lease |
(any)          | Parking (unit)    | ✓ Rent | — Sale | ✓ Lease |

<!-- Recreation -->
<tr class="sector-header recreation"><td colspan="5">Recreation</td></tr>
Hospitality    | Hotel/Motel/B&B/Inn | — Rent | ✓ Sale | ✓ Lease | Note: Sale/lease of property itself
Leisure        | Marina            | — Rent | — Sale | ✓ Lease | Note: Lease (spot)
Leisure        | Campground        | — Rent | — Sale | ✓ Lease | Note: Lease (spot)
Leisure        | Stable            | — Rent | — Sale | ✓ Lease | Note: Lease (spot/stall)

<!-- Other -->
<tr class="sector-header other"><td colspan="5">Other</td></tr>
Land           | Agri/Acreage/Vacant | — Rent | ✓ Sale | ✓ Lease |
Specialty      | TBD               | TBD    | TBD    | TBD     | Note: To be defined
Other          | Subdivision       | — Rent | ✓ Sale | — Lease | Note: Sale (development)
```

**Table column structure:**

```html
<thead>
    <tr>
        <th>Property Type</th>
        <th>Subtype / Unit Type</th>
        <th>Rent</th>
        <th>Sale</th>
        <th>Lease</th>
        <th>Notes</th>
    </tr>
</thead>
```

**Styling for sector header rows:**
Use the same sector color scheme as the hierarchy tree. Each sector header row spans all columns with colored background:
- Residential: `background: var(--dim-sector-light);` (purple-ish)
- Commercial: `background: var(--dim-subtype-light);` (orange-ish)
- Recreation: `background: var(--dim-structure-light);` (amber-ish)
- Other: `background: var(--gray-100);`

For valid (✓): use `<span style="color: var(--teal); font-weight: 600;">✓</span>`
For invalid (—): use `<span style="color: var(--gray-300);">—</span>`
For TBD: use `<span style="color: var(--gray-400); font-style: italic;">TBD</span>`

After the table, inline note:
```html
<div class="inline-note">
    <strong>Rent vs Lease:</strong> "Rent" is month-to-month or short-term residential. "Lease" is a fixed-term commercial agreement. Residential properties don't use "lease" even though renters sign leases — the transaction type refers to the commercial/legal model, not the document.
</div>
```

---

## Sub-tab 4: Platform Mappings (`#ref-mappings`)

This sub-tab stays as a placeholder for now, but upgrade it from the current bare text to a proper card with context:

```html
<div class="card">
    <div class="card-header">
        <div>
            <div class="card-title">Platform Mapping Rules</div>
            <div class="card-subtitle">How canonical values translate to each platform's display vocabulary</div>
        </div>
        <span class="badge badge-gray">Coming Soon</span>
    </div>
    <div class="card-body">
        <p style="font-size: 13px; color: var(--gray-500); margin-bottom: 16px;">
            Each platform has a mapping table that translates the canonical 6-dimension model into its own vocabulary. The same listing can display differently on BSTK, Rentals.ca, Spacelist, and MLS — without duplicating data.
        </p>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px;">
            <div style="padding: 12px; border-radius: 8px; border: 1px solid var(--platform-enterprise); border-top: 3px solid var(--platform-enterprise); background: var(--platform-enterprise-light);">
                <div style="font-size: 12px; font-weight: 600; color: var(--gray-800);">BSTK / RentSync</div>
                <div style="font-size: 11px; color: var(--gray-500); margin-top: 2px;">Full taxonomy, all fields</div>
            </div>
            <div style="padding: 12px; border-radius: 8px; border: 1px solid var(--platform-ils); border-top: 3px solid var(--platform-ils); background: var(--platform-ils-light);">
                <div style="font-size: 12px; font-weight: 600; color: var(--gray-800);">ILS Network</div>
                <div style="font-size: 11px; color: var(--gray-500); margin-top: 2px;">Simplified, renter-friendly</div>
            </div>
            <div style="padding: 12px; border-radius: 8px; border: 1px solid var(--platform-commercial); border-top: 3px solid var(--platform-commercial); background: var(--platform-commercial-light);">
                <div style="font-size: 12px; font-weight: 600; color: var(--gray-800);">Spacelist</div>
                <div style="font-size: 11px; color: var(--gray-500); margin-top: 2px;">Commercial only</div>
            </div>
            <div style="padding: 12px; border-radius: 8px; border: 1px solid var(--platform-mls); border-top: 3px solid var(--platform-mls); background: var(--platform-mls-light);">
                <div style="font-size: 12px; font-weight: 600; color: var(--gray-800);">MLS</div>
                <div style="font-size: 11px; color: var(--gray-500); margin-top: 2px;">Inbound feed mapping</div>
            </div>
        </div>
        <div class="inline-note">
            <strong>Platform mappings are configuration, not code.</strong> When we acquire a new platform, we add a mapping table — we don't restructure the data model. The full mapping tables will be documented here once the taxonomy is finalized. For now, the Listing Builder tab (Tab 2) demonstrates live platform output for any classification.
        </div>
    </div>
</div>
```

---

## Property Hierarchy — Verify & Fix

The `initReferenceTree()` function in the existing `<script>` block generates the tree from the `TAXONOMY` object in `taxonomy-data.js`. This should already work, but verify:

1. The function runs when the tab loads (check event listener)
2. The CSS classes `.tree-sector`, `.tree-sector-header`, `.tree-type`, `.tree-type-header`, `.tree-row`, `.tree-subtype`, `.tree-variants` all exist in the CSS files
3. The sector color classes `.tree-sector-purple`, `.tree-sector-orange`, `.tree-sector-amber`, `.tree-sector-gray` exist

If these CSS classes are missing, add them. Reference the sector color scheme:
```css
.tree-sector { margin-bottom: 24px; border-radius: 8px; overflow: hidden; border: 1px solid var(--gray-200); }
.tree-sector-header { padding: 12px 20px; font-size: 14px; font-weight: 700; }
.tree-sector-purple .tree-sector-header { background: var(--dim-sector-light); color: #6d28d9; }
.tree-sector-orange .tree-sector-header { background: var(--dim-subtype-light); color: #c2410c; }
.tree-sector-amber .tree-sector-header { background: var(--dim-structure-light); color: #92400e; }
.tree-sector-gray .tree-sector-header { background: var(--gray-100); color: var(--gray-700); }
.tree-type { border-top: 1px solid var(--gray-200); }
.tree-type-header { padding: 10px 20px; font-size: 13px; font-weight: 600; color: var(--gray-800); background: var(--gray-50); }
.tree-row { display: grid; grid-template-columns: 1fr 1fr; padding: 6px 20px 6px 36px; border-top: 1px solid var(--gray-100); font-size: 12px; }
.tree-subtype { color: var(--gray-700); }
.tree-variants { color: var(--gray-500); font-style: italic; }
```

---

## Implementation Notes

1. **Only modify `tab3-reference.html`.** Do not touch other tab files, JS files, or CSS files (except to add missing tree CSS classes if needed).
2. **Match existing patterns.** Look at `tab4-metadata.html` for how tables, cards, inline notes, and sub-panels are structured. Follow the same HTML patterns exactly.
3. **Data accuracy is critical.** The validation data above comes directly from the `taxonomy-validation-v4.2.xlsx` spreadsheet. Do not invent or guess values.
4. **Keep the existing `<script>` block** at the bottom of tab3-reference.html. It handles sub-tab switching and tree generation.
5. **No external fonts or libraries.** Use existing CSS classes and variables.

## Testing Checklist

- [ ] All 4 sub-tabs switch correctly
- [ ] Property Hierarchy tree renders with sector-colored headers
- [ ] Self-Sufficient Unit Types table has 6 rows (apartment through parking)
- [ ] Validation matrix covers all 4 sectors with correct checkmarks
- [ ] "Other" catch-all rows show "any" not individual checkmarks
- [ ] Transaction Types table has sector-grouped headers with correct colors
- [ ] Residential split into structure-first and unit-first sections
- [ ] Commercial split into structure-first and unit-first sections
- [ ] "Sale via condo ownership attribute" note present for Apartment Building
- [ ] Platform Mappings shows 4 platform cards with correct colors
- [ ] Inline notes present after each major table
- [ ] Utility bar with spreadsheet link still at the bottom
- [ ] No console errors
- [ ] Tables scroll horizontally if content overflows
