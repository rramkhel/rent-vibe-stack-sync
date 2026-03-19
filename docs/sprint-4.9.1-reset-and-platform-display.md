# Sprint 4.9.1: Reset Button + Platform Amenity Display

**Project:** Property Classification System  
**Purpose:** Two additions to the Listing Builder (Tab 2): a full reset button and amenity display in the platform output cards  
**Depends on:** Sprint 4.9 (amenities in the builder) must be complete first

---

## Addition 1: Reset Button

### What

A "Reset" or "Start Over" button that clears all selections — both classification and amenities — back to the initial empty state.

### Where

Place it in the builder sidebar header area, next to the existing "Build Your Listing" card title. Small, secondary style — not visually dominant. Something like:

```html
<div class="card-header">
    <div class="card-title">Build Your Listing</div>
    <button type="button" class="btn btn-ghost btn-xs" id="builder-reset">Reset</button>
</div>
```

### Behavior

1. Clicking Reset clears **everything**:
   - Classification: sector, property type, subtype, variant, unit type, transaction all → null
   - Metadata: purpose → 'standard', ownership → 'rental', community → null
   - All amenity checkboxes → unchecked
   - All amenity dropdowns → first option (default/not specified)
   - Parking: availability → null, types → [], spots → null, cost → null
   - Pet Policy: policy → null, types → [], size → null, deposit → null, fee → null
   - Utilities: all → unselected (no value)
   - Path selector → back to Unit-First (default)

2. All form elements visually reset (selects back to placeholder, checkboxes unchecked, number inputs cleared)

3. Right-side output resets to initial placeholder state ("Select options to build a listing description...")

4. Amenities counter resets to "0 selected"

5. All amenity sections collapse

6. Context notice reappears: "Select a property type above to see applicable amenities."

7. **No confirmation dialog** — it's a demo tool, not a production form. Just reset immediately.

### Implementation

Add a `resetBuilder()` function in `builder.js`:

```javascript
function resetBuilder() {
    // Reset state
    state = {
        sector: null,
        propertyType: null,
        subtype: null,
        variant: null,
        unitType: null,
        transaction: null,
        purpose: 'standard',
        ownership: 'rental',
        community: null,
        amenities: {
            property: {},
            unit: {},
            parking: { availability: null, types: [], spotsIncluded: null, extraCostPerMonth: null },
            pets: { policy: null, types: [], sizeRestriction: null, deposit: null, monthlyFee: null },
            utilities: {}
        }
    };

    // Reset all form elements
    // ... clear selects, uncheck boxes, clear inputs

    // Reset path to unit-first
    switchPath('unit-first');

    // Re-render amenities (will show "all" since no structure selected)
    renderAmenities();

    // Update output
    updateOutput();
}
```

### CSS

```css
.btn-ghost {
    background: transparent;
    border: 1px solid var(--gray-300);
    color: var(--gray-500);
    font-size: 12px;
    padding: 3px 10px;
    border-radius: var(--radius-sm);
    cursor: pointer;
}
.btn-ghost:hover {
    background: var(--gray-50);
    color: var(--gray-700);
    border-color: var(--gray-400);
}
```

---

## Addition 2: Platform Amenity Display Cards

### What

The right-side output currently shows 4 platform cards (BSTK/RentSync, ILS Network, Spacelist, MLS/Roomies) that demonstrate how the property classification displays per platform. Extend these cards to **also show how the selected amenities would display** on each platform, using the correct roll-up rules.

### The Roll-Up Rules

Each platform displays amenities differently. Some show granular data, some roll up to simplified yes/no filters.

Here are the rules by platform:

---

#### BSTK / RentSync (Enterprise)

**Display strategy:** Full granularity. Shows almost every amenity individually.

- Shows all selected property amenities by canonical name (or BSTK-specific rename where mapped)
- Shows all selected unit amenities by canonical name
- Parking: full structured data (availability + types + per-unit)
- Pets: full structured data (policy + types + size + fees)
- Utilities: per-utility inclusion status
- **Specific renames from spreadsheet:**
  - "Elevators" → "elevator"
  - "Laundry Facilities - On-site" → "laundry facility"
  - "Laundry Facilities - Every Floor" → "laundry room on each floor"
  - "Gym / Fitness Centre" → "exercise room"
