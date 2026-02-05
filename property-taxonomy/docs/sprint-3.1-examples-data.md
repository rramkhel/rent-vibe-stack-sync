# Sprint 3.1: Live Examples Tab - Data & HTML Structure

## Overview

Convert the React-based `classification-examples.jsx` to vanilla HTML/JS for the Live Examples tab. This sprint focuses on extracting the data and building the HTML structure.

**Source:** `classification-examples.jsx`
**Target:** `tabs/examples.html`, `js/examples.js`

---

## Task 1: Extract Examples Data

Create `js/examples-data.js` with the full examples array extracted from `classification-examples.jsx`.

The array contains 15 examples across 5 categories:
- Rentals.ca (2 examples)
- RentSync/BSTK (2 examples)
- Spacelist (2 examples)
- WoodCabins (1 example)
- Edge Case (8 examples)

**Data structure for each example:**

```js
{
  id: 'rentals-1',
  category: 'Rentals.ca',
  categoryColor: 'blue',      // blue, emerald, orange, amber, purple
  title: 'Basement Suite in House',
  scenario: 'Sarah is renting out the basement of her detached house to help with the mortgage. She just wants to post it and go.',
  canonical: {
    sector: 'Residential',
    scope: 'Unit',
    structureType: 'House',
    structureSubtype: 'Detached',
    unitType: 'Basement Suite',
    listingType: 'For Rent',
    purpose: 'Conventional',
    ownership: 'Freehold',
    amenities: ['Separate Entrance', 'In-unit Laundry', 'Parking (1 spot)', 'Utilities Included']
  },
  platformViews: {
    'Rentals.ca': {
      display: 'Basement · House',
      filters: ['Basement', 'Utilities Included'],
      hidden: ['Freehold', 'Detached'],
      notes: 'Simplified for consumer search. "Detached" not shown - renters care about unit type, not house style.'
    },
    'BSTK': {
      display: 'Basement Suite in Detached House',
      filters: ['All fields visible', 'Full taxonomy'],
      hidden: [],
      notes: 'Full granularity preserved for enterprise data integrity.'
    },
    'Spacelist': {
      display: '(Not shown)',
      filters: [],
      hidden: ['Entire listing'],
      notes: 'Residential listing hidden on commercial platform.'
    },
    'WoodCabins': {
      display: '(Not shown)',
      filters: [],
      hidden: ['Entire listing'],
      notes: 'Not a cabin/vacation property - hidden on niche platform.'
    }
  }
}
```

**Note:** Some examples have additional fields:
- `commercialFields` object for Spacelist examples (sqft, leaseType, zoning, etc.)
- `nicheFields` object for WoodCabins examples (waterfront, sleeps, seasonality, etc.)

Copy ALL 15 examples from classification-examples.jsx lines ~7-400.

---

## Task 2: Update HTML Structure

Replace the contents of `tabs/examples.html` with this layout:

```html
<div class="page examples-page">
    <span class="doc-label">Interactive</span>
    <h2 class="page-title">Live Examples</h2>
    <p class="subtitle">See how real listings flow through the canonical system to each platform.</p>

    <div class="examples-container">
        <!-- Left Sidebar -->
        <div class="examples-sidebar">
            <div class="category-tabs" id="category-tabs">
                <!-- Rendered by JS -->
            </div>
            <div class="example-list" id="example-list">
                <!-- Rendered by JS -->
            </div>
        </div>

        <!-- Main Content -->
        <div class="examples-main">
            <!-- Header: Title + Scenario -->
            <div class="example-header" id="example-header">
                <!-- Rendered by JS -->
            </div>

            <!-- Two Column Grid -->
            <div class="example-grid">
                <!-- Left Column: Canonical Data + Sentence Formula -->
                <div class="example-left-col">
                    <div class="canonical-card" id="canonical-card">
                        <!-- Rendered by JS -->
                    </div>
                    <div class="sentence-formula" id="sentence-formula">
                        <!-- Rendered by JS -->
                    </div>
                </div>

                <!-- Right Column: Platform Mappings -->
                <div class="example-right-col">
                    <div class="platforms-card" id="platforms-card">
                        <!-- Rendered by JS -->
                    </div>
                </div>
            </div>

            <!-- Key Insight Box -->
            <div class="key-insight" id="key-insight">
                <!-- Rendered by JS -->
            </div>
        </div>
    </div>
</div>
```

---

## Task 3: Add Script Reference

In `index.html`, add the new data file before examples.js:

```html
<script src="js/examples-data.js"></script>
<script src="js/examples.js"></script>
```

---

## Testing

1. Verify `examples-data.js` loads without errors (check console)
2. Verify all 15 examples are in the array
3. Verify HTML structure renders (even if empty, no errors)

---

## Next Sprint

Sprint 3.2 will add the CSS styles for the new layout.
