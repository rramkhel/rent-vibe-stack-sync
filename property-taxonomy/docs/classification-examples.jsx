import React, { useState } from 'react';

const ClassificationExamples = () => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeView, setActiveView] = useState('canonical');

  const examples = [
    // RENTALS.CA - Small Landlord Examples
    {
      id: 'rentals-1',
      category: 'Rentals.ca',
      categoryColor: 'blue',
      title: 'Basement Suite in House',
      scenario: 'Sarah is renting out the basement of her detached house to help with the mortgage. She just wants to post it and go.',
      canonical: {
        sector: 'Residential',
        scope: 'Unit',
        structureType: 'House',
        structureSubtype: 'Detached',
        unitType: 'Basement Suite',
        listingType: 'For Rent',
        purpose: 'Conventional',
        ownership: 'Freehold',
        amenities: ['Separate Entrance', 'In-unit Laundry', 'Parking (1 spot)', 'Utilities Included']
      },
      platformViews: {
        'Rentals.ca': {
          display: 'Basement · House',
          filters: ['Basement', 'Utilities Included'],
          hidden: ['Freehold', 'Detached'],
          notes: 'Simplified for consumer search. "Detached" not shown - renters care about unit type, not house style.'
        },
        'BSTK': {
          display: 'Basement Suite in Detached House',
          filters: ['All fields visible', 'Full taxonomy'],
          hidden: [],
          notes: 'Full granularity preserved for enterprise data integrity.'
        },
        'Spacelist': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Residential listing hidden on commercial platform.'
        },
        'WoodCabins': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Not a cabin/vacation property - hidden on niche platform.'
        }
      }
    },
    {
      id: 'rentals-2',
      category: 'Rentals.ca',
      categoryColor: 'blue',
      title: 'Room in Shared House',
      scenario: 'Mike has a spare bedroom and bathroom in his townhouse. He wants to rent it to a student.',
      canonical: {
        sector: 'Residential',
        scope: 'Unit',
        structureType: 'Townhouse',
        structureSubtype: 'Row',
        unitType: 'Room (Private)',
        listingType: 'For Rent',
        purpose: 'Student',
        ownership: 'Freehold',
        amenities: ['Shared Kitchen', 'Private Bathroom', 'WiFi Included', 'Near Transit']
      },
      platformViews: {
        'Rentals.ca': {
          display: 'Private Room · Townhouse',
          filters: ['Room', 'Student Housing', 'Near Transit'],
          hidden: ['Row', 'Freehold'],
          notes: 'Shows room type + student tag for filtering.'
        },
        'BSTK': {
          display: 'Private Room in Row Townhouse',
          filters: ['Full taxonomy', 'Purpose: Student'],
          hidden: [],
          notes: 'Full details for property manager tracking.'
        },
        'Spacelist': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Residential - not applicable.'
        },
        'WoodCabins': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Not vacation property.'
        }
      }
    },

    // BSTK/RENTSYNC - Enterprise Examples
    {
      id: 'bstk-1',
      category: 'RentSync/BSTK',
      categoryColor: 'emerald',
      title: 'High-Rise Apartment Portfolio',
      scenario: 'Greenfield Properties manages "Maple Heights" - a 150-unit high-rise with studios, 1BR, and 2BR units. They need to syndicate to multiple ILS platforms.',
      canonical: {
        sector: 'Residential',
        scope: 'Building',
        structureType: 'Apartment Building',
        structureSubtype: 'High Rise',
        unitType: 'Various (Studio, 1BR, 2BR)',
        listingType: 'For Rent',
        purpose: 'Conventional',
        ownership: 'Rental',
        amenities: ['Gym', 'Rooftop Terrace', 'Concierge', 'Underground Parking', 'In-suite Laundry', 'AC']
      },
      platformViews: {
        'Rentals.ca': {
          display: 'Apartment · High Rise',
          filters: ['Apartment', 'Gym', 'Concierge'],
          hidden: ['Scope: Building', 'Unit count'],
          notes: 'Each unit syndicates as separate listing. Building amenities attached to all.'
        },
        'BSTK': {
          display: 'High Rise Apartment Building (150 units)',
          filters: ['Building-level management', 'Unit groups', 'Vacancy tracking'],
          hidden: [],
          notes: 'Full portfolio view. Units grouped by floor plan. Bulk operations enabled.'
        },
        'Spacelist': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Residential MF - not for commercial platform.'
        },
        'WoodCabins': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Not vacation property.'
        }
      }
    },
    {
      id: 'bstk-2',
      category: 'RentSync/BSTK',
      categoryColor: 'emerald',
      title: 'Senior Living Community',
      scenario: 'SilverCrest operates "Oak Gardens" - a townhouse community for 55+ seniors with 45 units across 15 buildings, plus a community center.',
      canonical: {
        sector: 'Residential',
        scope: 'Community',
        structureType: 'Townhouse',
        structureSubtype: 'Row',
        unitType: 'Entire Unit',
        listingType: 'For Rent',
        purpose: 'Senior (55+)',
        ownership: 'Rental',
        amenities: ['Community Center', 'Walking Paths', 'Emergency Pull Cords', 'Wheelchair Accessible', 'On-site Staff']
      },
      platformViews: {
        'Rentals.ca': {
          display: 'Townhouse · Senior Living',
          filters: ['Townhouse', 'Senior Housing', 'Accessible'],
          hidden: ['Community grouping', 'Scope'],
          notes: 'Senior tag enables age-filtered search. Individual units appear as separate listings.'
        },
        'BSTK': {
          display: 'Townhouse Community - Senior (45 units, 15 buildings)',
          filters: ['Community-level operations', 'Building groupings', 'Waitlist management'],
          hidden: [],
          notes: 'Community wrapper preserved. Can manage as single entity or drill into buildings/units.'
        },
        'Spacelist': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Residential.'
        },
        'WoodCabins': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Not vacation.'
        }
      }
    },

    // SPACELIST - Commercial Examples
    {
      id: 'spacelist-1',
      category: 'Spacelist',
      categoryColor: 'orange',
      title: 'Class A Office Space',
      scenario: 'Downtown Tower has 5,000 sqft of Class A office space available on the 12th floor. NNN lease, $45/sqft.',
      canonical: {
        sector: 'Commercial',
        scope: 'Unit',
        structureType: 'Office Building',
        structureSubtype: 'Class A',
        unitType: 'Office Suite',
        listingType: 'For Lease',
        purpose: 'Office',
        ownership: 'Leasehold',
        amenities: ['24/7 Access', 'On-site Security', 'Conference Rooms', 'Fiber Internet', 'Elevator Access'],
        commercialFields: {
          sqft: 5000,
          pricePerSqft: 45,
          leaseType: 'NNN',
          zoning: 'Commercial Office',
          parkingRatio: '3:1000'
        }
      },
      platformViews: {
        'Rentals.ca': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Commercial listing - not shown on residential ILS.'
        },
        'BSTK': {
          display: 'Class A Office Suite (5,000 sqft)',
          filters: ['Commercial module', 'Lease tracking'],
          hidden: [],
          notes: 'Full commercial data if client uses BSTK for mixed portfolio.'
        },
        'Spacelist': {
          display: 'Class A Office · 5,000 sqft · $45/sqft NNN',
          filters: ['Office', 'Class A', 'NNN', 'Downtown'],
          hidden: [],
          notes: 'Native format. All commercial fields displayed. Price per sqft, lease type, parking ratio visible.'
        },
        'WoodCabins': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Commercial - not applicable.'
        }
      }
    },
    {
      id: 'spacelist-2',
      category: 'Spacelist',
      categoryColor: 'orange',
      title: 'Retail Storefront',
      scenario: 'Corner retail unit in a strip mall. 1,200 sqft, high foot traffic area, Gross lease at $3,500/mo.',
      canonical: {
        sector: 'Commercial',
        scope: 'Unit',
        structureType: 'Retail',
        structureSubtype: 'Strip Mall',
        unitType: 'Storefront',
        listingType: 'For Lease',
        purpose: 'Retail',
        ownership: 'Leasehold',
        amenities: ['Street Frontage', 'Display Window', 'Storage Room', 'ADA Accessible', 'Shared Parking'],
        commercialFields: {
          sqft: 1200,
          monthlyRent: 3500,
          leaseType: 'Gross',
          zoning: 'Commercial Retail',
          footTraffic: 'High'
        }
      },
      platformViews: {
        'Rentals.ca': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Commercial.'
        },
        'BSTK': {
          display: 'Retail Storefront in Strip Mall (1,200 sqft)',
          filters: ['Commercial module'],
          hidden: [],
          notes: 'Available if mixed portfolio.'
        },
        'Spacelist': {
          display: 'Retail · Strip Mall · 1,200 sqft · $3,500/mo Gross',
          filters: ['Retail', 'Storefront', 'Gross Lease'],
          hidden: [],
          notes: 'Native display with all commercial metrics.'
        },
        'WoodCabins': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Commercial.'
        }
      }
    },

    // WOODCABINS - Niche Examples
    {
      id: 'woodcabins-1',
      category: 'WoodCabins',
      categoryColor: 'amber',
      title: 'Lakefront A-Frame Cabin',
      scenario: 'Cozy 2BR A-frame cabin on Lake Muskoka. Available for weekly vacation rentals. Hot tub, private dock.',
      canonical: {
        sector: 'Residential',
        scope: 'Unit',
        structureType: 'Cottage/Cabin',
        structureSubtype: 'A-Frame',
        unitType: 'Entire Property',
        listingType: 'For Rent',
        purpose: 'Vacation',
        ownership: 'Freehold',
        amenities: ['Lakefront', 'Private Dock', 'Hot Tub', 'Fireplace', 'BBQ', 'Canoe/Kayak', 'WiFi']
      },
      platformViews: {
        'Rentals.ca': {
          display: 'House · Vacation Rental',
          filters: ['House', 'Short-term'],
          hidden: ['A-Frame', 'Cottage/Cabin category'],
          notes: 'A-Frame maps to "House" for simplified consumer search. Vacation tag available.'
        },
        'BSTK': {
          display: 'A-Frame Cabin (Vacation Rental)',
          filters: ['Full taxonomy', 'Purpose: Vacation'],
          hidden: [],
          notes: 'Full structure preserved if owner uses BSTK.'
        },
        'Spacelist': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Residential vacation - not commercial.'
        },
        'WoodCabins': {
          display: 'A-Frame · Lakefront · Muskoka',
          filters: ['A-Frame', 'Lakefront', 'Hot Tub', 'Dock'],
          hidden: [],
          notes: 'NATIVE DISPLAY. Full niche taxonomy. A-Frame is a primary filter. All cabin-specific amenities highlighted.'
        }
      }
    },
    {
      id: 'woodcabins-2',
      category: 'WoodCabins',
      categoryColor: 'amber',
      title: 'Glamping Yurt',
      scenario: 'Luxury yurt on a private wooded lot. Deck with mountain views. Outdoor shower. Glamping experience.',
      canonical: {
        sector: 'Residential',
        scope: 'Unit',
        structureType: 'Cottage/Cabin',
        structureSubtype: 'Yurt',
        unitType: 'Entire Property',
        listingType: 'For Rent',
        purpose: 'Vacation',
        ownership: 'Freehold',
        amenities: ['Mountain Views', 'Deck', 'Fire Pit', 'Outdoor Shower', 'Off-grid', 'Stargazing']
      },
      platformViews: {
        'Rentals.ca': {
          display: 'House · Vacation Rental',
          filters: ['House', 'Short-term'],
          hidden: ['Yurt', 'Glamping details'],
          notes: 'Yurt → "House" mapping. Loses niche appeal but still searchable as vacation rental.'
        },
        'BSTK': {
          display: 'Yurt (Vacation Rental)',
          filters: ['Full taxonomy'],
          hidden: [],
          notes: 'Full structure data preserved.'
        },
        'Spacelist': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Not commercial.'
        },
        'WoodCabins': {
          display: 'Yurt · Mountain Views · Glamping',
          filters: ['Yurt', 'Off-grid', 'Glamping', 'Fire Pit'],
          hidden: [],
          notes: 'NATIVE DISPLAY. Yurt is first-class category. Glamping amenities featured. This is why niche sites exist.'
        }
      }
    },

    // EDGE CASES
    {
      id: 'edge-1',
      category: 'Edge Case',
      categoryColor: 'purple',
      title: 'Condo Unit For Sale (not rent)',
      scenario: 'Owner selling their 1BR condo in a mid-rise building. Tests: ownership vs structure, For Sale vs For Rent.',
      canonical: {
        sector: 'Residential',
        scope: 'Unit',
        structureType: 'Apartment Building',
        structureSubtype: 'Mid Rise',
        unitType: '1 Bedroom',
        listingType: 'For Sale',
        purpose: 'Conventional',
        ownership: 'Condo',
        amenities: ['Gym', 'Rooftop', 'Locker', 'Parking (1)']
      },
      platformViews: {
        'Rentals.ca': {
          display: '(Not shown OR separate "For Sale" section)',
          filters: [],
          hidden: ['Listing if rental-only platform'],
          notes: 'Depends on platform scope. If rentals-only, hidden. If rentals+sales, shows in For Sale filter.'
        },
        'BSTK': {
          display: 'Condo Unit in Mid Rise (1BR) - For Sale',
          filters: ['Listing Type: Sale', 'Ownership: Condo'],
          hidden: [],
          notes: 'Full data. Condo is ownership attribute, not structure. Mid Rise Apartment is structure.'
        },
        'Spacelist': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Residential sale - not commercial.'
        },
        'WoodCabins': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Not a cabin/vacation property.'
        }
      }
    },
    {
      id: 'edge-2',
      category: 'Edge Case',
      categoryColor: 'purple',
      title: 'Mixed-Use: Retail + Residential Above',
      scenario: 'Building with retail on ground floor, 4 apartments above. Tests: multi-sector handling.',
      canonical: {
        sector: 'Mixed-Use',
        scope: 'Building',
        structureType: 'Mixed-Use Building',
        structureSubtype: 'Retail + Residential',
        unitType: 'Multiple',
        listingType: 'For Rent/Lease',
        purpose: 'Various',
        ownership: 'Freehold',
        units: [
          { type: 'Retail Storefront', sector: 'Commercial', sqft: 2000 },
          { type: '2BR Apartment', sector: 'Residential', count: 4 }
        ]
      },
      platformViews: {
        'Rentals.ca': {
          display: 'Apartment (x4 units)',
          filters: ['Apartment', '2BR'],
          hidden: ['Retail component', 'Mixed-use designation'],
          notes: 'Only residential units syndicate. Retail hidden on residential platform.'
        },
        'BSTK': {
          display: 'Mixed-Use Building (1 Retail + 4 Residential)',
          filters: ['Multi-sector', 'Building-level view'],
          hidden: [],
          notes: 'FULL SUPPORT. BSTK handles mixed-use natively. Single building record, multiple unit types.'
        },
        'Spacelist': {
          display: 'Retail · 2,000 sqft',
          filters: ['Retail', 'Storefront'],
          hidden: ['Residential units'],
          notes: 'Only commercial unit syndicates. Residential hidden.'
        },
        'WoodCabins': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Not applicable.'
        }
      }
    },
    {
      id: 'edge-3',
      category: 'Edge Case',
      categoryColor: 'purple',
      title: 'Future Acquisition: Co-living Platform',
      scenario: 'RentSync acquires "Roonies.ca" - a co-living platform. Tests: extending values for new niche.',
      canonical: {
        sector: 'Residential',
        scope: 'Unit',
        structureType: 'House',
        structureSubtype: 'Detached',
        unitType: 'Room (Shared)',
        listingType: 'For Rent',
        purpose: 'Co-living',
        ownership: 'Rental',
        amenities: ['Shared Kitchen', 'Shared Living Room', 'Community Events', 'Cleaning Service', 'All Bills Included'],
        coLivingFields: {
          housemates: 5,
          sharedSpaces: ['Kitchen', 'Living Room', 'Backyard'],
          communityStyle: 'Young Professionals'
        }
      },
      platformViews: {
        'Rentals.ca': {
          display: 'Room · Shared Housing',
          filters: ['Room', 'Shared', 'Bills Included'],
          hidden: ['Co-living specifics', 'Community style'],
          notes: 'Maps to "Room" listing. Some appeal lost but still discoverable.'
        },
        'BSTK': {
          display: 'Shared Room in Detached House (Co-living)',
          filters: ['Purpose: Co-living', 'Full taxonomy'],
          hidden: [],
          notes: 'Full data preserved. Co-living as Purpose value.'
        },
        'Spacelist': {
          display: '(Not shown)',
          filters: [],
          hidden: ['Entire listing'],
          notes: 'Residential.'
        },
        'Roonies.ca': {
          display: 'Co-living · Young Professionals · 5 Housemates',
          filters: ['Co-living', 'Community Style', 'Housemate Count'],
          hidden: [],
          notes: 'NATIVE DISPLAY for new acquisition. "Co-living" is first-class. Community fields featured.'
        }
      }
    }
  ];

  const categoryColors = {
    'Rentals.ca': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100' },
    'RentSync/BSTK': { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100' },
    'Spacelist': { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100' },
    'WoodCabins': { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100' },
    'Edge Case': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100' }
  };

  const platforms = ['Rentals.ca', 'BSTK', 'Spacelist', 'WoodCabins'];
  const current = examples[selectedExample];
  const colors = categoryColors[current.category];

  return (
    <div className="min-h-screen bg-stone-100 p-6" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-800 mb-1">Classification System Examples</h1>
          <p className="text-stone-500 text-sm">How the canonical "Bible" scales across platforms and use cases</p>
        </div>

        {/* Example Selector - Grouped by Category */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {examples.map((ex, idx) => {
              const c = categoryColors[ex.category];
              const isSelected = idx === selectedExample;
              return (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExample(idx)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                    isSelected 
                      ? `${c.bg} ${c.border} ${c.text} ring-2 ring-offset-1 ring-stone-400` 
                      : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${c.badge}`}></span>
                  {ex.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column - Scenario & Canonical */}
          <div className="col-span-5 space-y-4">
            
            {/* Scenario Card */}
            <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-5`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${colors.badge} ${colors.text}`}>
                  {current.category}
                </span>
                <h2 className="font-semibold text-stone-800">{current.title}</h2>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">{current.scenario}</p>
            </div>

            {/* Canonical Data - The "Bible" */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">Canonical Data</h3>
                  <p className="text-xs text-stone-500">The "Bible" - source of truth</p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <span className="text-stone-400">sector:</span>
                    <span className="ml-2 text-stone-700">{current.canonical.sector}</span>
                  </div>
                  <div>
                    <span className="text-stone-400">scope:</span>
                    <span className="ml-2 text-stone-700">{current.canonical.scope}</span>
                  </div>
                  <div>
                    <span className="text-stone-400">structureType:</span>
                    <span className="ml-2 text-stone-700">{current.canonical.structureType}</span>
                  </div>
                  <div>
                    <span className="text-stone-400">structureSubtype:</span>
                    <span className="ml-2 text-stone-700">{current.canonical.structureSubtype}</span>
                  </div>
                  <div>
                    <span className="text-stone-400">unitType:</span>
                    <span className="ml-2 text-stone-700">{current.canonical.unitType}</span>
                  </div>
                  <div>
                    <span className="text-stone-400">listingType:</span>
                    <span className="ml-2 text-stone-700">{current.canonical.listingType}</span>
                  </div>
                  <div>
                    <span className="text-stone-400">purpose:</span>
                    <span className="ml-2 text-stone-700">{current.canonical.purpose}</span>
                  </div>
                  <div>
                    <span className="text-stone-400">ownership:</span>
                    <span className="ml-2 text-stone-700">{current.canonical.ownership}</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-stone-400">amenities:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {current.canonical.amenities.map((a, i) => (
                      <span key={i} className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-xs">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {current.canonical.commercialFields && (
                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-orange-500 text-xs font-semibold">COMMERCIAL FIELDS</span>
                    <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
                      {Object.entries(current.canonical.commercialFields).map(([k, v]) => (
                        <div key={k}>
                          <span className="text-stone-400">{k}:</span>
                          <span className="ml-1 text-stone-700">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sentence Formula */}
            <div className="bg-stone-800 rounded-xl p-4 text-white">
              <p className="text-xs text-stone-400 mb-2 font-medium">RESOLVES TO</p>
              <p className="text-sm">
                A <span className="text-amber-400">{current.canonical.purpose?.toLowerCase()}</span>{' '}
                <span className="text-blue-400">{current.canonical.listingType?.toLowerCase()}</span>{' '}
                <span className="text-emerald-400">{current.canonical.unitType?.toLowerCase()}</span>{' '}
                in a <span className="text-purple-400">{current.canonical.structureSubtype?.toLowerCase()} {current.canonical.structureType?.toLowerCase()}</span>
              </p>
            </div>
          </div>

          {/* Right Column - Platform Views */}
          <div className="col-span-7">
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="border-b border-stone-100 p-4">
                <h3 className="font-semibold text-stone-800">Platform Mappings</h3>
                <p className="text-xs text-stone-500">How this listing appears on each platform</p>
              </div>

              <div className="divide-y divide-stone-100">
                {Object.entries(current.platformViews).map(([platform, view]) => {
                  const isHidden = view.display === '(Not shown)' || view.display.includes('Not shown');
                  const platformColor = platform === 'Rentals.ca' ? 'blue' 
                    : platform === 'BSTK' ? 'emerald' 
                    : platform === 'Spacelist' ? 'orange' 
                    : platform === 'WoodCabins' ? 'amber'
                    : platform === 'Roonies.ca' ? 'pink'
                    : 'stone';

                  return (
                    <div key={platform} className={`p-4 ${isHidden ? 'opacity-50 bg-stone-50' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-28 flex-shrink-0`}>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold bg-${platformColor}-100 text-${platformColor}-700`}>
                            {platform}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <p className={`font-medium ${isHidden ? 'text-stone-400' : 'text-stone-800'}`}>
                            {view.display}
                          </p>
                          
                          {!isHidden && view.filters.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {view.filters.map((f, i) => (
                                <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs border border-emerald-200">
                                  ✓ {f}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {view.hidden.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {view.hidden.map((h, i) => (
                                <span key={i} className="px-2 py-0.5 bg-stone-100 text-stone-500 rounded text-xs line-through">
                                  {h}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <p className="text-xs text-stone-500 mt-2 italic">{view.notes}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Insight Box */}
            <div className="mt-4 bg-gradient-to-r from-stone-800 to-stone-700 rounded-xl p-5 text-white">
              <p className="text-xs text-stone-400 font-semibold mb-2">KEY INSIGHT</p>
              {current.category === 'Rentals.ca' && (
                <p className="text-sm">Small landlords get <strong>simplified UI</strong> - they pick "Basement" and we infer the rest. Backend still stores full canonical data.</p>
              )}
              {current.category === 'RentSync/BSTK' && (
                <p className="text-sm">Enterprise users get <strong>full granularity</strong> - Community wrappers, unit groups, bulk operations. Same canonical model, different UI surface area.</p>
              )}
              {current.category === 'Spacelist' && (
                <p className="text-sm">Commercial listings use <strong>sector-specific fields</strong> (sqft, NNN lease, zoning) that residential doesn't need. Same dimensional model, extended for commercial.</p>
              )}
              {current.category === 'WoodCabins' && (
                <p className="text-sm">Niche platforms get <strong>first-class treatment</strong> for their categories. "A-Frame" and "Yurt" exist in the Bible - they just map to "House" on generic platforms.</p>
              )}
              {current.category === 'Edge Case' && (
                <p className="text-sm">Edge cases prove the model's <strong>extensibility</strong>. New acquisitions just add values to existing dimensions - no restructuring needed.</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="mt-8 bg-white rounded-xl border border-stone-200 p-6">
          <h3 className="font-semibold text-stone-800 mb-4">Scalability Summary</h3>
          <div className="grid grid-cols-4 gap-6 text-sm">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                <span className="text-blue-700 text-lg">👤</span>
              </div>
              <p className="font-medium text-stone-800">Rentals.ca</p>
              <p className="text-stone-500 text-xs mt-1">Simple wizard UI. We infer canonical from minimal input. Full data in backend.</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-2">
                <span className="text-emerald-700 text-lg">🏢</span>
              </div>
              <p className="font-medium text-stone-800">BSTK/RentSync</p>
              <p className="text-stone-500 text-xs mt-1">Full taxonomy exposed. Portfolio management. Community groupings preserved.</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-2">
                <span className="text-orange-700 text-lg">🏬</span>
              </div>
              <p className="font-medium text-stone-800">Spacelist</p>
              <p className="text-stone-500 text-xs mt-1">Commercial sector with extended fields. Same dimensional model, different values.</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-2">
                <span className="text-amber-700 text-lg">🏕️</span>
              </div>
              <p className="font-medium text-stone-800">Niche Sites</p>
              <p className="text-stone-500 text-xs mt-1">Add values, not dimensions. Yurt exists in Bible → first-class on niche, "House" on generic.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassificationExamples;
