# Sprint 3.3: Live Examples Tab - JavaScript Rendering

## Overview

Write the vanilla JavaScript to render the examples UI. This replaces the React component logic with plain JS DOM manipulation.

**Target:** `js/examples.js`

---

## Task 1: State Management

At the top of `js/examples.js`:

```js
/**
 * Live Examples - State & Config
 */

// Current state
let currentCategory = 'Rentals.ca';
let currentExampleIndex = 0;

// Category definitions
const categories = [
    { id: 'Rentals.ca', label: 'Rentals.ca', color: 'blue' },
    { id: 'RentSync/BSTK', label: 'RentSync/BSTK', color: 'emerald' },
    { id: 'Spacelist', label: 'Spacelist', color: 'orange' },
    { id: 'WoodCabins', label: 'WoodCabins', color: 'amber' },
    { id: 'Edge Case', label: 'Edge Cases', color: 'purple' }
];

// Platform display config
const platformConfig = {
    'Rentals.ca': { label: 'Rentals.ca', cssClass: 'rentals' },
    'BSTK': { label: 'BSTK / RentSync', cssClass: 'bstk' },
    'Spacelist': { label: 'Spacelist', cssClass: 'spacelist' },
    'WoodCabins': { label: 'WoodCabins', cssClass: 'woodcabins' }
};
```

---

## Task 2: Helper Functions

```js
/**
 * Get examples filtered by category
 */
function getExamplesByCategory(category) {
    return examples.filter(ex => ex.category === category);
}

/**
 * Get current example
 */
function getCurrentExample() {
    const categoryExamples = getExamplesByCategory(currentCategory);
    return categoryExamples[currentExampleIndex] || categoryExamples[0];
}

/**
 * Check if platform view is hidden
 */
function isHiddenPlatform(view) {
    return view.display === '(Not shown)' || view.display.includes('Not shown');
}
```

---

## Task 3: Render Category Tabs

```js
/**
 * Render category filter tabs
 */
function renderCategoryTabs() {
    const container = document.getElementById('category-tabs');
    if (!container) return;

    container.innerHTML = categories.map(cat => {
        const isActive = cat.id === currentCategory;
        const activeClass = isActive ? 'active' : '';
        return `<button class="category-tab ${cat.color} ${activeClass}" data-category="${cat.id}">
            ${cat.label}
        </button>`;
    }).join('');

    // Add click handlers
    container.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            currentCategory = tab.dataset.category;
            currentExampleIndex = 0;
            renderAll();
        });
    });
}
```

---

## Task 4: Render Example List

```js
/**
 * Render example list in sidebar
 */
function renderExampleList() {
    const container = document.getElementById('example-list');
    if (!container) return;

    const categoryExamples = getExamplesByCategory(currentCategory);

    container.innerHTML = categoryExamples.map((ex, index) => {
        const isActive = index === currentExampleIndex;
        const activeClass = isActive ? 'active' : '';
        return `<div class="example-item ${activeClass}" data-index="${index}">
            <div class="example-item-title">${ex.title}</div>
        </div>`;
    }).join('');

    // Add click handlers
    container.querySelectorAll('.example-item').forEach(item => {
        item.addEventListener('click', () => {
            currentExampleIndex = parseInt(item.dataset.index);
            renderAll();
        });
    });
}
```

---

## Task 5: Render Example Header

```js
/**
 * Render example header (title + scenario)
 */
function renderExampleHeader() {
    const container = document.getElementById('example-header');
    if (!container) return;

    const example = getCurrentExample();
    if (!example) return;

    container.innerHTML = `
        <span class="example-category-badge ${example.categoryColor}">${example.category}</span>
        <h2 class="example-title">${example.title}</h2>
        <div class="example-scenario">
            <strong>Scenario:</strong> ${example.scenario}
        </div>
    `;
}
```

---

## Task 6: Render Canonical Card

