/* ==========================================
   MODAL SYSTEM
   ========================================== */

// Track temporary selections
let tempAmenitySelections = {};
let tempDetectedAmenities = [];
let generatedDescription = '';
let suggestedPrice = 0;

/* ------------------------------------------
   Modal Core Functions
   ------------------------------------------ */

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

/* ------------------------------------------
   Amenities Selection Modal
   ------------------------------------------ */

function openAmenitiesModal() {
  const state = getState();
  tempAmenitySelections = JSON.parse(JSON.stringify(state.amenities));

  renderAmenitiesModalContent();
  openModal('amenitiesModal');
}

function renderAmenitiesModalContent() {
  const body = document.getElementById('amenitiesModalBody');

  const sections = [
    { key: 'unit', title: 'Unit Features', items: UNIT_AMENITIES },
    { key: 'building', title: 'Building Amenities', items: BUILDING_AMENITIES },
    { key: 'area', title: 'Neighbourhood', items: AREA_HIGHLIGHTS },
  ];

  body.innerHTML = sections.map(section => `
    <div class="amenities-modal-section">
      <div class="amenities-modal-header">
        <span class="amenities-modal-title">${section.title}</span>
        <span class="amenities-modal-count">${tempAmenitySelections[section.key]?.length || 0} selected</span>
      </div>
      <div class="amenities-checkbox-list">
        ${section.items.map(item => `
          <label class="amenity-checkbox ${tempAmenitySelections[section.key]?.includes(item) ? 'selected' : ''}"
                 data-category="${section.key}" data-amenity="${item}">
            <input type="checkbox" ${tempAmenitySelections[section.key]?.includes(item) ? 'checked' : ''}>
            <span class="amenity-checkbox-icon">
              <i data-lucide="check" style="width: 14px; height: 14px;"></i>
            </span>
            <span class="amenity-checkbox-label">${item}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Add click handlers
  body.querySelectorAll('.amenity-checkbox').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      toggleAmenitySelection(el.dataset.category, el.dataset.amenity);
    });
  });

  lucide.createIcons();
}

function toggleAmenitySelection(category, amenity) {
  if (!tempAmenitySelections[category]) {
    tempAmenitySelections[category] = [];
  }

  const index = tempAmenitySelections[category].indexOf(amenity);
  if (index === -1) {
    tempAmenitySelections[category].push(amenity);
  } else {
    tempAmenitySelections[category].splice(index, 1);
  }

  renderAmenitiesModalContent();
}

function saveAmenitiesSelection() {
  Object.entries(tempAmenitySelections).forEach(([category, items]) => {
    setAmenities(category, items);
  });

  closeModal('amenitiesModal');
  renderAmenities(getState().amenities);
  showToast('Amenities saved!');
}

/* ------------------------------------------
   AI Detection Modal
   ------------------------------------------ */

function openAIDetectionModal() {
  const state = getState();

  if (state.photos.length === 0) {
    showToast('Please upload photos first', 'error');
    return;
  }

  // Show loading state
  const body = document.getElementById('aiDetectionModalBody');
  body.innerHTML = `
    <div class="ai-loading">
      <div class="ai-loading-spinner"></div>
      <p class="ai-loading-text">Analyzing your photos...</p>
    </div>
  `;
  openModal('aiDetectionModal');

  // Simulate AI detection delay
  setTimeout(() => {
    // Mock detected amenities based on random selection
    const detected = [
      { amenity: 'Stainless Appliances', confidence: 0.95 },
      { amenity: 'Updated Kitchen', confidence: 0.88 },
      { amenity: 'Dishwasher', confidence: 0.82 },
      { amenity: 'Walk-in Closet', confidence: 0.76 },
    ];

    const suggested = ['Air Conditioning', 'In-unit Laundry', 'Balcony/Patio'];

    tempDetectedAmenities = detected.map(d => ({ ...d, selected: true }));

    renderAIDetectionResults(detected, suggested);
  }, 1500);
}

