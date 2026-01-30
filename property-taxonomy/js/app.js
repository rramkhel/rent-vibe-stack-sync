// Property Taxonomy Interactive App

let activeView = 'overview';
let selectedCategory = null;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  renderAllPanels();
  lucide.createIcons();
});

// Tab Navigation
function initTabs() {
  const tabs = document.querySelectorAll('.taxonomy-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setActiveTab(tab.dataset.view);
    });
  });
}

function setActiveTab(viewId) {
  activeView = viewId;

  // Update tab styles
  document.querySelectorAll('.taxonomy-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.view === viewId);
  });

  // Update panel visibility
  document.querySelectorAll('.taxonomy-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${viewId}`);
  });
}

// Render All Panels
function renderAllPanels() {
  renderOverview();
  renderRenterView();
  renderEcommerceView();
  renderEnterpriseView();
  renderDataModel();
}

// Overview Panel
function renderOverview() {
  const panel = document.getElementById('panel-overview');
  panel.innerHTML = `
    <h2>Proposed Architecture: Progressive Disclosure Model</h2>
    <p class="subtitle">One backend taxonomy, three frontend views. Each user sees only the complexity they need.</p>

    <div class="funnel-container">
      <div class="funnel-cards">
        <div class="funnel-card renter">
          <div class="funnel-card-label">RENTER VIEW</div>
          <div class="funnel-card-number">5</div>
          <div class="funnel-card-unit">categories</div>
          <div class="funnel-card-desc">Apartments, Houses, Condos, Rooms, Townhouses</div>
        </div>
        <div class="funnel-card ecommerce">
          <div class="funnel-card-label">ECOMMERCE VIEW</div>
          <div class="funnel-card-number">~12</div>
          <div class="funnel-card-unit">property types</div>
          <div class="funnel-card-desc">Intuitive subtypes shown contextually after category selection</div>
        </div>
        <div class="funnel-card enterprise">
          <div class="funnel-card-label">ENTERPRISE VIEW</div>
          <div class="funnel-card-number">40+</div>
          <div class="funnel-card-unit">full taxonomy</div>
          <div class="funnel-card-desc">Category &rarr; Building Type &rarr; Unit Type (3-level hierarchy)</div>
        </div>
      </div>
      <div class="funnel-note">&larr; Less complexity for casual users | Full detail for power users &rarr;</div>
    </div>

    <div class="insight-box">
      <div class="insight-box-title">Key Insight</div>
      <p>The <strong>backend stores the full taxonomy</strong> (enterprise level) for data accuracy and Rent Report quality.
      The <strong>frontend progressively reveals</strong> based on user type. All selections map to the same backend codes.</p>
    </div>
  `;
}

// Renter View Panel
function renderRenterView() {
  const panel = document.getElementById('panel-renter');
  const { renterView, ecommerceView } = TAXONOMY_DATA;

  const categoryButtons = renterView.map(cat => `
    <button
      class="category-btn ${selectedCategory === cat.id ? 'selected' : ''}"
      style="border-color: ${cat.color}; ${selectedCategory === cat.id ? `background: ${cat.color};` : ''}"
      data-category="${cat.id}"
      data-color="${cat.color}"
    >
      <i data-lucide="${cat.icon}" style="color: ${selectedCategory === cat.id ? 'white' : cat.color}"></i>
      <span class="category-btn-label" style="color: ${selectedCategory === cat.id ? 'white' : cat.color}">${cat.label}</span>
    </button>
  `).join('');

  const selectedCategoryData = renterView.find(c => c.id === selectedCategory);
  const refinements = selectedCategory ? ecommerceView[selectedCategory] : [];

  const refinementHtml = selectedCategory ? `
    <div class="refinement-box">
      <div class="refinement-label">After selecting "${selectedCategoryData?.label}", renters see optional refinement filters:</div>
      <div class="refinement-chips">
        ${refinements.map(type => `<span class="refinement-chip">${type}</span>`).join('')}
        <span class="refinement-chip highlight">+ price, beds, pet-friendly, etc.</span>
      </div>
    </div>
  ` : '';

  panel.innerHTML = `
    <h2>Renter Search Experience</h2>
    <p class="subtitle">5 clear categories. No cognitive overload. Filters refine from there.</p>

    <div class="category-grid">
      ${categoryButtons}
    </div>

    ${refinementHtml}

    <div class="success-box">
      <div class="success-box-title">Addresses Renter Need</div>
      <div class="success-box-text">Simple mental model. Pick a category, refine with filters. No 40-item dropdown.</div>
    </div>
  `;

  // Add click handlers
  panel.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.dataset.category;
      selectedCategory = selectedCategory === catId ? null : catId;
      renderRenterView();
      renderEcommerceView();
      lucide.createIcons();
    });
  });

  lucide.createIcons();
}

