# Sprint 2.3: Input Flows & Syndication Tabs

## Goal

Build the Input Flows tab (three input strategies) and Syndication tab (inbound/outbound architecture). These tabs have more complex diagrams and code displays.

---

## Deliverables

- [ ] `tabs/input-flows.html` complete with all content
- [ ] `tabs/syndication.html` complete with all content
- [ ] Strategy cards working
- [ ] Flow diagram component working
- [ ] Inference chain displays properly

---

## Tasks

### Task 1: Add Strategy Card Styles

Add to `css/components.css`:

- **`.strategy-card`** — bordered card with hover-to-purple effect
- **`.strategy-header`** — flex row with number circle and title
- **`.strategy-number`** — purple circle with number
- **`.strategy-title` / `.strategy-subtitle`** — display heading + gray subtitle
- **`.inference-chain`** — cream monospace block with `.user-input`, `.inferred`, `.arrow` classes
- **`.mock-form`** — 3-column grid of mock form fields
- **`.mock-field` / `.mock-select`** — styled form elements

### Task 2: Add Flow Diagram Styles

Add to `css/diagrams.css`:

- **`.flow-container`** — flex row for 3-column flow diagram
- **`.flow-column`** — bordered column with header
- **`.flow-item`** — colored items (`.inbound`, `.canonical`, `.outbound`)
- **`.flow-arrow`** — large centered arrow between columns
- **`.mini-arch`** — compact flex row of arch boxes (for Input Flows)
- Responsive: flow stacks vertically at 768px

### Task 3: Build Input Flows Tab Content

Replace placeholder in `tabs/input-flows.html` with full content:

- Doc label ("Data Collection")
- Page title and subtitle
- Big idea box ("The Macro Solution")
- Strategy 1: Inference — with inference chain showing Sarah's "Basement" example
- Strategy 2: AI / Photo Analysis — with extraction chain
- Strategy 3: Full Taxonomy — with mock enterprise dropdowns
- Architecture diagram showing all 3 paths converging to canonical output

### Task 4: Build Syndication Tab Content

Replace placeholder in `tabs/syndication.html` with full content:

- Doc label ("Data Flow")
- Page title and subtitle
- 3-column flow diagram (Inbound Sources → Canonical Storage → Outbound Destinations)
- "Inbound Challenge" comparison table (Yardi, RealPage, AppFolio, Acquisition)
- "Inbound Mapping Strategies" cards (Best-Effort, Source-Specific, AI)
- Yardi → Canonical mapping table
- "Outbound" section with platform-specific mapping code block
- Key questions callout

---

## Testing

1. Navigate to Input Flows tab
   - All 3 strategy cards render
   - Inference chains display with proper formatting
   - Mock form dropdowns work
   - Mini architecture diagram displays

2. Navigate to Syndication tab
   - Flow diagram shows 3 columns
   - Tables render correctly
   - Code blocks preserve whitespace
   - Callout displays at bottom

3. All tab navigation still works

---

## Reference

Copy content from `property-taxonomy-demo.html`:
- Input Flows tab: Lines ~435-580
- Syndication tab: Lines ~585-730

---

## Next Sprint

Sprint 2.4 will build the interactive Examples tab with tab switching and dynamic content.
