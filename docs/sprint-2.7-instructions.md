# Sprint 2.7: Pricing Screen

## Objective
Build the pricing screen with rent input, market insights, utilities toggle, date picker, and lease terms.

## Prerequisites
- Sprint 2.6 complete (AI Modals working)

## Step 1: Create Pricing Screen HTML

Create `landlord-login/screens/pricing.html`:

```html
<section class="screen" id="screen-pricing">
  <div class="content-centered screen-content">
    
    <div class="screen-header">
      <h1 class="screen-title">What's your monthly rent?</h1>
    </div>
    
    <!-- Market Insight -->
    <div class="market-insight-card" id="marketInsightCard">
      <i data-lucide="lightbulb" style="width: 20px; height: 20px;"></i>
      <div>
        <strong>Market Insight</strong>
        <p id="marketInsightText">Similar 1BR apartments in Toronto rent for <strong>$1,900 - $2,300/month</strong></p>
      </div>
    </div>
    
    <!-- Rent Input -->
    <div class="section">
      <label class="form-label">Monthly Rent <span class="required">*</span></label>
      <div class="rent-input-container">
        <span class="rent-currency">$</span>
        <input 
          type="number" 
          class="form-input rent-input" 
          id="rentInput"
          placeholder="2,400"
          min="0"
          step="50"
        >
      </div>
      <button class="btn btn-outline-pink btn-sm mt-md" id="getSmartPricingBtn">
        <i data-lucide="sparkles" style="width: 16px; height: 16px;"></i>
        Get Smart Pricing Suggestion
      </button>
    </div>
    
    <!-- Utilities -->
    <div class="section">
      <label class="form-label">Utilities Included?</label>
      <div class="utilities-toggle-group">
        <label class="utilities-toggle">
          <input type="radio" name="utilitiesIncluded" value="none">
          <span class="utilities-toggle-label">None</span>
        </label>
        <label class="utilities-toggle">
          <input type="radio" name="utilitiesIncluded" value="some">
          <span class="utilities-toggle-label">Some</span>
        </label>
        <label class="utilities-toggle">
          <input type="radio" name="utilitiesIncluded" value="all">
          <span class="utilities-toggle-label">All</span>
        </label>
      </div>
      <p class="form-hint" id="utilitiesHint">Specify which utilities are included on the previous screen</p>
    </div>
    
    <!-- Available Date -->
    <div class="section">
      <label class="form-label">Available Date <span class="required">*</span></label>
      <div class="date-input-container">
        <i data-lucide="calendar" class="date-icon" style="width: 18px; height: 18px;"></i>
        <input 
          type="date" 
          class="form-input date-input" 
          id="availableDateInput"
        >
      </div>
      <div class="date-quick-options">
        <button class="pill" data-date="today">Available Now</button>
        <button class="pill" data-date="first">First of Next Month</button>
      </div>
    </div>
    
    <!-- Lease Term -->
    <div class="section">
      <label class="form-label">Lease Term</label>
      <div class="lease-term-options">
        <label class="lease-term-option">
          <input type="radio" name="leaseTerm" value="month-to-month">
          <span class="lease-term-label">Month-to-month</span>
        </label>
        <label class="lease-term-option">
          <input type="radio" name="leaseTerm" value="6-months">
          <span class="lease-term-label">6 months minimum</span>
        </label>
        <label class="lease-term-option">
          <input type="radio" name="leaseTerm" value="1-year" checked>
          <span class="lease-term-label">1 year minimum</span>
        </label>
      </div>
    </div>
    
    <!-- Validation Message -->
    <div class="validation-message hidden" id="pricingValidation">
      <i data-lucide="alert-circle" style="width: 16px; height: 16px;"></i>
      <span>Please enter a price and select an available date</span>
    </div>
    
  </div>
</section>
```

## Step 2: Add Pricing Screen Styles

Add to `landlord-login/css/screens.css`:

