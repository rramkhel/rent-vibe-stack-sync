# Sprint 2.2: Overview & Data Model Tabs

## Goal

Build out the first two tabs with full content, including the architecture diagram, dimension table, and all supporting components.

---

## Deliverables

- [ ] `tabs/overview.html` complete with all content
- [ ] `tabs/data-model.html` complete with all content
- [ ] Architecture diagram component working
- [ ] Dimension table styled
- [ ] All shared component styles added

---

## Tasks

### Task 1: Add Component Styles

Add to `css/components.css` the following component styles:

- **`.doc-label`** — uppercase label badge
- **`.page-title`** — large display heading
- **`.subtitle`** — warm-gray subheading
- **`.big-idea`** — purple gradient callout box
- **`.card-grid` / `.card`** — grid of hover-able cards with icons
- **`.platform-badge`** — colored pill badges per platform (`.rentals`, `.bstk`, `.rentsync`, `.spacelist`, `.woodcabins`, `.canonical`)
- **`.compare-table`** — styled comparison table
- **`.dimension-table`** — dark-header table with `.dimension-name`, `.dimension-values`, `.dim-value`
- **`.callout`** — warning-styled callout with icon
- **`.sentence-formula`** — dark box with color-coded formula spans (`.purpose`, `.listing`, `.unit`, `.structure`)

See sprint-2.2 reference CSS in `property-taxonomy-demo.html`.

### Task 2: Add Diagram Styles

Create `css/diagrams.css` with:

- **`.architecture-diagram`** — cream background container
- **`.arch-box` / `.arch-box.canonical`** — centered boxes with optional canonical gradient
- **`.arch-arrow`** — centered arrow divider
- **`.arch-row`** — flex row of platform boxes
- **`.arch-platform`** — platform cards with colored left borders (`.bstk`, `.rentsync`, `.rentals`, `.spacelist`, `.woodcabins`, `.future`)

### Task 3: Add Code Block Styles

Create `css/code-blocks.css` with:

- **`.code-block`** — dark background, monospace, pre-formatted
- Syntax classes: `.comment`, `.key`, `.string`, `.keyword`

### Task 4: Update index.html Head

Add the new CSS files to `index.html`:

```html
<link rel="stylesheet" href="css/diagrams.css">
<link rel="stylesheet" href="css/code-blocks.css">
```

### Task 5: Build Overview Tab Content

Replace placeholder in `tabs/overview.html` with full content:

- Doc label ("The Vision")
- Page title ("One Source of Truth, Many Platform Views")
- Big idea box with core principle quote
- Architecture diagram (Canonical → Mapping Layer → 6 platforms)
- "Why This Matters" section with 3 cards (Bible, UI Separate, Extensible)
- "The Four Use Cases" comparison table

### Task 6: Build Data Model Tab Content

Replace placeholder in `tabs/data-model.html` with full content:

- Doc label ("The Bible")
- Page title and subtitle
- Sentence formula box (colored spans for purpose/listing/unit/structure)
- Dimensions table (6 dimensions across 4 groupings)
- Callout about Condo/Community resolution
- Hierarchy visualization code block (tree structure)
- Extensibility cards (What We Do / What We Don't Do)

---

## Testing

1. Navigate to Overview tab
   - Architecture diagram renders correctly
   - Cards have hover effects
   - Table is properly styled

2. Navigate to Data Model tab
   - Sentence formula shows colored spans
   - Dimension table renders all rows
   - Code block preserves whitespace
   - Callout displays with warning styling

3. Tab switching continues to work (content loads on first visit)

---

## Reference

Copy content directly from `property-taxonomy-demo.html`:
- Overview tab: Lines ~180-280
- Data Model tab: Lines ~285-430
- Component styles: Lines ~115-280

---

## Next Sprint

Sprint 2.3 will build the Input Flows and Syndication tabs in `tabs/input-flows.html` and `tabs/syndication.html`.
