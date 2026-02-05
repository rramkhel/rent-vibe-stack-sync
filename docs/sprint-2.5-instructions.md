
```
 Sprint 2.5 Complete!

  All files created and updated:
  ┌───────────────────────┬────────────────────────────────────────┐
  │         File          │                 Status                 │
  ├───────────────────────┼────────────────────────────────────────┤
  │ screens/details.html  │ Created                                │
  ├───────────────────────┼────────────────────────────────────────┤
  │ js/screens/details.js │ Created                                │
  ├───────────────────────┼────────────────────────────────────────┤
  │ css/screens.css       │ Updated with details styles            │
  ├───────────────────────┼────────────────────────────────────────┤
  │ js/app.js             │ Updated (load details.js + info toast) │
  └───────────────────────┴────────────────────────────────────────┘
  To test:
  cd /Users/jupiter/Projects/rent-vibe-stack-sync && python3 -m http.server 8080

  Visit http://localhost:8080/landlord-login/

  Verify:
  - Details screen loads with two-column layout
  - Preview header shows address and property type from state
  - Quick stats show bed/bath from units screen
  - Photo upload works (select files, see grid)
  - Photos display with remove button on hover
  - Photo count updates correctly
  - Description textarea saves to state
  - Progress card updates as items complete
  - Sidebar stays sticky on scroll
  - "Continue to Pricing" enables with minimum requirements
  - AI buttons show info toast (placeholder for Sprint 2.6)
  - Mobile layout stacks correctly

  Ready for Sprint 2.6!

```


---


# Sprint 2.5: Property Details Screen (Photos + Amenities)

## Objective
Build the main listing details screen with photo upload, amenities selection, and description.

## Prerequisites
- Sprint 2.4 complete (Units screen working)

## Step 1: Create Details Screen HTML

Create `landlord-login/screens/details.html`:

