# Sprint 2.4: Unit Details Screen

## Objective
Build the unit details screen with beds/baths/sqft, furnished/laundry/parking dropdowns, utilities table, and multi-unit support.

## Prerequisites
- Sprint 2.3 complete (Welcome + Address screens working)

## Step 1: Create Units Screen HTML

Create `landlord-login/screens/units.html`:

```html
<section class="screen" id="screen-units">
  <div class="content-centered screen-content">
    
    <div class="screen-header">
      <h1 class="screen-title">Unit Details</h1>
      <p class="screen-subtitle">Tell us about the unit(s) available for rent.</p>
    </div>
    
    <!-- Units Container -->
    <div id="unitsContainer">
      <!-- Unit cards rendered by JS -->
    </div>
    
    <!-- Add Unit Button -->
    <div class="add-unit-section" id="addUnitSection">
      <button class="btn btn-outline add-unit-btn" id="addUnitBtn">
        <i data-lucide="plus" style="width: 18px; height: 18px;"></i>
        Add Another Unit
      </button>
      <p class="add-unit-hint">For multi-unit properties like duplexes or buildings</p>
    </div>
    
  </div>
</section>
```

## Step 2: Add Units Screen Styles

Add to `landlord-login/css/screens.css`:

```css
/* ==========================================
   UNITS SCREEN
   ========================================== */

/* Unit Card */
.unit-card {
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-lg);
  overflow: hidden;
}

.unit-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  background: var(--background-subtle);
  border-bottom: 1px solid var(--border);
  cursor: pointer;
}

.unit-card-header:hover {
  background: var(--background-muted);
}

.unit-card-title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-weight: 600;
  color: var(--text-primary);
}

.unit-card-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.unit-card-toggle {
  color: var(--text-muted);
  transition: transform var(--transition-fast);
}

.unit-card.collapsed .unit-card-toggle {
  transform: rotate(-90deg);
}

.unit-card-body {
  padding: var(--space-lg);
}

.unit-card.collapsed .unit-card-body {
  display: none;
}

.unit-card-remove {
  color: var(--text-muted);
  padding: var(--space-xs);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.unit-card-remove:hover {
  color: var(--error);
  background: var(--error-light);
}

/* Form Row */
.form-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-row-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

@media (max-width: 640px) {
  .form-row-2 {
    grid-template-columns: 1fr;
  }
}

/* Utilities Table */
.utilities-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-md);
}

.utilities-table th {
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--border);
}

.utilities-table th:not(:first-child) {
  text-align: center;
}

.utilities-table td {
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--border);
}

.utilities-table td:not(:first-child) {
  text-align: center;
}

.utilities-table tr:last-child td {
  border-bottom: none;
}

.utility-row-label {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-primary);
  font-size: 0.875rem;
}

.utility-row-label i {
  color: var(--text-muted);
}

.utility-radio {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.utility-radio:checked {
  border-color: var(--primary-blue);
  background: var(--primary-blue);
  box-shadow: inset 0 0 0 3px white;
}

.utility-radio:hover:not(:checked) {
  border-color: var(--text-muted);
}

/* Add Unit Section */
.add-unit-section {
  text-align: center;
  padding: var(--space-lg) 0;
}

.add-unit-btn {
  margin-bottom: var(--space-sm);
}

.add-unit-hint {
  font-size: 0.875rem;
  color: var(--text-muted);
}

/* Single unit - hide remove and add buttons */
.single-unit .unit-card-remove {
  display: none;
}
```

## Step 3: Create Units Screen Logic

Create `landlord-login/js/screens/units.js`:

```javascript
/* ==========================================
   UNITS SCREEN LOGIC
   ========================================== */

function initUnitsScreen() {
  const state = getState();
  
  renderUnits(state.units);
  setupUnitsListeners();
  updateUnitsNextButton();
}

function renderUnits(units) {
  const container = document.getElementById('unitsContainer');
  if (!container) return;
  
  const isSingleUnit = units.length === 1;
  container.className = isSingleUnit ? 'single-unit' : '';
  
  container.innerHTML = units.map((unit, index) => renderUnitCard(unit, index, units.length)).join('');
  
  // Update add unit section visibility
  const addSection = document.getElementById('addUnitSection');
  if (addSection) {
    // Show for property types that typically have multiple units
    const state = getState();
    const multiUnitTypes = ['apartment', 'house'];
    const showAdd = multiUnitTypes.includes(state.propertyType) || units.length > 1;
    addSection.style.display = showAdd ? 'block' : 'none';
  }
  
  lucide.createIcons();
}

function renderUnitCard(unit, index, totalUnits) {
  const unitLabel = totalUnits > 1 ? `Unit ${index + 1}${unit.unitNumber ? ` - ${unit.unitNumber}` : ''}` : 'Unit Details';
  
  return `
    <div class="unit-card" data-unit-id="${unit.id}">
      <div class="unit-card-header" onclick="toggleUnitCard(${unit.id})">
        <div class="unit-card-title">
          <i data-lucide="home" style="width: 18px; height: 18px;"></i>
          <span>${unitLabel}</span>
        </div>
        <div class="unit-card-actions">
          ${totalUnits > 1 ? `
            <button class="unit-card-remove" onclick="event.stopPropagation(); removeUnitCard(${unit.id})" title="Remove unit">
              <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
            </button>
          ` : ''}
          <i data-lucide="chevron-down" class="unit-card-toggle" style="width: 20px; height: 20px;"></i>
        </div>
      </div>
      <div class="unit-card-body">
        ${totalUnits > 1 ? `
          <div class="form-group">
            <label class="form-label">Unit Number / Name</label>
            <input type="text" class="form-input" style="max-width: 200px;"
                   value="${unit.unitNumber || ''}"
                   placeholder="e.g., 2B, Suite 101"
                   onchange="updateUnitField(${unit.id}, 'unitNumber', this.value)">
          </div>
        ` : ''}
        
        <!-- Beds / Baths / Sqft -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Bedrooms <span class="required">*</span></label>
            <select class="form-input form-select" onchange="updateUnitField(${unit.id}, 'bedrooms', this.value)">
              <option value="">Select</option>
              ${BEDROOM_OPTIONS.map(opt => `
                <option value="${opt.value}" ${unit.bedrooms === opt.value ? 'selected' : ''}>${opt.label}</option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Bathrooms <span class="required">*</span></label>
            <select class="form-input form-select" onchange="updateUnitField(${unit.id}, 'bathrooms', this.value)">
              <option value="">Select</option>
              ${BATHROOM_OPTIONS.map(opt => `
                <option value="${opt.value}" ${unit.bathrooms === opt.value ? 'selected' : ''}>${opt.label}</option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Square Feet</label>
            <input type="number" class="form-input" 
                   value="${unit.sqft || ''}"
                   placeholder="e.g., 850"
                   onchange="updateUnitField(${unit.id}, 'sqft', this.value)">
          </div>
        </div>
        
        <!-- Furnished / Laundry / Parking -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Furnished</label>
            <select class="form-input form-select" onchange="updateUnitField(${unit.id}, 'furnished', this.value)">
              <option value="">Select</option>
              ${FURNISHED_OPTIONS.map(opt => `
                <option value="${opt.value}" ${unit.furnished === opt.value ? 'selected' : ''}>${opt.label}</option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Laundry</label>
            <select class="form-input form-select" onchange="updateUnitField(${unit.id}, 'laundry', this.value)">
              <option value="">Select</option>
              ${LAUNDRY_OPTIONS.map(opt => `
                <option value="${opt.value}" ${unit.laundry === opt.value ? 'selected' : ''}>${opt.label}</option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Parking</label>
            <select class="form-input form-select" onchange="updateUnitField(${unit.id}, 'parkingType', this.value)">
              <option value="">Select</option>
              ${PARKING_OPTIONS.map(opt => `
                <option value="${opt.value}" ${unit.parkingType === opt.value ? 'selected' : ''}>${opt.label}</option>
              `).join('')}
            </select>
          </div>
        </div>
        
        <!-- Utilities -->
        <div class="form-group">
          <label class="form-label">Utilities</label>
          <p class="form-hint mb-md">Select who pays for each utility</p>
          <table class="utilities-table">
            <thead>
              <tr>
                <th>Utility</th>
                <th>Included in Rent</th>
                <th>Tenant Pays</th>
              </tr>
            </thead>
            <tbody>
              ${UTILITIES.map(util => `
                <tr>
                  <td>
                    <div class="utility-row-label">
                      <i data-lucide="${util.icon}" style="width: 16px; height: 16px;"></i>
                      ${util.label}
                    </div>
                  </td>
                  <td>
                    <input type="radio" class="utility-radio" 
                           name="utility-${unit.id}-${util.id}" 
                           value="included"
                           ${unit.utilities[util.id] === 'included' ? 'checked' : ''}
                           onchange="updateUnitField(${unit.id}, 'utilities.${util.id}', 'included')">
                  </td>
                  <td>
                    <input type="radio" class="utility-radio" 
                           name="utility-${unit.id}-${util.id}" 
                           value="tenant"
                           ${unit.utilities[util.id] === 'tenant' ? 'checked' : ''}
                           onchange="updateUnitField(${unit.id}, 'utilities.${util.id}', 'tenant')">
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function setupUnitsListeners() {
  // Add unit button
  document.getElementById('addUnitBtn')?.addEventListener('click', () => {
    const units = addUnit();
    renderUnits(units);
    updateUnitsNextButton();
  });
}

function toggleUnitCard(unitId) {
  const card = document.querySelector(`.unit-card[data-unit-id="${unitId}"]`);
  if (card) {
    card.classList.toggle('collapsed');
    lucide.createIcons();
  }
}

function removeUnitCard(unitId) {
  if (confirm('Remove this unit?')) {
    const units = removeUnit(unitId);
    renderUnits(units);
    updateUnitsNextButton();
  }
}

function updateUnitField(unitId, field, value) {
  updateUnit(unitId, field, value);
  updateUnitsNextButton();
  
  // If unit number changed, update the card header
  if (field === 'unitNumber') {
    const state = getState();
    renderUnits(state.units);
  }
}

function updateUnitsNextButton() {
  const state = getState();
  const nextBtn = document.getElementById('footer-next-btn');
  
  // Check if all units have required fields
  const isComplete = state.units.every(unit => unit.bedrooms && unit.bathrooms);
  
  if (nextBtn) {
    nextBtn.disabled = !isComplete;
  }
}

// Register screen init callback
onScreenLoad('units', initUnitsScreen);
```

## Step 4: Update App.js to Load Units Script

Update the `loadScreenScripts` function in `app.js`:

```javascript
async function loadScreenScripts() {
  const scripts = [
    'js/screens/address.js',
    'js/screens/units.js',  // ADD THIS
  ];
  
  // ... rest of function
}
```

## Step 5: Test

```bash
cd /Users/jupiter/Projects/rent-vibe-stack-sync
python3 -m http.server 8080
```

### Verify:
- [ ] Units screen loads after address screen
- [ ] Unit card displays with all form fields
- [ ] Beds/Baths dropdowns populate correctly
- [ ] Sqft input accepts numbers
- [ ] Furnished/Laundry/Parking dropdowns work
- [ ] Utilities table with radio buttons functions
- [ ] Add Another Unit button creates new card
- [ ] Multiple units show unit numbers
- [ ] Remove unit button works (only visible with 2+ units)
- [ ] Unit cards collapse/expand
- [ ] Continue button disabled until beds+baths selected
- [ ] State persists on refresh

## Step 6: Commit

```bash
git add .
git commit -m "Sprint 2.4: Unit Details screen

- Unit card with beds/baths/sqft
- Furnished/laundry/parking dropdowns
- Utilities table with included/tenant pays
- Multi-unit support with add/remove
- Collapsible unit cards
- Form validation"

# Don't push yet - continue to Sprint 2.5
```

## Output Required
Confirm:
1. Unit details form renders correctly
2. All dropdowns and inputs functional
3. Multi-unit support working
4. Utilities table working
5. State persistence verified

Report status before proceeding to Sprint 2.5.
