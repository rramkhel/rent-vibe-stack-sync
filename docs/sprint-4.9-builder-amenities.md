# Sprint 4.9: Amenities in the Listing Builder

**Project:** Property Classification System  
**Purpose:** Extend Tab 2 (Interactive Listing Builder) to include the full canonical amenities model — property amenities, unit amenities, parking, pet policy, and utilities  
**Audience:** Same as main site — PMs, CPO, ILS Team Lead, Designer  
**Context:** The builder currently demonstrates the 6-dimension property classification model. This sprint adds the "everything else" that makes a listing complete — amenities and attributes that are context-aware based on the property type selected.

---

## What This Sprint Does

The Listing Builder currently lets you select property classification (sector → property type → subtype → variant → unit type → transaction) and see canonical storage + platform output.

**This sprint adds a second section** below the classification inputs: a full amenities builder with collapsible categories, context-aware filtering (amenities that don't apply to the selected property type are hidden), and three structured interactive sections (Parking, Pet Policy, Utilities).

The right-side output extends the existing canonical JSON to include all selected amenities.

---

## Critical Rules

- Don't add tooltips or popovers.
- Don't use any external fonts (Google Fonts etc).
- Don't use any framework (React, Vue, etc) — vanilla HTML/CSS/JS only.
- Don't use localStorage or sessionStorage.
- Preserve the existing design system exactly — teal/slate palette, existing CSS variables, existing component patterns.
- The amenities section should feel like a natural extension of the existing builder, not a bolted-on afterthought.
- Data source: The amenities data defined below is authoritative. It comes from the `amenitiescanonicalv42.xlsx` spreadsheet.

---

## File Changes

### Files to modify:
- `property-taxonomy/tabs/tab2-builder.html` — Add amenities HTML below existing inputs
- `property-taxonomy/js/builder.js` — Add amenities interaction logic, extend output
- `property-taxonomy/css/styles.css` (or component CSS) — Add amenities-specific styles

### Files to create:
- `property-taxonomy/js/amenities-data.js` — Complete amenities data model (separate from taxonomy-data.js to keep things manageable)

### Files to update:
- `property-taxonomy/index.html` — Add `<script src="js/amenities-data.js"></script>` before builder.js

---

## Architecture

### Data Flow

1. User selects property classification (existing behavior, unchanged)
2. Classification determines which amenities are **applicable** — e.g., selecting "Apartment Building > Mid/High Rise" enables Elevator, Rooftop amenities, Underground Parking; selecting "House" enables Fenced Yard, Private Garage, Private Yard
3. Amenities section renders with applicable items enabled, non-applicable items hidden
4. User toggles/selects amenities
5. Right-side output updates with full canonical JSON including amenities

### Structure Type Mapping

The amenities spreadsheet uses these structure type columns. Map them to the builder's property type selections:

| Spreadsheet Column | Builder Property Type(s) |
|---|---|
| House | house (all subtypes) |
| Townhouse/Plex | townhouse_plex (all subtypes) |
| Apt Bldg (Low Rise/Walk-up) | apartment_bldg with subtype low_rise OR walkup |
| Apt Bldg (Mid/High Rise) | apartment_bldg with subtype mid_rise OR high_rise |
| Other Res | manufactured, cabin_cottage, other_res, or any residential without specific structure |
| Office | office (commercial) |
| Retail | retail (commercial) |
| Industrial | industrial (commercial) |
| Hospitality | hospitality (recreation) |
| Leisure | leisure (recreation) |
| Land/Other | land, parking_pty, other_commercial, other_rec, other sector |

When NO structure type is selected (unit-first path without building type specified), show **all residential** amenities as applicable (assume the broadest set).

### Purpose Mapping

Some amenities are purpose-specific. The spreadsheet has purpose columns:
- Standard (default) — shown for all unless purpose-specific
- Senior — Senior Living category only shows when purpose = senior
- Student — student-specific amenities
- Corporate — corporate-specific
- Vacation — vacation-specific
- Short-term — short-term-specific

When purpose = "standard" (or not set), show items where Standard = ✓.
When a specific purpose is selected, ALSO show items where that purpose column = ✓.

---

## Data Model: amenities-data.js

Create this file with the complete amenities data. The structure should be:

```javascript
/**
 * Canonical Amenities Data Model
 * Source: amenitiescanonicalv42.xlsx
 * 
 * Structure types for applicability:
 *   house, townhouse_plex, apt_low, apt_mid_high, other_res,
 *   office, retail, industrial, hospitality, leisure, land_other
 *
 * Tiers: 1 = essential (always show), 2 = important, 3 = nice-to-have
 */

var AMENITIES_DATA = {

    propertyAmenities: [
        // Accessibility
        { category: 'Accessibility', name: 'Access for Disabled', type: 'bool', tier: 2,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Accessibility', name: 'Elevators', type: 'bool', tier: 1,
          applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Accessibility', name: 'Visual / Audio Aids', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Accessibility', name: 'Wheelchair Access', type: 'bool', tier: 2,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // Commercial
        { category: 'Commercial', name: '24/7 Access', type: 'bool', tier: 1,
          applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false },
          purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial', name: 'High Traffic', type: 'bool', tier: 2,
          applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: false, retail: true, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial', name: 'Private Office', type: 'bool', tier: 2,
          applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial', name: 'Shared Office', type: 'bool', tier: 2,
          applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial', name: 'Virtual Office', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },

        // Common Areas
        { category: 'Common Areas', name: 'BBQ Area', type: 'bool', tier: 2,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: false, vacation: true, short_term: true } },
        { category: 'Common Areas', name: 'Bike-friendly / Bicycle Room', type: 'bool', tier: 2,
          applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: false, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Common Areas', name: 'Business Centre', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false },
          purpose: { standard: true, senior: false, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Common Areas', name: 'Community Garden', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: false, vacation: false, short_term: false } },
        { category: 'Common Areas', name: 'Gym / Fitness Centre', type: 'bool', tier: 1,
          applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Common Areas', name: 'Laundry Facilities - On-site', type: 'bool', tier: 1,
          applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Common Areas', name: 'Laundry Facilities - Every Floor', type: 'bool', tier: 2,
          applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Common Areas', name: 'Recreation Room', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: false, vacation: false, short_term: false } },
        { category: 'Common Areas', name: 'Social Room / Lounge', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Common Areas', name: 'Yoga / Dance Studio', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: false, vacation: false, short_term: false } },

        // Nearby Services
        { category: 'Nearby Services', name: 'Beach nearby', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: true, land_other: true },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Nearby Services', name: 'Bike Stand nearby', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: true, land_other: false },
          purpose: { standard: true, senior: false, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Nearby Services', name: 'Cafe(s) nearby', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: true, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Nearby Services', name: 'Convenience Store(s) nearby', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Nearby Services', name: 'Dog Park(s) nearby', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: false, vacation: true, short_term: true } },
        { category: 'Nearby Services', name: 'Hospital(s) nearby', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Nearby Services', name: 'Library nearby', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Nearby Services', name: 'Mall(s) nearby', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: true, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Nearby Services', name: 'Medical Service(s) nearby', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Nearby Services', name: 'Park(s) nearby', type: 'bool', tier: 2,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: true, land_other: true },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Nearby Services', name: 'Pharmacy nearby', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: true, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Nearby Services', name: 'School(s) nearby', type: 'bool', tier: 2,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: false, student: true, corporate: false, vacation: false, short_term: false } },
        { category: 'Nearby Services', name: 'Shopping nearby', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: true, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Nearby Services', name: 'Public Transit nearby', type: 'bool', tier: 1,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // On-Site Services
        { category: 'On-Site Services', name: 'Cleaning / Janitor Services', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: false, hospitality: true, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: false, corporate: true, vacation: true, short_term: true } },
        { category: 'On-Site Services', name: 'Childcare Services', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: false, student: false, corporate: true, vacation: false, short_term: false } },
        { category: 'On-Site Services', name: 'Coffee Shop', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false },
          purpose: { standard: true, senior: false, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'On-Site Services', name: 'Concierge Services', type: 'bool', tier: 2,
          applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: false, corporate: true, vacation: true, short_term: true } },
        { category: 'On-Site Services', name: 'Convenience Store', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'On-Site Services', name: 'Dry Cleaning Services', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: false, corporate: true, vacation: true, short_term: true } },
        { category: 'On-Site Services', name: 'Snow Removal Services', type: 'bool', tier: 2,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'On-Site Services', name: 'Package Services', type: 'bool', tier: 2,
          applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'On-Site Services', name: 'Pet Wash Station', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: false, student: false, corporate: false, vacation: true, short_term: true } },

        // Outdoor
        { category: 'Outdoor', name: 'Courtyard', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Outdoor', name: 'Fenced Yard', type: 'bool', tier: 2,
          applies: { house: true, townhouse_plex: true, apt_low: false, apt_mid_high: false, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Outdoor', name: 'Fire Pit', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false },
          purpose: { standard: true, senior: false, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Outdoor', name: 'Greenhouse', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: true },
          purpose: { standard: true, senior: true, student: false, corporate: false, vacation: true, short_term: false } },
        { category: 'Outdoor', name: 'Patio / Deck / Sun Deck', type: 'bool', tier: 2,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: true, industrial: false, hospitality: true, leisure: true, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Outdoor', name: 'Porch', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: false, apt_mid_high: false, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Outdoor', name: 'Private Yard', type: 'bool', tier: 2,
          applies: { house: true, townhouse_plex: true, apt_low: false, apt_mid_high: false, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Outdoor', name: 'Offleash Dog Area / Dog Run', type: 'bool', tier: 3,
          applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: false, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Outdoor', name: 'Outdoor Space', type: 'bool', tier: 2,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: true, land_other: true },
          purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Outdoor', name: 'Shared Yard', type: 'bool', tier: 3,
          applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: false, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false },
          purpose: { standard: true, senior: true, student: true, corporate: false, vacation: true, short_term: true } },

        // Recreation
        { category: 'Recreation', name: 'Basketball Court(s)', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: false, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Billiards / Pool / Snooker', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: false, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Cabana', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: false, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Recreation', name: "Children's Play Area", type: 'bool', tier: 2, applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: false, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Pool Club House', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: true, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Heated Swimming Pool', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Hot Tub', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: true, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Indoor Swimming Pool', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Jacuzzi', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: true, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Outdoor Swimming Pool', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Playground', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: false, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Sauna', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: true, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Sports Courts / Rooms', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: false, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Tennis Court(s)', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: false, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Ping Pong / Table Tennis', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: false, vacation: true, short_term: true } },
        { category: 'Recreation', name: 'Racquetball Court', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: false, vacation: false, short_term: false } },
        { category: 'Recreation', name: 'Outdoor Play Area', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: false, student: false, corporate: false, vacation: true, short_term: true } },

        // Rooftop
        { category: 'Rooftop', name: 'Rooftop BBQ', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Rooftop', name: 'Rooftop Garden', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Rooftop', name: 'Rooftop Lounge', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Rooftop', name: 'Rooftop Patio', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Rooftop', name: 'Rooftop Terrace', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // Security
        { category: 'Security', name: '24/7 Security On-site', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Security', name: '24/7 Video Surveillance', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Security', name: 'Buzzer / Call Box / Intercom', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Security', name: 'Doorman', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: false, corporate: true, vacation: true, short_term: true } },
        { category: 'Security', name: 'Keyless Entry', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Security', name: 'Key Fob Elevators', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Security', name: 'Night Patrol', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Security', name: 'Security On-site', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Security', name: 'Staff On-site', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: false, corporate: true, vacation: true, short_term: true } },
        { category: 'Security', name: 'Video Surveillance', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // Senior Living (purpose-conditional — only show when purpose = senior)
        { category: 'Senior Living', name: '24/7 Medical Services', type: 'bool', tier: 1, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Assisted Living', type: 'bool', tier: 1, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Doctors On-site', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Hospital', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Independent Assisted Living', type: 'bool', tier: 1, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Independent Living', type: 'bool', tier: 1, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Long-term Care', type: 'bool', tier: 1, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Medical Clinic', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Medical Visits On-site', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Memory Care', type: 'bool', tier: 1, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Nurses On-site', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Personal Hygiene Care', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Short-term Care', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Senior Living', name: 'Transport Services', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: true, student: false, corporate: false, vacation: false, short_term: false } },

        // Storage
        { category: 'Storage', name: 'Storage Available', type: 'enum', tier: 1, values: ['Not specified', 'Yes - included in rent', 'Yes - extra cost', 'No'], applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Storage', name: 'Bike Storage', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Storage', name: 'Parcel Storage', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Storage', name: 'Storage Room', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Storage', name: 'Storage Lockers', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },

        // Furnishings & Smoking
        { category: 'Furnishings', name: 'Furnishing Status', type: 'enum', tier: 1, values: ['Not specified', 'Furnished', 'Partially Furnished', 'Unfurnished'], applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Smoking', name: 'Smoking Policy', type: 'enum', tier: 1, values: ['Not specified', 'No Smoking', 'Smoking Allowed', 'Designated Areas Only'], applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // Other (miscellaneous property-level)
        { category: 'Other', name: 'Barbecues Allowed on Balconies', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: false, vacation: true, short_term: true } },
        { category: 'Other', name: 'Beach Access', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: true }, purpose: { standard: true, senior: true, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Other', name: 'Garbage Chute', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Other', name: 'Guest Suites Available', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: false, corporate: true, vacation: false, short_term: false } },
        { category: 'Other', name: 'Noise Reduction Walls / Doors', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Other', name: 'Wet Bar', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: false, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: false, student: false, corporate: true, vacation: true, short_term: true } }
    ],

    unitAmenities: [
        // Accessibility
        { category: 'Accessibility', name: 'Accessible Bathroom', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Accessibility', name: 'Handrails', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // Air Conditioning
        { category: 'Air Conditioning', name: 'Air Conditioning Type', type: 'enum', tier: 1, values: ['None', 'Not Specified', 'Central', 'Window Unit', 'Wall Mounted', 'Individual Thermostat'], applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // Appliances
        { category: 'Appliances', name: 'Coffee Maker', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Appliances', name: 'Dishwasher', type: 'bool', tier: 1, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Appliances', name: 'Dryer In-suite', type: 'bool', tier: 1, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Appliances', name: 'Fridge / Freezer', type: 'bool', tier: 1, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Appliances', name: 'Garbage Disposal', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Appliances', name: 'In-suite Laundry', type: 'bool', tier: 1, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Appliances', name: 'Microwave', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Appliances', name: 'Stove', type: 'bool', tier: 1, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Appliances', name: 'Oven', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Appliances', name: 'Trash Compactor', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Appliances', name: 'Washer / Dryer Inlet', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Appliances', name: 'Washer In-suite', type: 'bool', tier: 1, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Appliances', name: 'Stainless Steel Appliances', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // Commercial Unit
        { category: 'Commercial Unit', name: 'Board Room', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial Unit', name: 'Display Windows', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: false, retail: true, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial Unit', name: 'Freight Elevator', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: true, industrial: true, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial Unit', name: 'Kitchenette', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial Unit', name: 'Meeting Room', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial Unit', name: 'Open Plan', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: true, industrial: true, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial Unit', name: 'On-site Maintenance / Management', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false }, purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial Unit', name: 'Printer / Scanner / Copier', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial Unit', name: 'Reception', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial Unit', name: 'Restaurant Kitchen', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: false, retail: true, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial Unit', name: 'Sprinklers', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false }, purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },
        { category: 'Commercial Unit', name: 'Stockroom / Warehouse', type: 'bool', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: false, other_res: false, office: false, retail: true, industrial: true, hospitality: false, leisure: false, land_other: false }, purpose: { standard: false, senior: false, student: false, corporate: false, vacation: false, short_term: false } },

        // Fireplace, Flooring, Heating, Countertops, Furnishings, Renovation — enum types
        { category: 'Fireplace', name: 'Fireplace Type', type: 'enum', tier: 2, values: ['None', 'Electric', 'Gas', 'Wood'], applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: true, student: false, corporate: true, vacation: true, short_term: true } },
        { category: 'Flooring', name: 'Flooring Type', type: 'enum', tier: 2, values: ['Not Specified', 'Carpeted', 'Hardwood', 'Laminate', 'Tile', 'Vinyl', 'Cement', 'Ceramic', 'Marble', 'Slate', 'Softwood'], applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Heating', name: 'Heating System', type: 'enum', tier: 1, values: ['None', 'Baseboard', 'Central / Forced Air', 'Individual Thermostat'], applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Heating', name: 'Heating Fuel', type: 'enum', tier: 2, values: ['Not Specified', 'Coal', 'Electrical', 'Gas', 'Oil', 'Propane', 'Solar', 'Wood'], applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Countertops', name: 'Countertop Type', type: 'enum', tier: 3, values: ['Not Specified', 'Formica', 'Granite', 'Quartz', 'Stone'], applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Furnishings', name: 'Unit Furnishing Status', type: 'enum', tier: 1, values: ['Not Specified', 'Furnished', 'Partially Furnished', 'Unfurnished'], applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Renovation', name: 'Renovation Status', type: 'enum', tier: 2, values: ['None', 'Recently Renovated', 'Kitchen Renovated', 'Bathroom(s) Renovated', 'Appliances Updated'], applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // Other unit amenities
        { category: 'Unit Features', name: 'Ceiling Fan(s)', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Unit Features', name: 'Corner Unit', type: 'bool', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Unit Features', name: 'Double-pane Windows', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Unit Features', name: 'En-suite Bathroom', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Unit Features', name: 'High Ceilings', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Unit Features', name: 'Large Windows', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Unit Features', name: 'Roll-in Shower', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Unit Features', name: 'Skylight', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Unit Features', name: 'Window Coverings', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // Unit Outdoor
        { category: 'Unit Outdoor', name: 'Balcony', type: 'bool', tier: 1, applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: false, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Unit Outdoor', name: 'Terrace', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Unit Outdoor', name: 'Mezzanine', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: true, vacation: true, short_term: true } },

        // Rooms
        { category: 'Rooms', name: 'Attic', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: false, apt_mid_high: false, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: false, vacation: true, short_term: false } },
        { category: 'Rooms', name: 'Basement', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: false, apt_mid_high: false, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: false, vacation: true, short_term: false } },
        { category: 'Rooms', name: 'Dining Area / Room', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Rooms', name: 'Family Room / Living Room', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Rooms', name: 'Laundry Room', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Rooms', name: 'Office / Library', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Rooms', name: 'Pantry / Mud Room / Breakfast Nook', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: false, corporate: false, vacation: true, short_term: false } },
        { category: 'Rooms', name: 'Recreation Room / Sun Room / Solarium', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: false, corporate: false, vacation: true, short_term: true } },
        { category: 'Rooms', name: 'Work Space / Workshop', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: false, apt_mid_high: false, other_res: true, office: false, retail: false, industrial: true, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: false, student: true, corporate: false, vacation: false, short_term: false } },

        // Unit Security
        { category: 'Unit Security', name: 'Alarm System', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Unit Security', name: 'Keyless Suites', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // Unit Storage
        { category: 'Unit Storage', name: 'In-Suite Storage', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: false, short_term: false } },
        { category: 'Unit Storage', name: 'Walk-in Closets', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Unit Storage', name: 'Walk-through Closets', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // Views
        { category: 'Views', name: 'Views', type: 'enum', tier: 2, values: ['None', 'City', 'Courtyard', 'Harbour', 'Lake', 'Mountain', 'Ocean', 'Park', 'River', 'Waterfront'], applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: false, industrial: false, hospitality: true, leisure: true, land_other: true }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },

        // Entertainment / Connectivity
        { category: 'Connectivity', name: 'Cable Ready', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Connectivity', name: 'Internet Ready', type: 'bool', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: false, hospitality: true, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } },
        { category: 'Connectivity', name: 'Satellite Allowed', type: 'bool', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false }, purpose: { standard: true, senior: true, student: true, corporate: true, vacation: true, short_term: true } }
    ],

    // =========================================================================
    // STRUCTURED SECTIONS
    // =========================================================================

    parking: {
        availability: {
            type: 'enum',
            tier: 1,
            values: ['Not specified', 'Yes - included in rent', 'Yes - available on property', 'No parking available'],
            applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true }
        },
        types: [
            { name: 'Underground', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: false, hospitality: false, leisure: false, land_other: false } },
            { name: 'Indoor', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: true, hospitality: false, leisure: false, land_other: false } },
            { name: 'Outdoor / Surface', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true } },
            { name: 'Covered', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false } },
            { name: 'Street (permit)', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true } },
            { name: 'Private Garage', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: false, apt_mid_high: false, other_res: false, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false } },
            { name: 'EV Charging', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false } },
            { name: 'Visitor Parking', tier: 2, applies: { house: false, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: false, hospitality: true, leisure: false, land_other: false } },
            { name: 'Valet', tier: 3, applies: { house: false, townhouse_plex: false, apt_low: false, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false } }
        ],
        perUnit: {
            spotsIncluded: { type: 'number', label: 'Number of spots included', tier: 1 },
            extraCostPerMonth: { type: 'currency', label: 'Extra cost per month ($)', tier: 2 }
        }
    },

    petPolicy: {
        policy: {
            type: 'enum',
            tier: 1,
            values: ['Not specified', 'Yes - pets welcome', 'Yes - case by case', 'No pets allowed'],
            applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }
        },
        petTypes: [
            { name: 'Dog', tier: 1 },
            { name: 'Cat', tier: 1 },
            { name: 'Bird', tier: 3 },
            { name: 'Fish', tier: 3 },
            { name: 'Rabbit / Small animal', tier: 3 },
            { name: 'Reptile', tier: 3 },
            { name: 'Other', tier: 3 }
        ],
        sizeRestriction: {
            type: 'enum',
            tier: 2,
            label: 'Dog Size Restriction',
            values: ['No restriction', 'Extra small only (<10 lbs)', 'Small (up to 25 lbs)', 'Medium (up to 50 lbs)', 'Large (up to 75 lbs)', 'Extra large (75+ lbs)'],
            applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false }
        },
        deposit: { type: 'currency', label: 'Pet deposit ($)', tier: 2 },
        monthlyFee: { type: 'currency', label: 'Monthly pet fee ($)', tier: 3 }
    },

    utilities: {
        // Each utility: enum with 3 values per unit
        items: [
            { name: 'Electricity', tier: 1, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true } },
            { name: 'Gas', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: false, industrial: true, hospitality: true, leisure: false, land_other: false } },
            { name: 'Water', tier: 1, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true } },
            { name: 'Hot Water', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: true, leisure: false, land_other: false } },
            { name: 'Heating', tier: 1, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true } },
            { name: 'Air Conditioning', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: true, hospitality: true, leisure: false, land_other: false } },
            { name: 'Internet', tier: 1, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true } },
            { name: 'Cable / Satellite', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false } },
            { name: 'Phone (landline)', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: false, retail: false, industrial: false, hospitality: false, leisure: false, land_other: false } },
            { name: 'Sewage', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true } },
            { name: 'Garbage Collection', tier: 2, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true } },
            { name: 'Recycling', tier: 3, applies: { house: true, townhouse_plex: true, apt_low: true, apt_mid_high: true, other_res: true, office: true, retail: true, industrial: true, hospitality: true, leisure: true, land_other: true } },
            { name: 'Wi-Fi (building-provided)', tier: 2, applies: { house: false, townhouse_plex: false, apt_low: true, apt_mid_high: true, other_res: false, office: true, retail: true, industrial: false, hospitality: true, leisure: false, land_other: false } }
        ],
        // Each utility has 3 possible values:
        values: ['Not specified', 'Included in rent', 'Tenant pays', 'Not available']
    }
};
```

**IMPORTANT:** The data above is the COMPLETE canonical data. Copy it exactly into `amenities-data.js`. Do not omit any items. Do not invent additional items.

---

## HTML: Amenities Section in tab2-builder.html

Add the amenities section BELOW the existing classification inputs in the left sidebar. Use a clear visual separator (the existing `form-divider` pattern).

### Layout Structure

```html
<!-- After existing metadata section -->
<hr class="form-divider">

<!-- Amenities Header with expand/collapse all -->
<div class="amenities-header">
    <h3 class="form-section-title">Amenities & Attributes</h3>
    <div class="amenities-controls">
        <button type="button" class="btn btn-xs" id="expand-all-amenities">Expand All</button>
        <button type="button" class="btn btn-xs" id="collapse-all-amenities">Collapse All</button>
    </div>
    <span class="amenities-counter" id="amenities-counter">0 selected</span>
</div>

<!-- Context notice: shows when no property type selected -->
<div class="amenities-context-notice" id="amenities-context-notice">
    <span class="text-muted">Select a property type above to see applicable amenities. Currently showing all.</span>
</div>

<!-- === STRUCTURED SECTIONS (Parking, Pets, Utilities) === -->

<!-- Parking Section -->
<div class="amenity-section structured" id="section-parking">
    <button type="button" class="amenity-section-header" data-section="parking">
        <span class="section-icon">🅿️</span>
        <span class="section-name">Parking</span>
        <span class="section-count" id="parking-count"></span>
        <span class="section-chevron">▸</span>
    </button>
    <div class="amenity-section-body" id="body-parking">
        <!-- Parking Availability dropdown -->
        <!-- Parking Types checkboxes (show when availability != "No parking") -->
        <!-- Per-Unit fields (spots, cost) -->
    </div>
</div>

<!-- Pet Policy Section -->
<div class="amenity-section structured" id="section-pets">
    <!-- Similar pattern: policy dropdown → pet types → size restriction → fees -->
</div>

<!-- Utilities Section -->
<div class="amenity-section structured" id="section-utilities">
    <!-- Grid of utilities with 3-way toggles -->
</div>

<!-- === PROPERTY AMENITIES (Building-Level) === -->
<div class="amenity-group-divider">
    <span>Property Amenities</span>
</div>

<!-- One collapsible section per category -->
<!-- Categories: Accessibility, Commercial, Common Areas, Nearby Services, On-Site Services, 
     Outdoor, Recreation, Rooftop, Security, Senior Living, Storage, Furnishings, Smoking, Other -->

<!-- === UNIT AMENITIES === -->
<div class="amenity-group-divider">
    <span>Unit Amenities</span>
</div>

<!-- Categories: Accessibility, Air Conditioning, Appliances, Commercial Unit, 
     Fireplace, Flooring, Heating, Countertops, Furnishings, Renovation,
     Unit Features, Unit Outdoor, Rooms, Unit Security, Unit Storage, Views, Connectivity -->
```

### Category Section Pattern (for both property and unit amenities)

Each category renders as a collapsible section:

```html
<div class="amenity-section" id="section-{category-slug}" data-level="property|unit">
    <button type="button" class="amenity-section-header" data-section="{category-slug}">
        <span class="section-name">{Category Name}</span>
        <span class="section-count">{N selected}</span>
        <span class="section-chevron">▸</span>
    </button>
    <div class="amenity-section-body">
        <!-- Bool amenities: checkboxes -->
        <!-- Enum amenities: dropdowns -->
    </div>
</div>
```

**Bool amenities** render as compact checkboxes:
```html
<label class="amenity-checkbox">
    <input type="checkbox" data-amenity="{name}" data-level="property|unit">
    <span class="amenity-name">{Amenity Name}</span>
    <span class="amenity-tier tier-{1|2|3}"></span>
</label>
```

**Enum amenities** render as dropdowns:
```html
<div class="amenity-enum">
    <label class="form-label-sm">{Amenity Name}</label>
    <select class="form-select-sm" data-amenity="{name}" data-level="property|unit">
        <option value="">{first value, usually "Not specified"}</option>
        <!-- remaining values -->
    </select>
</div>
```

### Structured Section Details

#### Parking
```
[Availability dropdown]
↓ if availability != "No parking" && != "Not specified":
    [Type checkboxes — only show applicable types for selected structure]
    ↓ if any type checked:
        [Spots included: number input]
        [Extra cost per month: number input with $ prefix]
```

#### Pet Policy
```
[Policy dropdown]
↓ if policy starts with "Yes":
    [Pet type checkboxes: Dog, Cat, Bird, Fish, Rabbit, Reptile, Other]
    ↓ if Dog is checked:
        [Size restriction dropdown]
    [Pet deposit: number input with $ prefix]
    [Monthly fee: number input with $ prefix]
```

#### Utilities
Render as a compact grid (2 columns on wider sidebar, 1 on narrow):
```
For each utility:
    [Utility name]  [3-way segmented control: Included | Tenant | N/A]
```

The segmented control is a row of 3 small buttons. Active state uses teal for "Included", gray-600 for "Tenant pays", and a dimmer gray for "N/A". Default state is unselected (no value).

---

## JavaScript: builder.js Additions

### Amenity State Management

Add to the existing `state` object:

```javascript
state.amenities = {
    property: {},    // { 'Elevators': true, 'Gym / Fitness Centre': true, ... }
    unit: {},        // { 'Dishwasher': true, 'Air Conditioning Type': 'Central', ... }
    parking: {
        availability: null,
        types: [],           // ['Underground', 'EV Charging']
        spotsIncluded: null,
        extraCostPerMonth: null
    },
    pets: {
        policy: null,
        types: [],           // ['Dog', 'Cat']
        sizeRestriction: null,
        deposit: null,
        monthlyFee: null
    },
    utilities: {}    // { 'Electricity': 'Included in rent', 'Gas': 'Tenant pays', ... }
};
```

### Key Functions to Add

```javascript
// Determine which structure type key to use for filtering
function getStructureTypeKey() {
    // Maps current state.sector + state.propertyType + state.subtype
    // to one of the 11 applicability keys
    // Returns array of applicable keys (can be multiple if no structure selected)
}

// Render all amenity sections
function renderAmenities() {
    // Called on init and whenever property type selection changes
    // Rebuilds the amenity checkboxes/dropdowns
    // Hides categories that have zero applicable items
    // Updates counters
}

// Update amenity applicability when classification changes
function updateAmenityApplicability() {
    // Called whenever sector, propertyType, subtype changes
    // Hides/shows amenities based on applicability
    // Disables non-applicable items
    // Shows context notice if no structure type selected
}

// Update the output panel with amenity data
function updateAmenityOutput() {
    // Called whenever any amenity value changes
    // Updates the canonical JSON output
    // Updates the visual canonical display
}

// Count selected amenities
function countSelectedAmenities() {
    // Returns total count for the counter badge
}
```

### Extend Existing Output

The canonical JSON output should extend to include amenities. The JSON view becomes:

```json
{
    "sector": "residential",
    "property_type": "apartment_bldg",
    "subtype": "mid_rise",
    "variant": null,
    "unit_type": "apartment",
    "transaction": "rent",
    "metadata": {
        "purpose": "standard",
        "ownership": "rental",
        "community": null
    },
    "amenities": {
        "property": {
            "Elevators": true,
            "Gym / Fitness Centre": true,
            "Laundry Facilities - On-site": true,
            "Buzzer / Call Box / Intercom": true,
            "Furnishing Status": "Furnished",
            "Smoking Policy": "No Smoking",
            "Storage Available": "Yes - included in rent"
        },
        "unit": {
            "Air Conditioning Type": "Central",
            "Dishwasher": true,
            "Fridge / Freezer": true,
            "Stove": true,
            "In-suite Laundry": true,
            "Heating System": "Central / Forced Air",
            "Balcony": true,
            "Walk-in Closets": true,
            "Views": "City"
        },
        "parking": {
            "availability": "Yes - included in rent",
            "types": ["Underground", "EV Charging", "Visitor Parking"],
            "spots_included": 1,
            "extra_cost_per_month": null
        },
        "pet_policy": {
            "policy": "Yes - case by case",
            "types_allowed": ["Dog", "Cat"],
            "dog_size_restriction": "Medium (up to 50 lbs)",
            "deposit": 500,
            "monthly_fee": null
        },
        "utilities": {
            "Electricity": "Included in rent",
            "Gas": "Tenant pays",
            "Water": "Included in rent",
            "Hot Water": "Included in rent",
            "Heating": "Included in rent",
            "Internet": "Tenant pays"
        }
    }
}
```

The Visual view should add an "Amenities" section below the existing dimension badges. Use a compact layout — group by category, show selected items as small teal badges. Empty categories should be hidden.

---

## CSS

### New Styles Needed

Use the existing design system variables. Key new components:

```css
/* Amenities header */
.amenities-header { /* flex row, space between, align center */ }
.amenities-counter { /* small badge, teal background */ }

/* Collapsible section */
.amenity-section { border: 1px solid var(--gray-200); border-radius: var(--radius-md); margin-bottom: 6px; }
.amenity-section.structured { border-color: var(--teal-light); /* slightly different for structured */ }
.amenity-section-header { /* clickable, flex row, padding, hover state */ }
.amenity-section-body { display: none; padding: 8px 12px; }
.amenity-section.open .amenity-section-body { display: block; }
.amenity-section.open .section-chevron { transform: rotate(90deg); }

/* Compact checkbox */
.amenity-checkbox { display: flex; align-items: center; gap: 6px; padding: 3px 0; font-size: 13px; cursor: pointer; }
.amenity-checkbox input[type="checkbox"] { /* small, teal accent */ }
.amenity-checkbox .amenity-name { flex: 1; }

/* Tier indicator (small dot) */
.amenity-tier { width: 6px; height: 6px; border-radius: 50%; }
.amenity-tier.tier-1 { background: var(--teal); }
.amenity-tier.tier-2 { background: var(--gray-400); }
.amenity-tier.tier-3 { background: var(--gray-200); }

/* Small form elements for structured sections */
.form-select-sm { /* smaller select */ }
.form-label-sm { /* smaller label */ }

/* Utility toggle grid */
.utility-grid { display: grid; grid-template-columns: 1fr; gap: 4px; }
.utility-row { display: flex; align-items: center; gap: 8px; }
.utility-name { flex: 1; font-size: 13px; }
.utility-toggle { display: flex; border: 1px solid var(--gray-200); border-radius: var(--radius-sm); overflow: hidden; }
.utility-toggle button { padding: 2px 8px; font-size: 11px; border: none; background: white; cursor: pointer; }
.utility-toggle button.active-included { background: var(--teal-light); color: var(--teal-dark); font-weight: 600; }
.utility-toggle button.active-tenant { background: var(--gray-100); color: var(--gray-700); font-weight: 600; }
.utility-toggle button.active-na { background: var(--gray-50); color: var(--gray-400); }

/* Group dividers between property and unit amenities */
.amenity-group-divider { text-align: center; margin: 12px 0 8px; font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--gray-500); letter-spacing: 0.5px; }
.amenity-group-divider span { background: white; padding: 0 8px; }

/* Non-applicable (hidden when not applicable) */
.amenity-section.not-applicable { display: none; }
.amenity-checkbox.not-applicable { display: none; }
```

---

## Interaction Flow

1. **Page loads:** Amenities section renders with all sections collapsed. Context notice shows "Select a property type to see applicable amenities."

2. **User selects property type:** Amenities re-filter. Non-applicable categories hide entirely. Non-applicable individual amenities within visible categories hide. Context notice updates to show what's being filtered (e.g., "Showing amenities for: Apartment Building (Mid/High Rise)").

3. **User clicks a section header:** Section expands/collapses. Chevron rotates.

4. **User checks a bool amenity:** State updates. Counter increments. Canonical output updates.

5. **User selects an enum value:** State updates. If it's a default/empty value, it's treated as "not set."

6. **Structured sections cascade:** Parking availability → types → per-unit. Pet policy → types → restrictions. Changes to parent hide/show children.

7. **User changes property type after selecting amenities:** Non-applicable amenities become hidden but their VALUES ARE PRESERVED in state. If the user switches back, their selections reappear. This prevents data loss when exploring different property types.

---

## Testing Checklist

1. [ ] Amenities section renders below classification inputs
2. [ ] All categories present for both property and unit amenities
3. [ ] Collapsible sections open/close correctly
4. [ ] Expand All / Collapse All buttons work
5. [ ] Counter updates correctly
6. [ ] Selecting "House" hides Elevator, Rooftop categories, shows Fenced Yard, Private Garage
7. [ ] Selecting "Apartment Building > Mid/High Rise" shows Elevator, Rooftop, Underground Parking
8. [ ] Selecting "Office" shows Commercial category, hides residential-only amenities
9. [ ] Senior Living category only appears when purpose = Senior
10. [ ] Parking cascades correctly: availability → types → per-unit
11. [ ] Pet Policy cascades correctly: policy → types → size (if dog) → fees
12. [ ] Utilities grid renders with 3-way toggles
13. [ ] Canonical JSON includes all amenity selections
14. [ ] Visual canonical view shows selected amenities grouped
15. [ ] Enum amenities show as dropdowns, not checkboxes
16. [ ] Switching property type preserves amenity selections in state
17. [ ] Categories with zero applicable items are hidden entirely
18. [ ] No console errors
19. [ ] Scrolling the sidebar is smooth (not janky with many elements)
20. [ ] Tier dots visible next to each amenity (green, gray, light gray)

---

## Commit

```bash
git add .
git commit -m "Sprint 4.9: Amenities in the Listing Builder

Added full canonical amenities to Tab 2 (Interactive Listing Builder):
- Property amenities: 14 categories, ~100 items
- Unit amenities: 17 categories, ~80 items  
- Parking: structured section (availability → types → per-unit)
- Pet Policy: structured section (policy → types → restrictions → fees)
- Utilities: 13 utilities with included/tenant/NA toggles
- Context-aware filtering based on selected property type
- Canonical JSON output extended with amenities object
- Tier indicators (1/2/3) for each amenity
- Purpose-aware filtering (Senior Living only shows for senior purpose)"
git push origin main
```
