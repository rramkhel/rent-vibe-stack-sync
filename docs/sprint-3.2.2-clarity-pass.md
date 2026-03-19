# Sprint 3.2.2: Data Model Tab — Clarity & Density Pass

## Overview

Three targeted changes to the Data Model tab to improve scannability. No structural changes, no new tabs.

---

## Change 1: Trim Example Values in Six Dimensions Table

**File:** `property-taxonomy/tabs/data-model.html`

**What to change:** In the "Six Dimensions" table, the Example Values column currently shows too many values including commercial ones. Trim to residential-only examples, and for Structure Subtype only show House and Townhouse/Plex subtypes.

**Updated Example Values column (leave all other columns unchanged):**

| Dimension | Example Values (replace with these) |
|---|---|
| Sector | `residential`, `commercial` *(keep both — only 2 values)* |
| Structure Type | `house`, `townhouse_plex`, `apartment_bldg`, `cabin` |
| Structure Subtype | `detached`, `mobile`, `semi`, `townhouse`, `duplex`, `triplex` |
| Unit Type | `entire`, `main_floor`, `basement`, `suite`, `loft`, `studio` |
| Transaction Type | `rent`, `sale`, `lease` |
| Purpose | `standard`, `student`, `senior`, `vacation` |

The idea: show enough values to understand the pattern, not every value in the system. The full list lives in the "All Dimensions & Values" table further down the page.

---

## Change 2: Rename "Listing Type" → "Transaction Type"

**Global find-and-replace across ALL files in `property-taxonomy/tabs/`:**

| Find | Replace with |
|---|---|
| `Listing Type` | `Transaction Type` |
| `listing_type` | `transaction_type` |
| `listing type` | `transaction type` |

**Files to check:**
- `tabs/data-model.html` — Six Dimensions table, All Dimensions & Values table, example cards, sentence formula
- `tabs/taxonomy-tree.html` — column headers, badge labels
- `tabs/platform-mappings.html` — if referenced
- `tabs/overview.html` — if referenced in architecture diagram or comparison tables
- `tabs/live-examples.html` — form labels, dropdowns
- `tabs/data-flow.html` — if referenced

