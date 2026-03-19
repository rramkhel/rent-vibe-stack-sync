# Sprint 3.2: Property Taxonomy Page — Major Content Update

## Overview

Update the property-taxonomy section of rent-vibe-stack-sync with revised taxonomy data, an overhauled platform mapping tab, and a new taxonomy tree tab. These changes reflect weeks of taxonomy design work and need to land accurately.

**This is a content-heavy update, not a structural/CSS overhaul.** The existing design system, CSS variables, component classes, and tab-loading architecture stay exactly as they are. You're updating HTML content inside existing tab files and adding one new tab.

---

## Context

The site is a static HTML/CSS/JS site with no build step. It lives at:
- **Repo root:** `/Users/jupiter/Projects/rent-vibe-stack-sync`
- **Property taxonomy section:** `property-taxonomy/`
- **Tab content files:** `property-taxonomy/tabs/*.html` (loaded dynamically by `js/main.js`)
- **CSS:** `property-taxonomy/css/` (variables.css, base.css, layout.css, components.css)
- **Live URL:** `https://rent-vibe-stack-sync.vercel.app/property-taxonomy/`

**Do NOT change:** CSS files, layout.css, variables.css, js/main.js structure, index.html header/nav structure, or any other tabs not mentioned here. Only modify the files explicitly listed below.

---

## Change 1: Data Model Tab — Six Dimensions Table (Cardinality)

**File:** `property-taxonomy/tabs/data-model.html`

**What to change:** Find the "Six Dimensions" table (the one with columns: Dimension, Question It Answers, Example Values). Add a fourth column called **"Cardinality"** that shows the relationship between each dimension and a listing.

Update the table to look like this:

| Dimension | Question It Answers | Example Values | Cardinality |
|---|---|---|---|
| **Sector** | What broad category? | `residential`, `commercial` | 1:1 — one per property |
| **Structure Type** | What kind of building? | `house`, `apartment_bldg`, `multi_unit_lr`, `cottage`, `office`, `retail`, `industrial` | 1:1 — one per property |
| **Structure Subtype** | What specific variation? | `detached`, `semi`, `townhouse`, `duplex`, `low_rise`, `high_rise`, `aframe`, `yurt`, `class_a` | 1:1 — one per property |
| **Unit Type** | What portion is listed? | `entire`, `basement`, `suite`, `room_private`, `room_shared`, `floor`, `loft`, `spot` | 1:1 — one per listing |
| **Listing Type** | What's the transaction? | `rent`, `sale`, `lease` | 1:1 — one per listing |
| **Purpose** | Who/what is it for? | `standard`, `student`, `senior`, `corporate`, `vacation`, `short_term`, `military` | 1:N — a listing can have multiple |

**Implementation notes:**
- Use a `<span class="badge badge-gray">1:1</span>` for the 1:1 entries
- Use a `<span class="badge badge-teal">1:N</span>` for Purpose
- Add a brief note after the table: "Most dimensions are 1:1 — a property has exactly one sector, one structure type, etc. Purpose is the exception: a listing can be tagged as both Student and Short-Term simultaneously."

---

## Change 2: Data Model Tab — All Dimensions & Values Table (Expand)

**File:** `property-taxonomy/tabs/data-model.html`

**What to change:** Find the "All Dimensions & Values" table (the one with columns: Dimension, Current Values, Extensible?). Replace it entirely with the updated and expanded version below. The current version is outdated — it's missing the Multi-Unit Low-Rise structure type, has wrong subtypes, and lists `sublet` as a listing type (it was removed).

Replace the table body with:

```html
<tbody>
    <tr>
        <td><strong>Sector</strong></td>
        <td><code>residential</code>, <code>commercial</code></td>
        <td><span class="badge badge-gray">Fixed</span></td>
    </tr>
    <tr>
        <td><strong>Structure Type</strong></td>
        <td>
            <em style="color: var(--gray-400); font-size: 11px;">Residential:</em>
            <code>house</code>, <code>multi_unit_lr</code>, <code>apartment_bldg</code>, <code>cottage</code><br>
            <em style="color: var(--gray-400); font-size: 11px;">Commercial:</em>
            <code>office</code>, <code>retail</code>, <code>industrial</code>, <code>hospitality</code>, <code>recreation</code>, <code>land</code>, <code>parking</code>
        </td>
        <td><span class="badge badge-teal">Yes</span></td>
    </tr>
    <tr>
        <td><strong>Structure Subtype</strong></td>
        <td>
            <em style="color: var(--gray-400); font-size: 11px;">House:</em>
            <code>detached</code>, <code>mobile</code>, <code>garden_home</code><br>
            <em style="color: var(--gray-400); font-size: 11px;">Multi-Unit Low-Rise:</em>
            <code>semi</code>, <code>townhouse</code>, <code>duplex</code>, <code>triplex</code>, <code>fourplex</code><br>
            <em style="color: var(--gray-400); font-size: 11px;">Apartment Building:</em>
            <code>low_rise</code>, <code>mid_rise</code>, <code>high_rise</code>, <code>walkup</code><br>
            <em style="color: var(--gray-400); font-size: 11px;">Cottage/Cabin:</em>
            <code>cottage</code>, <code>cabin</code>, <code>aframe</code>, <code>chalet</code>, <code>yurt</code>, <code>treehouse</code><br>
            <em style="color: var(--gray-400); font-size: 11px;">Commercial:</em>
            <code>class_a</code>, <code>class_b</code>, <code>class_c</code>, <code>coworking</code>, <code>storefront</code>, <code>mall</code>, <code>strip_mall</code>, <code>warehouse</code>, <code>manufacturing</code>, <code>flex</code>, <code>storage</code>, <code>hotel</code>, <code>motel</code>, <code>bnb</code>, <code>marina</code>, <code>campground</code>, <code>agricultural</code>, <code>vacant</code>
        </td>
        <td><span class="badge badge-teal">Yes</span></td>
    </tr>
    <tr>
        <td><strong>Unit Type</strong></td>
        <td>
            <code>entire</code>, <code>basement</code>, <code>suite</code>, <code>room_private</code>, <code>room_shared</code>, <code>floor</code>, <code>loft</code>, <code>spot</code>
        </td>
        <td><span class="badge badge-teal">Yes</span></td>
    </tr>
    <tr>
        <td><strong>Listing Type</strong></td>
        <td><code>rent</code>, <code>sale</code>, <code>lease</code></td>
        <td><span class="badge badge-gray">Fixed</span></td>
    </tr>
    <tr>
        <td><strong>Purpose</strong></td>
        <td>
            <code>standard</code>, <code>student</code>, <code>senior</code>, <code>corporate</code>,
            <code>vacation</code>, <code>short_term</code>, <code>military</code>
        </td>
        <td><span class="badge badge-teal">Yes</span></td>
    </tr>
</tbody>
```

**Key changes from the old version:**
- `sublet` removed from Listing Type (it was deprecated — now only `rent`, `sale`, `lease`)
- `multi_unit_lr` added as a Structure Type (this is new — houses Semi-Detached, Townhouse, Duplex, Triplex, Fourplex)
- `hospitality`, `recreation`, `land`, `parking` added as commercial Structure Types
- Structure Subtypes now grouped by parent Structure Type for readability
- Commercial subtypes fully expanded (Class A/B/C, Storefront, Mall, etc.)
- Unit Types now include `room_private`, `room_shared` (split from generic "room"), `loft`, `spot`

---

## Change 3: Platform Mappings Tab — Complete Overhaul

**File:** `property-taxonomy/tabs/platform-mappings.html`

**What to do:** Replace the ENTIRE content of this file. The current version has a basic flat mapping table. Replace it with a much richer view organized by Structure Type groups, with collapsible sections, color-coded display value chips, and sections for Unit Type and Ownership override mappings.

