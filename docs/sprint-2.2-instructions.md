# Sprint 2.2: State Management + Router

## Objective
Build the state management system and screen navigation router.

## Prerequisites
- Sprint 2.1 complete (folder structure + CSS exists)

## Step 1: Create State Management

Replace `landlord-login/js/state.js`:

```javascript
/* ==========================================
   STATE MANAGEMENT
   Handles all listing data + localStorage persistence
   ========================================== */

const STORAGE_KEY = 'rentsync_listing_draft';

// Default state structure
const defaultState = {
  currentScreen: 'welcome',
  
  // Address info
  address: {
    full: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
  },
  propertyType: '',      // house, apartment, room, other
  subType: '',           // basement, studio, loft, etc.
  unitNumber: '',
  hasUnitNumber: false,
  
  // Unit details
  units: [
    {
      id: 1,
      unitNumber: '',
      bedrooms: '',
      bathrooms: '',
      sqft: '',
      furnished: '',
      laundry: '',
      parkingType: '',
      utilities: {
        electricity: 'tenant',
        gas: 'tenant',
        water: 'included',
        heat: 'included',
        internet: 'tenant',
        ac: 'tenant',
      }
    }
  ],
  
  // Property details
  photos: [],              // Array of { id, dataUrl, name }
  amenities: {
    unit: [],              // In-unit amenities
    building: [],          // Building amenities
    area: [],              // Neighborhood highlights
    utilitiesIncluded: [], // Which utilities included
  },
  description: '',
  
  // Pricing
  rent: '',
  utilitiesIncludedType: 'none', // none, some, all
  availableDate: '',
  leaseTerm: '1-year',     // month-to-month, 6-months, 1-year
  
  // Meta
  createdAt: null,
  updatedAt: null,
};

// Current state (will be loaded from localStorage or defaults)
let state = {};

/* ------------------------------------------
   Core State Functions
   ------------------------------------------ */

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Merge with defaults to handle any new fields
      state = deepMerge(defaultState, parsed);
      console.log('State loaded from localStorage');
    } catch (e) {
      console.error('Failed to parse saved state:', e);
      state = { ...defaultState };
    }
  } else {
    state = { ...defaultState };
    console.log('No saved state, using defaults');
  }
  return state;
}

function saveState() {
  state.updatedAt = new Date().toISOString();
  if (!state.createdAt) {
    state.createdAt = state.updatedAt;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  console.log('State saved');
}

function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  state = { ...defaultState };
  console.log('State reset');
  return state;
}

function getState() {
  return state;
}

function updateState(path, value) {
  // path can be 'address.street' or just 'propertyType'
  const keys = path.split('.');
  let current = state;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
  saveState();
  return state;
}

/* ------------------------------------------
   Unit Management
   ------------------------------------------ */

function addUnit() {
  const newId = Math.max(...state.units.map(u => u.id), 0) + 1;
  state.units.push({
    id: newId,
    unitNumber: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    furnished: '',
    laundry: '',
    parkingType: '',
    utilities: {
      electricity: 'tenant',
      gas: 'tenant',
      water: 'included',
      heat: 'included',
      internet: 'tenant',
      ac: 'tenant',
    }
  });
  saveState();
  return state.units;
}

function removeUnit(id) {
  if (state.units.length > 1) {
    state.units = state.units.filter(u => u.id !== id);
    saveState();
  }
  return state.units;
}

function updateUnit(id, field, value) {
  const unit = state.units.find(u => u.id === id);
  if (unit) {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      unit[parent][child] = value;
    } else {
      unit[field] = value;
    }
    saveState();
  }
  return state.units;
}

/* ------------------------------------------
   Photo Management
   ------------------------------------------ */

function addPhoto(dataUrl, name) {
  const id = Date.now();
  state.photos.push({ id, dataUrl, name });
  saveState();
  return state.photos;
}

function removePhoto(id) {
  state.photos = state.photos.filter(p => p.id !== id);
  saveState();
  return state.photos;
}

function reorderPhotos(fromIndex, toIndex) {
  const [photo] = state.photos.splice(fromIndex, 1);
  state.photos.splice(toIndex, 0, photo);
  saveState();
  return state.photos;
}

/* ------------------------------------------
   Amenities Management
   ------------------------------------------ */

function toggleAmenity(category, amenity) {
  const list = state.amenities[category];
  const index = list.indexOf(amenity);
  
  if (index === -1) {
    list.push(amenity);
  } else {
    list.splice(index, 1);
  }
  
  saveState();
  return state.amenities;
}

function setAmenities(category, amenities) {
  state.amenities[category] = amenities;
  saveState();
  return state.amenities;
}

/* ------------------------------------------
   Validation
   ------------------------------------------ */

function validateScreen(screenId) {
  const errors = [];
  
  switch (screenId) {
    case 'address':
      if (!state.address.street) errors.push('Address is required');
      if (!state.propertyType) errors.push('Property type is required');
      break;
      
    case 'units':
      state.units.forEach((unit, i) => {
        if (!unit.bedrooms) errors.push(`Unit ${i + 1}: Bedrooms required`);
        if (!unit.bathrooms) errors.push(`Unit ${i + 1}: Bathrooms required`);
      });
      break;
      
    case 'details':
      if (state.photos.length < 1) errors.push('At least 1 photo required');
      // Description and amenities are optional but encouraged
      break;
      
    case 'pricing':
      if (!state.rent) errors.push('Monthly rent is required');
      if (!state.availableDate) errors.push('Available date is required');
      break;
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

function getCompletionStatus() {
  return {
    address: !!state.address.street && !!state.propertyType,
    units: state.units.every(u => u.bedrooms && u.bathrooms),
    photos: state.photos.length >= 5,
    description: !!state.description,
    amenities: Object.values(state.amenities).some(a => a.length > 0),
    pricing: !!state.rent && !!state.availableDate,
  };
}

/* ------------------------------------------
   Helpers
   ------------------------------------------ */

function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

// Initialize state on load
loadState();

console.log('state.js loaded');
```

