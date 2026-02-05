/**
 * Example Data for Property Taxonomy Demo
 * Contains all example scenarios with canonical data and platform mappings
 */

var exampleData = [
    {
        id: 'sarahs-basement',
        title: "🏠 Sarah's Basement",
        scenario: "<strong>Sarah</strong> is renting out the basement of her detached house. She just wants to post and go.",
        canonical: {
            sector: "Residential",
            scope: "Unit",
            structureType: "House",
            structureSubtype: "Detached",
            unitType: "Basement Suite",
            listingType: "For Rent",
            purpose: "Conventional",
            amenities: ["Separate Entrance", "In-unit Laundry", "Parking"]
        },
        platformViews: {
            rentals: {
                display: "Basement · House",
                filters: ["Basement", "Utilities Included"],
                hidden: ["Freehold", "Detached"],
                notes: "✓ Simplified for consumer search. \"Detached\" hidden — renters don't filter by house style.",
                isHidden: false
            },
            bstk: {
                display: "Basement Suite in Detached House",
                filters: ["All fields visible", "Full taxonomy"],
                hidden: [],
                notes: "✓ Full granularity preserved for data integrity.",
                isHidden: false
            },
            spacelist: {
                display: "(Not shown)",
                filters: [],
                hidden: ["Entire listing"],
                notes: "Residential listing hidden on commercial platform.",
                isHidden: true
            },
            woodcabins: {
                display: "(Not shown)",
                filters: [],
                hidden: ["Entire listing"],
                notes: "Not a cabin/vacation property.",
                isHidden: true
            }
        }
    },
    {
        id: 'enterprise-highrise',
        title: "🏢 Enterprise High-Rise",
        scenario: "<strong>Greenfield Properties</strong> manages \"Maple Heights\" — a 150-unit high-rise with studios, 1BR, and 2BR units.",
        canonical: {
            sector: "Residential",
            scope: "Building",
            structureType: "Apartment Building",
            structureSubtype: "High Rise",
            unitTypes: ["Studio", "1 Bedroom", "2 Bedroom"],
            listingType: "For Rent",
            purpose: "Conventional",
            amenities: ["Gym", "Rooftop Terrace", "Concierge", "Underground Parking"]
        },
        platformViews: {
            rentals: {
                display: "Apartment · High Rise",
                filters: ["Apartment", "Gym", "Concierge"],
                hidden: ["Scope: Building", "Unit count"],
                notes: "✓ Each unit syndicates as separate listing. Building amenities attached to all.",
                isHidden: false
            },
            bstk: {
                display: "High Rise Apartment Building (150 units)",
                filters: ["Building-level management", "Unit groups", "Vacancy tracking"],
                hidden: [],
                notes: "✓ Full portfolio view. Units grouped by floor plan. Bulk operations enabled.",
                isHidden: false,
                highlight: true
            },
            spacelist: {
                display: "(Not shown)",
                filters: [],
                hidden: ["Entire listing"],
                notes: "Residential MF — not for commercial platform.",
                isHidden: true
            },
            woodcabins: {
                display: "(Not shown)",
                filters: [],
                hidden: ["Entire listing"],
                notes: "Not vacation property.",
                isHidden: true
            }
        }
    },
    {
        id: 'class-a-office',
        title: "🏬 Class A Office",
        scenario: "<strong>Downtown Tower</strong> has 5,000 sqft of Class A office space available. NNN lease at $45/sqft.",
        canonical: {
            sector: "Commercial",
            scope: "Unit",
            structureType: "Office Building",
            structureSubtype: "Class A",
            unitType: "Office Suite",
            listingType: "For Lease",
            commercialFields: {
                sqft: 5000,
                pricePerSqft: 45,
                leaseType: "NNN"
            }
        },
        platformViews: {
            rentals: {
                display: "(Not shown)",
                filters: [],
                hidden: ["Entire listing"],
                notes: "Commercial listing hidden on residential ILS.",
                isHidden: true
            },
            bstk: {
                display: "Class A Office Suite (5,000 sqft)",
                filters: ["Commercial module", "Lease tracking"],
                hidden: [],
                notes: "✓ Full commercial data if client uses BSTK for mixed portfolio.",
                isHidden: false
            },
            spacelist: {
                display: "Class A Office · 5,000 sqft · $45/sqft NNN",
                filters: ["Office", "Class A", "NNN", "Downtown"],
                hidden: [],
                notes: "✓ Native format. All commercial fields displayed.",
                isHidden: false,
                highlight: true
            },
            woodcabins: {
                display: "(Not shown)",
                filters: [],
                hidden: ["Entire listing"],
                notes: "Commercial — not applicable.",
                isHidden: true
            }
        }
    },
    {
        id: 'aframe-cabin',
        title: "🏕️ A-Frame Cabin",
        scenario: "<strong>Cozy 2BR A-frame cabin</strong> on Lake Muskoka. Available for weekly vacation rentals. Hot tub, private dock.",
        canonical: {
            sector: "Residential",
            scope: "Unit",
            structureType: "Cottage/Cabin",
            structureSubtype: "A-Frame",
            unitType: "Entire Property",
            listingType: "For Rent",
            purpose: "Vacation",
            amenities: ["Lakefront", "Private Dock", "Hot Tub", "Fireplace"]
        },
        platformViews: {
            rentals: {
                display: "House · Vacation Rental",
                filters: ["House", "Short-term"],
                hidden: ["A-Frame", "Cottage/Cabin category"],
                notes: "A-Frame → \"House\" for simplified consumer search. Vacation tag available.",
                isHidden: false
            },
            bstk: {
                display: "A-Frame Cabin (Vacation Rental)",
                filters: ["Full taxonomy", "Purpose: Vacation"],
                hidden: [],
                notes: "✓ Full structure preserved if owner uses enterprise platform.",
                isHidden: false
            },
            spacelist: {
                display: "(Not shown)",
                filters: [],
                hidden: ["Entire listing"],
                notes: "Residential vacation — not commercial.",
                isHidden: true
            },
            woodcabins: {
                display: "A-Frame · Lakefront · Muskoka",
                filters: ["A-Frame", "Lakefront", "Hot Tub", "Dock"],
                hidden: [],
                notes: "✓ <strong>NATIVE DISPLAY!</strong> A-Frame is a primary filter. All cabin-specific amenities highlighted.",
                isHidden: false,
                highlight: true
            }
        }
    },
    {
        id: 'mixed-use',
        title: "🏘️ Mixed-Use Building",
        scenario: "<strong>Mixed-use building</strong> with retail on ground floor, 4 apartments above. Tests multi-sector handling.",
        canonical: {
            sector: "Mixed-Use",
            scope: "Building",
            structureType: "Mixed-Use Building",
            units: [
                { type: "Retail Storefront", sector: "Commercial", sqft: 2000 },
                { type: "2BR Apartment", sector: "Residential", count: 4 }
            ]
        },
        platformViews: {
            rentals: {
                display: "Apartment (×4 units)",
                filters: ["Apartment", "2BR"],
                hidden: ["Retail component", "Mixed-use designation"],
                notes: "Only residential units syndicate. Retail component hidden.",
                isHidden: false
            },
            bstk: {
                display: "Mixed-Use Building (1 Retail + 4 Residential)",
                filters: ["Multi-sector", "Building-level view"],
                hidden: [],
                notes: "✓ <strong>FULL SUPPORT.</strong> Enterprise platforms handle mixed-use natively. Single building record, multiple unit types.",
                isHidden: false,
                highlight: true
            },
            spacelist: {
                display: "Retail · 2,000 sqft",
                filters: ["Retail", "Storefront"],
                hidden: ["Residential units"],
                notes: "Only commercial unit syndicates. Residential hidden.",
                isHidden: false
            },
            woodcabins: {
                display: "(Not shown)",
                filters: [],
                hidden: ["Entire listing"],
                notes: "Not applicable.",
                isHidden: true
            }
        }
    }
];