**Design approach:** Use the existing site CSS classes (`.card`, `.data-table`, `.badge`, `.callout`, etc.) and light-theme color palette. Do NOT import dark-theme styles. The new content should feel native to the existing site.

**Structure of the new content:**

### Section 1: Introduction
Brief explanation — same text as the current version's intro about canonical data being stored granularly and platform mapping determining display.

### Section 2: Legend
A small inline legend showing what the color indicators mean:
- **Green text** = same name on platform as canonical
- **Amber/yellow text** = renamed for this platform  
- **Blue text** = collapsed into a parent category
- **Gray italic** = hidden / not shown on this platform

Use existing badge classes: `.badge-green`, `.badge-amber`, `.badge-teal`, `.badge-gray`

### Section 3: Mapping Table — Organized by Structure Type Group

Replace the current flat table with a grouped structure. Each group is a card with a header showing the Structure Type, and rows for each subtype showing the 4 platform columns.

**Platforms (column headers):**
1. 🏢 BSTK / RentSync (Enterprise) — use `.badge-teal` for header
2. 🌐 ILS Network (Rentals.ca, RentFaster, etc.) — use `.badge-green` for header
3. 🏬 Spacelist (Commercial) — use `.badge-amber` for header
4. 🌲 WoodCabins.ca (Niche demo) — use `.badge-gray` for header

**Groups and their mappings:**

#### House
| Canonical Subtype | BSTK/RentSync | ILS | Spacelist | WoodCabins |
|---|---|---|---|---|
| Detached `detached` | House → Detached | House | *hidden* | *hidden* |
| Mobile / Manufactured `mobile` | Mobile Home | House *(collapsed)* | *hidden* | *hidden* |
| Garden Home `garden_home` | Garden Home | House *(collapsed)* | *hidden* | *hidden* |

#### Multi-Unit Low-Rise
| Canonical Subtype | BSTK/RentSync | ILS | Spacelist | WoodCabins |
|---|---|---|---|---|
| Semi-Detached `semi` | Semi House | House *or* Duplex | *hidden* | *hidden* |
| Townhouse / Row `townhouse` | Town House | Townhouse | *hidden* | *hidden* |
| Duplex `duplex` | Duplex | Duplex | *hidden* | *hidden* |
| Triplex `triplex` | Triplex | House *or* Multi-Unit *(collapsed)* | *hidden* | *hidden* |
| Fourplex `fourplex` | Fourplex | House *or* Multi-Unit *(collapsed)* | *hidden* | *hidden* |

#### Apartment Building
| Canonical Subtype | BSTK/RentSync | ILS | Spacelist | WoodCabins |
|---|---|---|---|---|
| Low Rise `low_rise` | Low Rise Apartment | Apartment *(collapsed)* | *hidden* | *hidden* |
| Mid Rise `mid_rise` | Mid Rise Apartment | Apartment *(collapsed)* | *hidden* | *hidden* |
| High Rise `high_rise` | High Rise Apartment | Apartment *(collapsed)* | *hidden* | *hidden* |
| Walk-up `walkup` | Low Rise Apartment *(renamed)* | Apartment *(collapsed)* | *hidden* | *hidden* |

#### Cottage / Cabin
| Canonical Subtype | BSTK/RentSync | ILS | Spacelist | WoodCabins |
|---|---|---|---|---|
| Cottage `cottage` | Cottage | House *(collapsed)* | *hidden* | Cottage |
| Cabin `cabin` | Cabin | House *(collapsed)* | *hidden* | Cabin |
| A-Frame `aframe` | Cabin *(renamed)* | House *(collapsed)* | *hidden* | A-Frame |
| Chalet `chalet` | Cabin *(renamed)* | House *(collapsed)* | *hidden* | Chalet |
| Yurt `yurt` | Cabin *(renamed)* | House *(collapsed)* | *hidden* | Yurt |
| Treehouse `treehouse` | Cabin *(renamed)* | House *(collapsed)* | *hidden* | Treehouse |