function renderAIDetectionResults(detected, suggested) {
  const body = document.getElementById('aiDetectionModalBody');

  body.innerHTML = `
    <p style="margin-bottom: var(--space-lg);">I found these amenities in your photos:</p>

    <div class="ai-detected-section">
      <div class="ai-detected-title">In Unit:</div>
      ${detected.map((item, i) => `
        <div class="ai-detected-item ${item.selected !== false ? 'selected' : ''}" data-index="${i}">
          <div class="ai-detected-item-left">
            <input type="checkbox" class="ai-detected-item-checkbox"
                   ${item.selected !== false ? 'checked' : ''}
                   onchange="toggleDetectedAmenity(${i})">
            <span>${item.amenity}</span>
          </div>
          <span class="ai-badge">AI detected</span>
        </div>
      `).join('')}
    </div>

    <div class="ai-detected-section">
      <div class="ai-detected-title">Select any I missed:</div>
      ${suggested.map(item => `
        <div class="ai-detected-item" data-amenity="${item}">
          <div class="ai-detected-item-left">
            <input type="checkbox" class="ai-detected-item-checkbox"
                   onchange="toggleSuggestedAmenity('${item}', this.checked)">
            <span>${item}</span>
          </div>
        </div>
      `).join('')}
      <button class="btn btn-ghost btn-sm mt-md" onclick="openAmenitiesModal(); closeModal('aiDetectionModal');">
        + See More
      </button>
    </div>

    <div class="ai-detected-section">
      <div class="ai-detected-title">Building Amenities:</div>
      <p class="text-muted" style="font-size: 0.875rem;">(I can't detect these from photos)</p>
      <div class="pill-group mt-sm">
        ${['Gym/Fitness', 'Pool', 'Elevator', 'Concierge'].map(item => `
          <button class="pill" onclick="toggleBuildingAmenity('${item}', this)">${item}</button>
        `).join('')}
        <button class="pill" onclick="openAmenitiesModal(); closeModal('aiDetectionModal');">+ More</button>
      </div>
    </div>
  `;

  updateDetectedCount();
  lucide.createIcons();
}

function toggleDetectedAmenity(index) {
  tempDetectedAmenities[index].selected = !tempDetectedAmenities[index].selected;
  const item = document.querySelector(`.ai-detected-item[data-index="${index}"]`);
  if (item) {
    item.classList.toggle('selected', tempDetectedAmenities[index].selected);
  }
  updateDetectedCount();
}

function toggleSuggestedAmenity(amenity, checked) {
  if (checked) {
    tempDetectedAmenities.push({ amenity, selected: true });
  } else {
    tempDetectedAmenities = tempDetectedAmenities.filter(a => a.amenity !== amenity);
  }
  updateDetectedCount();
}

function toggleBuildingAmenity(amenity, btn) {
  btn.classList.toggle('selected');
  if (btn.classList.contains('selected')) {
    tempDetectedAmenities.push({ amenity, selected: true, category: 'building' });
  } else {
    tempDetectedAmenities = tempDetectedAmenities.filter(a => a.amenity !== amenity);
  }
  updateDetectedCount();
}

function updateDetectedCount() {
  const count = tempDetectedAmenities.filter(a => a.selected).length;
  document.getElementById('detectedCount').textContent = count;
}

function saveDetectedAmenities() {
  const state = getState();
  const selected = tempDetectedAmenities.filter(a => a.selected);

  // Categorize amenities
  selected.forEach(item => {
    const category = item.category || 'unit';
    if (!state.amenities[category].includes(item.amenity)) {
      toggleAmenity(category, item.amenity);
    }
  });

  closeModal('aiDetectionModal');
  renderAmenities(getState().amenities);
  showToast(`${selected.length} amenities added!`);
}

/* ------------------------------------------
   AI Description Generator Modal
   ------------------------------------------ */

