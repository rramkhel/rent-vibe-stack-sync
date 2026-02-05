# Property Types Taxonomy Simplification

## Milestone: Discovery & Proposal

**Status:** In Progress  
**PM:** Rachel  
**Created:** January 28, 2026

---

## Problem Statement

The current property types taxonomy has 40+ options creating three distinct problems:

1. **Renters** experience cognitive overload when searching - too many options in dropdowns
2. **Ecommerce landlords** (casual, 1-3 properties) find the listing process confusing with niche types they don't understand
3. **Enterprise landlords** need all the granular types for portfolio management but the flat list is hard to navigate
4. **Data team** struggles with inconsistent categorization affecting Rent Report quality

## Proposed Solution: Progressive Disclosure Model

One backend taxonomy, three frontend experiences. Each user type sees only the complexity they need.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Source of Truth)                │
│  Full 40+ taxonomy stored as normalized codes                   │
│  3-level hierarchy: Category → Building Type → Unit Type        │
│  Housing Type as separate dimension (not nested)                │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐   ┌─────────────────┐   ┌─────────────────────┐
│  RENTER VIEW  │   │  ECOMMERCE LL   │   │  ENTERPRISE VIEW    │
│   5 categories│   │  ~12 types      │   │  Full taxonomy      │
│   + filters   │   │  2-step flow    │   │  3-level hierarchy  │
└───────────────┘   └─────────────────┘   └─────────────────────┘
```

### Renter View (Search Experience)

**Goal:** Minimize cognitive load. Simple categories, filters do the heavy lifting.

**5 Top-Level Categories:**
| Category | Icon | What it includes |
|----------|------|------------------|
| Apartments | 🏢 | Low/Mid/High Rise, Luxury, Studios, Basements, Lofts |
| Houses | 🏠 | Single-family, Semi, Duplex/Triplex/Fourplex, Cabins, Cottages |
| Condos | 🏙️ | Condo units in buildings or communities |
| Rooms | 🛏️ | Private rooms, shared rooms, rooming houses |
| Townhouses | 🏘️ | Townhouses (single or community) |

**UX Pattern:** User picks category → optional subtype filter appears → additional filters (price, beds, pets, etc.)

### Ecommerce Landlord View (Listing Flow)

**Goal:** Fast, intuitive 2-step selection with smart defaults.

**Step 1 - "What type of property?"**
- Apartments
- Houses  
- Condos
- Rooms
- Townhouses

**Step 2 - "More specifically?" (contextual based on Step 1)**

| If they picked... | They see these options |
|-------------------|------------------------|
| Apartments | Studio, Basement, Main Floor, Loft *(default: "Apartment")* |
| Houses | Single-family, Semi-detached, Duplex/Triplex *(default: "House")* |
| Condos | Condo Unit *(only option)* |
| Rooms | Private Room, Shared Room *(default: "Private")* |
| Townhouses | Townhouse *(only option)* |

**Key:** Defaults mean landlords can complete in 1-2 clicks if they don't care about specifics.

### Enterprise View (Full Taxonomy)

**Goal:** All niche types available for portfolio management.

**3-Level Hierarchy:**

```
RESIDENTIAL (Single Family)
├── Basement
├── Loft  
├── Main Floor
├── Single Room (Private)
├── Single Room (Shared)
├── House (default)
├── Semi House
├── Town House
├── Single-family Home
├── Mobile Home
├── Condo Unit
├── Cabin
├── Cottage
├── Duplex
├── Triplex
├── Fourplex
├── Garden Home
└── Garage Suite

RESIDENTIAL (Multi-Family)
├── Low Rise Apartment
├── Mid Rise Apartment (default)
├── High Rise Apartment
├── Luxury Apartment
├── Town House Community
├── Home/House Community
├── Condo Community
├── Multi-Unit House (Multiplex)
└── Rooms

COMMERCIAL
├── Industrial
├── Land / Acreage
├── Office (default)
├── Retail
├── Warehouse
└── Specialty

RECREATION
├── Leisure
├── Hotel (default)
├── Marina
├── Motel
└── Campground

OTHER
├── Agricultural
├── Construction / New Development
├── Storage Facility
├── Sub-division
└── Parking
```

### Housing Types (Cross-Cutting Dimension)

These are **tags/filters**, not nested under property type. Any property can have a housing type:

- Family/Conventional (default)
- Student Housing
- Senior Housing
- Corporate Housing
- Military/Veteran Housing
- Vacation Home
- Sublet
- Short-term

### Data Model

```javascript
// Backend property record
{
  // Core taxonomy (always stored at full granularity)
  "property_category": "residential_mf",      // residential_sf, residential_mf, commercial, recreation, other
  "building_type": "high_rise_apartment",     // specific building type code
  "unit_type": "loft",                        // specific unit type code (nullable)
  
  // Cross-cutting dimension
  "housing_type": "student",                  // family, student, senior, corporate, military, vacation, sublet, short_term
  
  // Derived fields for frontend display
  "display_category": "Apartments",           // simplified category for renter UI
  "display_type": "Loft"                      // human-readable type
}
```

**Benefits for Data Team:**
- Normalized codes, not free text
- 3-level hierarchy prevents ambiguity
- Housing type as separate dimension enables clean filtering
- Rent Report can aggregate at any level
- No data cleanup needed regardless of input source

---

## ILS Mapping Considerations

Current ILS platforms with different taxonomies:
- **Rentals.ca / TorontoRentals / Louer** - Property Type + Subtype pattern
- **RentBoard** - Flat property type list
- **RentCanada** - Simplified property types
- **RentFaster** - Property Category + Property Type + Unit Type (closest to proposed model)

**Recommendation:** Our 3-level model maps cleanly to all ILS systems. We can derive their required fields from our normalized backend data.

---

## Open Questions

- [ ] Can eng support the 3-level hierarchy in current data model?
- [ ] What's the migration path for existing listings?
- [ ] Which ILS integrations are highest priority?
- [ ] How do we handle edge cases (e.g., "Garage Suite" - is that SF or MF)?
- [ ] Do we need "Other" catch-all options at each level?

---

## Next Steps

1. Review proposal with Data team - validate Rent Report requirements
2. Eng feasibility check on backend model changes
3. Design mockups for renter search and ecommerce listing flows
4. Define ILS mapping specifications
5. Migration plan for existing data

---

## Visualization

The interactive React component (`property-taxonomy.jsx`) demonstrates the progressive disclosure model with clickable tabs for each stakeholder view. 

**Note:** If the tech stack doesn't support React/JSX, the key elements to implement in HTML/JS are:
- Tabbed interface switching between Overview, Renter, Ecommerce, Enterprise, and Data Model views
- Interactive category selection showing contextual subtypes
- Visual hierarchy diagram showing the funnel from 5 categories → 12 types → 40+ full taxonomy