#### Office Building *(Commercial)*
| Canonical Subtype | BSTK/RentSync | ILS | Spacelist | WoodCabins |
|---|---|---|---|---|
| Class A `class_a` | *hidden* | *hidden* | Office — Class A | *hidden* |
| Class B `class_b` | *hidden* | *hidden* | Office — Class B | *hidden* |
| Class C `class_c` | *hidden* | *hidden* | Office — Class C | *hidden* |
| Co-working `coworking` | *hidden* | *hidden* | Co-working | *hidden* |

#### Retail *(Commercial)*
| Canonical Subtype | BSTK/RentSync | ILS | Spacelist | WoodCabins |
|---|---|---|---|---|
| Storefront `storefront` | *hidden* | *hidden* | Retail — Storefront | *hidden* |
| Mall `mall` | *hidden* | *hidden* | Retail — Mall | *hidden* |
| Strip Mall `strip_mall` | *hidden* | *hidden* | Retail — Strip Mall | *hidden* |

#### Industrial *(Commercial)*
| Canonical Subtype | BSTK/RentSync | ILS | Spacelist | WoodCabins |
|---|---|---|---|---|
| Warehouse `warehouse` | *hidden* | *hidden* | Industrial — Warehouse | *hidden* |
| Manufacturing `manufacturing` | *hidden* | *hidden* | Industrial — Manufacturing | *hidden* |
| Flex Space `flex` | *hidden* | *hidden* | Industrial — Flex | *hidden* |
| Storage `storage` | *hidden* | *hidden* | Industrial — Storage | *hidden* |

### Section 4: Unit Type Overrides

A separate card/table showing how Unit Types affect ILS display. This is important because some unit types *override* the structure type display on ILS:

| Canonical Unit Type | BSTK/RentSync | ILS Display | Spacelist | WoodCabins |
|---|---|---|---|---|
| `entire` | Entire Unit | *(implied — not shown separately)* | Entire | *(implied)* |
| `basement` | Basement | **Overrides to Property Type: "Apartment", Apt Type: "Basement"** | n/a | n/a |
| `suite` | Suite | *(uses parent structure type)* | Suite | n/a |
| `room_private` | Room | **Overrides to Property Type: "Room"** | n/a | n/a |
| `room_shared` | Room (Shared) | **Overrides to Property Type: "Room"** | n/a | n/a |
| `floor` | Floor | n/a | Floor | n/a |

Add a callout after this table:
> **Why this matters:** On ILS sites, "Room" and "Basement" aren't structure types — they're Unit Types that override the display. A "Room" in a Townhouse displays as Property Type: "Room" on Rentals.ca, not "Townhouse." This is how we support third-party feeds like Roomies without needing "Room" as a Structure Type.

### Section 5: Ownership Display Overrides

Another card/table:

| Ownership Value | BSTK/RentSync | ILS Display | Notes |
|---|---|---|---|
| `condo` | Ownership field: "Condo" | **Overrides to Property Type: "Condo"** | Replaces structure type in ILS display |
| `coop` | Ownership field: "Co-op" | Category tag: "Co-op Housing" | Adds filter tag, doesn't replace type |
| `freehold` | Ownership field: "Freehold" | *(no override — uses structure type)* | Default behavior |

Add a callout:
> **"Condo" on ILS = Ownership, not Structure.** When a renter searches for "Condo" on Rentals.ca, the system queries all listings where `ownership = condo`, regardless of structure type. This means high-rises, townhouses, and even houses can appear in Condo search results.

### Section 6: How to Add a Platform

Keep the existing callout/card about extensibility but update the text:

> **Adding a new platform requires zero schema changes.** Decide which canonical values are visible, pick display names, add rows to the mapping table. Everything not explicitly mapped is hidden by default. WoodCabins.ca demonstrates this — it only sees Cottage/Cabin subtypes while everything else is invisible.