// Ecommerce View Panel
function renderEcommerceView() {
  const panel = document.getElementById('panel-ecommerce');
  const { renterView, ecommerceView } = TAXONOMY_DATA;

  const step1Options = renterView.map(cat => `
    <button
      class="step-option ${selectedCategory === cat.id ? 'selected' : ''}"
      style="${selectedCategory === cat.id ? `border-color: ${cat.color};` : ''}"
      data-category="${cat.id}"
      data-color="${cat.color}"
    >
      <i data-lucide="${cat.icon}"></i>
      <span>${cat.label}</span>
    </button>
  `).join('');

  const step2Content = selectedCategory
    ? ecommerceView[selectedCategory].map((type, i) => `
        <div class="step-option ${i === 0 ? 'default' : ''}">
          ${type} ${i === 0 ? '<span class="default-tag">(default)</span>' : ''}
        </div>
      `).join('')
    : `<div class="step-placeholder">Select a category first</div>`;

  panel.innerHTML = `
    <h2>Ecommerce Landlord Listing Flow</h2>
    <p class="subtitle">Two-step selection: Category &rarr; Type. Smart defaults reduce decisions.</p>

    <div class="two-step-flow">
      <div class="step-column">
        <span class="step-badge step1">STEP 1</span>
        <div class="step-question">"What type of property?"</div>
        <div class="step-options">
          ${step1Options}
        </div>
      </div>

      <div class="step-arrow">&rarr;</div>

      <div class="step-column">
        <span class="step-badge step2">STEP 2</span>
        <div class="step-question">"More specifically?"</div>
        <div class="step-options">
          ${step2Content}
        </div>
      </div>
    </div>

    <div class="success-box" style="margin-top: 24px;">
      <div class="success-box-title">Addresses Ecommerce Landlord Need</div>
      <div class="success-box-text">Fast 2-click selection with sensible defaults. If they don't know/care about "Low vs Mid Rise", they just pick "Apartment" and move on.</div>
    </div>
  `;

  // Add click handlers
  panel.querySelectorAll('.step-option[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.category;
      renderRenterView();
      renderEcommerceView();
      lucide.createIcons();
    });
  });

  lucide.createIcons();
}

// Enterprise View Panel
function renderEnterpriseView() {
  const panel = document.getElementById('panel-enterprise');
  const { renterView, enterpriseView, housingTypes } = TAXONOMY_DATA;

  // Only show first 3 categories for space
  const categoriesToShow = ['apartments', 'houses', 'condos'];

  const categoryHtml = categoriesToShow.map(catId => {
    const cat = renterView.find(c => c.id === catId);
    const buildings = enterpriseView[catId];

    const buildingsHtml = Object.entries(buildings).map(([buildingName, units]) => `
      <div class="enterprise-building">
        <div class="enterprise-building-name">&boxur; ${buildingName}</div>
        <div class="enterprise-units">
          ${units.slice(0, 3).map(u => `<div class="enterprise-unit">&boxur; ${u}</div>`).join('')}
          ${units.length > 3 ? `<div class="enterprise-unit">&boxur; +${units.length - 3} more...</div>` : ''}
        </div>
      </div>
    `).join('');

    return `
      <div class="enterprise-category">
        <div class="enterprise-category-header" style="color: ${cat.color}">
          <i data-lucide="${cat.icon}" style="width: 14px; height: 14px;"></i>
          ${catId.toUpperCase()}
        </div>
        ${buildingsHtml}
      </div>
    `;
  }).join('');

  const housingChips = housingTypes.map(ht =>
    `<span class="housing-type-chip">${ht}</span>`
  ).join('');

  panel.innerHTML = `
    <h2>Enterprise & Data Full Taxonomy</h2>
    <p class="subtitle">Three-level hierarchy. All niche types available. This is the source of truth.</p>

    <div class="enterprise-grid">
      ${categoryHtml}
    </div>

    <div class="housing-types-box">
      <div class="housing-types-title">+ HOUSING TYPE OVERLAY (cross-cutting)</div>
      <div class="housing-types-chips">
        ${housingChips}
      </div>
    </div>

    <div class="enterprise-success">
      <div class="enterprise-success-title">Addresses Enterprise + Data Needs</div>
      <div class="enterprise-success-text">Full granularity for portfolio management, accurate Rent Report aggregation, and clean data logging. Housing types are a separate dimension (can filter/tag any property type).</div>
    </div>
  `;

  lucide.createIcons();
}

// Data Model Panel
function renderDataModel() {
  const panel = document.getElementById('panel-datamodel');

  panel.innerHTML = `
    <h2>Proposed Data Model</h2>
    <p class="subtitle">How it stores in the backend to satisfy Data team requirements.</p>

    <div class="code-block">
      <div class="code-comment">// Backend property record</div>
      <div>{</div>
      <div style="padding-left: 20px;">
        <span class="code-key">"property_category"</span>: <span class="code-value">"residential_mf"</span>,
      </div>
      <div style="padding-left: 20px;">
        <span class="code-key">"building_type"</span>: <span class="code-value">"high_rise_apartment"</span>,
      </div>
      <div style="padding-left: 20px;">
        <span class="code-key">"unit_type"</span>: <span class="code-value">"loft"</span>,
      </div>
      <div style="padding-left: 20px;">
        <span class="code-key">"housing_type"</span>: <span class="code-value">"student"</span>,
      </div>
      <div style="padding-left: 20px;" class="code-comment">
        // Derived for frontend display:
      </div>
      <div style="padding-left: 20px;">
        <span class="code-key">"display_category"</span>: <span class="code-value">"Apartments"</span>,
      </div>
      <div style="padding-left: 20px;">
        <span class="code-key">"display_type"</span>: <span class="code-value">"Loft"</span>
      </div>
      <div>}</div>
    </div>

    <div class="benefits-grid">
      <div class="benefit-box">
        <div class="benefit-title">Accurate & Clean</div>
        <ul class="benefit-list">
          <li>Normalized IDs, not free text</li>
          <li>3-level hierarchy prevents ambiguity</li>
          <li>Housing type as separate dimension</li>
        </ul>
      </div>
      <div class="benefit-box">
        <div class="benefit-title">Rent Report Ready</div>
        <ul class="benefit-list">
          <li>Aggregate by any level</li>
          <li>Filter by housing type</li>
          <li>No data cleanup needed</li>
        </ul>
      </div>
    </div>
  `;
}