## Step 2: Create Router

Replace `landlord-login/js/router.js`:

```javascript
/* ==========================================
   ROUTER
   Handles screen navigation and history
   ========================================== */

const SCREENS = ['welcome', 'address', 'units', 'details', 'pricing', 'review'];

let currentScreen = 'welcome';
let screenLoadCallbacks = {};

/* ------------------------------------------
   Navigation
   ------------------------------------------ */

function goToScreen(screenId) {
  if (!SCREENS.includes(screenId)) {
    console.error(`Unknown screen: ${screenId}`);
    return;
  }
  
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  
  // Show target screen
  const target = document.getElementById(`screen-${screenId}`);
  if (target) {
    target.classList.add('active');
    currentScreen = screenId;
    
    // Update state
    updateState('currentScreen', screenId);
    
    // Update UI elements
    updateProgressDots();
    updateHeader();
    updateFooter();
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    // Call screen-specific init if registered
    if (screenLoadCallbacks[screenId]) {
      screenLoadCallbacks[screenId]();
    }
    
    console.log(`Navigated to: ${screenId}`);
  } else {
    console.error(`Screen element not found: screen-${screenId}`);
  }
}

function nextScreen() {
  const currentIndex = SCREENS.indexOf(currentScreen);
  if (currentIndex < SCREENS.length - 1) {
    goToScreen(SCREENS[currentIndex + 1]);
  }
}

function prevScreen() {
  const currentIndex = SCREENS.indexOf(currentScreen);
  if (currentIndex > 0) {
    goToScreen(SCREENS[currentIndex - 1]);
  }
}

function getCurrentScreen() {
  return currentScreen;
}

function getScreenIndex(screenId) {
  return SCREENS.indexOf(screenId || currentScreen);
}

/* ------------------------------------------
   Screen Registration
   ------------------------------------------ */

function onScreenLoad(screenId, callback) {
  screenLoadCallbacks[screenId] = callback;
}

/* ------------------------------------------
   UI Updates
   ------------------------------------------ */

function updateProgressDots() {
  const currentIndex = getScreenIndex();
  
  document.querySelectorAll('.progress-dot').forEach((dot, i) => {
    dot.classList.remove('active', 'completed');
    
    if (i < currentIndex) {
      dot.classList.add('completed');
    } else if (i === currentIndex) {
      dot.classList.add('active');
    }
  });
}

function updateHeader() {
  const headerTitle = document.querySelector('.header-center');
  if (headerTitle) {
    const titles = {
      welcome: '',
      address: 'Create Your Listing',
      units: 'Create Your Listing',
      details: 'Create Your Listing',
      pricing: 'Set Your Price',
      review: 'Review Your Listing',
    };
    headerTitle.textContent = titles[currentScreen] || 'Create Your Listing';
  }
}

function updateFooter() {
  // Footer visibility and buttons handled by individual screens
}

/* ------------------------------------------
   Initialization
   ------------------------------------------ */

function initRouter() {
  // Load initial screen from state
  const state = getState();
  currentScreen = state.currentScreen || 'welcome';
  
  // Set up initial screen
  goToScreen(currentScreen);
  
  console.log('Router initialized');
}

console.log('router.js loaded');
```

