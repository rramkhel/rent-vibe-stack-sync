// Property Taxonomy Data
// Defines the progressive disclosure model for property types

const TAXONOMY_DATA = {
  // Simplified user-facing categories (what renters see)
  renterView: [
    { id: 'apartments', label: 'Apartments', icon: 'building-2', color: '#3B82F6' },
    { id: 'houses', label: 'Houses', icon: 'home', color: '#10B981' },
    { id: 'condos', label: 'Condos', icon: 'building', color: '#8B5CF6' },
    { id: 'rooms', label: 'Rooms', icon: 'bed-double', color: '#F59E0B' },
    { id: 'townhouses', label: 'Townhouses', icon: 'warehouse', color: '#EC4899' },
  ],

  // What ecommerce landlords see (slightly more detail)
  ecommerceView: {
    apartments: ['Studio', 'Basement', 'Main Floor', 'Loft'],
    houses: ['Single-family', 'Semi-detached', 'Duplex/Triplex'],
    condos: ['Condo Unit'],
    rooms: ['Private Room', 'Shared Room'],
    townhouses: ['Townhouse'],
  },

  // Full enterprise taxonomy (what data sees + enterprise landlords)
  enterpriseView: {
    apartments: {
      'Low Rise': ['Studio', 'Bachelor', 'Basement', 'Main Floor', 'Loft', 'Duplex Unit'],
      'Mid Rise': ['Studio', 'Bachelor', 'Basement', 'Main Floor', 'Loft', 'Duplex Unit'],
      'High Rise': ['Studio', 'Bachelor', 'Basement', 'Main Floor', 'Loft', 'Duplex Unit', 'Penthouse'],
      'Luxury': ['Studio', 'Bachelor', 'Penthouse', 'Loft'],
    },
    houses: {
      'Single-family': ['House', 'Single-family Home', 'Cabin', 'Cottage', 'Garden Home'],
      'Semi-detached': ['Semi House'],
      'Multi-unit': ['Duplex', 'Triplex', 'Fourplex', 'Multiplex'],
      'Other': ['Mobile Home', 'Garage Suite'],
    },
    condos: {
      'Condo Building': ['Condo Unit'],
      'Condo Community': ['Condo Unit'],
    },
    rooms: {
      'Private': ['Private Room'],
      'Shared': ['Shared Room'],
      'Rooming House': ['Room'],
    },
    townhouses: {
      'Single Unit': ['Townhouse'],
      'Community': ['Townhouse Unit'],
    },
  },

  // Housing type overlays (cross-cutting dimension)
  housingTypes: [
    'Family/Conventional',
    'Student',
    'Senior',
    'Corporate',
    'Military/Veteran',
    'Vacation',
    'Sublet',
    'Short-term',
  ],
};
