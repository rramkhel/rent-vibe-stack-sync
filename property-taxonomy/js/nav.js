/**
 * Tab Navigation & Lazy Loading
 * Loads tab content on first click, caches for subsequent views
 */

const TAB_FILES = {
    solution: 'tabs/tab1-solution.html',
    builder: 'tabs/tab2-builder.html',
    reference: 'tabs/tab3-reference.html',
    metadata: 'tabs/tab4-metadata.html',
    decisions: 'tabs/tab5-decisions.html'
};

const loadedTabs = new Set();

async function loadTabContent(tabId) {
    if (loadedTabs.has(tabId)) return;

    const panel = document.getElementById(tabId);
    if (!panel) return;

    const file = TAB_FILES[tabId];
    if (!file) return;

    try {
        const response = await fetch(file + '?v=' + Date.now());
        if (response.ok) {
            panel.innerHTML = await response.text();
            loadedTabs.add(tabId);

            // Initialize sub-tabs if present
            initSubTabs(panel);

            // Execute any inline scripts from the loaded HTML
            // (innerHTML doesn't run <script> tags automatically)
            panel.querySelectorAll('script').forEach(oldScript => {
                const newScript = document.createElement('script');
                newScript.textContent = oldScript.textContent;
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            // Dispatch event for tab-specific initialization
            panel.dispatchEvent(new CustomEvent('tabloaded', { bubbles: true }));
        } else {
            panel.innerHTML = '<div class="placeholder-box">Content not yet available</div>';
        }
    } catch (err) {
        console.error('Failed to load tab:', tabId, err);
        panel.innerHTML = '<div class="placeholder-box">Failed to load content</div>';
    }
}

function switchTab(tabId) {
    // Update nav buttons
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Update panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === tabId);
    });

    // Load content if not already loaded
    loadTabContent(tabId);
}

function initSubTabs(container) {
    const subTabBtns = container.querySelectorAll('.sub-tab');
    const subTabPanels = container.querySelectorAll('.sub-panel');

    if (subTabBtns.length === 0) return;

    subTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.subtab;

            // Update buttons
            subTabBtns.forEach(b => b.classList.toggle('active', b === btn));

            // Update panels
            subTabPanels.forEach(panel => {
                panel.classList.toggle('active', panel.id === targetId);
            });
        });
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Set up main tab navigation
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Load first tab immediately
    loadTabContent('solution');
});