**Styling guidance for this tab:**
- Use `.data-table` for all tables
- Use `<code>` tags for canonical values
- For "hidden" cells: `<td class="text-muted"><em>hidden</em></td>`
- For "renamed" values: show the display name in regular text + a small note like `<span style="color: var(--gray-400); font-size: 11px;">(renamed)</span>`
- For "collapsed" values: show the parent name + `<span style="color: var(--gray-400); font-size: 11px;">(collapsed)</span>`
- For override values: **bold** the display value to draw attention

---

## Change 4: New Tab — Taxonomy Tree

### Step 1: Add the tab button to index.html

**File:** `property-taxonomy/index.html`

Add a new tab button in the nav, between "Platform Mappings" and "Data Flow":

```html
<button class="nav-tab" data-tab="taxonomy-tree" role="tab" aria-selected="false">Taxonomy Tree</button>
```

Add the corresponding tab content container in main:

```html
<div id="taxonomy-tree" class="tab-content" role="tabpanel"></div>
```

### Step 2: Create the tab content file

**File to create:** `property-taxonomy/tabs/taxonomy-tree.html`

This tab displays the full hierarchical tree of the taxonomy with collapsible sections. It should use the **existing site's light-theme CSS** — NOT the dark theme from the standalone HTML files.

**Content structure:**

#### Header section
```html
<section class="content-section">
    <h2 class="section-title">Taxonomy Tree</h2>
    <p class="section-subtitle">The complete hierarchy of canonical values, organized by Sector → Structure Type → Structure Subtype. Each subtype row shows which Unit Types, Listing Types, and Purposes are valid for that classification.</p>
</section>
```

#### Callout about the roll-up test
```html
<div class="callout callout-purple has-icon">
    <div class="callout-icon">🧪</div>
    <div>
        <div class="callout-title">The Roll-Up Test</div>
        <div class="callout-text">
            Categorization uses the "roll-up test": if a platform only shows the parent category, would a user expect to find this subtype there? This is why Townhouse lives under Multi-Unit Low-Rise (not House) — a user searching "House" wouldn't expect attached housing.
        </div>
    </div>
</div>
```

#### Tree structure

Build the tree using nested cards. Each Structure Type is a card with a header, and subtypes are table rows inside it. Each subtype row has 4 columns:

1. **Subtype name** + canonical code in `<code>` tag
2. **Valid Unit Types** — shown as small badge chips
3. **Valid Listing Types** — shown as small badge chips
4. **Valid Purposes** — shown as small badge chips (or "Any" if all apply)

**The full tree data:**

**RESIDENTIAL SECTOR**

**House** — Standalone single-dwelling structures
| Subtype | Unit Types | Listing Types | Purposes |
|---|---|---|---|
| Detached `detached` | Entire, Basement, Suite, Room | Rent, Sale | Any |
| Mobile / Manufactured `mobile` | Entire | Rent, Sale | Standard, Senior |
| Garden Home `garden_home` | Entire, Basement, Suite | Rent, Sale | Any |

**Multi-Unit Low-Rise** — Attached housing, 2-6 units, shares walls
| Subtype | Unit Types | Listing Types | Purposes |
|---|---|---|---|
| Semi-Detached `semi` | Entire, Basement, Suite, Room | Rent, Sale | Any |
| Townhouse / Row `townhouse` | Entire, Basement, Suite, Room | Rent, Sale | Any |
| Duplex `duplex` | Entire, Basement, Suite | Rent, Sale | Any |
| Triplex `triplex` | Entire, Suite | Rent, Sale | Any |
| Fourplex `fourplex` | Entire, Suite | Rent, Sale | Any |

**Apartment Building** — Multi-unit rental buildings, 5+ units
| Subtype | Unit Types | Listing Types | Purposes |
|---|---|---|---|
| Low Rise `low_rise` | Entire, Basement, Suite, Room, Loft | Rent | Any |
| Mid Rise `mid_rise` | Entire, Suite, Room, Loft | Rent | Any |
| High Rise `high_rise` | Entire, Suite, Room, Loft | Rent | Any |
| Walk-up `walkup` | Entire, Suite, Room | Rent | Any |

