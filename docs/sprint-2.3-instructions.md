# Sprint 2.3: Welcome + Address Screens

## Objective
Build the first two functional screens: Welcome and Address entry.

## Prerequisites
- Sprint 2.2 complete (state + router working)

## Step 1: Create Welcome Screen

Create `landlord-login/screens/welcome.html`:

```html
<section class="screen" id="screen-welcome">
  <div class="welcome-screen">
    <div class="welcome-content">
      <div class="welcome-logo">Rentals.ca</div>
      <h1 class="welcome-title">Create Your Listing in 10 Minutes</h1>
      
      <div class="welcome-steps">
        <div class="welcome-step">
          <div class="welcome-step-icon">
            <i data-lucide="map-pin" style="width: 20px; height: 20px;"></i>
          </div>
          <div class="welcome-step-content">
            <div class="welcome-step-label">Step 1</div>
            <div class="welcome-step-title">Tell us your address</div>
          </div>
        </div>
        <div class="welcome-step">
          <div class="welcome-step-icon">
            <i data-lucide="camera" style="width: 20px; height: 20px;"></i>
          </div>
          <div class="welcome-step-content">
            <div class="welcome-step-label">Step 2</div>
            <div class="welcome-step-title">Show us your property</div>
          </div>
        </div>
        <div class="welcome-step">
          <div class="welcome-step-icon">
            <i data-lucide="dollar-sign" style="width: 20px; height: 20px;"></i>
          </div>
          <div class="welcome-step-content">
            <div class="welcome-step-label">Step 3</div>
            <div class="welcome-step-title">Set your price</div>
          </div>
        </div>
      </div>
      
      <div class="welcome-cta">
        <button class="btn btn-primary btn-lg" onclick="goToScreen('address')" style="width: 100%;">
          Get Started
        </button>
      </div>
      
      <div class="welcome-tip">
        <i data-lucide="lightbulb" style="width: 16px; height: 16px;"></i>
        <span>Tip: Have 5-15 photos ready</span>
      </div>
    </div>
  </div>
</section>
```

## Step 2: Add Welcome Screen Styles

Add to `landlord-login/css/screens.css`:

```css
/* ==========================================
   WELCOME SCREEN
   ========================================== */
.welcome-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  padding: var(--space-xl);
  text-align: center;
}

.welcome-content {
  max-width: 440px;
}

.welcome-logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-pink);
  margin-bottom: var(--space-xl);
}

.welcome-title {
  font-size: 2rem;
  margin-bottom: var(--space-2xl);
}

.welcome-steps {
  text-align: left;
  margin-bottom: var(--space-2xl);
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.welcome-step {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
}

.welcome-step:not(:last-child) {
  border-bottom: 1px solid var(--border);
}

.welcome-step-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-blue-light);
  color: var(--primary-blue);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.welcome-step-content {
  flex: 1;
}

.welcome-step-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.welcome-step-title {
  font-weight: 500;
  color: var(--text-primary);
}

.welcome-cta {
  margin-bottom: var(--space-lg);
}

.welcome-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  font-size: 0.875rem;
  color: var(--text-muted);
}

.welcome-tip i {
  color: var(--warning);
}

@media (max-width: 640px) {
  .welcome-title {
    font-size: 1.75rem;
  }
}
```

## Step 3: Create Address Screen

Create `landlord-login/screens/address.html`:

```html
<section class="screen" id="screen-address">
  <div class="content-centered screen-content">
    
    <div class="screen-header">
      <h1 class="screen-title">Where's your property?</h1>
    </div>
    
    <!-- Address Search -->
    <div class="section">
      <label class="form-label">Property Address</label>
      <div class="address-search-container">
        <div class="form-input-with-icon">
          <i data-lucide="search" class="input-icon" style="width: 18px; height: 18px;"></i>
          <input 
            type="text" 
            class="form-input" 
            id="addressInput"
            placeholder="Start typing an address..."
            autocomplete="off"
          >
        </div>
        <div class="address-suggestions" id="addressSuggestions"></div>
      </div>
    </div>
    
    <!-- Map Placeholder -->
    <div class="map-placeholder" id="mapPlaceholder">
      <div class="map-pin">
        <i data-lucide="map-pin" style="width: 20px; height: 20px;"></i>
      </div>
      <div class="map-label hidden" id="mapLabel"></div>
    </div>
    
    <!-- Property Type -->
    <div class="section hidden" id="propertyTypeSection">
      <label class="section-label">Property Type</label>
      <div class="selection-grid" id="propertyTypeGrid">
        <!-- Populated by JS -->
      </div>
      
      <!-- Sub-types -->
      <div class="mt-lg hidden" id="subtypeSection">
        <div class="pill-group" id="subtypePills"></div>
      </div>
    </div>
    
    <!-- Unit Number -->
    <div class="section hidden" id="unitNumberSection">
      <div class="section-divider"></div>
      <label class="checkbox-label">
        <input type="checkbox" id="hasUnitNumber">
        <span>This property has a unit or apartment number</span>
      </label>
      <div class="hidden" id="unitNumberInputWrapper">
        <input 
          type="text" 
          class="form-input" 
          id="unitNumberInput"
          placeholder="e.g., 2B, Unit 405"
          style="max-width: 200px;"
        >
      </div>
    </div>
    
  </div>
</section>
```