## Step 3: Create Main App

Replace `landlord-login/js/app.js`:

```javascript
/* ==========================================
   MAIN APP
   Orchestrates everything
   ========================================== */

/* ------------------------------------------
   Component Loaders
   ------------------------------------------ */

async function loadComponent(containerId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
    return true;
  } catch (error) {
    console.error(`Error loading component:`, error);
    return false;
  }
}

async function loadAllScreens() {
  const screens = ['welcome', 'address', 'units', 'details', 'pricing', 'review'];
  const container = document.getElementById('screens-container');
  
  let html = '';
  
  for (const screen of screens) {
    try {
      const response = await fetch(`screens/${screen}.html`);
      if (response.ok) {
        html += await response.text();
      } else {
        // Placeholder for screens not yet built
        html += `
          <section class="screen" id="screen-${screen}">
            <div class="content-centered screen-content">
              <div class="screen-header">
                <h1 class="screen-title">${screen.charAt(0).toUpperCase() + screen.slice(1)}</h1>
              </div>
              <p class="text-muted text-center" style="padding: 80px 0;">
                Screen coming soon...
              </p>
            </div>
          </section>
        `;
      }
    } catch (e) {
      console.warn(`Could not load screen: ${screen}`, e);
    }
  }
  
  container.innerHTML = html;
}

async function loadHeader() {
  try {
    const response = await fetch('components/header.html');
    if (response.ok) {
      document.getElementById('header-container').innerHTML = await response.text();
    }
  } catch (e) {
    // Use default header if file doesn't exist
    document.getElementById('header-container').innerHTML = `
      <header class="header">
        <div class="header-left">
          <a href="#" class="header-back" id="header-back-btn">
            <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
            <span id="header-back-text">Back</span>
          </a>
        </div>
        <div class="header-center"></div>
        <div class="header-right">
          <div class="progress-dots">
            <div class="progress-dot"></div>
            <div class="progress-dot"></div>
            <div class="progress-dot"></div>
          </div>
          <a href="#" class="header-link" id="start-over-btn">Start Over</a>
          <a href="#" class="header-link" id="save-draft-btn">Save Draft</a>
        </div>
      </header>
    `;
  }
}

async function loadFooter() {
  try {
    const response = await fetch('components/footer-nav.html');
    if (response.ok) {
      document.getElementById('footer-container').innerHTML = await response.text();
    }
  } catch (e) {
    // Use default footer if file doesn't exist
    document.getElementById('footer-container').innerHTML = `
      <div class="footer-nav" id="footer-nav">
        <div class="footer-nav-inner">
          <button class="btn btn-ghost" id="footer-back-btn">Back</button>
          <button class="btn btn-primary" id="footer-next-btn">
            Continue
            <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
      </div>
    `;
  }
}

async function loadModals() {
  try {
    const response = await fetch('components/modals.html');
    if (response.ok) {
      document.getElementById('modals-container').innerHTML = await response.text();
    }
  } catch (e) {
    // Modals will be added in later sprints
    console.log('No modals file yet');
  }
}

/* ------------------------------------------
   Event Handlers
   ------------------------------------------ */

function setupGlobalHandlers() {
  // Header back button
  document.addEventListener('click', (e) => {
    if (e.target.closest('#header-back-btn')) {
      e.preventDefault();
      const current = getCurrentScreen();
      if (current === 'welcome') {
        window.location.href = '../'; // Back to hub
      } else {
        prevScreen();
      }
    }
    
    // Start over
    if (e.target.closest('#start-over-btn')) {
      e.preventDefault();
      if (confirm('Start over? All your progress will be lost.')) {
        resetState();
        window.location.reload();
      }
    }
    
    // Save draft
    if (e.target.closest('#save-draft-btn')) {
      e.preventDefault();
      saveState();
      showToast('Draft saved!');
    }
    
    // Footer back button
    if (e.target.closest('#footer-back-btn')) {
      e.preventDefault();
      prevScreen();
    }
    
    // Footer next button
    if (e.target.closest('#footer-next-btn')) {
      e.preventDefault();
      nextScreen();
    }
  });
}

/* ------------------------------------------
   Toast Notifications
   ------------------------------------------ */

function showToast(message, type = 'success') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? 'var(--text-primary)' : 'var(--error)'};
    color: white;
    padding: 12px 24px;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
    z-index: 1000;
    animation: toastIn 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add toast animations to head
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  @keyframes toastOut {
    from { opacity: 1; transform: translateX(-50%) translateY(0); }
    to { opacity: 0; transform: translateX(-50%) translateY(20px); }
  }
`;
document.head.appendChild(toastStyles);