```html
<section class="screen" id="screen-details">
  <div class="content-wide screen-content">
    
    <!-- Two-column layout -->
    <div class="details-layout">
      
      <!-- Main Column -->
      <div class="details-main">
        
        <!-- Preview Header -->
        <div class="preview-header">
          <p class="preview-label">Here's how renters will see your listing:</p>
          <h2 class="preview-title" id="previewTitle">Modern Apartment in Toronto</h2>
          <p class="preview-meta" id="previewMeta">
            <i data-lucide="home" style="width: 14px; height: 14px;"></i>
            <span id="previewType">Apartment</span> • 
            <span id="previewCity">Toronto</span> • 
            <span id="previewAddress">123 Main Street</span>
          </p>
        </div>
        
        <!-- Photo Upload Section -->
        <div class="section">
          <div class="photo-upload-area" id="photoUploadArea">
            <div class="photo-upload-empty" id="photoUploadEmpty">
              <i data-lucide="camera" style="width: 32px; height: 32px;"></i>
              <p class="photo-upload-title">Upload Photos (0/5 min)</p>
              <p class="photo-upload-hint">Add 5-15 photos to showcase your property</p>
              <div class="photo-upload-buttons">
                <label class="btn btn-outline btn-sm">
                  <i data-lucide="upload" style="width: 16px; height: 16px;"></i>
                  Upload Photos
                  <input type="file" id="photoInput" multiple accept="image/*" hidden>
                </label>
                <button class="btn btn-outline-pink btn-sm" id="smartFillBtn">
                  <i data-lucide="sparkles" style="width: 16px; height: 16px;"></i>
                  Smart Fill - AI will analyze
                </button>
              </div>
            </div>
            <div class="photo-grid hidden" id="photoGrid">
              <!-- Photos rendered by JS -->
            </div>
          </div>
          <div class="photo-upload-actions hidden" id="photoUploadActions">
            <label class="btn btn-outline btn-sm">
              <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
              Add More
              <input type="file" id="photoInputMore" multiple accept="image/*" hidden>
            </label>
            <span class="photo-count" id="photoCount">0 photos</span>
          </div>
        </div>
        
        <!-- Price Placeholder -->
        <div class="section">
          <div class="price-placeholder">
            <i data-lucide="dollar-sign" style="width: 16px; height: 16px;"></i>
            <span>Price coming soon</span>
          </div>
        </div>
        
        <!-- Quick Stats -->
        <div class="section">
          <div class="quick-stats" id="quickStats">
            <span><i data-lucide="bed" style="width: 16px; height: 16px;"></i> <span id="statBeds">--</span> beds</span>
            <span><i data-lucide="bath" style="width: 16px; height: 16px;"></i> <span id="statBaths">--</span> baths</span>
            <span><i data-lucide="maximize" style="width: 16px; height: 16px;"></i> <span id="statSqft">--</span> sqft</span>
          </div>
          <div class="quick-stats-actions">
            <button class="btn btn-outline btn-sm" id="editDetailsBtn">
              <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
              Add Details
            </button>
            <button class="btn btn-outline-pink btn-sm" id="aiDetectDetailsBtn">
              <i data-lucide="sparkles" style="width: 16px; height: 16px;"></i>
              AI Detect
            </button>
          </div>
        </div>
        
        <!-- Amenities Section -->
        <div class="section">
          <h3 class="section-title">What this place offers</h3>
          <div class="amenities-empty" id="amenitiesEmpty">
            <i data-lucide="home" style="width: 24px; height: 24px;"></i>
            <p>No amenities added yet</p>
            <p class="text-muted">Help renters know what's included with your property</p>
            <div class="amenities-actions">
              <button class="btn btn-outline btn-sm" id="selectAmenitiesBtn">
                <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
                Select Amenities
              </button>
              <button class="btn btn-outline-pink btn-sm" id="detectAmenitiesBtn">
                <i data-lucide="sparkles" style="width: 16px; height: 16px;"></i>
                Detect from Photos
              </button>
            </div>
          </div>
          <div class="amenities-display hidden" id="amenitiesDisplay">
            <!-- Rendered by JS -->
          </div>
        </div>
        
        <!-- Description Section -->
        <div class="section">
          <h3 class="section-title">About This Property</h3>
          <div class="description-area">
            <textarea 
              class="form-input description-textarea" 
              id="descriptionInput"
              placeholder="Click to write description..."
              rows="4"
            ></textarea>
            <button class="btn btn-outline-pink btn-sm description-ai-btn" id="aiWriteBtn">
              <i data-lucide="sparkles" style="width: 16px; height: 16px;"></i>
              AI Write For Me
            </button>
          </div>
        </div>
        
      </div>
      
      <!-- Sidebar -->
      <div class="details-sidebar">
        
        <!-- Progress Card -->
        <div class="card progress-card">
          <div class="progress-card-header">
            <h4>Listing Progress</h4>
            <span class="progress-card-status" id="progressStatus">0/5 complete</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar" id="progressBar" style="width: 0%"></div>
          </div>
          <ul class="progress-checklist" id="progressChecklist">
            <li data-item="photos">
              <span class="progress-check"></span>
              At least 5 photos (0/5)
            </li>
            <li data-item="bedrooms">
              <span class="progress-check"></span>
              Bedrooms
            </li>
            <li data-item="bathrooms">
              <span class="progress-check"></span>
              Bathrooms
            </li>
            <li data-item="description">
              <span class="progress-check"></span>
              Description
            </li>
            <li data-item="amenities">
              <span class="progress-check"></span>
              At least 1 amenity
            </li>
          </ul>
          <button class="btn btn-pink" id="continueToPricingBtn" disabled style="width: 100%;">
            Continue to Pricing →
          </button>
        </div>
        
        <!-- Pro Tips Card -->
        <div class="card tips-card">
          <h4><i data-lucide="lightbulb" style="width: 16px; height: 16px; color: var(--warning);"></i> Pro Tips</h4>
          <ul class="tips-list">
            <li>Photos with good lighting get 40% more views</li>
            <li>Include shots of all rooms and outdoor spaces</li>
            <li>Highlight unique features in your description</li>
            <li>Be honest about the condition to build trust</li>
          </ul>
        </div>
        
      </div>
      
    </div>
    
  </div>
</section>
```

## Step 2: Add Details Screen Styles

Add to `landlord-login/css/screens.css`:

