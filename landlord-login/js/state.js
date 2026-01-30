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