- Everything else: shown as-is by canonical name

**Card display pattern:**
```
Property: Elevator, Exercise Room, Laundry Facility, Buzzer / Intercom, ...
Unit: Central A/C, Dishwasher, Fridge, Stove, In-suite Laundry, Balcony, ...
Parking: Included — Underground, EV Charging, Visitor (1 spot)
Pets: Case by case — Dog (≤50 lbs), Cat | Deposit: $500
Utilities: Electricity ✓, Gas (tenant), Water ✓, Heating ✓, Internet (tenant)
```

---

#### ILS Network (Rentals.ca / RentFaster / RentBoard)

**Display strategy:** Roll-ups for filters + expanded detail on listing page. Three sub-platforms with different rules.

**Rentals.ca / TorontoRentals / Louer.ca:**
- Uses specific mapped names where defined in the spreadsheet
- Shows granular detail on listing page
- Roll-ups used for FILTERS only

Key mappings (from spreadsheet — only show these names, not canonical):
| Canonical | Rentals.ca Display |
|---|---|
| Gym / Fitness Centre | Fitness Area |
| Laundry Facilities - On-site | Laundry Facilities |
| Laundry Facilities - Every Floor | Laundry Facilities |
| Social Room / Lounge | Party Room / Movie Room |
| Public Transit nearby | Bus Stop / Highway / Public Transit |
| 24/7 Video Surveillance | Video Surveillance |
| Buzzer / Call Box / Intercom | Buzzer Entry |
| Heated Swimming Pool | Pool - Heated |
| Rooftop Patio | Rooftop Deck |
| BBQ on Balconies | BBQ Area |
| Dog Area / Dog Run | Dog Park (under Nearby) |
| Coffee Shop | Cafe (under Nearby) |
| Convenience Store (on-site) | (under Nearby) |
| Bike Storage | Bike Racks / Bike Room |
| Storage Room | Storage Lockers |

Items with "—" in the Rentals column are NOT shown on Rentals.ca.

**Roll-up rules for Rentals.ca filters:**
- Pool: Yes if ANY of (Heated Pool, Indoor Pool, Outdoor Pool, Hot Tub, Jacuzzi)
- Laundry: "In-suite" if in-suite laundry/washer/dryer; "On-site" if on-site/every floor; "None" otherwise
- Security: shows expanded (individual items)
- Recreation: shows expanded
- Nearby: shows expanded
- Rooftop: "Rooftop Amenities: Yes" if ANY rooftop amenity
- Pet Policy: shows expanded (type + size on listing page)
- Senior Care: shows expanded (only when purpose = Senior)

**RentFaster:**
- More rolled up than Rentals
- Key mappings:
| Canonical | RentFaster Display |
|---|---|
| Bike-friendly / Bicycle Room | Bike Room |
| Gym / Fitness Centre | Fitness Area |
| Laundry Facilities - On-site | Laundry - coin/card/shared |
| Social Room / Lounge | Party/Games Room |
| Public Transit nearby | Bus |
| Library nearby | Public Library |
| Mall(s) nearby | Shopping Center |
| Shopping nearby | Shopping Center |
| Park(s) nearby | Playground/Park |
| Concierge Services | Concierge |
| Beach Access | Lake Access |
| Guest Suites Available | Guest Suite |
| Fenced Yard | Fenced Backyard |
| Keyless Entry | Secure Entry |
| Staff On-site | On-site Management |
| Heated/Indoor/Outdoor Pool → | Swimming Pool (single roll-up) |
| Sports Courts | Sports Complex |

- Roll-ups:
  - Pool → "Swimming Pool: Yes/No" (single item, any pool type)
  - Recreation → "Rec Facilities: Yes/No"
  - Security → rolled up to "Security: Yes/No"
  - Nearby → shows only: Bus, Shopping Center, Public Library, Playground/Park
  - Rooftop → NOT shown
  - Pet Policy → shows yes/no + type + size restriction