**Cottage / Cabin** — Recreational and rural dwellings
| Subtype | Unit Types | Listing Types | Purposes |
|---|---|---|---|
| Cottage `cottage` | Entire | Rent | Vacation, Short-Term, Standard |
| Cabin `cabin` | Entire | Rent | Vacation, Short-Term, Standard |
| A-Frame `aframe` | Entire | Rent | Vacation, Short-Term, Standard |
| Chalet `chalet` | Entire | Rent | Vacation, Short-Term, Standard |
| Yurt `yurt` | Entire | Rent | Vacation, Short-Term |
| Treehouse `treehouse` | Entire | Rent | Vacation, Short-Term |

**COMMERCIAL SECTOR**

**Office Building**
| Subtype | Unit Types | Listing Types | Purposes |
|---|---|---|---|
| Class A `class_a` | Entire, Suite, Floor | Lease, Sale | Standard, Corporate |
| Class B `class_b` | Entire, Suite, Floor | Lease, Sale | Standard, Corporate |
| Class C `class_c` | Entire, Suite, Floor | Lease, Sale | Standard, Corporate |
| Co-working `coworking` | Suite, Spot | Lease | Standard, Corporate |

**Retail**
| Subtype | Unit Types | Listing Types | Purposes |
|---|---|---|---|
| Storefront `storefront` | Entire, Suite | Lease, Sale | Standard |
| Mall / Shopping Centre `mall` | Suite | Lease | Standard |
| Strip Mall `strip_mall` | Suite | Lease, Sale | Standard |

**Industrial**
| Subtype | Unit Types | Listing Types | Purposes |
|---|---|---|---|
| Warehouse `warehouse` | Entire, Floor | Lease, Sale | Standard |
| Manufacturing `manufacturing` | Entire | Lease, Sale | Standard |
| Flex Space `flex` | Entire, Suite | Lease | Standard |
| Storage Facility `storage` | Entire, Suite | Lease | Standard |

**Hospitality**
| Subtype | Unit Types | Listing Types | Purposes |
|---|---|---|---|
| Hotel `hotel` | Entire | Sale, Lease | Standard |
| Motel `motel` | Entire | Sale, Lease | Standard |
| B&B `bnb` | Entire | Sale, Lease | Vacation |

**Recreation**
| Subtype | Unit Types | Listing Types | Purposes |
|---|---|---|---|
| Marina `marina` | Spot | Lease | Standard |
| Campground `campground` | Spot | Lease | Vacation |

**Land**
| Subtype | Unit Types | Listing Types | Purposes |
|---|---|---|---|
| Agricultural `agricultural` | Entire | Sale, Lease | Standard |
| Vacant Lot `vacant` | Entire | Sale, Lease | Standard |

**Styling for the tree:**
- Each Sector is an `<h3>` with a colored bar (existing `h3::before` style handles this)
- Each Structure Type is a `.card` with `.card-header` showing the name and a brief description
- Subtypes are `.data-table` rows inside the card body
- Unit Type / Listing Type / Purpose chips should use inline badge styling: `<span class="badge badge-teal">Entire</span>` for unit types, `<span class="badge badge-green">Rent</span>` for listing types, `<span class="badge badge-pink">Vacation</span>` for purposes
- "Any" for purposes can be a simple `<span class="badge badge-gray">Any</span>`

#### Deferred Decisions Section

After the tree, add a section:

```html
<h3>Deferred Decisions</h3>
<p class="section-subtitle">Items removed from the core tree, parked for focused stakeholder decisions.</p>
```

Then a table:

