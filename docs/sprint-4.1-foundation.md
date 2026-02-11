# Sprint 4.1: Foundation — Container, Design System, Navigation

## Overview

Set up the container (`index.html`), CSS design system, and navigation. This is the shell that all tabs load into.

---

## File Structure

```
property-taxonomy/
├── index.html              ← Container: CSS design system, header, nav, tab shell, loads tab content
├── tabs/
│   ├── tab1-solution.html  ← Tab 1: The Solution (7 sections)
│   ├── tab2-builder.html   ← Tab 2: Interactive Listing Builder
│   ├── tab3-reference.html ← Tab 3: Full Reference (4 sub-tabs)
│   ├── tab4-metadata.html  ← Tab 4: Metadata (3 sub-tabs)
│   └── tab5-decisions.html ← Tab 5: Decisions & Open Questions
├── js/
│   ├── nav.js              ← Tab switching + sub-tab logic
│   ├── taxonomy-data.js    ← Complete TAXONOMY data model (shared)
│   ├── builder.js          ← Listing Builder interactive logic
│   └── community-demo.js   ← Community demo interactions (Tab 4)
└── css/
    └── styles.css          ← Complete design system
```

Tab content is loaded via fetch() and injected into tab panel divs. Load Tab 1 on page load; lazy-load others on first click.

---

## Design System

### CRITICAL: Preserve existing visual language
The existing `property-taxonomy-v4.html` file (in the repo) has a complete, working design system. **Preserve its visual language exactly** — the teal/slate palette, the badge system, the sentence formula styling, the platform cards, the data tables, the dimension cards. Do NOT redesign these components. Extract the CSS from that file as the starting point.

### Key CSS Variables
```css
:root {
  --teal: #0f766e; --teal-light: #ccfbf1; --teal-dark: #115e59;
  --dim-sector: #8b5cf6;       --dim-sector-light: #ede9fe;
  --dim-structure: #f59e0b;    --dim-structure-light: #fef3c7;
  --dim-subtype: #f97316;      --dim-subtype-light: #ffedd5;
  --dim-variant: #06b6d4;      --dim-variant-light: #cffafe;
  --dim-unit: #0f766e;         --dim-unit-light: #ccfbf1;
  --dim-transaction: #22c55e;  --dim-transaction-light: #dcfce7;
  --dim-purpose: #ec4899;      --dim-purpose-light: #fce7f3;
  --platform-ils: #22c55e;         --platform-ils-light: #dcfce7;
  --platform-enterprise: #0891b2;  --platform-enterprise-light: #cffafe;
  --platform-commercial: #d97706;  --platform-commercial-light: #fef3c7;
  --platform-mls: #8b5cf6;        --platform-mls-light: #ede9fe;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', 'Consolas', monospace;
}
```

Do NOT use Inter, Roboto, or generic AI-aesthetic fonts.

### 4 Callout Types (NEW — replaces old uniform callout)

The old site had 11 identical big colored callout blocks. v4.2 uses 4 distinct treatments:

**Type 1: Key Insight** `.callout-insight` (use 2-3 max across ENTIRE site)
- Full colored background, left border accent, prominent text
- For: "The Condo Problem — solved" (purple), "The Pattern" (teal)
```css
.callout-insight {
  background: var(--dim-sector-light); border: 1px solid var(--dim-sector-light);
  border-left: 3px solid var(--dim-sector);
  border-radius: 0 10px 10px 0; padding: 20px 24px; margin-bottom: 24px;
}
.callout-insight .callout-title { font-size: 14px; font-weight: 600; color: #6d28d9; margin-bottom: 8px; }
.callout-insight .callout-text { font-size: 14px; color: #5b21b6; line-height: 1.6; }
.callout-insight.teal { background: var(--teal-light); border-color: var(--teal-light); border-left-color: var(--teal); }
.callout-insight.teal .callout-title { color: var(--teal-dark); }
.callout-insight.teal .callout-text { color: var(--teal-dark); }
```

**Type 2: Inline Note** `.inline-note` (for technical clarifications)
- Subtle left border, no background, smaller text
- For: "Property Type is optional...", "Same model, same database...", "Platform mappings are configuration...", "Migration is deterministic"
```css
.inline-note {
  border-left: 2px solid var(--gray-300); padding: 12px 20px;
  margin-bottom: 20px; font-size: 13px; color: var(--gray-500); line-height: 1.6;
}
.inline-note strong { color: var(--gray-600); }
```

