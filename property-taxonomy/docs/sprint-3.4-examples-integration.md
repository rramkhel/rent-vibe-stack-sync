# Sprint 3.4: Live Examples Tab - Integration & Polish

## Overview

Integrate the new Examples tab with the existing tab system, fix any issues, and add responsive styling.

---

## Task 1: Tab System Integration

The existing tab system likely loads content dynamically. Update the tab switching logic to initialize examples when that tab becomes active.

In `js/main.js` (or wherever tab logic lives), find the tab switch handler and add:

```js
// When switching to examples tab
if (tabId === 'examples') {
    // Small delay to ensure DOM is ready
    setTimeout(function() {
        if (typeof initExamples === 'function') {
            initExamples();
        }
    }, 50);
}
```

If the tab system uses a different pattern (like loading HTML into a container), make sure the examples.js script runs AFTER the HTML is inserted.

---

## Task 2: Fix Potential Race Condition

If `examples-data.js` loads async, the examples array might not be ready. Add a check:

In `js/examples.js`, wrap the init:

```js
function initExamples() {
    // Wait for data to be available
    if (typeof examples === 'undefined' || !examples.length) {
        console.warn('Examples data not loaded yet');
        setTimeout(initExamples, 100);
        return;
    }

    // ... rest of init
}
```

---

## Task 3: Responsive Styles

Add to `css/examples.css`:

```css
/* Tablet */
@media (max-width: 1024px) {
    .examples-container {
        grid-template-columns: 240px 1fr;
        gap: 16px;
    }

    .example-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .canonical-fields {
        grid-template-columns: 1fr;
    }
}

/* Mobile */
@media (max-width: 768px) {
    .examples-container {
        grid-template-columns: 1fr;
    }

    .examples-sidebar {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 12px;
    }

    .category-tabs {
        width: 100%;
    }

    .example-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
        width: 100%;
    }

    .example-item {
        flex: 1 1 auto;
        min-width: 140px;
    }

    .platform-mapping {
        flex-direction: column;
        gap: 8px;
    }

    .platform-badge {
        width: auto;
    }
}
```

---

## Task 4: Loading State

Add a simple loading state while data initializes:

In `tabs/examples.html`, add inside `.examples-main`:

```html
<div class="examples-loading" id="examples-loading">
    <p>Loading examples...</p>
</div>
```

In `js/examples.js`, update `renderAll()`:

```js
function renderAll() {
    // Hide loading state
    const loading = document.getElementById('examples-loading');
    if (loading) loading.style.display = 'none';

    // ... rest of render functions
}
```

Add to `css/examples.css`:

```css
.examples-loading {
    text-align: center;
    padding: 60px 20px;
    color: var(--warm-gray);
}
```

---

## Task 5: Keyboard Navigation (Optional Enhancement)

Add keyboard support for power users:

```js
document.addEventListener('keydown', function(e) {
    // Only if on examples tab
    if (!document.getElementById('category-tabs')) return;

    const categoryExamples = getExamplesByCategory(currentCategory);

    if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        currentExampleIndex = Math.min(currentExampleIndex + 1, categoryExamples.length - 1);
        renderAll();
    }
    if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        currentExampleIndex = Math.max(currentExampleIndex - 1, 0);
        renderAll();
    }
});
```

---

## Task 6: URL Hash Support (Optional Enhancement)

Allow direct linking to specific examples:

```js
// On init, check for hash
function initExamples() {
    // ... existing checks ...

    // Check URL hash
    const hash = window.location.hash.slice(1); // remove #
    if (hash) {
        const example = examples.find(ex => ex.id === hash);
        if (example) {
            currentCategory = example.category;
            const categoryExamples = getExamplesByCategory(currentCategory);
            currentExampleIndex = categoryExamples.findIndex(ex => ex.id === hash);
        }
    }

    renderAll();
}

// Update hash on example change
function renderAll() {
    const example = getCurrentExample();
    if (example) {
        history.replaceState(null, '', '#' + example.id);
    }

    // ... rest of render
}
```

---

## Task 7: Clean Up Old Code

Remove or comment out the old examples rendering code that's being replaced. Look for:

- Old `renderExample()` function
- Old examples data array (if there was one)
- Old event listeners for examples

Keep a backup comment if unsure:

```js
/* OLD CODE - REMOVED IN SPRINT 3.4
function oldRenderExample() { ... }
*/
```

---

## Task 8: Verify All 15 Examples

Manually click through all 15 examples and verify:

| # | Category | Title | Check |
|---|----------|-------|-------|
| 1 | Rentals.ca | Basement Suite in House | ☐ |
| 2 | Rentals.ca | Room in Shared House | ☐ |
| 3 | RentSync/BSTK | High-Rise Apartment Portfolio | ☐ |
| 4 | RentSync/BSTK | Senior Living Community | ☐ |
| 5 | Spacelist | Downtown Retail Space | ☐ |
| 6 | Spacelist | Flex Industrial | ☐ |
| 7 | WoodCabins | Lakefront A-Frame Cabin | ☐ |
| 8 | Edge Case | Condo Unit for Rent | ☐ |
| 9 | Edge Case | Mixed-Use Building | ☐ |
| 10 | Edge Case | Co-living Space | ☐ |
| 11 | Edge Case | Student Housing Portfolio | ☐ |
| 12 | Edge Case | Rent-to-Own House | ☐ |
| 13 | Edge Case | Vacation Rental Townhouse | ☐ |
| 14 | Edge Case | Mobile Home Park | ☐ |
| 15 | Edge Case | Live/Work Loft | ☐ |

For each, verify:
- Scenario text displays
- Canonical fields are correct
- Amenities render
- All 4 platform mappings show
- Notes display for each platform
- Hidden platforms are dimmed
- Sentence formula is grammatically sensible

---

## Task 9: Cross-Browser Check

Test in:
- Chrome ☐
- Firefox ☐
- Safari ☐
- Edge ☐

---

## Testing Complete Checklist

- [ ] Tab switches correctly initialize examples
- [ ] All categories show correct example counts
- [ ] Example list updates when category changes
- [ ] All panels update when example changes
- [ ] No console errors
- [ ] Responsive layout works on tablet
- [ ] Responsive layout works on mobile
- [ ] Commercial fields show for Spacelist examples
- [ ] Niche fields show for WoodCabins examples
- [ ] Key insight changes per category
- [ ] Old code removed/cleaned up

---

## Done!

The Live Examples tab should now show the full richness of the classification-examples.jsx data with real scenarios, detailed platform mappings, and helpful explanatory notes.