**RentBoard / RentCanada:**
- Most rolled up — fewest amenities surfaced
- Key mappings:
| Canonical | RentBoard Display |
|---|---|
| BBQ Area | Barbeque |
| Gym / Fitness Centre | Exercise/Health Facilities |
| Laundry Facilities - On-site/Every Floor | Laundry Facilities |
| Public Transit nearby | Near Bus Stop |
| Hospital(s) nearby | Near Hospital |
| Mall(s)/Shopping nearby | Near Shopping Center |
| Park(s) nearby | Near Park |
| School(s) nearby | Near School |
| Bike Stand nearby | Near Bike Path/Trail |
| Childcare Services | Daycare |
| Patio / Deck | Patio & Deck |
| Video Surveillance/24/7 Video | Security Surveillance |
| Staff On-site | On-site management |
| Smoking Not Allowed | No Smoking Allowed |
| Heated/Indoor/Outdoor Pool | Pool (single item) |

- Roll-ups:
  - Pool → "Pool: Yes/No"
  - Security → "Security: Yes/No"
  - Recreation → "Rec Facilities: Yes/No"
  - Nearby → shows 5-6 items max (Bus Stop, Hospital, Shopping, Park, School, Bike Trail)
  - Rooftop → NOT shown
  - Senior Care → NOT shown
  - Pet Policy → "Pets: Allowed / Not Allowed" (no detail)

---

#### Spacelist (Commercial)

**Display strategy:** Commercial-specific amenities only. Skip residential amenities.

- Only shows when sector = commercial
- Shows: 24/7 Access, Loading Dock, Freight Elevator, Meeting Room, Board Room, etc.
- Parking: availability + types
- No pet policy (commercial)
- Utilities: if applicable

---

#### MLS / Roomies (Inbound Syndication)

**Display strategy:** Shows what we'd RECEIVE from these sources and how we'd map it.

- MLS feeds send limited amenity data (typically: parking yes/no, pets yes/no, laundry, a/c, heating, furnished)
- Show: "Inbound data limited — would receive: Parking, Pets, Laundry, A/C, Heating"
- Note: "Additional amenities would need landlord enrichment"

---

### Implementation

#### Data Structure for Platform Roll-ups

Add to `amenities-data.js`:

```javascript
var PLATFORM_AMENITY_RULES = {

    // Maps canonical amenity names to platform-specific display names
    // null = not shown on this platform
    // string = renamed to this value
    // true = shown with canonical name

    bstk: {
        renames: {
            'Elevators': 'Elevator',
            'Gym / Fitness Centre': 'Exercise Room',
            'Laundry Facilities - On-site': 'Laundry Facility',
            'Laundry Facilities - Every Floor': 'Laundry Room on Each Floor'
        },
        showAll: true  // BSTK shows everything not explicitly hidden
    },

    rentals: {
        renames: {
            'Gym / Fitness Centre': 'Fitness Area',
            'Laundry Facilities - On-site': 'Laundry Facilities',
            'Laundry Facilities - Every Floor': 'Laundry Facilities',
            'Social Room / Lounge': 'Party Room / Movie Room',
            'Public Transit nearby': 'Bus Stop / Highway / Public Transit',
            '24/7 Video Surveillance': 'Video Surveillance',
            'Buzzer / Call Box / Intercom': 'Buzzer Entry',
            'Heated Swimming Pool': 'Pool - Heated',
            'Rooftop Patio': 'Rooftop Deck',
            'Barbecues Allowed on Balconies': 'BBQ Area',
            'Offleash Dog Area / Dog Run': 'Dog Park',
            'Bike Storage': 'Bike Racks / Bike Room',
            'Storage Room': 'Storage Lockers',
            'Smoking Not Allowed': null  // not shown on Rentals
        },
        // Items with explicit null or '—' in Rentals.ca column are hidden
        hidden: [
            'Access for Disabled', 'Elevators', 'Visual / Audio Aids',
            'BBQ Area', 'Bike-friendly / Bicycle Room', 'Business Centre',
            'Recreation Room', 'Yoga / Dance Studio',
            'Beach nearby', 'Bike Stand nearby', 'Cafe(s) nearby',
            'Convenience Store(s) nearby', 'Dog Park(s) nearby',
            'Hospital(s) nearby', 'Library nearby',
            'Medical Service(s) nearby', 'Park(s) nearby',
            'Pharmacy nearby', 'School(s) nearby',
            'Cleaning / Janitor Services', 'Childcare Services',
            'Dry Cleaning Services', 'Snow Removal Services',
            'Package Services', 'Pet Wash Station',
            'Garbage Chute', 'Noise Reduction Walls / Doors', 'Wet Bar',
            'Courtyard', 'Fire Pit', 'Greenhouse', 'Porch',
            'Private Yard', 'Outdoor Space', 'Shared Yard',
            'Basketball Court(s)', 'Billiards / Pool / Snooker', 'Cabana',
            "Children's Play Area", 'Pool Club House',
            'Hot Tub', 'Indoor Swimming Pool', 'Jacuzzi', 'Outdoor Swimming Pool',
            'Playground', 'Sauna', 'Sports Courts / Rooms',
            'Tennis Court(s)', 'Ping Pong / Table Tennis',
            'Racquetball Court', 'Outdoor Play Area',
            'Rooftop BBQ', 'Rooftop Garden', 'Rooftop Lounge', 'Rooftop Terrace',
            '24/7 Security On-site', 'Doorman', 'Keyless Entry',
            'Key Fob Elevators', 'Night Patrol', 'Security On-site',
            'Staff On-site', 'Video Surveillance'
        ],
        rollups: {
            'Pool': { trigger: ['Heated Swimming Pool', 'Indoor Swimming Pool', 'Outdoor Swimming Pool', 'Hot Tub', 'Jacuzzi'], display: 'Pool: Yes' },
            'Rooftop': { trigger: ['Rooftop BBQ', 'Rooftop Garden', 'Rooftop Lounge', 'Rooftop Patio', 'Rooftop Terrace'], display: 'Rooftop Amenities: Yes' },
            'Laundry': { trigger: ['In-suite Laundry', 'Washer In-suite', 'Dryer In-suite'], display: 'Laundry: In-suite', fallback: { trigger: ['Laundry Facilities - On-site', 'Laundry Facilities - Every Floor'], display: 'Laundry: On-site' } }
        }
    },

    rentfaster: {
        renames: {
            'Bike-friendly / Bicycle Room': 'Bike Room',
            'Gym / Fitness Centre': 'Fitness Area',
            'Laundry Facilities - On-site': 'Laundry - coin/card/shared',
            'Laundry Facilities - Every Floor': 'Laundry - coin/card/shared',
            'Social Room / Lounge': 'Party/Games Room',
            'Public Transit nearby': 'Bus',
            'Library nearby': 'Public Library',
            'Mall(s) nearby': 'Shopping Center',
            'Shopping nearby': 'Shopping Center',
            'Park(s) nearby': 'Playground/Park',
            'Concierge Services': 'Concierge',
            'Beach Access': 'Lake Access',
            'Guest Suites Available': 'Guest Suite',
            'Fenced Yard': 'Fenced Backyard',
            'Keyless Entry': 'Secure Entry',
            'Staff On-site': 'On-site Management',
            'Sports Courts / Rooms': 'Sports Complex',
            'Wheelchair Access': 'Roll-in shower/extra wide hallways'
        },
        rollups: {
            'Pool': { trigger: ['Heated Swimming Pool', 'Indoor Swimming Pool', 'Outdoor Swimming Pool'], display: 'Swimming Pool' },
            'Security': { trigger: ['24/7 Security On-site', '24/7 Video Surveillance', 'Buzzer / Call Box / Intercom', 'Doorman', 'Keyless Entry', 'Key Fob Elevators', 'Night Patrol', 'Security On-site', 'Video Surveillance'], display: 'Security' },
            'Recreation': { trigger: ['Basketball Court(s)', 'Billiards / Pool / Snooker', "Children's Play Area", 'Playground', 'Sports Courts / Rooms', 'Tennis Court(s)', 'Ping Pong / Table Tennis', 'Racquetball Court', 'Outdoor Play Area'], display: 'Rec Facilities' }
        },
        // Only these nearby items shown (others hidden)
        nearbyWhitelist: ['Public Transit nearby', 'Mall(s) nearby', 'Shopping nearby', 'Library nearby', 'Park(s) nearby']
    },

    rentboard: {
        renames: {
            'BBQ Area': 'Barbeque',
            'Gym / Fitness Centre': 'Exercise/Health Facilities',
            'Laundry Facilities - On-site': 'Laundry Facilities',
            'Laundry Facilities - Every Floor': 'Laundry Facilities',
            'Public Transit nearby': 'Near Bus Stop',
            'Hospital(s) nearby': 'Near Hospital',
            'Mall(s) nearby': 'Near Shopping Center',
            'Shopping nearby': 'Near Shopping Center',
            'Park(s) nearby': 'Near Park',
            'School(s) nearby': 'Near School',
            'Bike Stand nearby': 'Near Bike Path/Trail',
            'Childcare Services': 'Daycare',
            'Patio / Deck / Sun Deck': 'Patio & Deck',
            '24/7 Video Surveillance': 'Security Surveillance',
            'Video Surveillance': 'Security Surveillance',
            'Staff On-site': 'On-site management',
            'Smoking Not Allowed': 'No Smoking Allowed'
        },
        rollups: {
            'Pool': { trigger: ['Heated Swimming Pool', 'Indoor Swimming Pool', 'Outdoor Swimming Pool', 'Hot Tub', 'Jacuzzi'], display: 'Pool' },
            'Security': { trigger: ['24/7 Security On-site', '24/7 Video Surveillance', 'Buzzer / Call Box / Intercom', 'Doorman', 'Keyless Entry', 'Security On-site', 'Video Surveillance'], display: 'Security' },
            'Recreation': { trigger: ['Basketball Court(s)', 'Billiards / Pool / Snooker', "Children's Play Area", 'Playground', 'Sports Courts / Rooms'], display: 'Rec Facilities' }
        },
        petDisplay: 'simple',  // Only shows "Pets: Allowed / Not Allowed"
        nearbyWhitelist: ['Public Transit nearby', 'Hospital(s) nearby', 'Mall(s) nearby', 'Shopping nearby', 'Park(s) nearby', 'School(s) nearby', 'Bike Stand nearby']
    },

    spacelist: {
        commercialOnly: true,
        // Only shows commercial amenities — residential amenities hidden
        showCategories: ['Commercial', 'Commercial Unit']
    },

    mls: {
        inboundOnly: true,
        limitedFields: ['Parking', 'Pets', 'Laundry', 'A/C', 'Heating', 'Furnished']
    }
};
```