## Step 4: Add Address Screen Styles

Add to `landlord-login/css/screens.css`:

```css
/* ==========================================
   ADDRESS SCREEN
   ========================================== */
.address-search-container {
  position: relative;
  margin-bottom: var(--space-xl);
}

.address-suggestions {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 10;
  display: none;
  max-height: 300px;
  overflow-y: auto;
}

.address-suggestions.show {
  display: block;
}

.address-suggestion {
  padding: var(--space-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  transition: background var(--transition-fast);
}

.address-suggestion:hover,
.address-suggestion.highlighted {
  background: var(--primary-blue-light);
}

.address-suggestion:not(:last-child) {
  border-bottom: 1px solid var(--border);
}

.address-suggestion-icon {
  color: var(--text-muted);
  flex-shrink: 0;
}

.address-suggestion-text {
  flex: 1;
  min-width: 0;
}

.address-suggestion-main {
  font-weight: 500;
  color: var(--text-primary);
}

.address-suggestion-sub {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Map Placeholder */
.map-placeholder {
  height: 160px;
  background: var(--background-muted);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-xl);
  position: relative;
  overflow: hidden;
}

.map-placeholder.has-address {
  background: linear-gradient(135deg, #e8f4f8 0%, #d4e8ec 100%);
}

.map-pin {
  width: 48px;
  height: 48px;
  background: var(--primary-blue);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
}

.map-pin i {
  transform: rotate(45deg);
  color: white;
}

.map-label {
  margin-top: var(--space-md);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  background: white;
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
}
```

## Step 5: Create Address Screen Logic

Create `landlord-login/js/screens/address.js`:

```javascript
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
```

## Step 6: Update App to Load Screen JS

Add to `landlord-login/js/app.js` (before `initApp` function):

```javascript
/* ------------------------------------------
   Screen Script Loader
   ------------------------------------------ */

async function loadScreenScripts() {
  const scripts = [
    'js/screens/address.js',
    // Future: 'js/screens/units.js', etc.
  ];
  
  for (const src of scripts) {
    try {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    } catch (e) {
      console.warn(`Could not load script: ${src}`);
    }
  }
}
```

Update `initApp()`:

```javascript
async function initApp() {
  console.log('Initializing app...');
  
  // Load all components
  await loadHeader();
  await loadFooter();
  await loadAllScreens();
  await loadModals();
  await loadScreenScripts();  // ADD THIS LINE
  
  // ... rest of initApp
}
```

## Step 7: Create Screen Scripts Directory

```bash
mkdir -p landlord-login/js/screens
```

## Step 8: Update Header/Footer Visibility

The welcome screen should hide header links and footer. Add this to `router.js`:

```javascript
function updateHeaderVisibility() {
  const backBtn = document.getElementById('header-back-btn');
  const headerRight = document.querySelector('.header-right');
  
  if (currentScreen === 'welcome') {
    if (backBtn) backBtn.style.visibility = 'hidden';
    if (headerRight) headerRight.style.visibility = 'hidden';
  } else {
    if (backBtn) backBtn.style.visibility = 'visible';
    if (headerRight) headerRight.style.visibility = 'visible';
  }
}

function updateFooterVisibility() {
  const footer = document.getElementById('footer-nav');
  
  if (footer) {
    footer.style.display = currentScreen === 'welcome' ? 'none' : 'block';
  }
}
```

Call both in `goToScreen()`:

```javascript
function goToScreen(screenId) {
  // ... existing code ...
  
  // Update UI elements
  updateProgressDots();
  updateHeader();
  updateFooter();
  updateHeaderVisibility();   // ADD
  updateFooterVisibility();   // ADD
  
  // ... rest of function ...
}
```

## Step 9: Test

```bash
cd /Users/jupiter/Projects/rent-vibe-stack-sync
python3 -m http.server 8080
```

Visit `http://localhost:8080/landlord-login/`

### Verify:
- [ ] Welcome screen displays correctly with steps
- [ ] Header/footer hidden on welcome screen
- [ ] Click "Get Started" → navigates to address screen
- [ ] Address autocomplete works (type "123" or "Queen")
- [ ] Keyboard navigation in suggestions (up/down/enter/esc)
- [ ] Selecting address shows map pin and reveals property types
- [ ] Property type cards are selectable
- [ ] Subtypes appear based on property type
- [ ] Unit number toggle shows/hides input
- [ ] Continue button disabled until address + type selected
- [ ] Continue button enabled after completing required fields
- [ ] State persists on refresh

## Step 10: Commit

```bash
git add .
git commit -m "Sprint 2.3: Welcome and Address screens

- Welcome screen with 3-step overview
- Address screen with autocomplete search
- Property type selection cards
- Subtype pills
- Unit number toggle
- Form validation
- State restoration on refresh"

# Don't push yet - continue to Sprint 2.4
```

## Output Required
Confirm:
1. Welcome screen renders correctly
2. Address autocomplete functional
3. Property type selection working
4. State persistence verified
5. No console errors

Report status before proceeding to Sprint 2.4.
