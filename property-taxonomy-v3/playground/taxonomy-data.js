/**
 * Taxonomy Data Model v4.2
 * Canonical data for the 6-dimension property classification system
 */

const TAXONOMY = {
  residential: {
    label: 'Residential',
    types: {
      house: {
        label: 'House',
        subtypes: {
          detached: { label: 'Detached', variants: ['bungalow','split_level','two_storey','garden_home'], unitTypes: ['entire','main_floor','suite','basement','room_private','room_shared'] },
          mobile: { label: 'Mobile', variants: ['manufactured'], unitTypes: ['entire'] },
          cabin: { label: 'Cabin', variants: ['cottage'], unitTypes: ['entire'] },
          house_other: { label: 'Other (House)', variants: ['garage_suite','garden_suite'], unitTypes: ['entire','main_floor','suite','basement','room_private','room_shared'] }
        }
      },
      townhouse_plex: {
        label: 'Townhouse / Plex',
        subtypes: {
          semi: { label: 'Semi-Detached', variants: [], unitTypes: ['entire','main_floor','suite','basement','room_private','room_shared'] },
          townhouse: { label: 'Townhouse', variants: ['row_house'], unitTypes: ['entire','main_floor','suite','basement','room_private','room_shared'] },
          duplex: { label: 'Duplex', variants: [], unitTypes: ['entire','suite','basement'] },
          triplex: { label: 'Triplex', variants: [], unitTypes: ['entire','suite','basement'] },
          fourplex: { label: 'Fourplex', variants: [], unitTypes: ['entire','suite','basement'] },
          multiplex: { label: 'Multiplex', variants: [], unitTypes: ['entire','suite','basement'] },
          tp_other: { label: 'Other (Townhouse/Plex)', variants: [], unitTypes: ['entire','suite','basement','room_private','room_shared'] }
        }
      },
      apartment_bldg: {
        label: 'Apartment Building',
        subtypes: {
          low_rise: { label: 'Low Rise (1-4 fl)', variants: ['loft','studio','penthouse','bachelor'], unitTypes: ['entire','suite','basement','apartment','room_private','room_shared'] },
          mid_rise: { label: 'Mid Rise (5-12 fl)', variants: ['loft','studio','penthouse','bachelor'], unitTypes: ['entire','suite','apartment','room_private','room_shared'] },
          high_rise: { label: 'High Rise (13+ fl)', variants: ['loft','studio','penthouse','bachelor'], unitTypes: ['entire','suite','apartment','room_private','room_shared'] },
          walkup: { label: 'Walk-up', variants: ['loft','studio','bachelor'], unitTypes: ['entire','suite','apartment','room_private','room_shared'] },
          apt_other: { label: 'Other (Apt Bldg)', variants: [], unitTypes: ['entire','suite','apartment','room_private','room_shared'] }
        }
      },
      other_res: {
        label: 'Other Residential',
        subtypes: {
          res_office: { label: 'Office', variants: [], unitTypes: ['office'] },
          res_parking: { label: 'Parking', variants: [], unitTypes: ['parking'] },
          res_other: { label: 'Other (Residential)', variants: [], unitTypes: ['entire'] }
        }
      }
    }
  },
  commercial: {
    label: 'Commercial',
    types: {
      office: {
        label: 'Office',
        subtypes: {
          class_a: { label: 'Class A', variants: [], unitTypes: ['entire','suite','floor','office'] },
          class_b: { label: 'Class B', variants: [], unitTypes: ['entire','suite','floor','office'] },
          class_c: { label: 'Class C', variants: [], unitTypes: ['entire','suite','floor','office'] },
          coworking: { label: 'Co-working', variants: ['desk'], unitTypes: ['suite','spot','office'] },
          office_other: { label: 'Other (Office)', variants: [], unitTypes: ['entire','suite','floor','office'] }
        }
      },
      retail: {
        label: 'Retail',
        subtypes: {
          storefront: { label: 'Storefront', variants: [], unitTypes: ['entire','suite'] },
          mall: { label: 'Mall / Shopping Ctr', variants: [], unitTypes: ['suite'] },
          strip_mall: { label: 'Strip Mall', variants: [], unitTypes: ['suite'] },
          retail_other: { label: 'Other (Retail)', variants: [], unitTypes: ['entire','suite'] }
        }
      },
      industrial: {
        label: 'Industrial',
        subtypes: {
          warehouse: { label: 'Warehouse', variants: [], unitTypes: ['entire','floor'] },
          manufacturing: { label: 'Manufacturing', variants: [], unitTypes: ['entire'] },
          flex: { label: 'Flex Space', variants: [], unitTypes: ['entire','suite'] },
          storage: { label: 'Storage Facility', variants: [], unitTypes: ['entire','suite'] },
          construction: { label: 'Construction / New Dev', variants: [], unitTypes: ['entire'] },
          industrial_other: { label: 'Other (Industrial)', variants: [], unitTypes: ['entire'] }
        }
      },
      parking_pty: {
        label: 'Parking',
        subtypes: {
          parking_garage: { label: 'Garage', variants: [], unitTypes: ['entire','floor','spot','parking'] },
          surface_lot: { label: 'Surface Lot', variants: [], unitTypes: ['entire','spot','parking'] },
          parking_other: { label: 'Other (Parking)', variants: [], unitTypes: ['entire','spot','parking'] }
        }
      },
      other_commercial: {
        label: 'Other Commercial',
        subtypes: {
          commercial_other: { label: 'Other (Commercial)', variants: [], unitTypes: ['entire'] }
        }
      }
    }
  },
  recreation: {
    label: 'Recreation',
    types: {
      hospitality: {
        label: 'Hospitality',
        subtypes: {
          hotel: { label: 'Hotel', variants: [], unitTypes: ['entire'] },
          motel: { label: 'Motel', variants: [], unitTypes: ['entire'] },
          bnb: { label: 'B&B', variants: [], unitTypes: ['entire'] },
          inn: { label: 'Inn', variants: [], unitTypes: ['entire'] },
          hospitality_other: { label: 'Other (Hospitality)', variants: [], unitTypes: ['entire'] }
        }
      },
      leisure: {
        label: 'Leisure',
        subtypes: {
          marina: { label: 'Marina', variants: [], unitTypes: ['spot'] },
          campground: { label: 'Campground', variants: [], unitTypes: ['spot'] },
          stable: { label: 'Stable', variants: [], unitTypes: ['spot'] },
          leisure_other: { label: 'Other (Leisure)', variants: [], unitTypes: ['spot'] }
        }
      },
      other_rec: {
        label: 'Other Recreation',
        subtypes: {
          rec_other: { label: 'Other (Recreation)', variants: [], unitTypes: ['entire'] }
        }
      }
    }
  },
  other: {
    label: 'Other',
    types: {
      land: {
        label: 'Land',
        subtypes: {
          agricultural: { label: 'Agricultural', variants: [], unitTypes: ['entire'] },
          acreage: { label: 'Acreage', variants: [], unitTypes: ['entire'] },
          vacant: { label: 'Vacant Lot', variants: [], unitTypes: ['entire'] },
          land_other: { label: 'Other (Land)', variants: [], unitTypes: ['entire'] }
        }
      },
      specialty: {
        label: 'Specialty',
        subtypes: {
          specialty_tbd: { label: 'TBD', variants: [], unitTypes: ['entire'] },
          specialty_other: { label: 'Other (Specialty)', variants: [], unitTypes: ['entire'] }
        }
      },
      other_other: {
        label: 'Other',
        subtypes: {
          subdivision: { label: 'Subdivision', variants: [], unitTypes: ['entire'] },
          other_other_other: { label: 'Other (Other)', variants: [], unitTypes: ['entire'] }
        }
      }
    }
  }
};