---

### Platform Card Rendering

#### Extend the existing `getPlatformDisplay()` function

Currently this function returns HTML strings for each platform card showing property type display. Add an amenities section to each card.

**Card layout pattern (each platform):**

```
┌─────────────────────────────┐
│ 🏢 BSTK / RentSync          │  ← existing header
├─────────────────────────────┤
│ Property type: Apartment     │  ← existing classification display
│ Filters: Mid-Rise, Rent     │
├─────────────────────────────┤
│ Amenities                    │  ← NEW section (only shows if amenities selected)
│ ┌─────────────────────────┐ │
│ │ 🏢 Building              │ │  ← property-level amenities as tags
│ │ Elevator · Fitness Area  │ │
│ │ Laundry Facility · ...   │ │
│ ├─────────────────────────┤ │
│ │ 🏠 Unit                  │ │  ← unit-level amenities as tags
│ │ Central A/C · Dishwasher │ │
│ │ Fridge · Stove · ...     │ │
│ ├─────────────────────────┤ │
│ │ 🅿️ Parking: Included     │ │  ← structured: parking summary
│ │ Underground · EV · 1 spt │ │
│ ├─────────────────────────┤ │
│ │ 🐾 Pets: Case by case    │ │  ← structured: pet summary
│ │ Dog (≤50 lbs) · Cat      │ │
│ ├─────────────────────────┤ │
│ │ ⚡ Utilities              │ │  ← structured: utilities summary
│ │ ✓ Elec · ✓ Water · ...  │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

#### Display Logic Per Platform

For each platform card, create a function like:

```javascript
function getAmenityDisplayForPlatform(platform, amenityState) {
    // platform: 'bstk' | 'rentals' | 'rentfaster' | 'rentboard' | 'spacelist' | 'mls'
    // amenityState: state.amenities
    
    var rules = PLATFORM_AMENITY_RULES[platform];
    var result = {
        property: [],   // array of display name strings
        unit: [],
        parking: null,  // summary string or null
        pets: null,
        utilities: null,
        rollups: [],    // rolled-up items (e.g., "Pool: Yes", "Security: Yes")
        note: null      // e.g., "Additional amenities would need landlord enrichment"
    };
    
    // 1. Check roll-ups first — if any trigger amenity is selected, show the roll-up
    //    and mark those amenities as "consumed" so they don't also show individually
    
    // 2. For remaining selected property amenities:
    //    - Check if hidden on this platform → skip
    //    - Check if renamed → use renamed value
    //    - Otherwise use canonical name
    //    - Deduplicate (e.g., two amenities that both map to "Laundry Facilities")
    
    // 3. Same for unit amenities
    
    // 4. Format parking, pets, utilities based on platform rules
    
    return result;
}
```

#### Rendering the amenity section in cards

Only render the amenities section if ANY amenities are selected. Use compact tag-style display:

```html
<div class="platform-amenities">
    <div class="platform-amenity-group" data-group="property">
        <span class="amenity-group-label">Building:</span>
        <span class="amenity-tag">Elevator</span>
        <span class="amenity-tag">Fitness Area</span>
        <span class="amenity-tag">Laundry Facility</span>
    </div>
    <div class="platform-amenity-group" data-group="unit">
        <span class="amenity-group-label">Unit:</span>
        <span class="amenity-tag">Central A/C</span>
        <span class="amenity-tag">Dishwasher</span>
    </div>
    <!-- Rollups shown as highlighted tags -->
    <div class="platform-amenity-group" data-group="rollups">
        <span class="amenity-tag rollup">Pool: Yes</span>
        <span class="amenity-tag rollup">Security: Yes</span>
    </div>
    <!-- Parking one-liner -->
    <div class="platform-amenity-structured">
        🅿️ Parking: Included — Underground, EV Charging (1 spot)
    </div>
    <!-- Pets one-liner -->
    <div class="platform-amenity-structured">
        🐾 Pets: Case by case — Dog (≤50 lbs), Cat | Deposit: $500
    </div>
    <!-- Utilities one-liner -->
    <div class="platform-amenity-structured">
        ⚡ Elec ✓ · Gas (tenant) · Water ✓ · Heating ✓ · Internet (tenant)
    </div>
