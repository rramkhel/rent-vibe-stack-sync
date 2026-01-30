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
