/**
 * Examples Tab Interactivity
 * Handles example browser switching and rendering
 */

/**
 * Initialize the example browser
 */
function initExampleBrowser() {
    var container = document.getElementById('example-browser');
    if (!container) return;

    // Render initial state
    renderExampleTabs(container);
    renderExample(0);

    // Add click handlers
    container.querySelectorAll('.example-tab').forEach(function(tab, index) {
        tab.addEventListener('click', function() {
            // Update active tab
            container.querySelectorAll('.example-tab').forEach(function(t) {
                t.classList.remove('active');
            });
            tab.classList.add('active');

            // Render new example
            renderExample(index);
        });
    });
}

/**
 * Render example tabs
 */
function renderExampleTabs(container) {
    var tabsHtml = exampleData.map(function(ex, i) {
        return '<button class="example-tab ' + (i === 0 ? 'active' : '') + '" data-index="' + i + '">' + ex.title + '</button>';
    }).join('');

    container.querySelector('.example-tabs').innerHTML = tabsHtml;
}

/**
 * Render a specific example
 */
function renderExample(index) {
    var example = exampleData[index];
    var contentEl = document.getElementById('example-content');

    // Build canonical JSON display
    var canonicalJson = JSON.stringify(example.canonical, null, 2)
        .replace(/"([^"]+)":/g, '<span class="key">"$1"</span>:')
        .replace(/: "([^"]+)"/g, ': <span class="string">"$1"</span>')
        .replace(/: (\d+)/g, ': <span class="string">$1</span>');

    // Build platform mappings
    var mappingsHtml = Object.entries(example.platformViews).map(function(entry) {
        var platform = entry[0];
        var view = entry[1];
        var platformLabel = getPlatformLabel(platform);
        var classes = ['mapping-card'];
        if (view.isHidden) classes.push('hidden');
        if (view.highlight) classes.push('highlight');

        var filtersHtml = view.filters.length > 0
            ? '<div class="mapping-filters">' + view.filters.map(function(f) {
                return '<span class="filter-tag">✓ ' + f + '</span>';
            }).join('') + '</div>'
            : '';

        var hiddenHtml = view.hidden.length > 0
            ? '<div class="mapping-filters">' + view.hidden.map(function(h) {
                return '<span class="filter-tag hidden">' + h + '</span>';
            }).join('') + '</div>'
            : '';

        return '<div class="' + classes.join(' ') + '">' +
            '<h6><span class="platform-badge ' + platform + '">' + platformLabel + '</span></h6>' +
            '<div class="mapping-display">' + view.display + '</div>' +
            filtersHtml +
            hiddenHtml +
            '<div class="mapping-note">' + view.notes + '</div>' +
            '</div>';
    }).join('');

    // Render full content
    contentEl.innerHTML =
        '<div class="example-scenario">' +
            '<h5>Scenario</h5>' +
            '<p>' + example.scenario + '</p>' +
        '</div>' +
        '<h4>Canonical Data (The Bible)</h4>' +
        '<div class="code-block"><pre>' + canonicalJson + '</pre></div>' +
        '<h4>Platform Mappings</h4>' +
        '<div class="mapping-grid">' + mappingsHtml + '</div>';
}

/**
 * Get display label for platform
 */
function getPlatformLabel(platform) {
    var labels = {
        rentals: 'Rentals.ca',
        bstk: 'BSTK / RentSync',
        spacelist: 'Spacelist',
        woodcabins: 'WoodCabins'
    };
    return labels[platform] || platform;
}