```css
/* ==========================================
   PRICING SCREEN
   ========================================== */

/* Market Insight Card */
.market-insight-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--primary-blue-light);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-xl);
}

.market-insight-card i {
  color: var(--primary-blue);
  flex-shrink: 0;
  margin-top: 2px;
}

.market-insight-card strong {
  display: block;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.market-insight-card p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Rent Input */
.rent-input-container {
  position: relative;
  max-width: 200px;
}

.rent-currency {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 1.25rem;
  font-weight: 500;
}

.rent-input {
  padding-left: 36px;
  font-size: 1.25rem;
  font-weight: 600;
}

/* Date Input */
.date-input-container {
  position: relative;
  max-width: 250px;
}

.date-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.date-input {
  padding-left: 44px;
}

.date-quick-options {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

/* Utilities Toggle */
.utilities-toggle-group {
  display: flex;
  gap: var(--space-sm);
}

.utilities-toggle {
  flex: 1;
  cursor: pointer;
}

.utilities-toggle input {
  display: none;
}

.utilities-toggle-label {
  display: block;
  text-align: center;
  padding: var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.utilities-toggle input:checked + .utilities-toggle-label {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

.utilities-toggle:hover .utilities-toggle-label {
  border-color: var(--text-muted);
}

/* Lease Term Options */
.lease-term-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.lease-term-option {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lease-term-option:hover {
  background: var(--background-subtle);
}

.lease-term-option input {
  width: 20px;
  height: 20px;
  accent-color: var(--primary-blue);
}

.lease-term-option input:checked + .lease-term-label {
  font-weight: 500;
}

/* Validation Message */
.validation-message {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  background: var(--warning-light);
  border-radius: var(--radius-md);
  color: var(--warning);
  font-size: 0.875rem;
  margin-top: var(--space-lg);
}
```

## Step 3: Create Pricing Screen Logic

Create `landlord-login/js/screens/pricing.js`:

```javascript
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
```

## Step 4: Update App.js

Add to `loadScreenScripts`:

```javascript
async function loadScreenScripts() {
  const scripts = [
    'js/screens/address.js',
    'js/screens/units.js',
    'js/screens/details.js',
    'js/screens/pricing.js',  // ADD THIS
  ];
  // ...
}
```

## Step 5: Update Footer Button for Pricing Screen

Update the footer button behavior based on screen. In `router.js`, update `goToScreen`:

```javascript
function goToScreen(screenId) {
  // ... existing code ...
  
  // Update footer button text based on screen
  updateFooterButton(screenId);
  
  // ... rest of function
}

function updateFooterButton(screenId) {
  const nextBtn = document.getElementById('footer-next-btn');
  if (!nextBtn) return;
  
  const buttonConfig = {
    address: { text: 'Continue', class: 'btn-primary' },
    units: { text: 'Continue', class: 'btn-primary' },
    details: { text: 'Continue to Pricing', class: 'btn-pink' },
    pricing: { text: 'Continue to Review', class: 'btn-pink' },
    review: { text: 'Publish Listing', class: 'btn-pink' },
  };
  
  const config = buttonConfig[screenId] || { text: 'Continue', class: 'btn-primary' };
  
  // Update button text (keeping the icon)
  nextBtn.innerHTML = `
    ${config.text}
    <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
  `;
  
  // Update button class
  nextBtn.className = `btn ${config.class}`;
  
  lucide.createIcons();
}
```

## Step 6: Test

### Verify:
- [ ] Pricing screen loads with market insight
- [ ] Market insight shows correct bedroom count and city
- [ ] Rent input accepts numbers
- [ ] Smart Pricing button opens modal
- [ ] Utilities toggle works
- [ ] Available date picker works
- [ ] Quick date pills set correct dates
- [ ] Lease term radio buttons work
- [ ] Continue button disabled until rent + date entered
- [ ] Validation message shows/hides appropriately
- [ ] State persists on refresh
- [ ] Footer button changes to "Continue to Review"

## Step 7: Commit

```bash
git add .
git commit -m "Sprint 2.7: Pricing screen

- Market insight card with dynamic data
- Rent input with currency symbol
- Smart pricing integration
- Utilities included toggle
- Date picker with quick options
- Lease term selection
- Form validation"
```

## Output Required
Confirm:
1. Pricing screen renders correctly
2. All inputs functional
3. Smart pricing modal integration works
4. Form validation working
5. State persistence verified

Report status before proceeding to Sprint 2.8.
