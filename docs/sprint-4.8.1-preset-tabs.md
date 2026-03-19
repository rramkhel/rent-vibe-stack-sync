# Sprint 4.8.1: Convert Preset Buttons to Tabs

## Goal

The 6 preset example buttons on the Live Examples tab currently display as a wrapped row of pill buttons. Convert them to a horizontal tab bar so the page feels shorter and the active example is clearer.

---

## What Changes

**Before:** `.preset-buttons` is a flex-wrap row of `.preset-btn` buttons stacked in 1–2 rows.

**After:** A single-row horizontal tab bar with a bottom border, where the active tab has a teal bottom indicator (consistent with the main site navigation pattern).

---

## Task 1: Update HTML in `tabs/live-examples.html`

Replace this block:

```html
<!-- Preset Buttons -->
<div class="preset-buttons" id="preset-buttons">
    <button class="preset-btn" onclick="loadPreset('basement-house')">Basement in House</button>
    <button class="preset-btn" onclick="loadPreset('highrise-portfolio')">High-Rise Portfolio</button>
    <button class="preset-btn" onclick="loadPreset('aframe-cabin')">A-Frame Cabin</button>
    <button class="preset-btn" onclick="loadPreset('class-a-office')">Class A Office</button>
    <button class="preset-btn" onclick="loadPreset('student-room')">Student Room</button>
    <button class="preset-btn" onclick="loadPreset('condo-unit')">Condo Unit</button>
</div>
```

With:

```html
<!-- Preset Tabs -->
<div class="preset-tabs" id="preset-tabs">
    <button class="preset-tab active" onclick="loadPresetTab(this, 'basement-house')">Basement in House</button>
    <button class="preset-tab" onclick="loadPresetTab(this, 'highrise-portfolio')">High-Rise Portfolio</button>
    <button class="preset-tab" onclick="loadPresetTab(this, 'aframe-cabin')">A-Frame Cabin</button>
    <button class="preset-tab" onclick="loadPresetTab(this, 'class-a-office')">Class A Office</button>
    <button class="preset-tab" onclick="loadPresetTab(this, 'student-room')">Student Room</button>
    <button class="preset-tab" onclick="loadPresetTab(this, 'condo-unit')">Condo Unit</button>
</div>
```

---

## Task 2: Update CSS in `css/components.css`

Replace the existing `.preset-buttons` and `.preset-btn` styles with:

```css
/* Preset Tabs (replaces preset-buttons) */
.preset-tabs {
    display: flex;
    border-bottom: 1px solid var(--gray-200);
    margin-bottom: var(--space-6);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
}

.preset-tabs::-webkit-scrollbar {
    display: none;
}

.preset-tab {
    padding: var(--space-3) var(--space-4);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    font-size: 13px;
    font-weight: 500;
    color: var(--gray-500);
    cursor: pointer;
    transition: all 0.15s ease;
    white-space: nowrap;
    flex-shrink: 0;
}

.preset-tab:hover {
    color: var(--teal);
}

.preset-tab.active {
    color: var(--teal);
    border-bottom-color: var(--teal);
    font-weight: 600;
}
```

You can remove the old `.preset-buttons` and `.preset-btn` rules entirely.

---

## Task 3: Update JavaScript in `tabs/live-examples.html`

Add this function (above or near the existing `loadPreset` function):

```js
function loadPresetTab(tabEl, presetId) {
    // Update tab active states
    var tabs = document.querySelectorAll('.preset-tab');
    tabs.forEach(function(t) { t.classList.remove('active'); });
    tabEl.classList.add('active');

    // Load the preset (reuse existing logic)
    var preset = presets.find(function(p) { return p.id === presetId; });
    if (!preset) return;

    document.getElementById('input-sector').value = preset.values.sector;
    onSectorChange();
    document.getElementById('input-structure').value = preset.values.structure;
    onStructureChange();
    document.getElementById('input-subtype').value = preset.values.subtype || '';
    document.getElementById('input-unit').value = preset.values.unit;
    document.getElementById('input-listing').value = preset.values.listing;
    if (preset.values.purpose) {
        document.getElementById('input-purpose').value = preset.values.purpose;
    }

    updateDisplay();

    var insightEl = document.getElementById('key-insight');
    if (preset.keyInsight) {
        document.getElementById('insight-text').textContent = preset.keyInsight;
        insightEl.classList.add('visible');
    } else {
        insightEl.classList.remove('visible');
    }
}
```

Also update `initLiveExamples()` at the bottom — the first preset should load via the tab system now:

```js
function initLiveExamples() {
    onSectorChange();
    var firstTab = document.querySelector('.preset-tab');
    if (firstTab) {
        loadPresetTab(firstTab, 'basement-house');
    }
}
```

And update `updateDisplay()` — change the line that clears active states from `.preset-btn` to `.preset-tab`:

```js
// In updateDisplay(), change:
var btns = document.querySelectorAll('.preset-btn');
// To:
var btns = document.querySelectorAll('.preset-tab');
```

---

## Task 4: Clean Up

- Remove the old `loadPreset` function (replaced by `loadPresetTab`)
- Remove the old `loadRandomPreset` function and the "Random Example" button from the HTML (or keep it if desired — it still works, just needs the selector updated to `.preset-tab`)
- If keeping the random button, update its active state logic to use `.preset-tab`

---

## Testing

- [ ] Tab bar renders as a single horizontal row
- [ ] First tab ("Basement in House") is active on load
- [ ] Clicking each tab loads the correct preset
- [ ] Active tab shows teal text + bottom border
- [ ] Manually changing dropdowns clears the active tab state
- [ ] Tab bar scrolls horizontally on narrow screens
- [ ] No console errors

---

## Commit

```bash
git add .
git commit -m "Sprint 4.8.1: Convert preset examples to tab bar

- Replace preset pill buttons with horizontal tab navigation
- Reduces vertical space, cleaner active state
- Same functionality, tab-style presentation
- Scrollable on mobile"
git push origin main
```