// Self-sufficient unit types (unit-first path)
const SELF_SUFFICIENT = {
  apartment: { label: 'Apartment', sector: 'residential', impliedStruct: 'apartment_bldg' },
  basement: { label: 'Basement', sector: 'residential', impliedStruct: 'house' },
  room_private: { label: 'Room (Private)', sector: 'residential', impliedStruct: null },
  room_shared: { label: 'Room (Shared)', sector: 'residential', impliedStruct: null },
  office: { label: 'Office Space', sector: 'commercial', impliedStruct: 'office' },
  parking: { label: 'Parking', sector: 'commercial', impliedStruct: 'parking_pty' }
};

// Unit type labels
const UNIT_LABELS = {
  entire: 'Entire',
  main_floor: 'Main Floor',
  suite: 'Suite',
  basement: 'Basement',
  apartment: 'Apartment',
  room_private: 'Room (Private)',
  room_shared: 'Room (Shared)',
  office: 'Office',
  parking: 'Parking',
  floor: 'Floor',
  spot: 'Spot'
};

// Variant labels
const VARIANT_LABELS = {
  loft: 'Loft',
  studio: 'Studio',
  penthouse: 'Penthouse',
  bachelor: 'Bachelor',
  bungalow: 'Bungalow',
  split_level: 'Split-level',
  two_storey: 'Two-storey',
  garden_home: 'Garden Home',
  garden_suite: 'Garden Suite',
  garage_suite: 'Garage Suite',
  cottage: 'Cottage',
  manufactured: 'Manufactured',
  row_house: 'Row House',
  desk: 'Desk'
};

// Transaction types
const TRANSACTION_TYPES = {
  rent: 'Rent',
  sale: 'Sale',
  lease: 'Lease'
};

// Purpose values
const PURPOSE_VALUES = {
  standard: 'Standard',
  student: 'Student',
  senior: 'Senior',
  military_veteran: 'Military/Veteran',
  corporate: 'Corporate',
  vacation: 'Vacation',
  short_term: 'Short-Term'
};

// Ownership values
const OWNERSHIP_VALUES = {
  rental: 'Rental',
  freehold: 'Freehold',
  condo: 'Condo',
  coop: 'Co-op',
  leasehold: 'Leasehold',
  lease_to_own: 'Lease-to-Own',
  rent_to_own: 'Rent-to-Own'
};

// Export for use in builder
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TAXONOMY, SELF_SUFFICIENT, UNIT_LABELS, VARIANT_LABELS, TRANSACTION_TYPES, PURPOSE_VALUES, OWNERSHIP_VALUES };
}