```css
/* ==========================================
   DETAILS SCREEN
   ========================================== */

.details-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-xl);
}

@media (max-width: 900px) {
  .details-layout {
    grid-template-columns: 1fr;
  }
  
  .details-sidebar {
    order: -1;
  }
}

.details-main {
  min-width: 0;
}

.details-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* Preview Header */
.preview-header {
  margin-bottom: var(--space-xl);
}

.preview-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: var(--space-sm);
}

.preview-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.preview-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Photo Upload */
.photo-upload-area {
  background: var(--background-subtle);
  border: 2px dashed var(--border);
  border-radius: var(--radius-lg);
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-upload-area.has-photos {
  background: var(--background);
  border-style: solid;
  border-width: 1px;
}

.photo-upload-empty {
  text-align: center;
  padding: var(--space-xl);
  color: var(--text-muted);
}

.photo-upload-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: var(--space-md) 0 var(--space-xs);
}

.photo-upload-hint {
  font-size: 0.875rem;
  margin-bottom: var(--space-lg);
}

.photo-upload-buttons {
  display: flex;
  gap: var(--space-sm);
  justify-content: center;
  flex-wrap: wrap;
}

.photo-upload-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-md);
}

.photo-count {
  font-size: 0.875rem;
  color: var(--text-muted);
}

/* Photo Grid */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--space-md);
  padding: var(--space-md);
}

.photo-item {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--background-muted);
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-item-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  opacity: 0;
  transition: opacity var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}

.photo-item:hover .photo-item-overlay {
  opacity: 1;
}

.photo-item-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  transition: transform var(--transition-fast);
}

.photo-item-btn:hover {
  transform: scale(1.1);
}

.photo-item-primary {
  position: absolute;
  top: var(--space-sm);
  left: var(--space-sm);
  background: var(--primary-blue);
  color: white;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

/* Price Placeholder */
.price-placeholder {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-muted);
  font-size: 0.875rem;
  padding: var(--space-md) 0;
}

/* Quick Stats */
.quick-stats {
  display: flex;
  gap: var(--space-lg);
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--border);
}

.quick-stats span {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.quick-stats-actions {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

/* Section Title */
.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--space-md);
}

/* Amenities */
.amenities-empty {
  text-align: center;
  padding: var(--space-xl);
  background: var(--background-subtle);
  border-radius: var(--radius-lg);
  color: var(--text-muted);
}

.amenities-empty p {
  margin: var(--space-sm) 0;
}

.amenities-actions {
  display: flex;
  gap: var(--space-sm);
  justify-content: center;
  margin-top: var(--space-md);
}

.amenities-display {
  padding: var(--space-md) 0;
}

.amenities-category {
  margin-bottom: var(--space-lg);
}

.amenities-category-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.amenities-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.amenity-tag {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 6px 12px;
  background: var(--background-subtle);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  color: var(--text-primary);
}

.amenity-tag i {
  color: var(--success);
}

.edit-amenities-btn {
  margin-top: var(--space-md);
}

/* Description */
.description-area {
  position: relative;
}

.description-textarea {
  resize: vertical;
  min-height: 120px;
}

.description-ai-btn {
  position: absolute;
  bottom: var(--space-md);
  right: var(--space-md);
}

/* Progress Card */
.progress-card {
  position: sticky;
  top: 80px;
}

.progress-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.progress-card-header h4 {
  font-size: 1rem;
  font-weight: 600;
}

.progress-card-status {
  font-size: 0.875rem;
  color: var(--teal);
  font-weight: 500;
}

.progress-bar-container {
  height: 4px;
  background: var(--background-muted);
  border-radius: 2px;
  margin-bottom: var(--space-lg);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--teal);
  border-radius: 2px;
  transition: width var(--transition-normal);
}

.progress-checklist {
  list-style: none;
  margin-bottom: var(--space-lg);
}

.progress-checklist li {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.875rem;
  color: var(--text-secondary);
  padding: var(--space-sm) 0;
}

.progress-checklist li.completed {
  color: var(--text-primary);
}

.progress-check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.progress-checklist li.completed .progress-check {
  background: var(--success);
  border-color: var(--success);
}

.progress-checklist li.completed .progress-check::after {
  content: '✓';
  color: white;
  font-size: 12px;
}

/* Tips Card */
.tips-card h4 {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: var(--space-md);
}

.tips-list {
  list-style: none;
}

.tips-list li {
  position: relative;
  padding-left: var(--space-md);
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-sm);
}

.tips-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--text-muted);
}
```

## Step 3: Create Details Screen Logic

Create `landlord-login/js/screens/details.js`:

```javascript
/* ==========================================
   DETAILS SCREEN LOGIC
   ========================================== */

function initDetailsScreen() {
  const state = getState();
  
  updatePreviewHeader(state);
  updateQuickStats(state);
  renderPhotos(state.photos);
  renderAmenities(state.amenities);
  restoreDescription(state.description);
  updateProgressCard(state);
  
  setupDetailsListeners();
}

function updatePreviewHeader(state) {
  const propertyType = PROPERTY_TYPES[state.propertyType]?.label || 'Property';
  const subType = state.subType || propertyType;
  
  document.getElementById('previewTitle').textContent = 
    `Modern ${subType} in ${state.address.city || 'Toronto'}`;
  document.getElementById('previewType').textContent = subType;
  document.getElementById('previewCity').textContent = state.address.city || 'Toronto';
  document.getElementById('previewAddress').textContent = state.address.street || '123 Main Street';
}

function updateQuickStats(state) {
  const unit = state.units[0] || {};
  document.getElementById('statBeds').textContent = unit.bedrooms || '--';
  document.getElementById('statBaths').textContent = unit.bathrooms || '--';
  document.getElementById('statSqft').textContent = unit.sqft || '--';
}

function renderPhotos(photos) {
  const uploadArea = document.getElementById('photoUploadArea');
  const emptyState = document.getElementById('photoUploadEmpty');
  const grid = document.getElementById('photoGrid');
  const actions = document.getElementById('photoUploadActions');
  
  if (photos.length === 0) {
    uploadArea.classList.remove('has-photos');
    emptyState.classList.remove('hidden');
    grid.classList.add('hidden');
    actions.classList.add('hidden');
  } else {
    uploadArea.classList.add('has-photos');
    emptyState.classList.add('hidden');
    grid.classList.remove('hidden');
    actions.classList.remove('hidden');
    
    grid.innerHTML = photos.map((photo, index) => `
      <div class="photo-item" data-photo-id="${photo.id}">
        ${index === 0 ? '<span class="photo-item-primary">Primary</span>' : ''}
        <img src="${photo.dataUrl}" alt="${photo.name}">
        <div class="photo-item-overlay">
          <button class="photo-item-btn" onclick="removePhotoItem(${photo.id})" title="Remove">
            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
      </div>
    `).join('');
    
    document.getElementById('photoCount').textContent = `${photos.length} photo${photos.length !== 1 ? 's' : ''}`;
    
    // Update empty state text
    const minPhotos = 5;
    const remaining = Math.max(0, minPhotos - photos.length);
    document.querySelector('.photo-upload-title').textContent = 
      `Upload Photos (${photos.length}/${minPhotos} min)`;
  }
  
  lucide.createIcons();
  updateProgressCard(getState());
}

function renderAmenities(amenities) {
  const hasAmenities = Object.values(amenities).some(arr => arr.length > 0);
  const emptyState = document.getElementById('amenitiesEmpty');
  const display = document.getElementById('amenitiesDisplay');
  
  if (!hasAmenities) {
    emptyState.classList.remove('hidden');
    display.classList.add('hidden');
    return;
  }
  
  emptyState.classList.add('hidden');
  display.classList.remove('hidden');
  
  const categories = [
    { key: 'unit', label: 'Unit Features', icon: 'home' },
    { key: 'building', label: 'Building Features', icon: 'building' },
    { key: 'area', label: 'Neighbourhood', icon: 'map-pin' },
    { key: 'utilitiesIncluded', label: 'Utilities Included', icon: 'zap' },
  ];
  
  display.innerHTML = categories
    .filter(cat => amenities[cat.key]?.length > 0)
    .map(cat => `
      <div class="amenities-category">
        <div class="amenities-category-header">
          <i data-lucide="${cat.icon}" style="width: 16px; height: 16px;"></i>
          ${cat.label}
        </div>
        <div class="amenities-tags">
          ${amenities[cat.key].map(a => `
            <span class="amenity-tag">
              <i data-lucide="check" style="width: 14px; height: 14px;"></i>
              ${a}
            </span>
          `).join('')}
        </div>
      </div>
    `).join('') + `
    <button class="btn btn-outline btn-sm edit-amenities-btn" id="editAmenitiesBtn">
      Edit amenities
      <i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i>
    </button>
  `;
  
  lucide.createIcons();
  updateProgressCard(getState());
}

function restoreDescription(description) {
  document.getElementById('descriptionInput').value = description || '';
}

function updateProgressCard(state) {
  const status = getCompletionStatus();
  const items = [
    { key: 'photos', complete: status.photos },
    { key: 'bedrooms', complete: status.units },
    { key: 'bathrooms', complete: status.units },
    { key: 'description', complete: status.description },
    { key: 'amenities', complete: status.amenities },
  ];
  
  const completedCount = items.filter(i => i.complete).length;
  const percentage = (completedCount / items.length) * 100;
  
  document.getElementById('progressStatus').textContent = `${completedCount}/${items.length} complete`;
  document.getElementById('progressBar').style.width = `${percentage}%`;
  
  items.forEach(item => {
    const li = document.querySelector(`.progress-checklist li[data-item="${item.key}"]`);
    if (li) {
      li.classList.toggle('completed', item.complete);
    }
  });
  
  // Update photo count in checklist
  const photoLi = document.querySelector('.progress-checklist li[data-item="photos"]');
  if (photoLi) {
    const photoCount = state.photos.length;
    photoLi.innerHTML = `
      <span class="progress-check"></span>
      At least 5 photos (${photoCount}/5)
    `;
    photoLi.classList.toggle('completed', photoCount >= 5);
  }
  
  // Enable/disable continue button
  const continueBtn = document.getElementById('continueToPricingBtn');
  // Allow continuing with minimal requirements
  const canContinue = status.units; // At minimum, need unit details
  continueBtn.disabled = !canContinue;
}

function setupDetailsListeners() {
  // Photo upload
  document.getElementById('photoInput')?.addEventListener('change', handlePhotoUpload);
  document.getElementById('photoInputMore')?.addEventListener('change', handlePhotoUpload);
  
  // Description
  document.getElementById('descriptionInput')?.addEventListener('input', (e) => {
    updateState('description', e.target.value);
    updateProgressCard(getState());
  });
  
  // Continue to pricing
  document.getElementById('continueToPricingBtn')?.addEventListener('click', () => {
    goToScreen('pricing');
  });
  
  // AI buttons - will open modals in Sprint 2.6
  document.getElementById('smartFillBtn')?.addEventListener('click', () => {
    showToast('AI Smart Fill coming in Sprint 2.6!', 'info');
  });
  
  document.getElementById('selectAmenitiesBtn')?.addEventListener('click', () => {
    openAmenitiesModal();
  });
  
  document.getElementById('detectAmenitiesBtn')?.addEventListener('click', () => {
    showToast('AI Detection coming in Sprint 2.6!', 'info');
  });
  
  document.getElementById('aiWriteBtn')?.addEventListener('click', () => {
    showToast('AI Description coming in Sprint 2.6!', 'info');
  });
  
  document.getElementById('editAmenitiesBtn')?.addEventListener('click', () => {
    openAmenitiesModal();
  });
}

function handlePhotoUpload(e) {
  const files = Array.from(e.target.files);
  
  files.forEach(file => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      addPhoto(event.target.result, file.name);
      renderPhotos(getState().photos);
    };
    reader.readAsDataURL(file);
  });
  
  // Clear input so same file can be selected again
  e.target.value = '';
}

function removePhotoItem(photoId) {
  removePhoto(photoId);
  renderPhotos(getState().photos);
}

// Placeholder for amenities modal - will be implemented in Sprint 2.6
function openAmenitiesModal() {
  showToast('Amenities modal coming in Sprint 2.6!', 'info');
}

// Register screen init callback
onScreenLoad('details', initDetailsScreen);
```