</div>
```

#### Platform-Specific Differences to Show

This is the "aha" — the SAME amenity selections display differently per platform:

**Example: User selects Heated Pool + Indoor Pool + Gym + Laundry On-site + Elevator**

| Platform | Display |
|---|---|
| **BSTK** | Elevator, Exercise Room, Laundry Facility, Heated Swimming Pool, Indoor Swimming Pool |
| **Rentals.ca** | Fitness Area, Laundry Facilities, Pool - Heated, Pool: Yes (filter) |
| **RentFaster** | Fitness Area, Laundry - coin/card/shared, Swimming Pool |
| **RentBoard** | Exercise/Health Facilities, Laundry Facilities, Pool |

Notice: BSTK shows both pool types individually. RentFaster collapses them to one "Swimming Pool." RentBoard just says "Pool." Rentals shows one specific + a filter. Elevator doesn't even show on RentBoard.

**This is exactly the same pattern as the property type platform mapping — and that's the point.**

---

### CSS for Amenity Display in Platform Cards

```css
/* Amenities section in platform cards */
.platform-amenities {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px dashed var(--gray-200);
    font-size: 12px;
}

.platform-amenity-group {
    margin-bottom: 4px;
    line-height: 1.6;
}

.amenity-group-label {
    font-weight: 600;
    color: var(--gray-500);
    font-size: 11px;
    margin-right: 4px;
}

