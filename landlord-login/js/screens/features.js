/* ==========================================
   FEATURES SCREEN
   ========================================== */

const FEATURE_CATEGORIES = {
  'Unit Features': {
    detected: ['hardwood', 'high-ceilings', 'large-windows', 'natural-light'],
    all: [
      { id: 'hardwood', label: 'Hardwood Floors' },
      { id: 'tile', label: 'Tile Floors' },
      { id: 'carpet', label: 'Carpet' },
      { id: 'marble', label: 'Marble Floors' },
      { id: 'high-ceilings', label: 'High Ceilings' },
      { id: 'large-windows', label: 'Large Windows' },
      { id: 'natural-light', label: 'Ample Natural Light' },
      { id: 'fireplace', label: 'Fireplace' },
      { id: 'crown-molding', label: 'Crown Molding' },
      { id: 'exposed-brick', label: 'Exposed Brick' },
      { id: 'skylight', label: 'Skylight' },
      { id: 'walk-in-closet', label: 'Walk-in Closet' },
      { id: 'ensuite-bath', label: 'En-suite Bathroom' },
      { id: 'corner-unit', label: 'Corner Unit' },
    ],
  },
  'Kitchen': {
    detected: ['dishwasher', 'stainless', 'granite', 'gas-stove'],
    all: [
      { id: 'dishwasher', label: 'Dishwasher' },
      { id: 'stainless', label: 'Stainless Appliances' },
      { id: 'granite', label: 'Granite Counters' },
      { id: 'quartz', label: 'Quartz Counters' },
      { id: 'gas-stove', label: 'Gas Stove' },
      { id: 'electric-stove', label: 'Electric Stove' },
      { id: 'microwave', label: 'Microwave' },
      { id: 'garbage-disposal', label: 'Garbage Disposal' },
      { id: 'kitchen-island', label: 'Kitchen Island' },
      { id: 'breakfast-bar', label: 'Breakfast Bar' },
      { id: 'pantry', label: 'Pantry' },
      { id: 'wine-fridge', label: 'Wine Fridge' },
    ],
  },
  'Outdoor & Views': {
    detected: ['balcony', 'city-view'],
    all: [
      { id: 'balcony', label: 'Balcony' },
      { id: 'patio', label: 'Patio' },
      { id: 'deck', label: 'Deck' },
      { id: 'yard', label: 'Private Yard' },
      { id: 'garden', label: 'Garden Access' },
      { id: 'bbq', label: 'BBQ Allowed' },
      { id: 'city-view', label: 'City View' },
      { id: 'park-view', label: 'Park View' },
      { id: 'water-view', label: 'Water View' },
      { id: 'mountain-view', label: 'Mountain View' },
      { id: 'courtyard-view', label: 'Courtyard View' },
    ],
  },
  'Building Amenities': {
    detected: ['gym', 'elevator', 'rooftop'],
    all: [
      { id: 'gym', label: 'Gym / Fitness Center' },
      { id: 'elevator', label: 'Elevator' },
      { id: 'rooftop', label: 'Rooftop Access' },
      { id: 'pool', label: 'Pool' },
      { id: 'hot-tub', label: 'Hot Tub' },
      { id: 'sauna', label: 'Sauna' },
      { id: 'concierge', label: 'Concierge' },
      { id: 'doorman', label: 'Doorman' },
      { id: 'party-room', label: 'Party Room' },
      { id: 'business-center', label: 'Business Center' },
      { id: 'package-room', label: 'Package Room' },
      { id: 'bike-storage', label: 'Bike Storage' },
      { id: 'parking-garage', label: 'Parking Garage' },
      { id: 'ev-charging', label: 'EV Charging' },
      { id: 'pet-wash', label: 'Pet Wash Station' },
    ],
  },
  'Vibe': {
    detected: ['modern', 'bright'],
    all: [
      { id: 'modern', label: 'Modern' },
      { id: 'bright', label: 'Bright & Airy' },
      { id: 'cozy', label: 'Cozy' },
      { id: 'luxury', label: 'Luxury' },
      { id: 'minimalist', label: 'Minimalist' },
      { id: 'industrial', label: 'Industrial' },
      { id: 'historic', label: 'Historic Charm' },
      { id: 'renovated', label: 'Recently Renovated' },
    ],
  },
};

let featuresSearchQuery = '';
let featuresExpandedCategories = new Set();

