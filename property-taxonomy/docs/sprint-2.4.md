# Sprint 2.4: Live Examples Tab (Interactive)

## Goal

Build the interactive Examples tab with a tabbed example browser. This includes JavaScript for switching between examples and dynamically rendering content.

---

## Deliverables

- [ ] Example browser renders with 5 example tabs
- [ ] Clicking example tabs switches content
- [ ] Canonical data displays as JSON code block
- [ ] Platform mapping cards show correct states
- [ ] Data separated into `js/data.js`

---

## Tasks

### Task 1: Add Example Browser Styles

Add to `css/components.css`:

- **`.example-browser`** — white bordered container
- **`.example-tabs` / `.example-tab`** — inner tab bar with cream background
- **`.example-content`** — show/hide content area
- **`.example-scenario`** — cream scenario description box
- **`.mapping-grid` / `.mapping-card`** — grid of platform mapping cards
- **`.mapping-card.hidden`** — grayed out state
- **`.mapping-card.highlight`** — teal border highlight
- **`.mapping-display` / `.mapping-note`** — monospace display + italic note
- **`.mapping-filters` / `.filter-tag`** — green tag pills (`.filter-tag.hidden` for strikethrough)

### Task 2: Create Data File

Create `js/data.js` with `exampleData` array containing 5 scenarios:

1. **Sarah's Basement** — Residential unit, visible on Rentals.ca + BSTK, hidden on Spacelist/WoodCabins
2. **Enterprise High-Rise** — Building scope, BSTK highlighted, hidden on commercial/niche
3. **Class A Office** — Commercial, Spacelist highlighted, hidden on Rentals.ca/WoodCabins
4. **A-Frame Cabin** — Vacation, WoodCabins highlighted with "NATIVE DISPLAY"
5. **Mixed-Use Building** — Multi-sector, BSTK highlighted, partial visibility

Each scenario has:
- `id`, `title`, `scenario` (description)
- `canonical` object (all dimension values)
- `platformViews` object with `rentals`, `bstk`, `spacelist`, `woodcabins` — each containing `display`, `filters`, `hidden`, `notes`, `isHidden`, optional `highlight`

### Task 3: Create Examples JavaScript

Create `js/examples.js` with:

- `initExampleBrowser()` — renders tabs, attaches click handlers, renders first example
- `renderExampleTabs(container)` — builds tab buttons from `exampleData`
- `renderExample(index)` — renders scenario box, canonical JSON (with syntax highlighting), and platform mapping cards
- `getPlatformLabel(platform)` — maps IDs to display names

### Task 4: Build Examples Tab HTML

Replace placeholder in `tabs/examples.html`:

```html
<div class="page">
    <span class="doc-label">Interactive</span>
    <h2 class="page-title">Live Examples</h2>
    <p class="subtitle">See how the same canonical data displays differently across platforms.</p>

    <div id="example-browser" class="example-browser">
        <div class="example-tabs">
            <!-- Rendered by JavaScript -->
        </div>

        <div id="example-content" class="example-content active">
            <!-- Rendered by JavaScript -->
        </div>
    </div>

    <div class="big-idea" style="background: linear-gradient(135deg, var(--ink) 0%, #44403c 100%);">
        <h4>Key Takeaway</h4>
        <p>Same canonical data, different platform experiences. The Bible doesn't care how the data got there or where it's going — it just holds the truth.</p>
    </div>
</div>
```

### Task 5: Update Script Includes

Add the new JS files to `index.html` before the closing `</body>` tag:

```html
<script src="js/data.js"></script>
<script src="js/examples.js"></script>
<script src="js/main.js"></script>
```

**Note:** `data.js` must load before `examples.js` since it defines `exampleData`.

### Task 6: Update main.js for Examples Initialization

The examples tab uses JavaScript to render its content, so `main.js` needs to call `initExampleBrowser()` after the examples tab HTML has been loaded. Update `loadTabContent()` to trigger initialization after fetch completes:

```javascript
function loadTabContent(tabId) {
    var container = document.getElementById(tabId);
    if (!container || container.dataset.loaded) return;

    fetch('tabs/' + tabId + '.html')
        .then(function(response) { return response.text(); })
        .then(function(html) {
            container.innerHTML = html;
            container.dataset.loaded = 'true';

            // Initialize examples browser after its HTML loads
            if (tabId === 'examples' && typeof initExampleBrowser === 'function') {
                initExampleBrowser();
            }
        });
}
```

---

## Testing

1. Navigate to Examples tab
2. Verify:
   - All 5 example tabs display
   - First example is selected by default
   - Clicking tabs switches content
   - Canonical JSON displays with syntax highlighting
   - Platform cards show correct visibility states
   - Hidden platforms are grayed out
   - Highlighted platforms have teal border
   - Filter tags display correctly

3. Check specific examples:
   - Sarah's Basement: Rentals.ca and BSTK visible, Spacelist and WoodCabins hidden
   - A-Frame Cabin: WoodCabins has highlight border and "NATIVE DISPLAY" note
   - Mixed-Use: BSTK has highlight border

---

## Reference

Copy content and logic from `property-taxonomy-demo.html`:
- Example data: Lines ~735-950 (translate to JS object structure)
- Example browser markup: Lines ~735-800
- Tab switching logic: Lines ~1650-1720

---

## Next Sprint

Sprint 2.5 will add responsive styles, accessibility improvements, and final polish.
