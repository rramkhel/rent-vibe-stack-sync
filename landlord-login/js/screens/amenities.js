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
    <button class="amenity-card ${state.furnished === opt.value ? 'selected' : ''}"
            data-value="${opt.value}"
            onclick="selectFurnished('${opt.value}')">
      <div class="amenity-card-label">${opt.label}</div>
      <div class="amenity-card-desc">${opt.description}</div>
    </button>
  `).join('');
}

function renderLaundryOptions() {
  const container = document.getElementById('laundryOptions');
  if (!container) return;

  const state = getState();

  container.innerHTML = LAUNDRY_OPTIONS.map(opt => `
    <button class="amenity-card ${state.laundry === opt.value ? 'selected' : ''}"
            data-value="${opt.value}"
            onclick="selectLaundry('${opt.value}')">
      <div class="amenity-card-label">${opt.label}</div>
      <div class="amenity-card-desc">${opt.description}</div>
    </button>
  `).join('');
}

function renderParkingAvailability() {
  const container = document.getElementById('parkingAvailability');
  if (!container) return;

  const state = getState();

  container.innerHTML = PARKING_AVAILABILITY.map(opt => `
    <button class="amenity-card ${state.parkingAvailability === opt.value ? 'selected' : ''}"
            data-value="${opt.value}"
            onclick="selectParkingAvailability('${opt.value}')">
      <div class="amenity-card-label">${opt.label}</div>
      <div class="amenity-card-desc">${opt.description}</div>
    </button>
  `).join('');
}

function renderParkingTypes() {
  const container = document.getElementById('parkingTypes');
  if (!container) return;

  const state = getState();

  container.innerHTML = PARKING_TYPES.map(opt => `
    <button class="amenity-pill ${state.parkingType === opt.value ? 'selected' : ''}"
            data-value="${opt.value}"
            onclick="selectParkingType('${opt.value}')">
      ${opt.label}
    </button>
  `).join('');
}

/* ------------------------------------------
   Selection Handlers
   ------------------------------------------ */

function selectFurnished(value) {
  // Update state
  updateState('furnished', value);

  // Update UI
  const container = document.getElementById('furnishedOptions');
  container.querySelectorAll('.amenity-card').forEach(c => c.classList.remove('selected'));
  container.querySelector(`.amenity-card[data-value="${value}"]`)?.classList.add('selected');

  updateAmenitiesNextButton();
}

function selectLaundry(value) {
  // Update state
  updateState('laundry', value);

  // Update UI
  const container = document.getElementById('laundryOptions');
  container.querySelectorAll('.amenity-card').forEach(c => c.classList.remove('selected'));
  container.querySelector(`.amenity-card[data-value="${value}"]`)?.classList.add('selected');

  updateAmenitiesNextButton();
}

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
