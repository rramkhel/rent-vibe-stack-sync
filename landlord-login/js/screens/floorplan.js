/* ==========================================
   FLOORPLAN SCREEN LOGIC
   ========================================== */

function initFloorplanScreen() {
  const state = getState();

  // Restore state
  restoreFloorplanState(state);

  // Set up event listeners
  setupFloorplanListeners();

  // Update footer button state
  updateFloorplanNextButton();
}

function restoreFloorplanState(state) {
  // Restore bedrooms
  if (state.bedrooms) {
    document.querySelectorAll('#bedroomSelector .floorplan-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.value === state.bedrooms);
    });
  }

  // Restore bathrooms
  if (state.bathrooms) {
    document.querySelectorAll('#bathroomSelector .floorplan-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.value === state.bathrooms);
    });
  }

  // Restore square footage
  if (state.sqft) {
    document.getElementById('sqftInput').value = state.sqft;
  }
}

function setupFloorplanListeners() {
  // Bedroom selector
  document.getElementById('bedroomSelector')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.floorplan-btn');
    if (btn) {
      // Remove selected from all
      document.querySelectorAll('#bedroomSelector .floorplan-btn').forEach(b => b.classList.remove('selected'));
      // Add selected to clicked
      btn.classList.add('selected');
      // Update state
      updateState('bedrooms', btn.dataset.value);
      updateFloorplanNextButton();
    }
  });

  // Bathroom selector
  document.getElementById('bathroomSelector')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.floorplan-btn');
    if (btn) {
      // Remove selected from all
      document.querySelectorAll('#bathroomSelector .floorplan-btn').forEach(b => b.classList.remove('selected'));
      // Add selected to clicked
      btn.classList.add('selected');
      // Update state
      updateState('bathrooms', btn.dataset.value);
      updateFloorplanNextButton();
    }
  });

  // Square footage input
  document.getElementById('sqftInput')?.addEventListener('input', (e) => {
    updateState('sqft', e.target.value);
    updateFloorplanNextButton();
  });
}

function updateFloorplanNextButton() {
  const state = getState();
  const nextBtn = document.getElementById('footer-next-btn');

  // Check each field (bedrooms/bathrooms can be "0" which is falsy, so check for !== '')
  const bedroomsSelected = state.bedrooms !== '' && state.bedrooms !== null && state.bedrooms !== undefined;
  const bathroomsSelected = state.bathrooms !== '' && state.bathrooms !== null && state.bathrooms !== undefined;
  const sqftEntered = state.sqft && state.sqft.toString().trim() !== '';

  // Enable Continue only when ALL three fields are filled
  const isComplete = bedroomsSelected && bathroomsSelected && sqftEntered;

  if (nextBtn) {
    nextBtn.disabled = !isComplete;
  }
}

// Register screen init callback
onScreenLoad('floorplan', initFloorplanScreen);

console.log('floorplan.js loaded');
