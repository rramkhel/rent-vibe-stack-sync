/* ==========================================
   ADDRESS SCREEN LOGIC
   ========================================== */

let addressHighlightedIndex = -1;

function initAddressScreen() {
  const state = getState();

  // Render property type cards
  renderPropertyTypeCards();

  // Restore state
  restoreAddressState(state);

  // Set up event listeners
  setupAddressListeners();

  // Update footer button state
  updateAddressNextButton();
}

function renderPropertyTypeCards() {
  const grid = document.getElementById('propertyTypeGrid');
  if (!grid) return;

  grid.innerHTML = Object.entries(PROPERTY_TYPES).map(([type, config]) => `
    <div class="selection-card" data-type="${type}">
      <i data-lucide="${config.icon}" class="selection-card-icon"></i>
      <div class="selection-card-label">${config.label}</div>
    </div>
  `).join('');

  lucide.createIcons();
}

function restoreAddressState(state) {
  // Restore address input
  if (state.address.street) {
    document.getElementById('addressInput').value = state.address.full;
    document.getElementById('mapPlaceholder').classList.add('has-address');
    document.getElementById('mapLabel').textContent = state.address.street;
    document.getElementById('mapLabel').classList.remove('hidden');
    document.getElementById('propertyTypeSection').classList.remove('hidden');
  }

  // Restore property type
  if (state.propertyType) {
    document.querySelectorAll('.selection-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.type === state.propertyType);
    });
    renderSubtypes(state.propertyType, state.subType);
    document.getElementById('unitNumberSection').classList.remove('hidden');
  }

  // Restore unit number
  if (state.hasUnitNumber) {
    document.getElementById('hasUnitNumber').checked = true;
    document.getElementById('unitNumberInputWrapper').classList.remove('hidden');
    document.getElementById('unitNumberInput').value = state.unitNumber || '';
  }
}

function setupAddressListeners() {
  const addressInput = document.getElementById('addressInput');
  const suggestions = document.getElementById('addressSuggestions');

  // Address input
  addressInput.addEventListener('input', (e) => {
    handleAddressInput(e.target.value);
  });

  addressInput.addEventListener('focus', () => {
    if (addressInput.value.length >= 2) {
      handleAddressInput(addressInput.value);
    }
  });

  addressInput.addEventListener('keydown', handleAddressKeydown);

  // Click outside to close suggestions
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.address-search-container')) {
      suggestions.classList.remove('show');
    }
  });

  // Property type cards
  document.getElementById('propertyTypeGrid')?.addEventListener('click', (e) => {
    const card = e.target.closest('.selection-card');
    if (card) {
      selectPropertyType(card.dataset.type);
    }
  });

  // Subtype pills
  document.getElementById('subtypePills')?.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (pill) {
      selectSubtype(pill.dataset.subtype);
    }
  });

  // Unit number checkbox
  document.getElementById('hasUnitNumber')?.addEventListener('change', (e) => {
    toggleUnitNumber(e.target.checked);
  });

  // Unit number input
  document.getElementById('unitNumberInput')?.addEventListener('input', (e) => {
    updateState('unitNumber', e.target.value);
  });
}

function handleAddressInput(value) {
  const suggestionsEl = document.getElementById('addressSuggestions');
  addressHighlightedIndex = -1;

  if (value.length < 2) {
    suggestionsEl.classList.remove('show');
    return;
  }

  const filtered = MOCK_ADDRESSES.filter(addr =>
    addr.street.toLowerCase().includes(value.toLowerCase()) ||
    addr.city.toLowerCase().includes(value.toLowerCase())
  );

  if (filtered.length === 0) {
    suggestionsEl.classList.remove('show');
    return;
  }

  renderAddressSuggestions(filtered);
  suggestionsEl.classList.add('show');
}