function initFeaturesScreen() {
  const state = getState();

  // Initialize state if not set or empty - pre-select all AI-detected features
  const features = state.features || {};
  const needsInit = !features.detected || features.detected.length === 0;

  if (needsInit) {
    const allDetected = [];
    Object.values(FEATURE_CATEGORIES).forEach(cat => {
      allDetected.push(...cat.detected);
    });
    updateState('features', {
      selected: [...allDetected],
      detected: [...allDetected],
    });
  }

  // Reset search
  featuresSearchQuery = '';
  const searchInput = document.getElementById('featuresSearchInput');
  if (searchInput) searchInput.value = '';

  setupFeaturesEventListeners();
  renderFeaturesScreen();

  if (window.lucide) {
    lucide.createIcons();
  }
}

function setupFeaturesEventListeners() {
  const searchInput = document.getElementById('featuresSearchInput');
  const searchClear = document.getElementById('featuresSearchClear');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      featuresSearchQuery = e.target.value;
      renderFeaturesScreen();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      featuresSearchQuery = '';
      if (searchInput) searchInput.value = '';
      renderFeaturesScreen();
    });
  }
}

function renderFeaturesScreen() {
  updateFeaturesStats();
  updateFeaturesSearchUI();
  renderFeaturesCategories();

  if (window.lucide) {
    lucide.createIcons();
  }
}

function updateFeaturesStats() {
  const detectedCount = document.getElementById('featuresDetectedCount');
  const selectedCount = document.getElementById('featuresSelectedCount');
  const statsMessage = document.getElementById('featuresStatsMessage');

  const state = getState();
  const features = state.features || { selected: [], detected: [] };

  const totalDetected = features.detected.length;
  const totalSelected = features.selected.length;

  if (detectedCount) detectedCount.textContent = totalDetected;
  if (selectedCount) selectedCount.textContent = totalSelected;

  if (statsMessage) {
    if (totalSelected >= 10) {
      statsMessage.innerHTML = 'Great coverage!';
      statsMessage.classList.add('success');
    } else {
      const needed = 10 - totalSelected;
      statsMessage.innerHTML = `Add <strong>${needed}</strong> more for better visibility`;
      statsMessage.classList.remove('success');
    }
  }
}

