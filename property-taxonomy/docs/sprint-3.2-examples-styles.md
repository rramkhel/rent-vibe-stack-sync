# Sprint 3.2: Live Examples Tab - CSS Styles

## Overview

Add styles for the new Live Examples layout. The design mirrors the React component's visual structure.

**Target:** `css/examples.css` (create if doesn't exist, or add to existing)

---

## Task 1: Container Layout

```css
/* Main container - sidebar + content */
.examples-container {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 24px;
    min-height: 600px;
}

/* Sidebar */
.examples-sidebar {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* Main content area */
.examples-main {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* Two-column grid for canonical + platforms */
.example-grid {
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: 24px;
}

.example-left-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.example-right-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
```

---

## Task 2: Category Tabs

```css
/* Category filter tabs */
.category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.category-tab {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85em;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--white);
    transition: all 0.15s ease;
}

.category-tab:hover {
    border-color: var(--warm-gray);
}

.category-tab.active {
    color: white;
}

/* Category colors */
.category-tab.blue.active { background: #3b82f6; border-color: #3b82f6; }
.category-tab.emerald.active { background: #10b981; border-color: #10b981; }
.category-tab.orange.active { background: #f97316; border-color: #f97316; }
.category-tab.amber.active { background: #f59e0b; border-color: #f59e0b; }
.category-tab.purple.active { background: #8b5cf6; border-color: #8b5cf6; }
```

---

## Task 3: Example List

```css
/* List of examples in sidebar */
.example-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.example-item {
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--white);
    transition: all 0.15s ease;
}

.example-item:hover {
    border-color: var(--warm-gray);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.example-item.active {
    border-color: var(--ink);
    background: var(--cream);
}

.example-item-title {
    font-weight: 600;
    font-size: 0.9em;
    color: var(--ink);
}

.example-item-category {
    font-size: 0.75em;
    color: var(--warm-gray);
    margin-top: 2px;
}
```

---

## Task 4: Example Header

```css
/* Header with title and scenario */
.example-header {
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
}

.example-title {
    font-size: 1.5em;
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 8px 0;
}

.example-category-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.75em;
    font-weight: 600;
    color: white;
    margin-bottom: 12px;
}

.example-category-badge.blue { background: #3b82f6; }
.example-category-badge.emerald { background: #10b981; }
.example-category-badge.orange { background: #f97316; }
.example-category-badge.amber { background: #f59e0b; }
.example-category-badge.purple { background: #8b5cf6; }

.example-scenario {
    background: var(--cream);
    padding: 16px;
    border-radius: 8px;
    font-size: 0.95em;
    color: var(--ink);
    line-height: 1.5;
}

.example-scenario strong {
    font-weight: 600;
}
```

---

## Task 5: Canonical Data Card

```css
/* Canonical data panel */
.canonical-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
}

.canonical-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border-bottom: 1px solid var(--border);
}

.canonical-icon {
    width: 40px;
    height: 40px;
    background: var(--canonical-light);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.canonical-header h3 {
    font-size: 1em;
    font-weight: 600;
    margin: 0;
}

.canonical-header p {
    font-size: 0.8em;
    color: var(--warm-gray);
    margin: 2px 0 0 0;
}

.canonical-body {
    padding: 16px;
}

.canonical-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 16px;
    font-family: monospace;
    font-size: 0.85em;
}

.canonical-field {
    display: flex;
    gap: 8px;
}

.canonical-field-key {
    color: var(--warm-gray);
}

.canonical-field-value {
    color: var(--ink);
}

/* Amenities list */
.canonical-amenities {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
}

.canonical-amenities-label {
    font-family: monospace;
    font-size: 0.85em;
    color: var(--warm-gray);
    margin-bottom: 8px;
}

.amenity-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.amenity-tag {
    padding: 4px 8px;
    background: var(--cream);
    border-radius: 4px;
    font-size: 0.8em;
    color: var(--ink);
}

/* Commercial/Niche fields */
.canonical-extra-fields {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
}

.canonical-extra-label {
    font-size: 0.75em;
    font-weight: 600;
    color: var(--orange);
    text-transform: uppercase;
    margin-bottom: 8px;
}
```

---

## Task 6: Sentence Formula

```css
/* Sentence formula box */
.sentence-formula {
    background: var(--ink);
    border-radius: 12px;
    padding: 16px;
    color: white;
}

.sentence-formula-label {
    font-size: 0.75em;
    color: #a8a29e;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 8px;
}

.sentence-formula-text {
    font-size: 0.95em;
    line-height: 1.6;
}

.sentence-formula-text .purpose { color: #fbbf24; }
.sentence-formula-text .listing { color: #60a5fa; }
.sentence-formula-text .unit { color: #34d399; }
.sentence-formula-text .structure { color: #a78bfa; }
```

---

## Task 7: Platform Mappings Card

```css
/* Platform mappings panel */
.platforms-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
}

.platforms-header {
    padding: 16px;
    border-bottom: 1px solid var(--border);
}

.platforms-header h3 {
    font-size: 1em;
    font-weight: 600;
    margin: 0;
}

.platforms-header p {
    font-size: 0.8em;
    color: var(--warm-gray);
    margin: 4px 0 0 0;
}

/* Individual platform mapping */
.platform-mapping {
    padding: 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    gap: 16px;
}

.platform-mapping:last-child {
    border-bottom: none;
}

.platform-mapping.hidden {
    opacity: 0.5;
    background: var(--cream);
}

.platform-badge {
    flex-shrink: 0;
    width: 100px;
}

.platform-badge span {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.75em;
    font-weight: 600;
}

.platform-badge.rentals span { background: #dbeafe; color: #1d4ed8; }
.platform-badge.bstk span { background: #d1fae5; color: #047857; }
.platform-badge.spacelist span { background: #ffedd5; color: #c2410c; }
.platform-badge.woodcabins span { background: #fef3c7; color: #b45309; }

.platform-content {
    flex: 1;
}

.platform-display {
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 8px;
}

.platform-mapping.hidden .platform-display {
    color: var(--warm-gray);
}

/* Filter and hidden tags */
.platform-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
}

.filter-tag {
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.75em;
    background: #d1fae5;
    color: #047857;
    border: 1px solid #a7f3d0;
}

.filter-tag::before {
    content: '✓ ';
}

.hidden-tag {
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.75em;
    background: var(--cream);
    color: var(--warm-gray);
    text-decoration: line-through;
}

.platform-notes {
    font-size: 0.85em;
    color: var(--warm-gray);
    font-style: italic;
    line-height: 1.4;
}
```

---

## Task 8: Key Insight Box

```css
/* Key insight box at bottom */
.key-insight {
    background: linear-gradient(135deg, var(--ink) 0%, #44403c 100%);
    border-radius: 12px;
    padding: 20px;
    color: white;
}

.key-insight-label {
    font-size: 0.75em;
    color: #a8a29e;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 8px;
}

.key-insight p {
    font-size: 0.95em;
    line-height: 1.5;
    margin: 0;
}

.key-insight strong {
    color: #fbbf24;
}
```

---

## Task 9: Add CSS to index.html

```html
<link rel="stylesheet" href="css/examples.css">
```

---

## Testing

1. Load the page - no CSS errors in console
2. Verify CSS variables (--ink, --cream, etc.) are defined in main stylesheet
3. Inspect elements to confirm styles are applying

---

## Next Sprint

Sprint 3.3 will add the JavaScript rendering logic.
