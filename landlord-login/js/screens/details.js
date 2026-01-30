/* ==========================================
   DETAILS SCREEN
   Manual details AI can't detect
   ========================================== */

const DETAILS_CONFIG = {
  smoking: {
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'outside', label: 'Outside only' },
      { id: 'no', label: 'No' },
    ],
  },
  security: {
    color: 'blue',
    options: [
      { id: 'alarm', label: 'Alarm system' },
      { id: 'intercom', label: 'Video intercom' },
      { id: 'keyless', label: 'Keyless entry' },
      { id: 'doorman', label: 'Doorman' },
      { id: 'secure-parking', label: 'Secure parking' },
    ],
  },
  storage: {
    color: 'amber',
    options: [
      { id: 'in-unit', label: 'In-unit storage' },
      { id: 'locker', label: 'Storage locker' },
      { id: 'bike', label: 'Bike storage' },
      { id: 'basement', label: 'Basement storage' },
    ],
  },
  accessibility: {
    color: 'purple',
    options: [
      { id: 'wheelchair', label: 'Wheelchair accessible' },
      { id: 'step-free', label: 'Step-free entry' },
      { id: 'wide-doors', label: 'Wide doorways' },
      { id: 'accessible-bath', label: 'Accessible bathroom' },
      { id: 'elevator', label: 'Elevator access' },
    ],
  },
};

function initDetailsScreen() {
  const state = getState();

  // Initialize state if not set
  if (!state.details || typeof state.details.smoking === 'undefined') {
    updateState('details', {
      smoking: null,
      security: [],
      storage: [],
      accessibility: [],
    });
  }

  renderDetailsScreen();

  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderDetailsScreen() {
  renderSmokingOptions();
  renderPillGroup('security', 'securityOptions');
  renderPillGroup('storage', 'storageOptions');
  renderPillGroup('accessibility', 'accessibilityOptions');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderSmokingOptions() {
  const container = document.getElementById('smokingOptions');
  if (!container) return;

  const state = getState();
  const details = state.details || {};
  const current = details.smoking;

  container.innerHTML = DETAILS_CONFIG.smoking.options.map(opt => `
    <button
      class="details-option-btn ${current === opt.id ? 'selected' : ''}"
      onclick="selectSmoking('${opt.id}')"
    >
      ${opt.label}
    </button>
  `).join('');
}

function selectSmoking(value) {
  const state = getState();
  const details = state.details || {};
  details.smoking = value;
  updateState('details', details);
  renderSmokingOptions();
}

function renderPillGroup(key, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const state = getState();
  const details = state.details || {};
  const config = DETAILS_CONFIG[key];
  const selected = details[key] || [];

  container.innerHTML = config.options.map(opt => {
    const isSelected = selected.includes(opt.id);
    const selectedClass = isSelected ? `selected selected--${config.color}` : '';

    return `
      <button
        class="details-pill ${selectedClass}"
        onclick="toggleDetailsPill('${key}', '${opt.id}')"
      >
        <i data-lucide="check"></i>
        ${opt.label}
      </button>
    `;
  }).join('');
}

function toggleDetailsPill(key, id) {
  const state = getState();
  const details = state.details || {};

  if (!details[key]) {
    details[key] = [];
  }

  const idx = details[key].indexOf(id);
  if (idx > -1) {
    details[key].splice(idx, 1);
  } else {
    details[key].push(id);
  }

  updateState('details', details);
  renderPillGroup(key, `${key}Options`);

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Register screen load callback
onScreenLoad('details', initDetailsScreen);

console.log('details.js loaded');