```js
/**
 * Render canonical data card
 */
function renderCanonicalCard() {
    const container = document.getElementById('canonical-card');
    if (!container) return;

    const example = getCurrentExample();
    if (!example) return;

    const c = example.canonical;

    // Build fields HTML
    const fieldsHtml = `
        <div class="canonical-field">
            <span class="canonical-field-key">sector:</span>
            <span class="canonical-field-value">${c.sector}</span>
        </div>
        <div class="canonical-field">
            <span class="canonical-field-key">scope:</span>
            <span class="canonical-field-value">${c.scope}</span>
        </div>
        <div class="canonical-field">
            <span class="canonical-field-key">structureType:</span>
            <span class="canonical-field-value">${c.structureType}</span>
        </div>
        <div class="canonical-field">
            <span class="canonical-field-key">structureSubtype:</span>
            <span class="canonical-field-value">${c.structureSubtype}</span>
        </div>
        <div class="canonical-field">
            <span class="canonical-field-key">unitType:</span>
            <span class="canonical-field-value">${c.unitType}</span>
        </div>
        <div class="canonical-field">
            <span class="canonical-field-key">listingType:</span>
            <span class="canonical-field-value">${c.listingType}</span>
        </div>
        <div class="canonical-field">
            <span class="canonical-field-key">purpose:</span>
            <span class="canonical-field-value">${c.purpose}</span>
        </div>
        <div class="canonical-field">
            <span class="canonical-field-key">ownership:</span>
            <span class="canonical-field-value">${c.ownership}</span>
        </div>
    `;

    // Build amenities HTML
    const amenitiesHtml = c.amenities.map(a => 
        `<span class="amenity-tag">${a}</span>`
    ).join('');

    // Build extra fields HTML (commercial or niche)
    let extraFieldsHtml = '';
    if (c.commercialFields) {
        const extraFields = Object.entries(c.commercialFields).map(([key, val]) =>
            `<div class="canonical-field">
                <span class="canonical-field-key">${key}:</span>
                <span class="canonical-field-value">${val}</span>
            </div>`
        ).join('');
        extraFieldsHtml = `
            <div class="canonical-extra-fields">
                <div class="canonical-extra-label">Commercial Fields</div>
                <div class="canonical-fields">${extraFields}</div>
            </div>
        `;
    }
    if (c.nicheFields) {
        const extraFields = Object.entries(c.nicheFields).map(([key, val]) =>
            `<div class="canonical-field">
                <span class="canonical-field-key">${key}:</span>
                <span class="canonical-field-value">${val}</span>
            </div>`
        ).join('');
        extraFieldsHtml = `
            <div class="canonical-extra-fields">
                <div class="canonical-extra-label" style="color: #b45309;">Niche Fields</div>
                <div class="canonical-fields">${extraFields}</div>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="canonical-header">
            <div class="canonical-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>
            <div>
                <h3>Canonical Data</h3>
                <p>The "Bible" - source of truth</p>
            </div>
        </div>
        <div class="canonical-body">
            <div class="canonical-fields">${fieldsHtml}</div>
            <div class="canonical-amenities">
                <div class="canonical-amenities-label">amenities:</div>
                <div class="amenity-tags">${amenitiesHtml}</div>
            </div>
            ${extraFieldsHtml}
        </div>
    `;
}
```

---

## Task 7: Render Sentence Formula

```js
/**
 * Render sentence formula box
 */
function renderSentenceFormula() {
    const container = document.getElementById('sentence-formula');
    if (!container) return;

    const example = getCurrentExample();
    if (!example) return;

    const c = example.canonical;

    container.innerHTML = `
        <div class="sentence-formula-label">Resolves To</div>
        <p class="sentence-formula-text">
            A <span class="purpose">${c.purpose.toLowerCase()}</span>
            <span class="listing">${c.listingType.toLowerCase()}</span>
            <span class="unit">${c.unitType.toLowerCase()}</span>
            in a <span class="structure">${c.structureSubtype.toLowerCase()} ${c.structureType.toLowerCase()}</span>
        </p>
    `;
}
```

---

## Task 8: Render Platform Mappings

