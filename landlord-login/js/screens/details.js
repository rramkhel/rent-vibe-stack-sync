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

  // AI buttons - open modals
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
