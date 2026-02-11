# Sprint 4.4: Tab 3 — Full Reference

## Overview

Build Tab 3 (`tabs/tab3-reference.html`). Complete data for due diligence. 4 sub-tabs via floating pill bar.

---

## Sub-tab bar

Centered pill bar: Property Hierarchy | Unit Types | Transaction Types | Platform Mappings

---

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

---

## Sub-tab 2: Unit Types

Validation matrix showing which unit types are valid per property type/subtype.

Two sections:
1. **Self-sufficient unit types** (apartment, basement, room_private, room_shared, office, parking) — these work without a property type. Show a simple table explaining each.
2. **Structure-dependent unit types** (entire, main_floor, suite, floor, spot) — show a matrix of property types x these unit types with checkmark/X.

Pull the validation data from the TAXONOMY data model (each subtype has a `unitTypes` array).

---

## Sub-tab 3: Transaction Types

Table showing Rent/Sale/Lease validity per property type. From the spreadsheet:

| Property Type | Subtype | Rent | Sale | Lease | Notes |
|---|---|---|---|---|---|
| **RESIDENTIAL (structure-first)** |
| House | All | Yes | Yes | No | |
| Townhouse/Plex | All | Yes | Yes | No | |
| Apartment Bldg | All | Yes | No | No | Sale via condo ownership attr |
| **RESIDENTIAL (unit-first)** |
| (any) | Apartment | Yes | Yes | No | |
| (any) | Basement | Yes | No | No | |
| (any) | Room | Yes | No | No | |
| **COMMERCIAL (structure-first)** |
| Office | Class A/B/C | Yes | Yes | Yes | |
| Industrial | Construction | No | Yes | No | Sale only (pre-sale) |
| Parking | Garage/Surface | No | No | Yes | |
| Retail | All | No | Yes | Yes | |
| Industrial | Warehouse/Mfg/Flex/Storage | No | Yes | Yes | |
| **COMMERCIAL (unit-first)** |
| (any) | Office | Yes | No | Yes | |
| Office | Co-working | Yes | No | Yes | |
| (any) | Parking | Yes | No | Yes | |
| **RECREATION** |
| Hospitality | All | No | Yes | Yes | Sale/lease of property |
| Leisure | Marina/Campground/Stable | No | No | Yes | Lease (spot) |
| **OTHER** |
| Land | All | No | Yes | Yes | Sale or lease |
| Other | Subdivision | No | Yes | No | Sale (development) |

---

## Sub-tab 4: Platform Mappings

Placeholder content for now — this will be filled in later. Show a placeholder box:
"Platform mapping rules — coming soon. The canonical-to-platform translation tables will be documented here."

---

## After sub-tabs: Spreadsheet link

**Utility Bar (Type 4):**
"This page explains the system. For the full canonical data, validation rules, and platform mappings: [Link to Google Sheet — placeholder]"

---

## Reference Tree Generation

The property hierarchy in Tab 3 should be generated from the TAXONOMY data model, not hardcoded. Write a `initReferenceTree()` function that:

1. Iterates through TAXONOMY sectors
2. Creates sector header divs with appropriate color class
3. Creates property type rows
4. Creates subtype rows with variants listed
5. Uses the `.tree-sector`, `.tree-type`, `.tree-row` CSS classes

This ensures the tree always matches the data model.

---

## Testing Checklist

- [ ] 4 sub-tabs all load and switch correctly
- [ ] Property Hierarchy tree uses sector-colored headers
- [ ] Tree generated from TAXONOMY data (not hardcoded)
- [ ] All 4 sectors represented with full hierarchy
- [ ] Unit Types sub-tab shows self-sufficient vs structure-dependent split
- [ ] Transaction Types sub-tab has validation matrix
- [ ] Platform Mappings shows placeholder
- [ ] Spreadsheet link utility bar present