| Item | Question | Current Recommendation |
|---|---|---|
| Luxury | Subtype or quality attribute? | Attribute (amenity tier) — not a structure type |
| Loft | Unit Type or Structure Subtype? | Currently in Unit Type — needs confirmation |
| Main Floor / Garage Suite / Laneway Suite | Specific unit types or collapse to "Suite" + location attribute? | TBD — stakeholder input needed |
| Sublet | Listing Type or Purpose? | Listing Type (can't be both) |
| Lease-to-Own / Rent-to-Own | Low volume — deprecate or keep? | Needs stakeholder sign-off |
| Co-op | Ownership attribute, Purpose, or Listing Type? | Ownership attribute |

#### Related Attributes Section

Add a brief section showing that Ownership and Listing Structure live outside the main tree:

**Ownership / Tenure** (tracked as attribute, not a dimension):
`freehold`, `condo`, `coop`, `leasehold`, `rental`, `own_other`

**Listing Structure** (derived, not declared):
- Unit (units == 1) → single-family billing
- Building (units > 1) → multi-family billing  
- Community (buildings > 1) → wrapper for marketing/billing

---

## Additional Suggestions

While you're in these files, also make these small improvements:

### 1. Update the Overview tab's architecture diagram
**File:** `property-taxonomy/tabs/overview.html`

If the architecture diagram still shows "Condo" or "Multiplex" as a Structure Type in any example values, update those references to match the new taxonomy. Condo is now an ownership attribute, not a structure type. Multiplex was renamed to Multi-Unit Low-Rise.

### 2. Update the "Condo is Ownership" callout on the Data Model tab
**File:** `property-taxonomy/tabs/data-model.html`

The existing callout about "Condo is Ownership, Not Structure" is already there and correct. Keep it. But if there are any other references to "Condo Building" as a structure type anywhere in the file, remove them.

### 3. Verify main.js handles the new tab
**File:** `property-taxonomy/js/main.js`

The tab loading logic should already handle new tabs dynamically (it reads `data-tab` attributes and fetches `tabs/{name}.html`). Verify this works for `taxonomy-tree` — you shouldn't need to change anything, but confirm the new tab loads correctly.

---

## Testing Checklist

1. [ ] Data Model tab: Six Dimensions table has 4 columns including Cardinality
2. [ ] Data Model tab: All Dimensions & Values table has expanded, accurate values
3. [ ] Data Model tab: `sublet` no longer appears in Listing Type
4. [ ] Data Model tab: `multi_unit_lr` appears in Structure Type
5. [ ] Platform Mappings tab: All structure type groups present with correct mappings
6. [ ] Platform Mappings tab: Unit Type overrides section present (Room, Basement, Condo)
7. [ ] Platform Mappings tab: Ownership overrides section present
8. [ ] Taxonomy Tree tab: New tab button appears in nav
9. [ ] Taxonomy Tree tab: Tab loads content when clicked
10. [ ] Taxonomy Tree tab: All residential and commercial subtypes present
11. [ ] Taxonomy Tree tab: Cross-dimensional columns (Unit/Listing/Purpose) accurate
12. [ ] Taxonomy Tree tab: Deferred decisions table present
13. [ ] No broken tab switching — all existing tabs still work
14. [ ] No console errors
15. [ ] Verify locally before pushing

---

## Execution Order

1. Start with Change 1 and 2 (Data Model tab) — smallest changes, easy to verify
2. Then Change 4 (new Taxonomy Tree tab) — new file, no risk of breaking existing content
3. Then Change 3 (Platform Mappings overhaul) — largest change, replaces existing content
4. Run through the testing checklist
5. Commit and push

```bash
git add .
git commit -m "Update property taxonomy: expanded data model, overhauled platform mappings, added taxonomy tree tab

- Data Model: added cardinality column, expanded all values table
- Platform Mappings: complete rewrite with grouped structure types, unit type overrides, ownership overrides
- New tab: Taxonomy Tree with full hierarchy and cross-dimensional validation
- Removed deprecated values (sublet), added new structure types (multi_unit_lr)"
git push origin main
```
