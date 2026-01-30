/* ==========================================
   REVIEW SCREEN LOGIC
   ========================================== */

function initReviewScreen() {
  const state = getState();

  renderReviewContent(state);
  calculateQualityScore(state);
  setupReviewListeners();
}

function renderReviewContent(state) {
  const unit = state.units[0] || {};
  const amenities = Object.values(state.amenities).flat();

  // Gallery
  renderGallery(state.photos);

  // Title
  const propertyType = PROPERTY_TYPES[state.propertyType]?.label || 'Property';
  const subType = state.subType || propertyType;
  document.getElementById('reviewTitle').textContent =
    `${subType} in ${state.address.city || 'Toronto'}`;

  // Price
  const price = state.rent ? `$${parseInt(state.rent).toLocaleString()}/mo` : 'Price TBD';
  document.getElementById('reviewPrice').textContent = price;

  // Meta
  document.getElementById('reviewMeta').innerHTML = `
    <span><i data-lucide="home" style="width: 14px; height: 14px;"></i> ${subType}</span>
    <span><i data-lucide="map-pin" style="width: 14px; height: 14px;"></i> ${state.address.city || 'Toronto'}, ${state.address.province || 'ON'}</span>
  `;

  // Quick facts
  document.getElementById('reviewBeds').textContent =
    unit.bedrooms === 'studio' ? 'Studio' : `${unit.bedrooms || '--'} beds`;
  document.getElementById('reviewBaths').textContent = `${unit.bathrooms || '--'} bath`;
  document.getElementById('reviewSqft').textContent = unit.sqft ? `${unit.sqft} sqft` : '-- sqft';
  document.getElementById('reviewDate').textContent = formatAvailableDate(state.availableDate);

  // Description
  document.getElementById('reviewDescription').textContent =
    state.description || 'No description provided. Add one to attract more renters!';

  // Amenities
  renderReviewAmenities(amenities);

  // Details
  renderReviewDetails(state, unit);

  lucide.createIcons();
}

function renderGallery(photos) {
  const mainContainer = document.getElementById('reviewMainPhoto');
  const thumbsContainer = document.getElementById('reviewThumbs');

  if (photos.length === 0) {
    mainContainer.classList.add('empty');
    mainContainer.innerHTML = `
      <div>
        <i data-lucide="image" style="width: 48px; height: 48px;"></i>
        <p style="margin-top: var(--space-md);">No photos uploaded</p>
      </div>
    `;
    thumbsContainer.innerHTML = '';
    return;
  }

  mainContainer.classList.remove('empty');
  mainContainer.innerHTML = `<img src="${photos[0].dataUrl}" alt="Primary photo">`;

  thumbsContainer.innerHTML = photos.slice(0, 5).map((photo, i) => `
    <div class="review-thumb ${i === 0 ? 'active' : ''}" onclick="setMainPhoto(${i})">
      <img src="${photo.dataUrl}" alt="Photo ${i + 1}">
    </div>
  `).join('');

  if (photos.length > 5) {
    thumbsContainer.innerHTML += `
      <div class="review-thumb" style="display: flex; align-items: center; justify-content: center; background: var(--background-muted);">
        +${photos.length - 5}
      </div>
    `;
  }
}

