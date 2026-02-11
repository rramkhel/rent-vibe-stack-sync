# Sprint 4.3: Tab 2 — Interactive Listing Builder

## Overview

Build Tab 2 (`tabs/tab2-builder.html`) and its supporting JavaScript (`js/builder.js`, `js/taxonomy-data.js`). This is the "aha moment" tool — let someone build a listing and see how data flows.

---

## Layout

Two-column: Left (380px sticky sidebar) = Inputs. Right (flex) = Live output.

---

## Left Side: Inputs

### Path Selector
Two buttons: "Unit-First" (active by default, teal) and "Structure-First" (gray). Clicking switches which input fields are shown.

### Classification (the 6 dimensions)

**Unit-First path:**
1. Unit Type dropdown (required): optgroup "Self-sufficient (no building needed)" → Apartment, Basement, Room (Private), Room (Shared), Office Space, Parking
2. When unit selected, show checkbox: "Know the building type? (optional)"
3. If checked, show: Property Type dropdown (pre-populated based on unit's implied sector) → Subtype dropdown → Variant dropdown (if variants exist for selected subtype)

**Structure-First path:**
1. Sector dropdown (required): Residential, Commercial, Recreation, Other
2. Property Type dropdown (populates based on sector)
3. Subtype dropdown (populates based on property type)
4. Variant dropdown (populates based on subtype, only shows if variants exist)
5. Unit Type dropdown (populates valid unit types for the selected property type/subtype)

### Divider line

### Transaction Type dropdown: Rent, Sale, Lease

### Divider line (labeled "Metadata")

### Metadata section
- Purpose dropdown: Standard (default), Student, Senior, Military/Veteran, Corporate, Vacation, Short-Term
- Ownership dropdown: Rental (default), Freehold, Condo, Co-op, Leasehold, Lease-to-Own, Rent-to-Own
- Community toggle: Off by default. When toggled on, show a text input for community name.

---

## Right Side: Live Output (updates on every change)

### Section A: The Collapsed Sentence
A `.sentence-box` showing the natural-language sentence with colored dimension badges. Follows the collapse patterns from Tab 1. Below the sentence, show the metadata line in italic.

Updates live as selections change. When nothing is selected yet, show placeholder text.

### Section B: Canonical Storage (with Visual/JSON toggle)

Toggle buttons in the card header: [Visual] [JSON] — small pill toggle, Visual active by default.

**Visual view:**
Each dimension as a badge + value (same format as the examples in Tab 1). After the 6 dimensions, a dashed divider, then Purpose, Ownership, and Community as metadata rows. Null values shown in gray italic.

**JSON view:**
```json
{
  "sector": "residential",
  "property_type": "apartment_bldg",
  "subtype": "low_rise",
  "variant": "loft",
  "unit_type": "apartment",
  "transaction": "rent",
  "metadata": {
    "purpose": "student",
    "ownership": "rental",
    "community": null
  }
}
```
Dark background (gray-900), syntax-highlighted: keys in blue, string values in green, null in gray.

### Section C: Platform Display

4 platform cards in a 2x2 grid:
1. BSTK / RentSync (enterprise header)
2. Rentals.ca / RentFaster (ils header)
3. Spacelist (commercial header)
4. MLS / Roomies (mls header)

Each shows how the listing would display on that platform. Update live.

When Community is toggled on, the platform cards should show how the display changes (building bumped down, community becomes top-level).

When nothing is selected, each card shows "Select a listing type to see output" in gray italic.

---

## Data Model (taxonomy-data.js)

```javascript
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
          house_other: { label: 'Other (House)', variants: ['garage_suite'], unitTypes: ['entire','main_floor','suite','basement','room_private','room_shared'] }
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

const SELF_SUFFICIENT = {
  apartment: { label: 'Apartment', sector: 'residential', impliedStruct: 'apartment_bldg' },
  basement: { label: 'Basement', sector: 'residential', impliedStruct: 'house' },
  room_private: { label: 'Room (Private)', sector: 'residential', impliedStruct: null },
  room_shared: { label: 'Room (Shared)', sector: 'residential', impliedStruct: null },
  office: { label: 'Office', sector: 'commercial', impliedStruct: 'office' },
  parking: { label: 'Parking', sector: 'commercial', impliedStruct: 'parking_pty' }
};

const UNIT_LABELS = {
  entire: 'Entire', main_floor: 'Main Floor', suite: 'Suite', basement: 'Basement',
  apartment: 'Apartment', room_private: 'Room (Private)', room_shared: 'Room (Shared)',
  office: 'Office', parking: 'Parking', floor: 'Floor', spot: 'Spot'
};

const VARIANT_LABELS = {
  loft: 'Loft', studio: 'Studio', penthouse: 'Penthouse', bachelor: 'Bachelor',
  bungalow: 'Bungalow', split_level: 'Split-level', two_storey: 'Two-storey',
  garden_home: 'Garden Home', garden_suite: 'Garden Suite', garage_suite: 'Garage Suite',
  cottage: 'Cottage', manufactured: 'Manufactured', row_house: 'Row House',
  desk: 'Desk'
};
```

---

## Sentence Builder Logic

The builder needs to construct the collapsed sentence based on current selections. Rules:

1. If unit-first with no variant: show just `[unit_type] for [transaction]`
2. If unit-first with variant: show `[variant] [unit_type] for [transaction]`
3. If structure-first with unit_type=entire and variant: show `[variant] for [transaction]`
4. If structure-first with unit_type=entire and no variant: show `[subtype] [property_type] for [transaction]` (but hide property_type if subtype alone is clear, e.g., "Townhouse" not "Townhouse Townhouse/Plex")
5. If structure-first with unit_type != entire: show `[unit_type] in [subtype] for [transaction]`

Metadata line below: show Sector + non-default Ownership + non-default Purpose. Skip "standard" purpose and "rental" ownership as they're implied defaults.

---

## Platform Mapping Logic

Port the `getPlatformDisplay()` function from the existing file. It works well — just needs the variable name updates for "property_type" instead of "structure".

---

## JSON Output

Include metadata in the JSON:
```json
{
  "sector": "...",
  "property_type": "...",
  "subtype": "...",
  "variant": "...",
  "unit_type": "...",
  "transaction": "...",
  "metadata": {
    "purpose": "...",
    "ownership": "...",
    "community": null
  }
}
```

---

## Testing Checklist

- [ ] Both paths work (unit-first and structure-first)
- [ ] Metadata inputs visible: Purpose dropdown, Ownership dropdown, Community toggle
- [ ] Metadata appears in Visual view below dashed divider
- [ ] Metadata appears in JSON view under "metadata" key
- [ ] Visual/JSON toggle works
- [ ] Collapsed sentence generates correctly for all paths
- [ ] Metadata line below sentence (italic, shows non-default values)
- [ ] Platform cards update live
- [ ] Bachelor variant available when selecting Apt Bldg subtypes
- [ ] "Other" subtypes available for all property types