## Step 4: Update App.js

Add to `loadScreenScripts`:

```javascript
async function loadScreenScripts() {
  const scripts = [
    'js/screens/address.js',
    'js/screens/units.js',
    'js/screens/details.js',  // ADD THIS
  ];
  // ...
}
```

## Step 5: Add Toast Info Type

Update `showToast` in `app.js` to handle 'info' type:

```javascript
function showToast(message, type = 'success') {
  // ... existing code ...
  
  const bgColors = {
    success: 'var(--text-primary)',
    error: 'var(--error)',
    info: 'var(--primary-blue)'
  };
  
  toast.style.cssText = `
    // ... existing styles ...
    background: ${bgColors[type] || bgColors.success};
    // ...
  `;
  // ...
}
```

## Step 6: Test

### Verify:
- [ ] Details screen loads with two-column layout
- [ ] Preview header shows address and property type
- [ ] Quick stats show bed/bath from units screen
- [ ] Photo upload works (select files, see grid)
- [ ] Photos display in grid with remove button
- [ ] Photo count updates correctly
- [ ] Description textarea saves to state
- [ ] Progress card updates as items complete
- [ ] Sidebar stays sticky on scroll
- [ ] Continue button enables with minimum requirements
- [ ] Mobile layout stacks correctly

## Step 7: Commit

```bash
git add .
git commit -m "Sprint 2.5: Property Details screen

- Two-column layout with sidebar
- Photo upload with grid display
- Amenities section (modal placeholder)
- Description textarea
- Progress tracking card
- Pro tips card
- Preview header with dynamic content"
```

## Output Required
Confirm:
1. Details screen layout correct
2. Photo upload working
3. Progress card updating
4. State persistence working
5. No console errors

Report status before proceeding to Sprint 2.6.
