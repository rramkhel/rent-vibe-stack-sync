/* ==========================================
   AMENITIES SCREEN LOGIC
   ========================================== */

function initAmenitiesScreen() {
  // Render options
  renderFurnishedOptions();
  renderLaundryOptions();
  renderParkingAvailability();
  toggleParkingTypes(); // Show/hide type based on current state

  // Update footer button state
  updateAmenitiesNextButton();
}

/* ------------------------------------------
   Render Functions
   ------------------------------------------ */

function renderFurnishedOptions() {
  const container = document.getElementById('furnishedOptions');
  if (!container) return;

  const state = getState();

  container.innerHTML = FURNISHED_OPTIONS.map(opt => `
    <div class="amenity-card ${state.furnished === opt.value ? 'selected' : ''}" data-value="${opt.value}">
      <div class="amenity-card-label">${opt.label}</div>
      <div class="amenity-card-desc">${opt.description}</div>
    </div>
  `).join('');

  // Add click handlers
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.amenity-card');
    if (card) {
      // Remove selected from all in this section
      container.querySelectorAll('.amenity-card').forEach(c => c.classList.remove('selected'));
      // Add selected to clicked
      card.classList.add('selected');
      // Update state
      updateState('furnished', card.dataset.value);
      updateAmenitiesNextButton();
    }
  });
}

function renderLaundryOptions() {
  const container = document.getElementById('laundryOptions');
  if (!container) return;

  const state = getState();

  container.innerHTML = LAUNDRY_OPTIONS.map(opt => `
    <div class="amenity-card ${state.laundry === opt.value ? 'selected' : ''}" data-value="${opt.value}">
      <div class="amenity-card-label">${opt.label}</div>
      <div class="amenity-card-desc">${opt.description}</div>
    </div>
  `).join('');

  // Add click handlers
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.amenity-card');
    if (card) {
      // Remove selected from all in this section
      container.querySelectorAll('.amenity-card').forEach(c => c.classList.remove('selected'));
      // Add selected to clicked
      card.classList.add('selected');
      // Update state
      updateState('laundry', card.dataset.value);
      updateAmenitiesNextButton();
    }
  });
}

function renderParkingAvailability() {
  const container = document.getElementById('parkingAvailability');
  if (!container) return;

  const state = getState();

  container.innerHTML = PARKING_AVAILABILITY.map(opt => `
    <div class="amenity-card ${state.parkingAvailability === opt.value ? 'selected' : ''}" data-value="${opt.value}">
      <div class="amenity-card-label">${opt.label}</div>
      <div class="amenity-card-desc">${opt.description}</div>
    </div>
  `).join('');

  // Add click handlers
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.amenity-card');
    if (card) {
      selectParkingAvailability(card.dataset.value);
    }
  });
}

function renderParkingTypes() {
  const container = document.getElementById('parkingTypes');
  if (!container) return;

  const state = getState();

  container.innerHTML = PARKING_TYPES.map(opt => `
    <button class="amenity-pill ${state.parkingType === opt.value ? 'selected' : ''}" data-value="${opt.value}">
      ${opt.label}
    </button>
  `).join('');

  // Add click handlers
  container.addEventListener('click', (e) => {
    const pill = e.target.closest('.amenity-pill');
    if (pill) {
      selectParkingType(pill.dataset.value);
    }
  });
}

/* ------------------------------------------
   Selection Handlers
   ------------------------------------------ */

function selectParkingAvailability(value) {
  // Update state
  updateState('parkingAvailability', value);

  // Clear parking type if switching to "none"
  if (value === 'none') {
    updateState('parkingType', '');
  }

  // Update UI
  const container = document.getElementById('parkingAvailability');
  container.querySelectorAll('.amenity-card').forEach(c => c.classList.remove('selected'));
  container.querySelector(`.amenity-card[data-value="${value}"]`)?.classList.add('selected');

  toggleParkingTypes();
  updateAmenitiesNextButton();
}

function selectParkingType(value) {
  // Update state
  updateState('parkingType', value);

  // Update UI
  const container = document.getElementById('parkingTypes');
  container.querySelectorAll('.amenity-pill').forEach(p => p.classList.remove('selected'));
  container.querySelector(`.amenity-pill[data-value="${value}"]`)?.classList.add('selected');

  updateAmenitiesNextButton();
}

function toggleParkingTypes() {
  const section = document.getElementById('parkingTypeSection');
  if (!section) return;

  const state = getState();

  // Show type selection only if "included" or "available" is selected
  if (state.parkingAvailability === 'included' || state.parkingAvailability === 'available') {
    section.classList.remove('hidden');
    renderParkingTypes();
  } else {
    section.classList.add('hidden');
  }
}

/* ------------------------------------------
   Validation
   ------------------------------------------ */

function updateAmenitiesNextButton() {
  const state = getState();
  const nextBtn = document.getElementById('footer-next-btn');

  // Furnished and Laundry are required
  const hasFurnished = !!state.furnished;
  const hasLaundry = !!state.laundry;

  // Parking: availability is required
  // If "included" or "available", type is also required
  const hasParkingAvailability = !!state.parkingAvailability;
  const needsParkingType = state.parkingAvailability === 'included' || state.parkingAvailability === 'available';
  const hasParkingType = !!state.parkingType;
  const parkingComplete = hasParkingAvailability && (!needsParkingType || hasParkingType);

  const isComplete = hasFurnished && hasLaundry && parkingComplete;

  if (nextBtn) {
    nextBtn.disabled = !isComplete;
  }
}

// Register screen init callback
onScreenLoad('amenities', initAmenitiesScreen);

console.log('amenities.js loaded');
