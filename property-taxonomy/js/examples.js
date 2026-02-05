/**
 * Live Examples Tab - Rendering Logic
 * Sprint 3.3: Vanilla JS DOM manipulation for examples browser
 */

/* ==========================================================================
   State & Config
   ========================================================================== */

// Current state
var currentCategory = 'Rentals.ca';
var currentExampleIndex = 0;

// Category definitions
var categories = [
    { id: 'Rentals.ca', label: 'Rentals.ca', color: 'blue' },
    { id: 'RentSync/BSTK', label: 'RentSync/BSTK', color: 'emerald' },
    { id: 'Spacelist', label: 'Spacelist', color: 'orange' },
    { id: 'WoodCabins', label: 'WoodCabins', color: 'amber' },
    { id: 'Edge Case', label: 'Edge Cases', color: 'purple' }
];

// Platform display config
var platformConfig = {
    'Rentals.ca': { label: 'Rentals.ca', cssClass: 'rentals' },
    'BSTK': { label: 'BSTK / RentSync', cssClass: 'bstk' },
    'Spacelist': { label: 'Spacelist', cssClass: 'spacelist' },
    'WoodCabins': { label: 'WoodCabins', cssClass: 'woodcabins' },
    'Roonies.ca': { label: 'Roonies.ca', cssClass: 'roonies' }
};

/* ==========================================================================
   Helper Functions
   ========================================================================== */

/**
 * Get examples filtered by category
 */
function getExamplesByCategory(category) {
    return examplesData.filter(function(ex) {
        return ex.category === category;
    });
}

/**
 * Get current example
 */
function getCurrentExample() {
    var categoryExamples = getExamplesByCategory(currentCategory);
    return categoryExamples[currentExampleIndex] || categoryExamples[0];
}

/**
 * Check if platform view is hidden
 */
function isHiddenPlatform(view) {
    return view.display === '(Not shown)' || view.display.indexOf('Not shown') !== -1;
}

/**
 * Get platform config with fallback
 */
function getPlatformConfig(platform) {
    if (platformConfig[platform]) {
        return platformConfig[platform];
    }
    // Fallback for unknown platforms
    return {
        label: platform,
        cssClass: platform.toLowerCase().replace(/[^a-z]/g, '')
    };
}

/* ==========================================================================
   Render Functions
   ========================================================================== */

/**
 * Render category filter tabs
 */
function renderCategoryTabs() {
    var container = document.getElementById('category-tabs');
    if (!container) return;

    container.innerHTML = categories.map(function(cat) {
        var isActive = cat.id === currentCategory;
        var activeClass = isActive ? 'active' : '';
        return '<button class="category-tab ' + cat.color + ' ' + activeClass + '" data-category="' + cat.id + '">' +
            cat.label +
        '</button>';
    }).join('');

    // Add click handlers
    container.querySelectorAll('.category-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            currentCategory = tab.dataset.category;
            currentExampleIndex = 0;
            renderAll();
        });
    });
}

/**
 * Render example list in sidebar
 */
function renderExampleList() {
    var container = document.getElementById('example-list');
    if (!container) return;

    var categoryExamples = getExamplesByCategory(currentCategory);

    container.innerHTML = categoryExamples.map(function(ex, index) {
        var isActive = index === currentExampleIndex;
        var activeClass = isActive ? 'active' : '';
        return '<div class="example-item ' + activeClass + '" data-index="' + index + '">' +
            '<div class="example-item-title">' + ex.title + '</div>' +
        '</div>';
    }).join('');

    // Add click handlers
    container.querySelectorAll('.example-item').forEach(function(item) {
        item.addEventListener('click', function() {
            currentExampleIndex = parseInt(item.dataset.index);
            renderAll();
        });
    });
}

/**
 * Render example header (title + scenario)
 */
function renderExampleHeader() {
    var container = document.getElementById('example-header');
    if (!container) return;

    var example = getCurrentExample();
    if (!example) return;

    container.innerHTML =
        '<span class="example-category-badge ' + example.categoryColor + '">' + example.category + '</span>' +
        '<h2 class="example-title">' + example.title + '</h2>' +
        '<div class="example-scenario">' +
            '<strong>Scenario:</strong> ' + example.scenario +
        '</div>';
}

/**
 * Render canonical data card
 */