function renderAddressSuggestions(addresses) {
  const suggestionsEl = document.getElementById('addressSuggestions');
  suggestionsEl.innerHTML = addresses.map((addr, i) => `
    <div class="address-suggestion ${i === addressHighlightedIndex ? 'highlighted' : ''}"
         data-index="${i}"
         data-street="${addr.street}"
         data-city="${addr.city}"
         data-province="${addr.province}"
         data-postal="${addr.postal}">
      <i data-lucide="map-pin" class="address-suggestion-icon" style="width: 18px; height: 18px;"></i>
      <div class="address-suggestion-text">
        <div class="address-suggestion-main">${addr.street}</div>
        <div class="address-suggestion-sub">${addr.city}, ${addr.province} ${addr.postal}</div>
      </div>
    </div>
  `).join('');

  // Add click handlers
  suggestionsEl.querySelectorAll('.address-suggestion').forEach(el => {
    el.addEventListener('click', () => {
      selectAddress(el.dataset.street, el.dataset.city, el.dataset.province, el.dataset.postal);
    });
  });

  lucide.createIcons();
}

function handleAddressKeydown(event) {
  const suggestionsEl = document.getElementById('addressSuggestions');
  const suggestions = suggestionsEl.querySelectorAll('.address-suggestion');

  if (!suggestionsEl.classList.contains('show') || suggestions.length === 0) return;

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    addressHighlightedIndex = Math.min(addressHighlightedIndex + 1, suggestions.length - 1);
    updateAddressHighlight(suggestions);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    addressHighlightedIndex = Math.max(addressHighlightedIndex - 1, 0);
    updateAddressHighlight(suggestions);
  } else if (event.key === 'Enter' && addressHighlightedIndex >= 0) {
    event.preventDefault();
    suggestions[addressHighlightedIndex].click();
  } else if (event.key === 'Escape') {
    suggestionsEl.classList.remove('show');
  }
}

function updateAddressHighlight(suggestions) {
  suggestions.forEach((s, i) => {
    s.classList.toggle('highlighted', i === addressHighlightedIndex);
  });
}

function selectAddress(street, city, province, postal) {
  const full = `${street}, ${city}, ${province} ${postal}`;

  updateState('address', { full, street, city, province, postalCode: postal });

  document.getElementById('addressInput').value = full;
  document.getElementById('addressSuggestions').classList.remove('show');

  document.getElementById('mapPlaceholder').classList.add('has-address');
  document.getElementById('mapLabel').textContent = street;
  document.getElementById('mapLabel').classList.remove('hidden');

  document.getElementById('propertyTypeSection').classList.remove('hidden');

  updateAddressNextButton();
}

function selectPropertyType(type) {
  updateState('propertyType', type);
  updateState('subType', '');

  document.querySelectorAll('.selection-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.type === type);
  });

  renderSubtypes(type);
  document.getElementById('unitNumberSection').classList.remove('hidden');

  updateAddressNextButton();
}

function renderSubtypes(type, selectedSubtype = '') {
  const subtypeSection = document.getElementById('subtypeSection');
  const subtypePills = document.getElementById('subtypePills');

  const subtypes = PROPERTY_SUBTYPES[type];

  if (subtypes && subtypes.length > 0) {
    subtypePills.innerHTML = subtypes.map(st => `
      <button class="pill ${selectedSubtype === st ? 'selected' : ''}" data-subtype="${st}">${st}</button>
    `).join('');
    subtypeSection.classList.remove('hidden');
  } else {
    subtypeSection.classList.add('hidden');
  }
}

function selectSubtype(subtype) {
  updateState('subType', subtype);

  document.querySelectorAll('#subtypePills .pill').forEach(pill => {
    pill.classList.toggle('selected', pill.dataset.subtype === subtype);
  });
}

function toggleUnitNumber(checked) {
  updateState('hasUnitNumber', checked);

  const wrapper = document.getElementById('unitNumberInputWrapper');
  wrapper.classList.toggle('hidden', !checked);

  if (!checked) {
    updateState('unitNumber', '');
    document.getElementById('unitNumberInput').value = '';
  }
}

function updateAddressNextButton() {
  const state = getState();
  const nextBtn = document.getElementById('footer-next-btn');

  const isComplete = state.address.street && state.propertyType;

  if (nextBtn) {
    nextBtn.disabled = !isComplete;
  }
}

// Register screen init callback
onScreenLoad('address', initAddressScreen);