function updateFeaturesSearchUI() {
  const isSearching = featuresSearchQuery.trim().length > 0;
  const searchClear = document.getElementById('featuresSearchClear');
  const searchResults = document.getElementById('featuresSearchResults');
  const searchWrapper = document.getElementById('featuresSearch');

  // Show/hide clear button
  if (searchClear) {
    searchClear.classList.toggle('hidden', !isSearching);
  }

  // Update search wrapper style
  if (searchWrapper) {
    searchWrapper.classList.toggle('searching', isSearching);
  }

  // Show/hide and populate search results
  if (searchResults) {
    if (isSearching) {
      const matches = countSearchMatches();
      searchResults.classList.remove('hidden');
      if (matches > 0) {
        searchResults.innerHTML = `Found <strong>${matches}</strong> features matching "<strong>${escapeHtml(featuresSearchQuery)}</strong>"`;
      } else {
        searchResults.innerHTML = `No features match "${escapeHtml(featuresSearchQuery)}" · <button onclick="clearFeaturesSearch()">Clear</button>`;
      }
    } else {
      searchResults.classList.add('hidden');
    }
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function countSearchMatches() {
  const query = featuresSearchQuery.toLowerCase();
  let count = 0;
  Object.values(FEATURE_CATEGORIES).forEach(cat => {
    cat.all.forEach(item => {
      if (item.label.toLowerCase().includes(query)) count++;
    });
  });
  return count;
}

function clearFeaturesSearch() {
  featuresSearchQuery = '';
  const searchInput = document.getElementById('featuresSearchInput');
  if (searchInput) searchInput.value = '';
  renderFeaturesScreen();
}

function renderFeaturesCategories() {
  const container = document.getElementById('featuresCategories');
  if (!container) return;

  const state = getState();
  const features = state.features || { selected: [], detected: [] };

  const isSearching = featuresSearchQuery.trim().length > 0;
  const query = featuresSearchQuery.toLowerCase();

  let html = '';

  Object.entries(FEATURE_CATEGORIES).forEach(([categoryName, { detected, all }]) => {
    // When searching, filter to matching items only
    let itemsToShow = all;
    if (isSearching) {
      itemsToShow = all.filter(item => item.label.toLowerCase().includes(query));
      if (itemsToShow.length === 0) return; // Skip category if no matches
    }

    const detectedItems = all.filter(item => detected.includes(item.id));
    const additionalItems = all.filter(item => !detected.includes(item.id));
    const selectedInCategory = all.filter(item => features.selected.includes(item.id)).length;
    const isExpanded = featuresExpandedCategories.has(categoryName);

    html += `<div class="features-category">`;
    html += `<div class="features-category-main">`;

    // Header
    html += `<div class="features-category-header">`;
    html += `<span class="features-category-name">${categoryName}</span>`;
    html += `<span class="features-category-count">${isSearching ? `${itemsToShow.length} match${itemsToShow.length !== 1 ? 'es' : ''}` : `${selectedInCategory}/${all.length}`}</span>`;
    html += `</div>`;

    // Pills
    html += `<div class="features-pills">`;

    if (isSearching) {
      // Show only matching items when searching
      itemsToShow.forEach(item => {
        const isSelected = features.selected.includes(item.id);
        const isDetected = detected.includes(item.id);
        const pillClass = isDetected ? 'detected' : 'manual';
        const selectedClass = isSelected ? 'selected' : '';
        const icon = isSelected ? 'check' : 'plus';
        const highlightedLabel = highlightSearchMatch(item.label, query);

        html += `<button class="feature-pill ${pillClass} ${selectedClass}" onclick="toggleFeature('${item.id}')">`;
        html += `<i data-lucide="${icon}"></i>`;
        html += `<span>${highlightedLabel}</span>`;
        html += `</button>`;
      });
    } else {
      // Normal mode: show detected items
      detectedItems.forEach(item => {
        const isSelected = features.selected.includes(item.id);
        const icon = isSelected ? 'check' : 'x';

        html += `<button class="feature-pill detected ${isSelected ? 'selected' : ''}" onclick="toggleFeature('${item.id}')">`;
        html += `<i data-lucide="${icon}"></i>`;
        html += `<span>${item.label}</span>`;
        html += `</button>`;
      });

      // Expand button (if there are additional items)
      if (additionalItems.length > 0) {
        html += `</div>`; // Close pills
        html += `<button class="features-expand-btn" onclick="toggleFeaturesCategory('${categoryName}')">`;
        if (isExpanded) {
          html += `<i data-lucide="chevron-up"></i>`;
          html += `Hide ${additionalItems.length} more`;
        } else {
          html += `<i data-lucide="plus"></i>`;
          html += `${additionalItems.length} more options`;
        }
        html += `</button>`;
      }
    }

    if (isSearching || additionalItems.length === 0) {
      html += `</div>`; // Close pills if not already closed
    }

    html += `</div>`; // Close main

    // Expanded section (additional items)
    if (!isSearching && additionalItems.length > 0) {
      html += `<div class="features-expanded ${isExpanded ? '' : 'hidden'}">`;
      html += `<div class="features-pills">`;
      additionalItems.forEach(item => {
        const isSelected = features.selected.includes(item.id);
        const icon = isSelected ? 'check' : 'plus';

        html += `<button class="feature-pill manual ${isSelected ? 'selected' : ''}" onclick="toggleFeature('${item.id}')">`;
        html += `<i data-lucide="${icon}"></i>`;
        html += `<span>${item.label}</span>`;
        html += `</button>`;
      });
      html += `</div>`;
      html += `</div>`;
    }

    html += `</div>`; // Close category
  });

  // No results
  if (isSearching && html === '') {
    html = `
      <div class="features-no-results">
        <i data-lucide="search"></i>
        <p>No features matching "${escapeHtml(featuresSearchQuery)}"</p>
      </div>
    `;
  }

  container.innerHTML = html;
}

function highlightSearchMatch(label, query) {
  const idx = label.toLowerCase().indexOf(query);
  if (idx === -1) return label;
  const before = label.slice(0, idx);
  const match = label.slice(idx, idx + query.length);
  const after = label.slice(idx + query.length);
  return `${before}<span class="feature-match-highlight">${match}</span>${after}`;
}

function toggleFeature(id) {
  const state = getState();
  const features = state.features || { selected: [], detected: [] };

  const idx = features.selected.indexOf(id);
  if (idx > -1) {
    features.selected.splice(idx, 1);
  } else {
    features.selected.push(id);
  }

  updateState('features', features);
  renderFeaturesScreen();
}

function toggleFeaturesCategory(categoryName) {
  if (featuresExpandedCategories.has(categoryName)) {
    featuresExpandedCategories.delete(categoryName);
  } else {
    featuresExpandedCategories.add(categoryName);
  }
  renderFeaturesScreen();
}

// Register screen init callback
onScreenLoad('features', initFeaturesScreen);

console.log('features.js loaded');