**Type 3: Comparison Cards** `.compare-grid > .compare-card` (side-by-side)
- Two compact cards in a row with colored top border
- For: Unit-First vs Structure-First path definitions

**Type 4: Compact Utility** `.utility-bar` (links, status banners)
- Single-line strip, minimal
- For: spreadsheet link, "What's Blocking Launch?"
```css
.utility-bar {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 20px; background: var(--gray-100); border-radius: 8px;
  font-size: 13px; color: var(--gray-600); margin-bottom: 24px;
}
.utility-bar a { color: var(--teal); font-weight: 600; }
.utility-bar.amber { background: var(--dim-structure-light); color: #92400e; }
```

### Other design principles
- Desktop-optimized, don't worry about mobile
- Clean, restrained, professional — not flashy
- No emojis in platform card headers (the old file had them, remove them)
- The property hierarchy tree is the ONE place where color earns its keep — use sector-colored backgrounds there
- No generic AI aesthetics

---

## Container: index.html

### Header
```html
<header class="site-header">
  <div class="site-logo">RS</div>
  <div>
    <div class="site-title">Property Classification System</div>
    <div class="site-subtitle">Universal Taxonomy for All Platforms</div>
  </div>
  <div class="site-version">v4.2 — Feb 2026</div>
</header>
```

### Navigation (5 tabs, sticky)
1. The Solution
2. Listing Builder
3. Full Reference
4. Metadata
5. Decisions & Open Questions

### Tab panels
5 empty divs that get populated via fetch(). Tab 1 loads immediately. Others load on first click.

---

## Tab Loading Architecture (nav.js)

```javascript
const TAB_FILES = {
  solution: 'tabs/tab1-solution.html',
  builder: 'tabs/tab2-builder.html',
  reference: 'tabs/tab3-reference.html',
  metadata: 'tabs/tab4-metadata.html',
  decisions: 'tabs/tab5-decisions.html'
};

const loadedTabs = new Set();

async function loadTab(tabId) {
  if (loadedTabs.has(tabId)) return;
  const panel = document.getElementById(tabId);
  try {
    const resp = await fetch(TAB_FILES[tabId]);
    const html = await resp.text();
    panel.innerHTML = html;
    loadedTabs.add(tabId);
    // Initialize tab-specific JS after load
    if (tabId === 'builder') initBuilder();
    if (tabId === 'metadata') initCommunityDemo();
    if (tabId === 'reference') initReferenceTree();
  } catch(e) {
    panel.innerHTML = '<p style="color: red; padding: 40px;">Failed to load tab content.</p>';
  }
}

// Main nav click handler
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const tabId = tab.dataset.tab;
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    loadTab(tabId);
  });
});

// Load Tab 1 on page load
loadTab('solution');
```

### Sub-tab navigation
Sub-tabs live inside each tab's HTML. The sub-tab JS should be generic — it looks for `.sub-tab` buttons with `data-subtab` and `data-parent` attributes and toggles `.sub-panel` visibility.

---

## Script Load Order in index.html

```html
<!-- At end of body -->
<script src="js/taxonomy-data.js"></script>  <!-- TAXONOMY object, shared -->
<script src="js/nav.js"></script>             <!-- Tab switching, loads tab content -->
<script src="js/builder.js"></script>         <!-- Builder logic, called after tab2 loads -->
<script src="js/community-demo.js"></script>  <!-- Community demo, called after tab4 loads -->
```

---

## Deliverables

1. `index.html` — container with header, 5-tab navigation, empty tab panels
2. `css/styles.css` — complete design system extracted from existing file + new callout types
3. `js/nav.js` — tab switching and lazy loading
4. Placeholder files in `tabs/` — each containing just a "Tab X — Coming Soon" message

---

## Testing Checklist

- [ ] Header displays correctly with logo, title, version
- [ ] 5 tabs visible in navigation
- [ ] Tab 1 loads automatically on page open
- [ ] Clicking tabs switches content area
- [ ] Tab content lazy-loads on first click
- [ ] No console errors
- [ ] Font stack uses system fonts (no external fonts)
