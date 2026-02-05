```
Sprint 2.6 Complete!

  All files created and updated:
  ┌────────────────────────┬─────────────────────────────────────┐
  │          File          │               Status                │
  ├────────────────────────┼─────────────────────────────────────┤
  │ css/components.css     │ Updated with modal + pricing styles │
  ├────────────────────────┼─────────────────────────────────────┤
  │ components/modals.html │ Created (4 modals)                  │
  ├────────────────────────┼─────────────────────────────────────┤
  │ js/modals.js           │ Created (modal logic)               │
  ├────────────────────────┼─────────────────────────────────────┤
  │ js/screens/details.js  │ Updated button handlers             │
  ├────────────────────────┼─────────────────────────────────────┤
  │ js/app.js              │ Updated to load modals script       │
  └────────────────────────┴─────────────────────────────────────┘
  To test:
  cd /Users/jupiter/Projects/rent-vibe-stack-sync && python3 -m http.server 8080

  Verify:
  - Amenities modal opens from "Select Amenities" button
  - Can select/deselect amenities, saves to state
  - AI Detection modal shows loading → results (requires photos)
  - Can toggle detected amenities, add building amenities
  - Description modal generates 3 tone options
  - Can select, preview, edit, and use description
  - Smart Pricing modal will work on pricing screen
  - All modals close on X, overlay click, or Escape
  - No console errors
````

---


# Sprint 2.6: AI Modals (Detection, Description, Pricing)

## Objective
Build the modal system and AI-powered features: amenity detection, description generator, and smart pricing.

## Prerequisites
- Sprint 2.5 complete (Details screen working)

## Step 1: Create Modal System CSS

Add to `landlord-login/css/components.css`:

```css
/* ==========================================
   MODALS
   ========================================== */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
  padding: var(--space-lg);
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal {
  background: var(--background);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 520px;
  max-height: calc(100vh - 48px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform: translateY(20px);
  transition: transform var(--transition-normal);
}

.modal-overlay.active .modal {
  transform: translateY(0);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border);
}

.modal-title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 1.125rem;
  font-weight: 600;
}

.modal-title .ai-icon {
  color: var(--ai-purple);
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background: var(--background-muted);
  color: var(--text-primary);
}

.modal-body {
  padding: var(--space-lg);
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: var(--space-lg);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
}

/* AI Badge */
.ai-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: var(--ai-purple-light);
  color: var(--ai-purple);
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
}

/* Amenities Modal */
.amenities-modal-section {
  margin-bottom: var(--space-xl);
}

.amenities-modal-section:last-child {
  margin-bottom: 0;
}

.amenities-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.amenities-modal-title {
  font-weight: 500;
  color: var(--text-primary);
}

.amenities-modal-count {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.amenities-checkbox-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
}

@media (max-width: 480px) {
  .amenities-checkbox-list {
    grid-template-columns: 1fr;
  }
}

.amenity-checkbox {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.amenity-checkbox:hover {
  background: var(--background-subtle);
}

.amenity-checkbox.selected {
  background: var(--primary-blue-light);
  border-color: var(--primary-blue);
}

.amenity-checkbox input {
  display: none;
}

.amenity-checkbox-icon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.amenity-checkbox.selected .amenity-checkbox-icon {
  background: var(--primary-blue);
  border-color: var(--primary-blue);
  color: white;
}

.amenity-checkbox-label {
  font-size: 0.875rem;
  color: var(--text-primary);
}

/* AI Detection Modal */
.ai-detection-intro {
  text-align: center;
  padding: var(--space-lg) 0;
}

.ai-detection-intro p {
  margin-bottom: var(--space-md);
}

.ai-detected-section {
  margin-bottom: var(--space-lg);
}

.ai-detected-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}

.ai-detected-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-sm);
}

.ai-detected-item.selected {
  background: var(--primary-blue-light);
  border-color: var(--primary-blue);
}

