# Sprint 3.2.1: Taxonomy Refinements — Delta Update

## Overview

Sprint 3.2 has already been completed and deployed. This sprint applies a set of refinements that came out of further taxonomy review. These are targeted find-and-replace style changes — not a rewrite.

**Scope:** Rename one structure type, remove one structure type, add five unit types, reorder unit type display lists, and clean up any stale references.

---

## Change Summary

| What | Old | New |
|---|---|---|
| Structure Type name | `multi_unit_lr` | `townhouse_plex` |
| Structure Type | `apartment` existed as its own type | **Remove entirely** — not a canonical type |
| Subtypes `loft`, `studio` | Were under `apartment` structure type | Move to **Unit Type** dimension |
| Unit Types added | — | `main_floor`, `loft`, `studio`, `garden_suite`, `garage_suite` |
| Unit Type display order | Alphabetical or unordered | Grouped by concept (see below) |

---

## Change 1: Rename `multi_unit_lr` → `townhouse_plex`

**Global find-and-replace across all files in `property-taxonomy/tabs/`:**

| Find | Replace with |
|---|---|
| `multi_unit_lr` | `townhouse_plex` |
| `Multi-Unit Low-Rise` | `Townhouse / Plex` |
| `Multi Unit Low Rise` | `Townhouse / Plex` |
| `multi-unit low-rise` | `townhouse/plex` |

Check these files specifically:
- `tabs/data-model.html` — Six Dimensions table, All Dimensions & Values table
- `tabs/platform-mappings.html` — group headers
- `tabs/taxonomy-tree.html` — card headers, tree structure
- `tabs/overview.html` — if referenced in architecture diagram or examples

---

## Change 2: Remove `apartment` as a Structure Type

**Context:** The sprint 3.2 build may have included `apartment` as a separate Structure Type (distinct from `apartment_bldg`). This was an error. "Apartment" is an ILS display name, not a canonical structure type.

**What to do:**

1. **In `tabs/data-model.html` — All Dimensions & Values table:**
   - Remove `apartment` from the Structure Type row if present
   - Remove `loft` and `studio` from the Structure Subtype row if they appear there
   - Ensure only these residential structure types exist: `house`, `townhouse_plex`, `apartment_bldg`, `cabin`

2. **In `tabs/taxonomy-tree.html`:**
   - If there's an "Apartment" card separate from "Apartment Building" — remove it entirely
   - `loft` and `studio` should NOT appear as subtypes of any structure type

3. **In `tabs/platform-mappings.html`:**
   - If there's an "Apartment" group separate from "Apartment Building" — remove it

---

## Change 3: Add New Unit Types

**In `tabs/data-model.html` — All Dimensions & Values table:**

Replace the Unit Type row's values with this grouped list:

```html
<td>
    <em style="color: var(--gray-400); font-size: 11px;">Whole / portions:</em>
    <code>entire</code>, <code>main_floor</code>, <code>suite</code>, <code>basement</code><br>
    <em style="color: var(--gray-400); font-size: 11px;">Specialty layouts:</em>
    <code>loft</code>, <code>studio</code><br>
    <em style="color: var(--gray-400); font-size: 11px;">Accessory units:</em>
    <code>garden_suite</code>, <code>garage_suite</code><br>
    <em style="color: var(--gray-400); font-size: 11px;">Rooms:</em>
    <code>room_private</code>, <code>room_shared</code><br>
    <em style="color: var(--gray-400); font-size: 11px;">Commercial:</em>
    <code>floor</code>, <code>spot</code>
</td>
```

**In `tabs/platform-mappings.html` — Unit Type Overrides table:**

Add these rows (insert them in display order — see Section 4 of the full mapping spec). The full table in display order should be:

| Canonical Unit Type | BSTK/RentSync | ILS Display | Spacelist | WoodCabins |
|---|---|---|---|---|
| `entire` | Entire Unit | *(implied)* | Entire | *(implied)* |
| `main_floor` | Main Floor | **Overrides to Apt Type: "Main Floor"** | n/a | n/a |
| `suite` | Suite | *(uses parent structure type)* | Suite | n/a |
| `basement` | Basement | **Overrides to Property Type: "Apartment", Apt Type: "Basement"** | n/a | n/a |
| `loft` | Loft | **Overrides to Apt Type: "Loft"** | n/a | n/a |
| `studio` | Studio | **Overrides to Apt Type: "Studio"** | n/a | n/a |
| `garden_suite` | Garden Suite | **Overrides to Apt Type: "Garden Suite"** | n/a | n/a |
| `garage_suite` | Garage Suite | **Overrides to Apt Type: "Garage Suite"** | n/a | n/a |
| `room_private` | Room | **Overrides to Property Type: "Room"** | n/a | n/a |
| `room_shared` | Room (Shared) | **Overrides to Property Type: "Room"** | n/a | n/a |
| `floor` | Floor | n/a | Floor | n/a |
| `spot` | Spot | n/a | Spot | n/a |

