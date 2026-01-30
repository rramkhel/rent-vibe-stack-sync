/* ==========================================
   PETS POLICY SCREEN
   ========================================== */

const PET_POLICIES = [
  { value: 'included', label: 'Yes, included', desc: 'No extra charge' },
  { value: 'withFee', label: 'Yes, with fee', desc: 'Additional cost' },
  { value: 'no', label: 'No pets', desc: 'Not allowed' },
];

const PET_TYPES = [
  { value: 'dogs', label: 'Dogs', icon: 'dog' },
  { value: 'cats', label: 'Cats', icon: 'cat' },
  { value: 'other', label: 'Other', icon: 'rabbit' },
];

const PET_SIZES = [
  { value: 'small', label: 'Small', desc: 'Under 25 lbs' },
  { value: 'medium', label: 'Medium', desc: '25-50 lbs' },
  { value: 'large', label: 'Large', desc: '50+ lbs' },
];

function initPetsScreen() {
  // Initialize state if not set
  const state = getState();
  if (!state.pets) {
    updateState('pets', {
      policy: null,
      types: [],
      sizes: [],
      fee: {
        amount: '',
        frequency: 'monthly',
        structure: 'perPet'
      }
    });
  }

  renderPetsPolicyOptions();
  renderPetsTypes();
  renderPetsSizes();
  renderPetsFeeFrequency();
  renderPetsFeeStructure();
  updatePetsVisibility();
  setupPetsEventListeners();
  updatePetsNextButton();

  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderPetsPolicyOptions() {
  const container = document.getElementById('petsPolicyOptions');
  if (!container) return;

  const state = getState();
  const pets = state.pets || {};

  container.innerHTML = PET_POLICIES.map(opt => `
    <button
      class="pets-policy-card ${pets.policy === opt.value ? 'selected' : ''}"
      data-value="${opt.value}"
      onclick="selectPetsPolicy('${opt.value}')"
    >
      <div class="pets-policy-card-label">${opt.label}</div>
      <div class="pets-policy-card-desc">${opt.desc}</div>
    </button>
  `).join('');
}

function renderPetsTypes() {
  const container = document.getElementById('petsTypes');
  if (!container) return;

  const state = getState();
  const pets = state.pets || {};
  const types = pets.types || [];

  container.innerHTML = PET_TYPES.map(opt => `
    <button
      class="pets-type-btn ${types.includes(opt.value) ? 'selected' : ''}"
      data-value="${opt.value}"
      onclick="togglePetsType('${opt.value}')"
    >
      <i data-lucide="${opt.icon}"></i>
      ${opt.label}
    </button>
  `).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderPetsSizes() {
  const container = document.getElementById('petsSizes');
  if (!container) return;

  const state = getState();
  const pets = state.pets || {};
  const sizes = pets.sizes || [];

  container.innerHTML = PET_SIZES.map(opt => `
    <button
      class="pets-size-card ${sizes.includes(opt.value) ? 'selected' : ''}"
      data-value="${opt.value}"
      onclick="togglePetsSize('${opt.value}')"
    >
      <div class="pets-size-card-label">${opt.label}</div>
      <div class="pets-size-card-desc">${opt.desc}</div>
    </button>
  `).join('');
}

function renderPetsFeeFrequency() {
  const container = document.getElementById('petsFeeFrequency');
  if (!container) return;

  const state = getState();
  const pets = state.pets || {};
  const fee = pets.fee || { frequency: 'monthly' };

  container.innerHTML = `
    <button
      class="pets-freq-btn ${fee.frequency === 'monthly' ? 'selected' : ''}"
      onclick="selectPetsFeeFrequency('monthly')"
    >
      /month
    </button>
    <button
      class="pets-freq-btn ${fee.frequency === 'oneTime' ? 'selected' : ''}"
      onclick="selectPetsFeeFrequency('oneTime')"
    >
      one-time
    </button>
  `;
}

function renderPetsFeeStructure() {
  const container = document.getElementById('petsFeeStructure');
  if (!container) return;

  const state = getState();
  const pets = state.pets || {};
  const fee = pets.fee || { amount: '', frequency: 'monthly', structure: 'perPet' };

  const amount = fee.amount || '0';
  const freq = fee.frequency === 'monthly' ? '/mo' : '';

  container.innerHTML = `
    <button
      class="pets-structure-card ${fee.structure === 'perPet' ? 'selected' : ''}"
      onclick="selectPetsFeeStructure('perPet')"
    >
      <div class="pets-structure-label">Per pet</div>
      <div class="pets-structure-desc">$${amount}${freq} × each pet</div>
    </button>
    <button
      class="pets-structure-card ${fee.structure === 'flat' ? 'selected' : ''}"
      onclick="selectPetsFeeStructure('flat')"
    >
      <div class="pets-structure-label">Flat fee</div>
      <div class="pets-structure-desc">$${amount}${freq} total, any # of pets</div>
    </button>
  `;
}

function selectPetsPolicy(value) {
  const state = getState();
  const pets = state.pets || {};
  pets.policy = value;
  updateState('pets', pets);

  renderPetsPolicyOptions();
  updatePetsVisibility();
  updatePetsNextButton();
}

function togglePetsType(value) {
  const state = getState();
  const pets = state.pets || {};
  const types = pets.types || [];

  if (types.includes(value)) {
    pets.types = types.filter(t => t !== value);
  } else {
    pets.types = [...types, value];
  }

  updateState('pets', pets);
  renderPetsTypes();
  updatePetsNextButton();
}

function togglePetsSize(value) {
  const state = getState();
  const pets = state.pets || {};
  const sizes = pets.sizes || [];

  if (sizes.includes(value)) {
    pets.sizes = sizes.filter(s => s !== value);
  } else {
    pets.sizes = [...sizes, value];
  }

  updateState('pets', pets);
  renderPetsSizes();
  updatePetsNextButton();
}

function selectPetsFeeFrequency(value) {
  const state = getState();
  const pets = state.pets || {};
  pets.fee = pets.fee || {};
  pets.fee.frequency = value;

  updateState('pets', pets);
  renderPetsFeeFrequency();
  renderPetsFeeStructure();
}

function selectPetsFeeStructure(value) {
  const state = getState();
  const pets = state.pets || {};
  pets.fee = pets.fee || {};
  pets.fee.structure = value;

  updateState('pets', pets);
  renderPetsFeeStructure();
}

function updatePetsVisibility() {
  const detailsSection = document.getElementById('petsDetails');
  const feeSection = document.getElementById('petsFeeSection');
  const noPetsSection = document.getElementById('petsNoPets');

  const state = getState();
  const pets = state.pets || {};
  const policy = pets.policy;

  const showDetails = policy === 'included' || policy === 'withFee';
  const showFee = policy === 'withFee';
  const showNoPets = policy === 'no';

  if (detailsSection) {
    detailsSection.classList.toggle('hidden', !showDetails);
  }
  if (feeSection) {
    feeSection.classList.toggle('hidden', !showFee);
  }
  if (noPetsSection) {
    noPetsSection.classList.toggle('hidden', !showNoPets);
  }
}

function setupPetsEventListeners() {
  const feeInput = document.getElementById('petsFeeAmount');
  if (feeInput) {
    const state = getState();
    const pets = state.pets || {};
    const fee = pets.fee || {};

    // Set initial value
    feeInput.value = fee.amount || '';

    // Listen for changes
    feeInput.addEventListener('input', (e) => {
      const state = getState();
      const pets = state.pets || {};
      pets.fee = pets.fee || {};
      pets.fee.amount = e.target.value;
      updateState('pets', pets);
      renderPetsFeeStructure();
    });
  }
}

function updatePetsNextButton() {
  const nextBtn = document.getElementById('footer-next-btn');
  if (!nextBtn) return;

  const state = getState();
  const pets = state.pets || {};
  const policy = pets.policy;
  let canContinue = false;

  if (policy === 'no') {
    // No pets = done
    canContinue = true;
  } else if (policy === 'included' || policy === 'withFee') {
    // Need at least one type and one size
    const hasTypes = (pets.types || []).length > 0;
    const hasSizes = (pets.sizes || []).length > 0;
    canContinue = hasTypes && hasSizes;
  }

  nextBtn.disabled = !canContinue;
}

// Register screen init callback
onScreenLoad('pets', initPetsScreen);

console.log('pets.js loaded');