.ai-detected-item-left {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.ai-detected-item-checkbox {
  width: 20px;
  height: 20px;
  accent-color: var(--primary-blue);
}

/* Description Generator */
.description-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.description-option {
  padding: var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.description-option:hover {
  border-color: var(--text-muted);
}

.description-option.selected {
  border-color: var(--primary-pink);
  background: var(--primary-pink-light);
}

.description-option-title {
  font-weight: 500;
  margin-bottom: var(--space-xs);
}

.description-option-preview {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.description-preview {
  background: var(--background-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  font-size: 0.875rem;
  color: var(--text-primary);
  line-height: 1.6;
}

.description-actions {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

/* Loading State */
.ai-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-xl);
  text-align: center;
}

.ai-loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--border);
  border-top-color: var(--ai-purple);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--space-md);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.ai-loading-text {
  color: var(--text-secondary);
}
```

## Step 2: Create Modals HTML Template

Create `landlord-login/components/modals.html`:

```html
<!-- Amenities Selection Modal -->
<div class="modal-overlay" id="amenitiesModal">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">Select Amenities</h3>
      <button class="modal-close" onclick="closeModal('amenitiesModal')">
        <i data-lucide="x" style="width: 20px; height: 20px;"></i>
      </button>
    </div>
    <div class="modal-body" id="amenitiesModalBody">
      <!-- Populated by JS -->
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('amenitiesModal')">Cancel</button>
      <button class="btn btn-primary" onclick="saveAmenitiesSelection()">
        Save Selection
      </button>
    </div>
  </div>
</div>

<!-- AI Amenity Detection Modal -->
<div class="modal-overlay" id="aiDetectionModal">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">
        <i data-lucide="sparkles" class="ai-icon" style="width: 20px; height: 20px;"></i>
        Amenities Detected
      </h3>
      <button class="modal-close" onclick="closeModal('aiDetectionModal')">
        <i data-lucide="x" style="width: 20px; height: 20px;"></i>
      </button>
    </div>
    <div class="modal-body" id="aiDetectionModalBody">
      <!-- Populated by JS -->
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('aiDetectionModal')">Cancel</button>
      <button class="btn btn-primary" id="saveDetectedBtn">
        Save Selection (<span id="detectedCount">0</span> amenities)
      </button>
    </div>
  </div>
</div>

<!-- AI Description Generator Modal -->
<div class="modal-overlay" id="aiDescriptionModal">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">
        <i data-lucide="sparkles" class="ai-icon" style="width: 20px; height: 20px;"></i>
        AI Description Generator
      </h3>
      <button class="modal-close" onclick="closeModal('aiDescriptionModal')">
        <i data-lucide="x" style="width: 20px; height: 20px;"></i>
      </button>
    </div>
    <div class="modal-body" id="aiDescriptionModalBody">
      <!-- Populated by JS -->
    </div>
    <div class="modal-footer" id="aiDescriptionFooter">
      <button class="btn btn-outline" onclick="closeModal('aiDescriptionModal')">Cancel</button>
      <button class="btn btn-pink" id="useDescriptionBtn" disabled>
        Use This Description
      </button>
    </div>
  </div>
</div>

<!-- Smart Pricing Modal -->
<div class="modal-overlay" id="smartPricingModal">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">
        <i data-lucide="sparkles" class="ai-icon" style="width: 20px; height: 20px;"></i>
        Smart Pricing Suggestion
      </h3>
      <button class="modal-close" onclick="closeModal('smartPricingModal')">
        <i data-lucide="x" style="width: 20px; height: 20px;"></i>
      </button>
    </div>
    <div class="modal-body" id="smartPricingModalBody">
      <!-- Populated by JS -->
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('smartPricingModal')">Keep My Price</button>
      <button class="btn btn-primary" id="useSuggestedPriceBtn">
        Use Suggested Price
      </button>
    </div>
  </div>
</div>
```

## Step 3: Create Modal Logic

Create `landlord-login/js/modals.js`:

```javascript
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

// Wire up save button
document.getElementById('saveDetectedBtn')?.addEventListener('click', saveDetectedAmenities);

/* ------------------------------------------
   AI Description Generator Modal
   ------------------------------------------ */

function openDescriptionModal() {
  const body = document.getElementById('aiDescriptionModalBody');
  const footer = document.getElementById('aiDescriptionFooter');
  const useBtn = document.getElementById('useDescriptionBtn');
  
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

document.getElementById('useDescriptionBtn')?.addEventListener('click', useGeneratedDescription);

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
  document.getElementById('rentInput').value = suggestedPrice;
  closeModal('smartPricingModal');
  showToast(`Price set to $${suggestedPrice.toLocaleString()}`);
}

document.getElementById('useSuggestedPriceBtn')?.addEventListener('click', useSuggestedPrice);

console.log('modals.js loaded');
```

## Step 4: Add Pricing Suggestion Styles

Add to `landlord-login/css/components.css`:

```css
/* Pricing Suggestion */
.pricing-suggestion {
  text-align: center;
}

.pricing-insight {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  text-align: left;
  padding: var(--space-md);
  background: var(--warning-light);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-xl);
}