**In `tabs/taxonomy-tree.html` — Update subtype rows:**

Add the new unit types to the Valid Unit Types column for each subtype that supports them. Use the standard display order. Here are the affected rows:

| Structure Type → Subtype | Add these unit types |
|---|---|
| House → Detached | Main Floor, Garden Suite, Garage Suite |
| House → Garden Home | *(no change — already has Entire, Suite, Basement)* |
| Townhouse/Plex → Semi-Detached | Main Floor |
| Townhouse/Plex → Townhouse | Main Floor |
| Apartment Bldg → Low Rise | Loft, Studio |
| Apartment Bldg → Mid Rise | Loft, Studio |
| Apartment Bldg → High Rise | Loft, Studio |
| Apartment Bldg → Walk-up | Studio |

Full valid unit type lists after update (in display order):

- **Detached:** Entire, Main Floor, Suite, Basement, Garden Suite, Garage Suite, Room (Private), Room (Shared)
- **Mobile:** Entire *(unchanged)*
- **Garden Home:** Entire, Suite, Basement *(unchanged)*
- **Semi-Detached:** Entire, Main Floor, Suite, Basement, Room (Private), Room (Shared)
- **Townhouse:** Entire, Main Floor, Suite, Basement, Room (Private), Room (Shared)
- **Duplex:** Entire, Suite, Basement *(unchanged)*
- **Triplex:** Entire, Suite *(unchanged)*
- **Fourplex:** Entire, Suite *(unchanged)*
- **Low Rise:** Entire, Suite, Basement, Loft, Studio, Room (Private), Room (Shared)
- **Mid Rise:** Entire, Suite, Loft, Studio, Room (Private), Room (Shared)
- **High Rise:** Entire, Suite, Loft, Studio, Room (Private), Room (Shared)
- **Walk-up:** Entire, Suite, Studio, Room (Private), Room (Shared)
- All Cabin subtypes: Entire *(unchanged)*
- All Commercial subtypes: *(unchanged)*

---

## Change 4: Fix Six Dimensions Table Example Values

**In `tabs/data-model.html` — Six Dimensions table:**

Update the example values in the Structure Type and Unit Type rows to reflect the changes:

| Dimension | Old example values | New example values |
|---|---|---|
| Structure Type | ...`multi_unit_lr`... | ...`townhouse_plex`... |
| Structure Type | If `apartment` is listed as an example | Remove it, keep `apartment_bldg` |
| Unit Type | If missing new types | `entire`, `main_floor`, `basement`, `suite`, `loft`, `studio`, `room_private` |

---

## Change 5: Verify Display Ordering

Anywhere unit types are listed (data model table, taxonomy tree badges, platform mappings), they should follow this order — NOT alphabetical:

1. `entire`
2. `main_floor`
3. `suite`
4. `basement`
5. `loft`
6. `studio`
7. `garden_suite`
8. `garage_suite`
9. `room_private`
10. `room_shared`
11. `floor`
12. `spot`

If any list is currently alphabetical, reorder it.

---

## Testing Checklist

1. [ ] No instances of `multi_unit_lr` or "Multi-Unit Low-Rise" remain anywhere
2. [ ] `townhouse_plex` and "Townhouse / Plex" appear in all correct locations
3. [ ] No `apartment` as a standalone Structure Type (only `apartment_bldg` exists)
4. [ ] `loft` and `studio` appear as Unit Types, NOT as structure subtypes
5. [ ] `main_floor`, `garden_suite`, `garage_suite` appear in Unit Type lists
6. [ ] Unit Type display order is concept-grouped, not alphabetical
7. [ ] Platform Mappings unit type overrides table has all 12 rows
8. [ ] Taxonomy Tree unit type badges updated for Detached, Semi, Townhouse, apartment bldg subtypes
9. [ ] `sublet` does not appear anywhere
10. [ ] All tabs still load correctly
11. [ ] No console errors

---

## Execution

```bash
git add .
git commit -m "Taxonomy refinements: rename townhouse_plex, add unit types, fix display ordering

- Renamed multi_unit_lr → townhouse_plex across all tabs
- Removed 'apartment' as standalone structure type (loft/studio moved to unit types)
- Added unit types: main_floor, loft, studio, garden_suite, garage_suite
- Updated taxonomy tree with correct unit type assignments per subtype
- Standardized display ordering: concept-grouped, not alphabetical"
git push origin main
```
