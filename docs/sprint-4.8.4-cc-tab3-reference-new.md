# Sprint: Fill Tab 3 Sub-Tabs (Full Reference)

## Context

The file `property-taxonomy/tabs/tab3-reference.html` has sub-tab navigation and shells but most content is missing or incomplete. Fill all 4 sub-tabs.

## CRITICAL: Design Reference Files

Two standalone HTML files exist in the repo root (NOT in property-taxonomy/) that show the visual style we want. **Use their design patterns — collapsible trees, colored chips, expand/collapse controls — but update ALL DATA to match the v4.2 taxonomy from `taxonomy-data.js`.** The old files use outdated names (e.g., "Structure Type" instead of "Property Type", includes WoodCabins which is fictional, etc.). Take the look, not the data.

- **`property-taxonomy-tree-v2.html`** — Dark-themed collapsible property tree with colored chips per subtype showing valid unit types, listing types, and purposes. Has expand/collapse all, monospace code badges, cardinality badges (1:1 / 1:N), status dots, and CATCH-ALL markers on Other entries.

- **`platform-mapping-view.html`** — Dark-themed 4-column mapping grid (Canonical → BSTK → ILS → Spacelist → WoodCabins) with collapsible sector groups and colored display-value chips (same/renamed/collapsed/hidden).

**However:** The property-taxonomy site uses a LIGHT theme (teal/slate on white). So adapt the design patterns to the existing light theme — don't bring over the dark backgrounds. Use the existing CSS variables from the site's `css/styles.css` and `css/components.css`.

---

## Sub-tab 1: Property Hierarchy (`#ref-hierarchy`)

### Current state
Has a `<div id="property-hierarchy-tree">` and an `initReferenceTree()` function that generates a basic flat grid from TAXONOMY. **Replace this** with a richer collapsible tree inspired by `property-taxonomy-tree-v2.html`.

### What to build

**Controls bar** at top:
```html
<div style="display: flex; gap: 8px; margin-bottom: 16px;">
    <button class="tree-ctrl active" onclick="toggleAllTree(true)">Expand All</button>
    <button class="tree-ctrl" onclick="toggleAllTree(false)">Collapse All</button>
</div>
```

**Tree structure** — generated from TAXONOMY data by `initReferenceTree()`. For each sector → property type → subtype, render:

1. **Sector nodes** — collapsible, with sector-colored background header. Show sector label + monospace code badge. Start expanded.

2. **Property Type nodes** — collapsible, nested under sector. Show label + code badge + brief description note in italic. Column headers inside: `Subtype | Variants | Valid Unit Types | Transaction Types`

3. **Subtype rows** — inside each property type, 4 columns:
   - **Subtype name** + code badge + cardinality badge (`1:1` if unique to parent)
   - **Variants** — colored chips (cyan/`var(--dim-variant)`) or `—`
   - **Valid Unit Types** — colored chips (teal/`var(--dim-unit)`) from `subtype.unitTypes`
   - **Transaction Types** — colored chips (green/`var(--dim-transaction)`)
   - For "Other" catch-all subtypes: "CATCH-ALL" badge and `Any` chips in gray

### CSS to add (light-theme adaptation of tree-v2)