.pricing-insight strong {
  display: block;
  margin-bottom: var(--space-xs);
}

.pricing-insight p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.pricing-recommendation {
  padding: var(--space-xl) 0;
}

.pricing-amount {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--space-xs);
}

.pricing-currency {
  font-size: 1.5rem;
  color: var(--text-secondary);
}

.pricing-value {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
}

.pricing-period {
  font-size: 1rem;
  color: var(--text-muted);
}

.pricing-factors {
  text-align: left;
  padding: var(--space-md);
  background: var(--background-subtle);
  border-radius: var(--radius-md);
}

.pricing-factors ul {
  list-style: none;
  margin: 0;
}

.pricing-factors li {
  font-size: 0.875rem;
  color: var(--text-secondary);
  padding: var(--space-xs) 0;
}
```

## Step 5: Update Details Screen to Use Modals

Update the button handlers in `js/screens/details.js`:

```javascript
// Replace the placeholder handlers:

document.getElementById('smartFillBtn')?.addEventListener('click', () => {
  openAIDetectionModal();
});

document.getElementById('selectAmenitiesBtn')?.addEventListener('click', () => {
  openAmenitiesModal();
});

document.getElementById('detectAmenitiesBtn')?.addEventListener('click', () => {
  openAIDetectionModal();
});

document.getElementById('aiWriteBtn')?.addEventListener('click', () => {
  openDescriptionModal();
});

document.getElementById('editAmenitiesBtn')?.addEventListener('click', () => {
  openAmenitiesModal();
});
```

## Step 6: Update App.js to Load Modals Script

Add modals.js to the scripts list:

```javascript
// In app.js, add after loading screen scripts:
async function loadModalsScript() {
  const script = document.createElement('script');
  script.src = 'js/modals.js';
  document.body.appendChild(script);
  await new Promise(resolve => script.onload = resolve);
}

// Call in initApp:
await loadModalsScript();
```

## Step 7: Test

### Verify:
- [ ] Amenities modal opens and closes
- [ ] Can select/deselect amenities
- [ ] Save saves to state and updates display
- [ ] AI Detection modal shows loading then results
- [ ] Can toggle detected amenities
- [ ] Building amenities pills work
- [ ] Description modal generates options
- [ ] Can select, preview, edit descriptions
- [ ] Use description saves to textarea
- [ ] All modals close on X, overlay click, Escape
- [ ] No console errors

## Step 8: Commit

```bash
git add .
git commit -m "Sprint 2.6: AI Modals

- Modal system with overlay, animations
- Amenities selection modal
- AI amenity detection modal (mock)
- AI description generator modal (mock)
- Smart pricing modal (mock)
- Loading states and transitions"
```

## Output Required
Confirm:
1. All modals functional
2. Amenities save correctly
3. Description generates and saves
4. Pricing modal works
5. No console errors

Report status before proceeding to Sprint 2.7.
