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

/**
 * Platform-Specific Amenity Display Rules
 * Maps canonical amenity names to platform-specific display names and roll-ups
 */
var PLATFORM_AMENITY_RULES = {

    // BSTK / RentSync — Full granularity, shows almost everything
    bstk: {
        renames: {
            'Elevators': 'Elevator',
            'Gym / Fitness Centre': 'Exercise Room',
            'Laundry Facilities - On-site': 'Laundry Facility',
            'Laundry Facilities - Every Floor': 'Laundry Room on Each Floor'
        },
        showAll: true
    },

    // Rentals.ca / TorontoRentals / Louer.ca — Mapped names + roll-ups for filters
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
            'Storage Room': 'Storage Lockers'
        },
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
            'Pool': {
                trigger: ['Heated Swimming Pool', 'Indoor Swimming Pool', 'Outdoor Swimming Pool', 'Hot Tub', 'Jacuzzi'],
                display: 'Pool: Yes'
            },
            'Rooftop': {
                trigger: ['Rooftop BBQ', 'Rooftop Garden', 'Rooftop Lounge', 'Rooftop Patio', 'Rooftop Terrace'],
                display: 'Rooftop Amenities: Yes'
            }
        }
    },

    // RentFaster — More rolled up than Rentals
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
            'Pool': {
                trigger: ['Heated Swimming Pool', 'Indoor Swimming Pool', 'Outdoor Swimming Pool'],
                display: 'Swimming Pool'
            },
            'Security': {
                trigger: ['24/7 Security On-site', '24/7 Video Surveillance', 'Buzzer / Call Box / Intercom', 'Doorman', 'Keyless Entry', 'Key Fob Elevators', 'Night Patrol', 'Security On-site', 'Video Surveillance'],
                display: 'Security'
            },
            'Recreation': {
                trigger: ['Basketball Court(s)', 'Billiards / Pool / Snooker', "Children's Play Area", 'Playground', 'Sports Courts / Rooms', 'Tennis Court(s)', 'Ping Pong / Table Tennis', 'Racquetball Court', 'Outdoor Play Area'],
                display: 'Rec Facilities'
            }
        },
        nearbyWhitelist: ['Public Transit nearby', 'Mall(s) nearby', 'Shopping nearby', 'Library nearby', 'Park(s) nearby']
    },

    // RentBoard / RentCanada — Most simplified
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
            'Staff On-site': 'On-site management'
        },
        rollups: {
            'Pool': {
                trigger: ['Heated Swimming Pool', 'Indoor Swimming Pool', 'Outdoor Swimming Pool', 'Hot Tub', 'Jacuzzi'],
                display: 'Pool'
            },
            'Security': {
                trigger: ['24/7 Security On-site', '24/7 Video Surveillance', 'Buzzer / Call Box / Intercom', 'Doorman', 'Keyless Entry', 'Security On-site', 'Video Surveillance'],
                display: 'Security'
            },
            'Recreation': {
                trigger: ['Basketball Court(s)', 'Billiards / Pool / Snooker', "Children's Play Area", 'Playground', 'Sports Courts / Rooms'],
                display: 'Rec Facilities'
            }
        },
        petDisplay: 'simple',
        nearbyWhitelist: ['Public Transit nearby', 'Hospital(s) nearby', 'Mall(s) nearby', 'Shopping nearby', 'Park(s) nearby', 'School(s) nearby', 'Bike Stand nearby']
    },

    // Spacelist — Commercial only
    spacelist: {
        commercialOnly: true,
        showCategories: ['Commercial', 'Commercial Unit']
    },

    // MLS — Inbound syndication, limited fields
    mls: {
        inboundOnly: true,
        limitedFields: ['Parking', 'Pets', 'Laundry', 'A/C', 'Heating', 'Furnished']
    }
};