function openDescriptionModal() {
  const body = document.getElementById('aiDescriptionModalBody');
  const footer = document.getElementById('aiDescriptionFooter');

  // Show loading
  body.innerHTML = `
    <div class="ai-loading">
      <div class="ai-loading-spinner"></div>
      <p class="ai-loading-text">Generating descriptions...</p>
    </div>
  `;
  footer.classList.add('hidden');
  openModal('aiDescriptionModal');

  // Simulate AI generation
  setTimeout(() => {
    const state = getState();
    const unit = state.units[0] || {};
    const amenities = Object.values(state.amenities).flat();

    // Generate mock descriptions
    const descriptions = [
      {
        tone: 'Professional',
        text: `Welcome to this stunning ${unit.bedrooms || '2'}-bedroom, ${unit.bathrooms || '1'}-bathroom ${state.subType || 'apartment'} with modern finishes throughout. This move-in ready space offers the perfect blend of comfort and style, with natural light flooding through the spacious living areas. ${amenities.length > 0 ? `Features include ${amenities.slice(0, 3).join(', ')}.` : ''} Located in a desirable ${state.address.city || 'Toronto'} neighborhood with easy access to public transit, shopping, and dining. Don't miss this opportunity!`
      },
      {
        tone: 'Casual',
        text: `Looking for your next home? Check out this awesome ${unit.bedrooms || '2'}-bed ${state.subType || 'apartment'} in ${state.address.city || 'Toronto'}! It's got everything you need - ${amenities.length > 0 ? amenities.slice(0, 2).join(' and ') : 'great amenities'}, tons of natural light, and it's super close to all the good stuff (restaurants, shops, transit). Seriously, come see it before it's gone!`
      },
      {
        tone: 'Detailed',
        text: `This exceptional ${unit.bedrooms || '2'}-bedroom, ${unit.bathrooms || '1'}-bathroom ${state.subType || 'apartment'} at ${state.address.street || '123 Main Street'} offers ${unit.sqft || '850'} square feet of thoughtfully designed living space. ${amenities.length > 0 ? `Property highlights include: ${amenities.join(', ')}.` : ''} The unit is ${unit.furnished || 'unfurnished'} with ${unit.laundry || 'in-building'} laundry. Ideal location in ${state.address.city || 'Toronto'} with a Walk Score of 92. Available ${state.availableDate || 'immediately'}. Contact us today to schedule a viewing!`
      }
    ];

    renderDescriptionOptions(descriptions);
    footer.classList.remove('hidden');
  }, 2000);
}

function renderDescriptionOptions(descriptions) {
  const body = document.getElementById('aiDescriptionModalBody');

  body.innerHTML = `
    <p style="margin-bottom: var(--space-lg);">Choose a tone for your listing description:</p>

    <div class="description-options">
      ${descriptions.map((desc, i) => `
        <div class="description-option" data-index="${i}" onclick="selectDescription(${i}, this)">
          <div class="description-option-title">${desc.tone}</div>
          <div class="description-option-preview">${desc.text.substring(0, 80)}...</div>
        </div>
      `).join('')}
    </div>

    <div class="description-preview hidden" id="descriptionPreview">
      <p id="previewText"></p>
    </div>

    <div class="description-actions hidden" id="descriptionActions">
      <button class="btn btn-outline btn-sm" onclick="regenerateDescription()">
        <i data-lucide="refresh-cw" style="width: 16px; height: 16px;"></i>
        Regenerate
      </button>
      <button class="btn btn-outline btn-sm" onclick="editDescription()">
        <i data-lucide="pencil" style="width: 16px; height: 16px;"></i>
        Edit
      </button>
    </div>
  `;

  // Store descriptions for selection
  window._generatedDescriptions = descriptions;

  lucide.createIcons();
}

function selectDescription(index, el) {
  // Remove selection from others
  document.querySelectorAll('.description-option').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');

  // Show preview
  const desc = window._generatedDescriptions[index];
  generatedDescription = desc.text;

  document.getElementById('descriptionPreview').classList.remove('hidden');
  document.getElementById('previewText').textContent = desc.text;
  document.getElementById('descriptionActions').classList.remove('hidden');
  document.getElementById('useDescriptionBtn').disabled = false;
}