.platform-amenities .amenity-tag {
    display: inline-block;
    padding: 1px 6px;
    background: var(--gray-100);
    border-radius: var(--radius-sm);
    font-size: 11px;
    color: var(--gray-700);
    margin: 1px 2px;
}

.platform-amenities .amenity-tag.rollup {
    background: var(--teal-light);
    color: var(--teal-dark);
    font-weight: 500;
}

.platform-amenity-structured {
    font-size: 11px;
    color: var(--gray-600);
    padding: 2px 0;
}

/* When platform is disabled (e.g., Spacelist for residential) */
.platform-amenities.disabled {
    opacity: 0.4;
    font-style: italic;
}
```

---

## Integration Notes

- The amenity platform display should update live whenever any amenity value changes, same as the classification display does
- Empty groups should be hidden (if no unit amenities selected, don't show the "Unit:" row)
- If zero amenities are selected total, don't show the amenities section in the platform cards at all
- The dashed border separating classification from amenities should only appear when amenities are present
- Rollup tags should be visually distinct (teal background) to highlight the translation happening

---

## Testing Checklist

### Reset Button
1. [ ] Reset button visible in card header
2. [ ] Clicking Reset clears all classification dropdowns
3. [ ] Clicking Reset clears all amenity checkboxes
4. [ ] Clicking Reset clears all enum dropdowns to default
5. [ ] Clicking Reset clears parking, pet, utility structured sections
6. [ ] Clicking Reset collapses all amenity sections
7. [ ] Clicking Reset resets path to Unit-First
8. [ ] Right-side output returns to placeholder state
9. [ ] Counter shows "0 selected"
10. [ ] No console errors on reset

### Platform Amenity Display
11. [ ] BSTK card shows all amenities with full granularity
12. [ ] BSTK card uses correct renamed values (Elevator, Exercise Room, etc.)
13. [ ] Rentals.ca card shows only mapped amenities (hides unmapped ones)
14. [ ] Rentals.ca card applies roll-ups (Pool: Yes, Rooftop Amenities: Yes)
15. [ ] RentFaster card shows rolled-up values (Swimming Pool, Security, Rec Facilities)
16. [ ] RentFaster card only shows whitelisted nearby items
17. [ ] RentBoard card shows most simplified view
18. [ ] RentBoard pet policy shows only "Pets: Allowed / Not Allowed" (no detail)
19. [ ] Spacelist card only shows commercial amenities when sector = commercial
20. [ ] MLS card shows "limited inbound data" message
21. [ ] Same amenity selections produce visibly different output across platforms
22. [ ] Amenity display updates live as selections change
23. [ ] Empty amenity groups hidden in cards
24. [ ] Amenities section only appears in cards when amenities are selected
25. [ ] Rollup tags visually distinct from regular amenity tags
26. [ ] No duplicate entries (e.g., two "Laundry Facilities" on RentBoard)

---

## Commit

```bash
git add .
git commit -m "Sprint 4.9.1: Reset button + platform amenity display

- Reset button clears all classification and amenity selections
- Platform cards now show amenity display per platform:
  - BSTK: full granularity with specific renames
  - Rentals.ca: mapped names + roll-ups (Pool, Rooftop, Laundry)
  - RentFaster: simplified with roll-ups (Swimming Pool, Security, Rec)
  - RentBoard: most simplified (yes/no roll-ups, limited nearby)
  - Spacelist: commercial amenities only
  - MLS: inbound-limited note
- Same amenities display differently per platform (the 'aha')
- Roll-up tags visually highlighted in teal"
git push origin main
```