```css
.tree-ctrl {
    font-size: 12px; font-weight: 500; padding: 5px 14px;
    border-radius: 6px; border: 1px solid var(--gray-200);
    background: var(--gray-50); color: var(--gray-600); cursor: pointer;
}
.tree-ctrl:hover { background: var(--gray-100); color: var(--gray-800); }
.tree-ctrl.active { background: var(--teal-light); color: var(--teal); border-color: var(--teal); }

.tree-node { margin-bottom: 2px; }
.tree-header {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 12px; border-radius: 6px; cursor: pointer;
    transition: background 0.1s; user-select: none;
}
.tree-header:hover { background: var(--gray-50); }
.tree-header.open { background: var(--gray-50); }
.tree-toggle { font-size: 9px; width: 14px; color: var(--gray-400); transition: transform 0.12s; flex-shrink: 0; }
.tree-header.open > .tree-toggle { transform: rotate(90deg); }
.tree-header.leaf > .tree-toggle { visibility: hidden; }
.tree-label { font-size: 13px; font-weight: 600; }
.tree-code {
    font-family: var(--font-mono); font-size: 10px; color: var(--gray-500);
    padding: 1px 5px; background: var(--gray-100); border-radius: 3px;
}
.tree-desc { font-size: 11px; color: var(--gray-400); font-style: italic; }
.tree-children { padding-left: 24px; border-left: 1px solid var(--gray-200); margin-left: 18px; display: none; }
.tree-children.open { display: block; }

.tree-sector-hdr { padding: 10px 16px; border-radius: 6px 6px 0 0; font-size: 14px; font-weight: 700; }
.tree-sector-hdr.residential { background: var(--dim-sector-light); color: #6d28d9; }
.tree-sector-hdr.commercial { background: var(--dim-subtype-light); color: #c2410c; }
.tree-sector-hdr.recreation { background: var(--dim-structure-light); color: #92400e; }
.tree-sector-hdr.other { background: var(--gray-100); color: var(--gray-700); }

.tree-col-headers {
    display: grid; grid-template-columns: 200px 1fr 1fr 1fr;
    gap: 8px; padding: 6px 12px; margin-bottom: 4px;
    font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
}
.tree-subtype-row {
    display: grid; grid-template-columns: 200px 1fr 1fr 1fr;
    gap: 8px; padding: 5px 12px; border-top: 1px solid var(--gray-100);
    align-items: center; font-size: 12px;
}
.tree-subtype-row:hover { background: var(--gray-50); }

.chip {
    display: inline-block; font-size: 10px; font-weight: 500;
    padding: 1px 7px; border-radius: 3px; margin: 1px 2px; white-space: nowrap;
}
.chip-variant { background: var(--dim-variant-light); color: #0e7490; }
.chip-unit { background: var(--dim-unit-light); color: var(--teal-dark); }
.chip-transaction { background: var(--dim-transaction-light); color: #15803d; }
.chip-any { background: var(--gray-100); color: var(--gray-400); font-style: italic; }

.badge-cardinality {
    font-family: var(--font-mono); font-size: 9px; font-weight: 600;
    padding: 1px 4px; border-radius: 2px; background: var(--gray-100); color: var(--gray-500);
}
.badge-catchall {
    font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px;
    padding: 1px 5px; border-radius: 3px; background: rgba(34,197,94,0.1); color: #15803d;
}
```

### Transaction type data for the tree

TAXONOMY doesn't include transactions per subtype. Add a `TRANSACTION_RULES` lookup:

```javascript
const TRANSACTION_RULES = {
    'house': ['rent', 'sale'],
    'townhouse_plex': ['rent', 'sale'],
    'apartment_bldg': ['rent'],
    'other_res': ['rent'],
    'office': ['rent', 'sale', 'lease'],
    'retail': ['sale', 'lease'],
    'industrial': ['sale', 'lease'],
    'parking_pty': ['lease'],
    'other_commercial': ['lease'],
    'construction': ['sale'],
    'coworking': ['rent', 'lease'],
    'hospitality': ['sale', 'lease'],
    'leisure': ['lease'],
    'land': ['sale', 'lease'],
    'specialty': [],
    'other_other': ['sale']
};
```

### Toggle functions

```javascript
function toggleTree(el) {
    const ch = el.nextElementSibling;
    if (!ch || !ch.classList.contains('tree-children')) return;
    el.classList.toggle('open');
    ch.classList.toggle('open');
}
function toggleAllTree(open) {
    document.querySelectorAll('#ref-hierarchy .tree-header').forEach(h => {
        const ch = h.nextElementSibling;
        if (!ch || !ch.classList.contains('tree-children')) return;
        if (open) { h.classList.add('open'); ch.classList.add('open'); }
        else { h.classList.remove('open'); ch.classList.remove('open'); }
    });
}
```

---

## Sub-tab 2: Unit Types (`#ref-units`)

### Section A: Self-Sufficient Unit Types

Card: title "Self-Sufficient Unit Types", subtitle "These work without a property type — the unit IS the listing", badge "Unit-First" (teal).

`.data-table`:

| Unit Type | Code | Implied Sector | Implied Property Type | Description |
|---|---|---|---|---|
| Apartment | `apartment` | Residential | Apartment Building (when known) | Standard rental unit. Most common listing type. |
| Basement | `basement` | Residential | House (when known) | Below-grade unit. Very common in Canadian market. |
| Room (Private) | `room_private` | Residential | — (any) | Private room in shared dwelling. Property type always optional. |
| Room (Shared) | `room_shared` | Residential | — (any) | Shared room in shared dwelling. Property type always optional. |
| Office Space | `office` | Commercial | Office Building (when known) | Office unit — Class A tower or co-working space. |
| Parking | `parking` | Commercial | Parking (when known) | Parking spot or space. |

Inline note: `Why "self-sufficient"? These unit types carry enough meaning on their own that the building type is optional. When building info is known, it's stored as enrichment — nothing is lost.`

### Section B: Structure-Dependent Validation Matrix

Card: title "Structure-Dependent Unit Types", subtitle "These require a property type — the building defines the listing", badge "Structure-First" (amber).

Wide table in `<div style="overflow-x: auto;">`. Columns: `Subtype | Entire | Main Fl | Suite | Bsmt | Apt | Room | Office | Parking | Floor | Spot`. Sector-colored header rows. ✓ = teal, — = gray-300. Other catch-alls = italic "any".

**Data (from spreadsheet):**

RESIDENTIAL → House: Detached ✓—✓✓—✓————, Mobile ✓only, Cabin ✓only, Other=any
RESIDENTIAL → T/Plex: all subtypes ✓✓✓✓—✓————, Other=any
RESIDENTIAL → Apt Bldg: all subtypes ——✓—✓✓————, Other=any
RESIDENTIAL → Other Res: Office=office only, Parking=parking only, Other=any
COMMERCIAL → Office: A/B/C ✓————— ✓—✓—, Coworking ——————✓——✓, Other=any
COMMERCIAL → Retail: Storefront ✓—✓, Mall/Strip ——✓, Other=any
COMMERCIAL → Industrial: Warehouse ✓————————✓—, Mfg ✓only, Flex ✓—✓———————✓, Storage ✓—✓, Other=any
COMMERCIAL → Parking: Garage ✓——————✓✓✓, Surface ✓——————✓—✓, Other=any
RECREATION → Hospitality: all ✓only, Other=any
RECREATION → Leisure: all spot only, Other=any
OTHER → Land: all ✓only, Other=any
OTHER → Other: Subdivision ✓only, Other=any

Inline note: `"Other" catch-alls accept any unit type. Every property type has an "Other" subtype as an escape hatch for unrecognized values. These are intentionally permissive.`

---

## Sub-tab 3: Transaction Types (`#ref-transactions`)

Card: title "Transaction Type Validation", subtitle "Which transaction types are valid per property type".

Table with sector-colored group headers. Columns: `Property Type | Subtype / Unit Type | Rent | Sale | Lease | Notes`

**Data:**

Residential — Structure-First (purple):
House | All | ✓ | ✓ | — |
T/Plex | All | ✓ | ✓ | — |
Apt Bldg | All | ✓ | — | — | Sale via condo ownership attr

Residential — Unit-First (purple):
(any) | Apartment | ✓ | ✓ | — |
(any) | Basement | ✓ | — | — |
(any) | Room (P/S) | ✓ | — | — |

Commercial — Structure-First (orange):
Office | Class A/B/C | ✓ | ✓ | ✓ |
Industrial | Construction | — | ✓ | — | Pre-sale only
Parking | Garage/Surface | — | — | ✓ |
Retail | All | — | ✓ | ✓ |
Industrial | Warehouse/Mfg/Flex/Storage | — | ✓ | ✓ |

Commercial — Unit-First (orange):
(any) | Office (unit) | ✓ | — | ✓ |
Office | Co-working | ✓ | — | ✓ |
(any) | Parking (unit) | ✓ | — | ✓ |

Recreation (amber):
Hospitality | Hotel/Motel/B&B/Inn | — | ✓ | ✓ | Sale/lease of property
Leisure | Marina | — | — | ✓ | Lease (spot)
Leisure | Campground | — | — | ✓ | Lease (spot)
Leisure | Stable | — | — | ✓ | Lease (spot/stall)