function setMainPhoto(index) {
  const state = getState();
  const mainContainer = document.getElementById('reviewMainPhoto');

  if (state.photos[index]) {
    mainContainer.innerHTML = `<img src="${state.photos[index].dataUrl}" alt="Photo">`;

    document.querySelectorAll('.review-thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }
}

function renderReviewAmenities(amenities) {
  const container = document.getElementById('reviewAmenities');

  if (amenities.length === 0) {
    container.innerHTML = '<p class="text-muted">No amenities added yet</p>';
    return;
  }

  container.innerHTML = amenities.map(a => `
    <span class="review-amenity">
      <i data-lucide="check" style="width: 14px; height: 14px;"></i>
      ${a}
    </span>
  `).join('');
}

function renderReviewDetails(state, unit) {
  const container = document.getElementById('reviewDetails');

  const details = [
    { label: 'Property Type', value: state.subType || PROPERTY_TYPES[state.propertyType]?.label || '--' },
    { label: 'Bedrooms', value: unit.bedrooms === 'studio' ? 'Studio' : unit.bedrooms || '--' },
    { label: 'Bathrooms', value: unit.bathrooms || '--' },
    { label: 'Square Feet', value: unit.sqft || '--' },
    { label: 'Furnished', value: FURNISHED_OPTIONS.find(o => o.value === unit.furnished)?.label || '--' },
    { label: 'Laundry', value: LAUNDRY_OPTIONS.find(o => o.value === unit.laundry)?.label || '--' },
    { label: 'Parking', value: PARKING_OPTIONS.find(o => o.value === unit.parkingType)?.label || '--' },
    { label: 'Lease Term', value: LEASE_TERMS.find(o => o.value === state.leaseTerm)?.label || '--' },
  ];

  container.innerHTML = details.map(d => `
    <div class="review-detail-row">
      <span class="review-detail-label">${d.label}</span>
      <span class="review-detail-value">${d.value}</span>
    </div>
  `).join('');
}

function formatAvailableDate(dateStr) {
  if (!dateStr) return 'Not specified';

  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date <= today) {
    return 'Available Now';
  }

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function calculateQualityScore(state) {
  const unit = state.units[0] || {};
  const amenities = Object.values(state.amenities).flat();

  const criteria = [
    { label: '5+ photos', complete: state.photos.length >= 5 },
    { label: 'All unit details', complete: unit.bedrooms && unit.bathrooms && unit.sqft },
    { label: 'Description added', complete: state.description && state.description.length > 50 },
    { label: '3+ amenities', complete: amenities.length >= 3 },
    { label: 'Price set', complete: !!state.rent },
  ];

  const completedCount = criteria.filter(c => c.complete).length;
  const percentage = Math.round((completedCount / criteria.length) * 100);

  // Update score display
  document.getElementById('qualityScoreValue').textContent = `${percentage}%`;
  document.getElementById('qualityScoreFill').setAttribute('stroke-dasharray', `${percentage}, 100`);

  // Update label
  const labels = {
    100: 'Excellent! Your listing is fully optimized',
    80: 'Great! Just a few more details',
    60: 'Good start! Add more to stand out',
    40: 'Getting there! Keep adding details',
    20: 'Add more details to attract renters',
    0: 'Let\'s add some details to your listing',
  };

  const labelKey = Math.floor(percentage / 20) * 20;
  document.getElementById('qualityScoreLabel').textContent = labels[labelKey] || labels[0];

  // Update checklist
  const checklist = document.getElementById('qualityChecklist');
  checklist.innerHTML = criteria.map(c => `
    <li class="${c.complete ? 'complete' : ''}">${c.label}</li>
  `).join('');

  // Update publish button
  const publishBtn = document.getElementById('publishBtn');
  const canPublish = state.photos.length > 0 && state.rent && unit.bedrooms;
  publishBtn.disabled = !canPublish;
}

function setupReviewListeners() {
  document.getElementById('publishBtn')?.addEventListener('click', publishListing);
}

function publishListing() {
  const btn = document.getElementById('publishBtn');
  btn.disabled = true;
  btn.innerHTML = `
    <div class="ai-loading-spinner" style="width: 18px; height: 18px; border-width: 2px;"></div>
    Publishing...
  `;

  // Simulate publish delay
  setTimeout(() => {
    openModal('publishSuccessModal');
    btn.disabled = false;
    btn.innerHTML = `
      <i data-lucide="sparkles" style="width: 18px; height: 18px;"></i>
      Publish Listing
    `;
    lucide.createIcons();
  }, 2000);
}

function viewListing() {
  showToast('In production, this would open your live listing!', 'info');
  closeModal('publishSuccessModal');
}

function createAnother() {
  if (confirm('Start a new listing? Your current listing has been published.')) {
    resetState();
    window.location.reload();
  }
}

// Register screen init callback
onScreenLoad('review', initReviewScreen);
