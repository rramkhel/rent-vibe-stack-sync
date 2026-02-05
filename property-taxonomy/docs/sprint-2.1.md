# Sprint 2.1: Foundation & Navigation

## Goal

Set up project structure, CSS system, and working tab navigation with dynamic content loading. By the end of this sprint, you should have a shell with header, tabs, and placeholder content that switches correctly. Tab content lives in separate files under `tabs/` and is fetched on demand.

---

## Deliverables

- [ ] Project folder structure created
- [ ] CSS variables and base styles working
- [ ] Header renders correctly
- [ ] Tab navigation switches between 5 tabs (content loaded from `tabs/*.html`)
- [ ] Fonts loading from Google Fonts

---

## Tasks

### Task 1: Create Project Structure

Create the folder structure:

```
property-taxonomy/
├── index.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   └── components.css
├── js/
│   └── main.js
└── tabs/
    ├── overview.html
    ├── data-model.html
    ├── input-flows.html
    ├── syndication.html
    └── examples.html
```

### Task 2: Set Up CSS Variables

Create `css/variables.css`:

```css
:root {
    /* Base colors */
    --ink: #1c1917;
    --paper: #fafaf9;
    --cream: #f5f5f4;
    --warm-gray: #78716c;
    --border: #e7e5e4;

    /* Platform colors - BSTK and RentSync aligned (same teal) */
    --rentals: #2563eb;
    --rentals-light: #dbeafe;
    --bstk: #0d9488;
    --bstk-light: #ccfbf1;
    --rentsync: #0d9488;
    --rentsync-light: #ccfbf1;
    --spacelist: #ea580c;
    --spacelist-light: #ffedd5;
    --woodcabins: #d97706;
    --woodcabins-light: #fef3c7;
    --canonical: #7c3aed;
    --canonical-light: #ede9fe;

    /* Semantic colors */
    --success: #10b981;
    --success-light: #d1fae5;
    --warning: #f59e0b;
    --warning-light: #fef3c7;

    /* Typography */
    --font-body: 'Commissioner', sans-serif;
    --font-display: 'Fraunces', Georgia, serif;
    --font-mono: 'IBM Plex Mono', monospace;

    /* Spacing */
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    --space-2xl: 48px;

    /* Border radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;

    /* Shadows */
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 20px rgba(0,0,0,0.08);
}
```

### Task 3: Set Up Base Styles

Create `css/base.css` with reset, body, and typography styles (h2, h3, h4, p, code). Include the `h3::before` purple bar accent.

### Task 4: Set Up Layout Styles

Create `css/layout.css` with header (dark gradient), sticky tabs, `.page` container, and `.tab-content` show/hide. Include responsive breakpoint for 768px.

### Task 5: Create index.html

The index file is a thin shell. Tab content is loaded dynamically from `tabs/*.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Classification System — RentSync Data Architecture</title>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Commissioner:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
</head>
<body>
    <!-- Header -->
    <header class="page-header">
        <div>
            <h1>Property Classification System</h1>
            <div class="header-meta">RentSync Data Architecture</div>
        </div>
        <span class="header-badge">Internal Review</span>
    </header>

    <!-- Tab Navigation -->
    <nav class="tabs-container">
        <div class="tabs">
            <button class="tab active" data-tab="overview">
                <span class="tab-icon">🎯</span> Overview
            </button>
            <button class="tab" data-tab="data-model">
                <span class="tab-icon">📐</span> Data Model
            </button>
            <button class="tab" data-tab="input-flows">
                <span class="tab-icon">📥</span> Input Flows
            </button>
            <button class="tab" data-tab="syndication">
                <span class="tab-icon">🔄</span> Syndication
            </button>
            <button class="tab" data-tab="examples">
                <span class="tab-icon">💡</span> Live Examples
            </button>
        </div>
    </nav>

    <!-- Tab Content — loaded dynamically from tabs/*.html -->
    <main>
        <div id="overview" class="tab-content active"></div>
        <div id="data-model" class="tab-content"></div>
        <div id="input-flows" class="tab-content"></div>
        <div id="syndication" class="tab-content"></div>
        <div id="examples" class="tab-content"></div>
    </main>

    <script src="js/main.js"></script>
</body>
</html>
```

### Task 6: Create Tab Switching JavaScript with Dynamic Loading

Create `js/main.js`. It fetches tab HTML from `tabs/<id>.html` on first visit (lazy loading), caches via a `data-loaded` attribute, and handles keyboard navigation:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    loadTabContent('overview');
});

function loadTabContent(tabId) {
    var container = document.getElementById(tabId);
    if (!container || container.dataset.loaded) return;

    fetch('tabs/' + tabId + '.html')
        .then(function(response) { return response.text(); })
        .then(function(html) {
            container.innerHTML = html;
            container.dataset.loaded = 'true';
        });
}

function initTabs() {
    // Click handlers: switch active class, call loadTabContent()
    // Keyboard: ArrowLeft/ArrowRight cycle tabs
}
```

### Task 7: Create Placeholder Tab Files

Create placeholder content in each `tabs/*.html` file. Each file contains only the inner content (no `<html>`/`<head>` wrapper):

```html
<!-- tabs/overview.html -->
<div class="page">
    <span class="doc-label">The Vision</span>
    <h2>Overview Tab</h2>
    <p class="subtitle">Placeholder content. Will be built in Sprint 2.2.</p>
</div>
```

Repeat for `data-model.html`, `input-flows.html`, `syndication.html`, `examples.html`.

### Task 8: Create Empty Components CSS

Create `css/components.css` with placeholder comment:

```css
/**
 * Component Styles
 * Cards, badges, callouts, tables, etc.
 * Will be built out in Sprint 2.2+
 */
```

---

## Important: Requires a Local Server

Since tab content is loaded via `fetch()`, you must serve the project from a local HTTP server (not `file://`):

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080/property-taxonomy/`

---

## Testing

1. Open project on local server
2. Verify:
   - Header displays with dark gradient background
   - All 5 tabs are visible
   - Clicking tabs switches content (loaded from `tabs/*.html`)
   - Active tab has purple bottom border
   - Fonts are loading (Fraunces for headers, Commissioner for body)
   - Arrow keys navigate between tabs when focused

---

## Next Sprint

Sprint 2.2 will build out the Overview and Data Model tab content in `tabs/overview.html` and `tabs/data-model.html`.