```js
/**
 * Render platform mappings card
 */
function renderPlatformsCard() {
    const container = document.getElementById('platforms-card');
    if (!container) return;

    const example = getCurrentExample();
    if (!example) return;

    const mappingsHtml = Object.entries(example.platformViews).map(([platform, view]) => {
        const config = platformConfig[platform];
        const isHidden = isHiddenPlatform(view);
        const hiddenClass = isHidden ? 'hidden' : '';

        // Filters
        const filtersHtml = view.filters.length > 0
            ? `<div class="platform-tags">
                ${view.filters.map(f => `<span class="filter-tag">${f}</span>`).join('')}
               </div>`
            : '';

        // Hidden fields
        const hiddenHtml = view.hidden.length > 0
            ? `<div class="platform-tags">
                ${view.hidden.map(h => `<span class="hidden-tag">${h}</span>`).join('')}
               </div>`
            : '';

        return `
            <div class="platform-mapping ${hiddenClass}">
                <div class="platform-badge ${config.cssClass}">
                    <span>${config.label}</span>
                </div>
                <div class="platform-content">
                    <div class="platform-display">${view.display}</div>
                    ${filtersHtml}
                    ${hiddenHtml}
                    <div class="platform-notes">${view.notes}</div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="platforms-header">
            <h3>Platform Mappings</h3>
            <p>How this listing appears on each platform</p>
        </div>
        ${mappingsHtml}
    `;
}
```

---

## Task 9: Render Key Insight

```js
/**
 * Render key insight box
 */
function renderKeyInsight() {
    const container = document.getElementById('key-insight');
    if (!container) return;

    const example = getCurrentExample();
    if (!example) return;

    // Category-specific insights
    const insights = {
        'Rentals.ca': 'Small landlords get <strong>simplified UI</strong> - they pick "Basement" and we infer the rest. Backend still stores full canonical data.',
        'RentSync/BSTK': 'Enterprise users get <strong>full granularity</strong> - Community wrappers, unit groups, bulk operations. Same canonical model, different UI surface area.',
        'Spacelist': 'Commercial listings use <strong>sector-specific fields</strong> (sqft, NNN lease, zoning) that residential doesn\'t need. Same dimensional model, extended for commercial.',
        'WoodCabins': 'Niche platforms get <strong>first-class treatment</strong> for their categories. "A-Frame" and "Yurt" exist in the Bible - they just map to "House" on generic platforms.',
        'Edge Case': 'Edge cases prove the model\'s <strong>extensibility</strong>. New acquisitions just add values to existing dimensions - no restructuring needed.'
    };

    const insight = insights[example.category] || insights['Edge Case'];

    container.innerHTML = `
        <div class="key-insight-label">Key Insight</div>
        <p>${insight}</p>
    `;
}
```

---

## Task 10: Main Render & Init

```js
/**
 * Render all components
 */
function renderAll() {
    renderCategoryTabs();
    renderExampleList();
    renderExampleHeader();
    renderCanonicalCard();
    renderSentenceFormula();
    renderPlatformsCard();
    renderKeyInsight();
}

/**
 * Initialize on page load / tab switch
 */
function initExamples() {
    // Check if we're on the examples tab
    const container = document.getElementById('category-tabs');
    if (!container) return;

    // Reset state
    currentCategory = 'Rentals.ca';
    currentExampleIndex = 0;

    // Render
    renderAll();
}

// If using tab system, hook into tab switch
// Otherwise, init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // If examples tab is visible on load
    initExamples();
});

// Export for tab system if needed
window.initExamples = initExamples;
```

---

## Testing

1. Load the Examples tab
2. Verify category tabs render and are clickable
3. Click through categories - example list should update
4. Click different examples - all panels should update
5. Check console for any JS errors
6. Verify commercial fields appear for Spacelist examples
7. Verify niche fields appear for WoodCabins examples
8. Verify hidden platforms show with reduced opacity

---

## Next Sprint

Sprint 3.4 will handle integration with the existing tab system and any polish/fixes.