function renderCanonicalCard() {
    var container = document.getElementById('canonical-card');
    if (!container) return;

    var example = getCurrentExample();
    if (!example) return;

    var c = example.canonical;

    // Build fields HTML
    var fieldsHtml =
        '<div class="canonical-field">' +
            '<span class="canonical-field-key">sector:</span>' +
            '<span class="canonical-field-value">' + c.sector + '</span>' +
        '</div>' +
        '<div class="canonical-field">' +
            '<span class="canonical-field-key">scope:</span>' +
            '<span class="canonical-field-value">' + c.scope + '</span>' +
        '</div>' +
        '<div class="canonical-field">' +
            '<span class="canonical-field-key">structureType:</span>' +
            '<span class="canonical-field-value">' + c.structureType + '</span>' +
        '</div>' +
        '<div class="canonical-field">' +
            '<span class="canonical-field-key">structureSubtype:</span>' +
            '<span class="canonical-field-value">' + c.structureSubtype + '</span>' +
        '</div>' +
        '<div class="canonical-field">' +
            '<span class="canonical-field-key">unitType:</span>' +
            '<span class="canonical-field-value">' + c.unitType + '</span>' +
        '</div>' +
        '<div class="canonical-field">' +
            '<span class="canonical-field-key">listingType:</span>' +
            '<span class="canonical-field-value">' + c.listingType + '</span>' +
        '</div>' +
        '<div class="canonical-field">' +
            '<span class="canonical-field-key">purpose:</span>' +
            '<span class="canonical-field-value">' + c.purpose + '</span>' +
        '</div>' +
        '<div class="canonical-field">' +
            '<span class="canonical-field-key">ownership:</span>' +
            '<span class="canonical-field-value">' + c.ownership + '</span>' +
        '</div>';

    // Build amenities HTML
    var amenitiesHtml = c.amenities.map(function(a) {
        return '<span class="amenity-tag">' + a + '</span>';
    }).join('');

    // Build extra fields HTML (commercial, niche, or co-living)
    var extraFieldsHtml = '';

    if (c.commercialFields) {
        var extraFields = Object.entries(c.commercialFields).map(function(entry) {
            return '<div class="canonical-field">' +
                '<span class="canonical-field-key">' + entry[0] + ':</span>' +
                '<span class="canonical-field-value">' + entry[1] + '</span>' +
            '</div>';
        }).join('');
        extraFieldsHtml =
            '<div class="canonical-extra-fields">' +
                '<div class="canonical-extra-label">Commercial Fields</div>' +
                '<div class="canonical-fields">' + extraFields + '</div>' +
            '</div>';
    }

    if (c.coLivingFields) {
        var coLivingFields = Object.entries(c.coLivingFields).map(function(entry) {
            var value = Array.isArray(entry[1]) ? entry[1].join(', ') : entry[1];
            return '<div class="canonical-field">' +
                '<span class="canonical-field-key">' + entry[0] + ':</span>' +
                '<span class="canonical-field-value">' + value + '</span>' +
            '</div>';
        }).join('');
        extraFieldsHtml =
            '<div class="canonical-extra-fields">' +
                '<div class="canonical-extra-label coliving">Co-living Fields</div>' +
                '<div class="canonical-fields">' + coLivingFields + '</div>' +
            '</div>';
    }

    container.innerHTML =
        '<div class="canonical-header">' +
            '<div class="canonical-icon">' +
                '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">' +
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />' +
                '</svg>' +
            '</div>' +
            '<div>' +
                '<h3>Canonical Data</h3>' +
                '<p>The "Bible" - source of truth</p>' +
            '</div>' +
        '</div>' +
        '<div class="canonical-body">' +
            '<div class="canonical-fields">' + fieldsHtml + '</div>' +
            '<div class="canonical-amenities">' +
                '<div class="canonical-amenities-label">amenities:</div>' +
                '<div class="amenity-tags">' + amenitiesHtml + '</div>' +
            '</div>' +
            extraFieldsHtml +
        '</div>';
}

/**
 * Render sentence formula box
 */
function renderSentenceFormula() {
    var container = document.getElementById('sentence-formula');
    if (!container) return;

    var example = getCurrentExample();
    if (!example) return;

    var c = example.canonical;

    container.innerHTML =
        '<div class="sentence-formula-label">Resolves To</div>' +
        '<p class="sentence-formula-text">' +
            'A <span class="purpose">' + c.purpose.toLowerCase() + '</span> ' +
            '<span class="listing">' + c.listingType.toLowerCase() + '</span> ' +
            '<span class="unit">' + c.unitType.toLowerCase() + '</span> ' +
            'in a <span class="structure">' + c.structureSubtype.toLowerCase() + ' ' + c.structureType.toLowerCase() + '</span>' +
        '</p>';
}

/**
 * Render platform mappings card
 */