**Also update:**
- The sentence formula box (if it says "listing" as a dimension label, change to "transaction")
- Any colored dimension spans: `.dim-listing` CSS class can stay as-is (it's just styling), but the visible *text* should say "Transaction Type" not "Listing Type"
- Badge labels in the taxonomy tree: `<span class="badge badge-green">Rent</span>` — these are fine, they show values not the dimension name

**Do NOT rename:**
- The CSS class `.dim-listing` — leave the class name alone, only change visible text
- The `--dim-listing` CSS variable — leave it alone

---

## Change 3: Compact the Example Cards

**File:** `property-taxonomy/tabs/data-model.html`

**What to change:** The three example cards (Student Basement Rental, Commercial Office Lease, Vacation Cabin Rental) currently show as full-width stacked cards with a sentence + a breakdown grid. They take up too much vertical space.

**Approach:** Convert from 3 stacked full-width cards to a **3-column grid of compact cards**. Remove the sentence from each card (the sentence formula is already shown above — no need to repeat it per example). Keep only the dimension breakdown.

**New structure:**

```html
<div class="grid-3">

    <!-- Example 1 -->
    <div class="card">
        <div class="card-header" style="padding: 12px 16px;">
            <div class="card-title" style="font-size: 13px;">🏠 Student Basement Rental</div>
        </div>
        <div class="card-body" style="padding: 12px 16px;">
            <div class="example-breakdown" style="gap: 6px;">
                <div class="example-row">
                    <span class="example-label">Sector:</span>
                    <span class="example-value">Residential</span>
                </div>
                <div class="example-row">
                    <span class="example-label">Structure:</span>
                    <span class="example-value">House → Detached</span>
                </div>
                <div class="example-row">
                    <span class="example-label">Unit Type:</span>
                    <span class="example-value">Basement</span>
                </div>
                <div class="example-row">
                    <span class="example-label">Transaction:</span>
                    <span class="example-value">Rent</span>
                </div>
                <div class="example-row">
                    <span class="example-label">Purpose:</span>
                    <span class="example-value">Student</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Example 2 -->
    <div class="card">
        <div class="card-header" style="padding: 12px 16px;">
            <div class="card-title" style="font-size: 13px;">🏢 Corporate Office Lease</div>
        </div>
        <div class="card-body" style="padding: 12px 16px;">
            <div class="example-breakdown" style="gap: 6px;">
                <div class="example-row">
                    <span class="example-label">Sector:</span>
                    <span class="example-value">Commercial</span>
                </div>
                <div class="example-row">
                    <span class="example-label">Structure:</span>
                    <span class="example-value">Office → Class A</span>
                </div>
                <div class="example-row">
                    <span class="example-label">Unit Type:</span>
                    <span class="example-value">Floor</span>
                </div>
                <div class="example-row">
                    <span class="example-label">Transaction:</span>
                    <span class="example-value">Lease</span>
                </div>
                <div class="example-row">
                    <span class="example-label">Purpose:</span>
                    <span class="example-value">Corporate</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Example 3 -->
    <div class="card">
        <div class="card-header" style="padding: 12px 16px;">
            <div class="card-title" style="font-size: 13px;">🏕 Vacation Cabin Rental</div>
        </div>
        <div class="card-body" style="padding: 12px 16px;">
            <div class="example-breakdown" style="gap: 6px;">
                <div class="example-row">
                    <span class="example-label">Sector:</span>
                    <span class="example-value">Residential</span>
                </div>
                <div class="example-row">
                    <span class="example-label">Structure:</span>
                    <span class="example-value">Cabin → A-Frame</span>
                </div>
                <div class="example-row">
                    <span class="example-label">Unit Type:</span>
                    <span class="example-value">Entire</span>
                </div>
                <div class="example-row">
                    <span class="example-label">Transaction:</span>
                    <span class="example-value">Rent</span>
                </div>
                <div class="example-row">
                    <span class="example-label">Purpose:</span>
                    <span class="example-value">Vacation</span>
                </div>
            </div>
        </div>
    </div>

</div>
```

**Key changes from current:**
- Removed the full sentence from each card (redundant with formula above)
- 3-column grid instead of stacked full-width
- Tighter padding (12px 16px instead of default card padding)
- Smaller title font (13px)
- Merged "Structure Type" and "Structure Subtype" into one "Structure" row showing `Type → Subtype` to save a row
- Changed "Listing Type" label to "Transaction"
- Reduced gap in breakdown to 6px

**Note:** If `.grid-3` doesn't exist in the CSS, use inline styles: `style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;"`. On mobile it should collapse — if `.grid-3` already has responsive behavior, great. If not, add a quick `@media (max-width: 768px)` that makes it single-column, or just use the inline grid and accept it'll be fine on desktop (this is an internal tool).

---

## Testing Checklist

1. [ ] Six Dimensions table: Example Values show only residential examples (no `office`, `class_a`, `warehouse`, etc.)
2. [ ] Six Dimensions table: Structure Subtype examples are only House + Townhouse/Plex subtypes
3. [ ] "Listing Type" does not appear anywhere in visible text — all replaced with "Transaction Type"
4. [ ] CSS class names (`.dim-listing`, `--dim-listing`) are NOT changed — only visible labels
5. [ ] Example cards render as 3-column grid, not stacked
6. [ ] Example cards don't show the sentence — just the dimension breakdown
7. [ ] Example cards use "Transaction" not "Listing Type"
8. [ ] Sentence formula box (if present) updated to say "Transaction Type"
9. [ ] Taxonomy tree column header says "Transaction Type" not "Listing Type"
10. [ ] All tabs still load correctly
11. [ ] No console errors

---

## Execution

```bash
git add .
git commit -m "Data model clarity pass: trim examples, compact cards, rename to transaction type

- Six Dimensions table: example values trimmed to residential-focused subset
- Example cards: converted to compact 3-column grid, removed redundant sentences
- Renamed Listing Type → Transaction Type across all tabs"
git push origin main
```