Other (gray):
Land | Agri/Acreage/Vacant | — | ✓ | ✓ |
Specialty | TBD | TBD | TBD | TBD | To be defined
Other | Subdivision | — | ✓ | — | Sale (development)

Inline note: `Rent vs Lease: "Rent" is month-to-month or short-term residential. "Lease" is a fixed-term commercial agreement. The transaction type refers to the commercial/legal model, not the document.`

---

## Sub-tab 4: Platform Mappings (`#ref-mappings`)

Placeholder card with 4 platform preview boxes:

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
            Each platform has a mapping table that translates the canonical 6-dimension model into its own vocabulary. The same listing displays differently across platforms — without duplicating data.
        </p>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px;">
            <div style="padding: 12px; border-radius: 8px; border: 1px solid var(--platform-enterprise); border-top: 3px solid var(--platform-enterprise); background: var(--platform-enterprise-light);">
                <div style="font-size: 12px; font-weight: 600;">BSTK / RentSync</div>
                <div style="font-size: 11px; color: var(--gray-500); margin-top: 2px;">Full taxonomy, all fields</div>
            </div>
            <div style="padding: 12px; border-radius: 8px; border: 1px solid var(--platform-ils); border-top: 3px solid var(--platform-ils); background: var(--platform-ils-light);">
                <div style="font-size: 12px; font-weight: 600;">ILS Network</div>
                <div style="font-size: 11px; color: var(--gray-500); margin-top: 2px;">Simplified, renter-friendly</div>
            </div>
            <div style="padding: 12px; border-radius: 8px; border: 1px solid var(--platform-commercial); border-top: 3px solid var(--platform-commercial); background: var(--platform-commercial-light);">
                <div style="font-size: 12px; font-weight: 600;">Spacelist</div>
                <div style="font-size: 11px; color: var(--gray-500); margin-top: 2px;">Commercial only</div>
            </div>
            <div style="padding: 12px; border-radius: 8px; border: 1px solid var(--platform-mls); border-top: 3px solid var(--platform-mls); background: var(--platform-mls-light);">
                <div style="font-size: 12px; font-weight: 600;">MLS</div>
                <div style="font-size: 11px; color: var(--gray-500); margin-top: 2px;">Inbound feed mapping</div>
            </div>
        </div>
        <div class="inline-note">
            <strong>Platform mappings are configuration, not code.</strong> When we acquire a new platform, we add a mapping table — we don't restructure the data model. For now, the Listing Builder (Tab 2) demonstrates live platform output.
        </div>
    </div>
</div>
```

---

## Spreadsheet Link

Utility bar at bottom:
```html
<div class="utility-bar mt-6">
    This page explains the system. For the full canonical data, validation rules, and platform mappings:
    <a href="https://docs.google.com/spreadsheets/d/PLACEHOLDER" target="_blank">Open Reference Spreadsheet</a>
</div>
```

---

## Implementation Notes

1. **Only modify `tab3-reference.html`** and optionally add CSS to existing stylesheets.
2. **Generate the tree from TAXONOMY data** — don't hardcode the hierarchy HTML.
3. **Unit Types and Transaction Types tables can be hardcoded HTML.**
4. **Reference `property-taxonomy-tree-v2.html` and `platform-mapping-view.html`** for design, but data must come from v4.2 taxonomy.
5. **Keep the existing `<script>` block** — update `initReferenceTree()` for the richer tree.
6. **Light theme only.**

## Testing Checklist

- [ ] All 4 sub-tabs switch correctly
- [ ] Property Hierarchy tree is collapsible with Expand/Collapse All
- [ ] Each subtype row shows variant, unit type, and transaction chips
- [ ] "Other" catch-alls show CATCH-ALL badge + "Any" chips
- [ ] Code badges show canonical keys in monospace
- [ ] Sector headers use correct colors (purple/orange/amber/gray)
- [ ] Self-Sufficient table has 6 rows
- [ ] Validation matrix matches spreadsheet
- [ ] Transaction table has sector-grouped colored headers
- [ ] Platform Mappings shows 4 platform preview cards
- [ ] Spreadsheet link present at bottom
- [ ] No console errors
- [ ] Tree generated from TAXONOMY data