function renderPlatformsCard() {
    var container = document.getElementById('platforms-card');
    if (!container) return;

    var example = getCurrentExample();
    if (!example) return;

    var mappingsHtml = Object.entries(example.platformViews).map(function(entry) {
        var platform = entry[0];
        var view = entry[1];
        var config = getPlatformConfig(platform);
        var isHidden = isHiddenPlatform(view);
        var hiddenClass = isHidden ? 'hidden' : '';

        // Filters
        var filtersHtml = view.filters.length > 0
            ? '<div class="platform-tags">' +
                view.filters.map(function(f) {
                    return '<span class="filter-tag">' + f + '</span>';
                }).join('') +
              '</div>'
            : '';

        // Hidden fields
        var hiddenHtml = view.hidden.length > 0
            ? '<div class="platform-tags">' +
                view.hidden.map(function(h) {
                    return '<span class="hidden-tag">' + h + '</span>';
                }).join('') +
              '</div>'
            : '';

        return '<div class="platform-mapping ' + hiddenClass + '">' +
            '<div class="platform-badge ' + config.cssClass + '">' +
                '<span>' + config.label + '</span>' +
            '</div>' +
            '<div class="platform-content">' +
                '<div class="platform-display">' + view.display + '</div>' +
                filtersHtml +
                hiddenHtml +
                '<div class="platform-notes">' + view.notes + '</div>' +
            '</div>' +
        '</div>';
    }).join('');

    container.innerHTML =
        '<div class="platforms-header">' +
            '<h3>Platform Mappings</h3>' +
            '<p>How this listing appears on each platform</p>' +
        '</div>' +
        mappingsHtml;
}

/**
 * Render key insight box
 */
function renderKeyInsight() {
    var container = document.getElementById('key-insight');
    if (!container) return;

    var example = getCurrentExample();
    if (!example) return;

    // Use categoryInsights from examples-data.js if available, otherwise use inline
    var insight = (typeof categoryInsights !== 'undefined' && categoryInsights[example.category])
        ? categoryInsights[example.category]
        : getDefaultInsight(example.category);

    container.innerHTML =
        '<div class="key-insight-label">Key Insight</div>' +
        '<p>' + insight + '</p>';
}

/**
 * Get default insight for category
 */
function getDefaultInsight(category) {
    var insights = {
        'Rentals.ca': 'Small landlords get <strong>simplified UI</strong> - they pick "Basement" and we infer the rest. Backend still stores full canonical data.',
        'RentSync/BSTK': 'Enterprise users get <strong>full granularity</strong> - Community wrappers, unit groups, bulk operations. Same canonical model, different UI surface area.',
        'Spacelist': 'Commercial listings use <strong>sector-specific fields</strong> (sqft, NNN lease, zoning) that residential doesn\'t need. Same dimensional model, extended for commercial.',
        'WoodCabins': 'Niche platforms get <strong>first-class treatment</strong> for their categories. "A-Frame" and "Yurt" exist in the Bible - they just map to "House" on generic platforms.',
        'Edge Case': 'Edge cases prove the model\'s <strong>extensibility</strong>. New acquisitions just add values to existing dimensions - no restructuring needed.'
    };
    return insights[category] || insights['Edge Case'];
}

/* ==========================================================================
   Main Render & Init
   ========================================================================== */

/**
 * Render all components
 */
function renderAll() {
    // Hide loading state
    var loading = document.getElementById('examples-loading');
    if (loading) loading.style.display = 'none';

    // Update URL hash for direct linking
    var example = getCurrentExample();
    if (example) {
        history.replaceState(null, '', '#' + example.id);
    }

    renderCategoryTabs();
    renderExampleList();
    renderExampleHeader();
    renderCanonicalCard();
    renderSentenceFormula();
    renderPlatformsCard();
    renderKeyInsight();
}

/**
 * Initialize examples tab
 */
function initExamples() {
    // Check if we're on the examples tab
    var container = document.getElementById('category-tabs');
    if (!container) return;

    // Wait for data to be available
    if (typeof examplesData === 'undefined' || !examplesData.length) {
        setTimeout(initExamples, 100);
        return;
    }

    // Reset state
    currentCategory = 'Rentals.ca';
    currentExampleIndex = 0;

    // Check URL hash for direct linking
    var hash = window.location.hash.slice(1);
    if (hash) {
        var example = examplesData.find(function(ex) { return ex.id === hash; });
        if (example) {
            currentCategory = example.category;
            var categoryExamples = getExamplesByCategory(currentCategory);
            currentExampleIndex = categoryExamples.findIndex(function(ex) { return ex.id === hash; });
            if (currentExampleIndex < 0) currentExampleIndex = 0;
        }
    }

    // Render
    renderAll();
}

// Alias for backward compatibility with main.js
function initExampleBrowser() {
    initExamples();
}

// Keyboard navigation for power users
document.addEventListener('keydown', function(e) {
    // Only if on examples tab (check if category-tabs exists and is visible)
    var categoryTabs = document.getElementById('category-tabs');
    if (!categoryTabs || !categoryTabs.offsetParent) return;

    // Don't interfere with input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    var categoryExamples = getExamplesByCategory(currentCategory);

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

// Export for external use
window.initExamples = initExamples;
window.initExampleBrowser = initExampleBrowser;