/* ------------------------------------------
   Initialization
   ------------------------------------------ */

async function initApp() {
  console.log('Initializing app...');
  
  // Load all components
  await loadHeader();
  await loadFooter();
  await loadAllScreens();
  await loadModals();
  
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // Set up event handlers
  setupGlobalHandlers();
  
  // Initialize router (will navigate to saved screen)
  initRouter();
  
  console.log('App initialized!');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

console.log('app.js loaded');
```

## Step 4: Update Mock Data

Replace `landlord-login/data/mock-data.js`:

```javascript
/* ==========================================
   MOCK DATA
   Static data for the prototype
   ========================================== */

const MOCK_ADDRESSES = [
  { street: '123 Main Street', city: 'Toronto', province: 'ON', postal: 'M5V 2T6' },
  { street: '456 Queen Street West', city: 'Toronto', province: 'ON', postal: 'M5V 2A9' },
  { street: '789 King Street East', city: 'Toronto', province: 'ON', postal: 'M5A 1M4' },
  { street: '321 Yonge Street', city: 'Toronto', province: 'ON', postal: 'M5B 1R8' },
  { street: '555 Bloor Street West', city: 'Toronto', province: 'ON', postal: 'M5S 1Y6' },
  { street: '100 Front Street West', city: 'Toronto', province: 'ON', postal: 'M5J 1E3' },
  { street: '200 University Avenue', city: 'Toronto', province: 'ON', postal: 'M5H 3C6' },
  { street: '42 College Street', city: 'Toronto', province: 'ON', postal: 'M5G 1K2' },
  { street: '88 Harbord Street', city: 'Toronto', province: 'ON', postal: 'M5S 1G5' },
  { street: '150 Dundas Street West', city: 'Toronto', province: 'ON', postal: 'M5G 1C6' },
];

const PROPERTY_TYPES = {
  house: { label: 'House', icon: 'home' },
  apartment: { label: 'Apartment', icon: 'building' },
  room: { label: 'Room', icon: 'door-open' },
  other: { label: 'Other', icon: 'layout-grid' },
};

const PROPERTY_SUBTYPES = {
  house: ['Single family', 'Townhouse', 'Semi-detached', 'Duplex'],
  apartment: ['Apartment', 'Basement', 'Loft', 'Penthouse'],
  room: ['Private room', 'Shared room'],
  other: ['Studio', 'Condo', 'Laneway house', 'Coach house'],
};

const BEDROOM_OPTIONS = [
  { value: 'studio', label: 'Studio' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5+', label: '5+' },
];

const BATHROOM_OPTIONS = [
  { value: '1', label: '1' },
  { value: '1.5', label: '1.5' },
  { value: '2', label: '2' },
  { value: '2.5', label: '2.5' },
  { value: '3', label: '3' },
  { value: '3+', label: '3+' },
];

const FURNISHED_OPTIONS = [
  { value: 'unfurnished', label: 'Unfurnished' },
  { value: 'partially', label: 'Partially Furnished' },
  { value: 'fully', label: 'Fully Furnished' },
];

const LAUNDRY_OPTIONS = [
  { value: 'in-unit', label: 'In-unit' },
  { value: 'in-building', label: 'In building' },
  { value: 'none', label: 'None' },
];

const PARKING_OPTIONS = [
  { value: 'underground', label: 'Underground' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'covered', label: 'Covered' },
  { value: 'surface', label: 'Surface' },
  { value: 'garage', label: 'Garage' },
  { value: 'none', label: 'No Parking' },
];

const UTILITIES = [
  { id: 'electricity', label: 'Electricity/Power', icon: 'zap' },
  { id: 'gas', label: 'Gas', icon: 'flame' },
  { id: 'water', label: 'Water', icon: 'droplet' },
  { id: 'heat', label: 'Heat', icon: 'thermometer' },
  { id: 'internet', label: 'Internet', icon: 'wifi' },
  { id: 'ac', label: 'Air Conditioning', icon: 'snowflake' },
];

const UNIT_AMENITIES = [
  'In-unit Laundry',
  'Air Conditioning',
  'Dishwasher',
  'Updated Kitchen',
  'Stainless Appliances',
  'Hardwood Floors',
  'Walk-in Closet',
  'Balcony/Patio',
  'Fireplace',
  'Storage',
];

const BUILDING_AMENITIES = [
  'Gym/Fitness',
  'Pool',
  'Rooftop Terrace',
  'Concierge',
  'Elevator',
  'Party Room',
  'Bike Storage',
  'Package Lockers',
  'Security',
  'Visitor Parking',
];

const AREA_HIGHLIGHTS = [
  'Near Transit',
  'Shopping Nearby',
  'Restaurants',
  'Parks',
  'Schools',
  'Quiet Street',
  'Waterfront',
  'Downtown',
];

const LEASE_TERMS = [
  { value: 'month-to-month', label: 'Month-to-month' },
  { value: '6-months', label: '6 months minimum' },
  { value: '1-year', label: '1 year minimum' },
];

// AI-generated description templates
const AI_DESCRIPTION_TEMPLATES = [
  "Welcome to this stunning {bedrooms}-bedroom, {bathrooms}-bathroom {propertyType} with modern finishes throughout. This move-in ready space offers the perfect blend of comfort and style, with natural light flooding through the spacious living areas. Located in a desirable neighborhood with easy access to public transit, shopping, and dining. Don't miss this opportunity to make this beautiful space your new home!",
  "Discover this beautifully maintained {bedrooms}-bedroom {propertyType} in the heart of {city}. Featuring {amenity1} and {amenity2}, this home offers everything you need for comfortable urban living. The open-concept layout creates a welcoming atmosphere, perfect for both relaxing and entertaining. Schedule a viewing today!",
  "This charming {bedrooms}-bedroom {propertyType} is ready for its next resident! Enjoy {amenity1}, {amenity2}, and convenient access to local amenities. The bright, airy spaces and thoughtful layout make this an ideal choice for anyone seeking quality living in {city}.",
];

// Mock market data for pricing suggestions
const MARKET_DATA = {
  'Toronto': {
    'studio': { min: 1600, max: 2100 },
    '1': { min: 1900, max: 2500 },
    '2': { min: 2400, max: 3200 },
    '3': { min: 2900, max: 4000 },
    '4': { min: 3500, max: 5000 },
    '5+': { min: 4200, max: 6500 },
  },
  'default': {
    'studio': { min: 1200, max: 1600 },
    '1': { min: 1400, max: 1900 },
    '2': { min: 1800, max: 2400 },
    '3': { min: 2200, max: 3000 },
    '4': { min: 2800, max: 3800 },
    '5+': { min: 3400, max: 4500 },
  }
};

console.log('mock-data.js loaded');
```

## Step 5: Test

```bash
cd /Users/jupiter/Projects/rent-vibe-stack-sync
python3 -m http.server 8080
```

Visit `http://localhost:8080/landlord-login/`

### Verify:
- [ ] No console errors
- [ ] All JS files load (check Network tab)
- [ ] Header displays with back button, progress dots
- [ ] Footer displays with Back/Continue buttons
- [ ] Welcome screen shows "Screen coming soon..."
- [ ] Click Continue → should navigate (even if screens are placeholders)
- [ ] Click Start Over → should prompt confirmation
- [ ] Click Save Draft → should show toast notification

### Test State Persistence:
1. Open DevTools → Application → Local Storage
2. Look for `rentsync_listing_draft` key
3. Should see state object with all default values

## Step 6: Commit

```bash
git add .
git commit -m "Sprint 2.2: Add state management and router

- state.js: Full state management with localStorage
- router.js: Screen navigation with progress tracking
- app.js: Component loading and event handlers
- mock-data.js: All static data for the prototype
- Toast notification system
- Global event delegation"

# Don't push yet - continue to Sprint 2.3
```

## Output Required
Confirm:
1. State management working (check localStorage)
2. Router navigating between placeholder screens
3. Progress dots updating
4. Toast notifications working
5. No console errors

Report status before proceeding to Sprint 2.3.
