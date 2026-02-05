/**
 * Property Taxonomy Demo - Main JavaScript
 * Handles tab navigation and dynamic content loading
 */

document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    loadTabContent('overview');
});

/**
 * Load tab content from tabs/*.html
 */
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

/**
 * Initialize tab navigation
 */
function initTabs() {
    var tabs = document.querySelectorAll('.tab');
    var tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var targetId = tab.dataset.tab;

            // Update active tab and ARIA
            tabs.forEach(function(t) {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Update active content
            tabContents.forEach(function(content) {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                }
            });

            // Load content if not already loaded
            loadTabContent(targetId);

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Keyboard navigation
    tabs.forEach(function(tab, index) {
        tab.addEventListener('keydown', function(e) {
            var newIndex;

            if (e.key === 'ArrowRight') {
                newIndex = (index + 1) % tabs.length;
                e.preventDefault();
            } else if (e.key === 'ArrowLeft') {
                newIndex = (index - 1 + tabs.length) % tabs.length;
                e.preventDefault();
            } else if (e.key === 'Home') {
                newIndex = 0;
                e.preventDefault();
            } else if (e.key === 'End') {
                newIndex = tabs.length - 1;
                e.preventDefault();
            }

            if (newIndex !== undefined) {
                tabs[newIndex].focus();
                tabs[newIndex].click();
            }
        });
    });
}