function regenerateDescription() {
  showToast('Regenerating... (mock)', 'info');
}

function editDescription() {
  // Convert preview to textarea
  const preview = document.getElementById('descriptionPreview');
  preview.innerHTML = `
    <textarea class="form-input" style="min-height: 150px;" id="editableDescription">${generatedDescription}</textarea>
  `;

  document.getElementById('editableDescription').addEventListener('input', (e) => {
    generatedDescription = e.target.value;
  });
}

function useGeneratedDescription() {
  updateState('description', generatedDescription);
  document.getElementById('descriptionInput').value = generatedDescription;
  closeModal('aiDescriptionModal');
  updateProgressCard(getState());
  showToast('Description added!');
}

/* ------------------------------------------
   Smart Pricing Modal
   ------------------------------------------ */

function openSmartPricingModal() {
  const body = document.getElementById('smartPricingModalBody');

  body.innerHTML = `
    <div class="ai-loading">
      <div class="ai-loading-spinner"></div>
      <p class="ai-loading-text">Analyzing market data...</p>
    </div>
  `;
  openModal('smartPricingModal');

  setTimeout(() => {
    const state = getState();
    const unit = state.units[0] || {};
    const city = state.address.city || 'Toronto';
    const bedrooms = unit.bedrooms || '1';

    const marketData = MARKET_DATA[city] || MARKET_DATA['default'];
    const range = marketData[bedrooms] || marketData['1'];

    suggestedPrice = Math.round((range.min + range.max) / 2 / 50) * 50;

    renderPricingSuggestion(range, suggestedPrice, city, bedrooms);
  }, 1500);
}

function renderPricingSuggestion(range, suggested, city, bedrooms) {
  const body = document.getElementById('smartPricingModalBody');

  body.innerHTML = `
    <div class="pricing-suggestion">
      <div class="pricing-insight">
        <i data-lucide="lightbulb" style="width: 20px; height: 20px; color: var(--warning);"></i>
        <div>
          <strong>Market Insight</strong>
          <p>Similar ${bedrooms}BR ${bedrooms === 'studio' ? 'apartments' : 'units'} in ${city} rent for <strong>$${range.min.toLocaleString()} - $${range.max.toLocaleString()}/month</strong></p>
        </div>
      </div>

      <div class="pricing-recommendation">
        <p class="text-muted mb-sm">Recommended price based on your property:</p>
        <div class="pricing-amount">
          <span class="pricing-currency">$</span>
          <span class="pricing-value">${suggested.toLocaleString()}</span>
          <span class="pricing-period">/month</span>
        </div>
      </div>

      <div class="pricing-factors">
        <p class="text-muted mb-sm">Factors considered:</p>
        <ul>
          <li>Location: ${city}</li>
          <li>Size: ${bedrooms} bedroom(s)</li>
          <li>Amenities: ${Object.values(getState().amenities).flat().length} features</li>
          <li>Current market conditions</li>
        </ul>
      </div>
    </div>
  `;

  lucide.createIcons();
}

function useSuggestedPrice() {
  updateState('rent', suggestedPrice.toString());
  const rentInput = document.getElementById('rentInput');
  if (rentInput) {
    rentInput.value = suggestedPrice;
  }
  closeModal('smartPricingModal');
  showToast(`Price set to $${suggestedPrice.toLocaleString()}`);
}

/* ------------------------------------------
   Wire up save buttons on load
   ------------------------------------------ */

function initModals() {
  document.getElementById('saveDetectedBtn')?.addEventListener('click', saveDetectedAmenities);
  document.getElementById('useDescriptionBtn')?.addEventListener('click', useGeneratedDescription);
  document.getElementById('useSuggestedPriceBtn')?.addEventListener('click', useSuggestedPrice);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModals);
} else {
  initModals();
}

console.log('modals.js loaded');
