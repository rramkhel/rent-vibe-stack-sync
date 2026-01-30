/* ==========================================
   PRICING SCREEN LOGIC
   ========================================== */

function initPricingScreen() {
  const state = getState();

  updateMarketInsight(state);
  restorePricingState(state);
  setupPricingListeners();
  updatePricingNextButton();
}

function updateMarketInsight(state) {
  const unit = state.units[0] || {};
  const city = state.address.city || 'Toronto';
  const bedrooms = unit.bedrooms || '1';

  const marketData = MARKET_DATA[city] || MARKET_DATA['default'];
  const range = marketData[bedrooms] || marketData['1'];

  const bedroomLabel = bedrooms === 'studio' ? 'studio apartments' : `${bedrooms}BR apartments`;

  document.getElementById('marketInsightText').innerHTML =
    `Similar ${bedroomLabel} in ${city} rent for <strong>$${range.min.toLocaleString()} - $${range.max.toLocaleString()}/month</strong>`;
}

function restorePricingState(state) {
  // Rent
  if (state.rent) {
    document.getElementById('rentInput').value = state.rent;
  }

  // Utilities
  const utilRadio = document.querySelector(`input[name="utilitiesIncluded"][value="${state.utilitiesIncludedType || 'none'}"]`);
  if (utilRadio) {
    utilRadio.checked = true;
  }

  // Update utilities hint based on what's included
  updateUtilitiesHint(state);

  // Available date
  if (state.availableDate) {
    document.getElementById('availableDateInput').value = state.availableDate;
  }

  // Lease term
  const leaseRadio = document.querySelector(`input[name="leaseTerm"][value="${state.leaseTerm || '1-year'}"]`);
  if (leaseRadio) {
    leaseRadio.checked = true;
  }
}

function updateUtilitiesHint(state) {
  const unit = state.units[0] || {};
  const includedUtilities = [];

  if (unit.utilities) {
    Object.entries(unit.utilities).forEach(([util, status]) => {
      if (status === 'included') {
        const utilInfo = UTILITIES.find(u => u.id === util);
        if (utilInfo) {
          includedUtilities.push(utilInfo.label);
        }
      }
    });
  }

  const hint = document.getElementById('utilitiesHint');
  if (includedUtilities.length > 0) {
    hint.textContent = `Included: ${includedUtilities.join(', ')}`;
    hint.style.color = 'var(--success)';
  } else {
    hint.textContent = 'No utilities marked as included. Edit in Unit Details.';
    hint.style.color = 'var(--text-muted)';
  }
}

function setupPricingListeners() {
  // Rent input
  document.getElementById('rentInput')?.addEventListener('input', (e) => {
    updateState('rent', e.target.value);
    updatePricingNextButton();
  });

  // Smart pricing button
  document.getElementById('getSmartPricingBtn')?.addEventListener('click', () => {
    openSmartPricingModal();
  });

  // Utilities toggle
  document.querySelectorAll('input[name="utilitiesIncluded"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      updateState('utilitiesIncludedType', e.target.value);
    });
  });

  // Available date
  document.getElementById('availableDateInput')?.addEventListener('change', (e) => {
    updateState('availableDate', e.target.value);
    updateDatePills();
    updatePricingNextButton();
  });

  // Quick date options
  document.querySelectorAll('.date-quick-options .pill').forEach(pill => {
    pill.addEventListener('click', () => {
      selectQuickDate(pill.dataset.date);
    });
  });

  // Lease term
  document.querySelectorAll('input[name="leaseTerm"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      updateState('leaseTerm', e.target.value);
    });
  });
}

function selectQuickDate(option) {
  const input = document.getElementById('availableDateInput');
  let date;

  if (option === 'today') {
    date = new Date();
  } else if (option === 'first') {
    date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);
  }

  if (date) {
    const formatted = date.toISOString().split('T')[0];
    input.value = formatted;
    updateState('availableDate', formatted);
    updateDatePills();
    updatePricingNextButton();
  }
}

function updateDatePills() {
  const currentDate = document.getElementById('availableDateInput').value;
  const today = new Date().toISOString().split('T')[0];

  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(1);
  const firstOfNext = nextMonth.toISOString().split('T')[0];

  document.querySelectorAll('.date-quick-options .pill').forEach(pill => {
    if (pill.dataset.date === 'today') {
      pill.classList.toggle('selected', currentDate === today);
    } else if (pill.dataset.date === 'first') {
      pill.classList.toggle('selected', currentDate === firstOfNext);
    }
  });
}

function updatePricingNextButton() {
  const state = getState();
  const nextBtn = document.getElementById('footer-next-btn');
  const validation = document.getElementById('pricingValidation');

  const isComplete = state.rent && state.availableDate;

  if (nextBtn) {
    nextBtn.disabled = !isComplete;
  }

  // Show/hide validation message
  if (validation) {
    validation.classList.toggle('hidden', isComplete);
  }
}

// Register screen init callback
onScreenLoad('pricing', initPricingScreen);
