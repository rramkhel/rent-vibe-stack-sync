# Milestone 2: Property Taxonomy Demo

## Overview

Build an interactive demo/presentation explaining the Property Classification System architecture. This will be used to communicate the data model, input strategies, and syndication approach to stakeholders.

**Tech Stack:** Vanilla HTML, CSS, JavaScript (no frameworks)

**Reference:** `property-taxonomy-demo.html` — working single-file prototype

---

## What We're Building

A multi-tab documentation site with:

| Tab | Purpose |
|-----|---------|
| **Overview** | The vision, architecture diagram, use cases |
| **Data Model** | Dimensional hierarchy, the "Bible" concept |
| **Input Flows** | Three strategies for collecting data from users |
| **Syndication** | Inbound/outbound data flow architecture |
| **Live Examples** | Interactive example browser with 5 scenarios |

---

## Success Criteria

### Functional
- [ ] All 5 tabs render and switch correctly
- [ ] Example browser switches between 5 examples
- [ ] All diagrams and code blocks display properly
- [ ] Keyboard navigation works for tabs

### Visual
- [ ] Matches prototype styling exactly
- [ ] Platform colors consistent (BSTK/RentSync = teal)
- [ ] Code blocks preserve whitespace and syntax highlighting
- [ ] Responsive at tablet (768px) and mobile (480px)

### Code Quality
- [ ] Clean file organization (not one 2000-line file)
- [ ] CSS uses variables for colors/spacing
- [ ] JavaScript is modular and documented
- [ ] No console errors

---

## Project Structure

```
property-taxonomy/
├── index.html                 # Main entry, tab container
├── css/
│   ├── variables.css          # CSS custom properties
│   ├── base.css               # Reset, typography, global styles
│   ├── layout.css             # Header, tabs, page container
│   ├── components.css         # Cards, badges, callouts, tables
│   ├── diagrams.css           # Architecture diagrams, flow charts
│   └── code-blocks.css        # Syntax highlighting styles
├── js/
│   ├── main.js                # Tab switching, initialization
│   ├── examples.js            # Example browser interactivity
│   └── data.js                # Example data (canonical + mappings)
├── tabs/
│   ├── overview.html          # Tab 1 content
│   ├── data-model.html        # Tab 2 content
│   ├── input-flows.html       # Tab 3 content
│   ├── syndication.html       # Tab 4 content
│   └── examples.html          # Tab 5 content
└── README.md
```

---

## Sprint Breakdown

| Sprint | Focus | Deliverable |
|--------|-------|-------------|
| **2.1** | Foundation | Project setup, CSS system, header + tabs working |
| **2.2** | Static Content (Part 1) | Overview tab, Data Model tab |
| **2.3** | Static Content (Part 2) | Input Flows tab, Syndication tab |
| **2.4** | Interactive Content | Examples tab with working browser |
| **2.5** | Polish | Responsive, accessibility, QA |

---

## Key Design Decisions

### File Organization
- **Tabs as separate HTML files** — Loaded into main container via JS, keeps each tab manageable
- **CSS split by concern** — Variables, base, layout, components, diagrams, code
- **Data separate from markup** — Example scenarios stored in `data.js`, rendered by `examples.js`

### Platform Colors
BSTK and RentSync are aligned (same teal color):
```css
--bstk: #0d9488;
--rentsync: #0d9488;
```

### Tab Loading Strategy
Tabs are loaded dynamically from `tabs/*.html` via `fetch()`. Each tab file contains only inner content (no `<html>`/`<head>` wrapper). Content is fetched on first visit and cached via a `data-loaded` attribute. This keeps `index.html` as a thin shell (~60 lines) and each tab file focused and manageable.

**Requires a local server** (e.g. `python3 -m http.server 8080`).

---

## Dependencies

- Google Fonts: Fraunces, Commissioner, IBM Plex Mono
- No other external dependencies

---

## Timeline

| Sprint | Estimated Effort |
|--------|------------------|
| Sprint 2.1 | 2-3 hours |
| Sprint 2.2 | 2-3 hours |
| Sprint 2.3 | 2-3 hours |
| Sprint 2.4 | 2-3 hours |
| Sprint 2.5 | 1-2 hours |
| **Total** | **9-14 hours** |

---

## Reference Files

- `property-taxonomy-demo.html` — Complete working prototype (source of truth)
- Sprint docs: `sprint-2.1.md`, `sprint-2.2.md`, `sprint-2.3.md`, `sprint-2.4.md`, `sprint-2.5.md`
