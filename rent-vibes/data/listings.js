/**
 * RentVibes.ca - Mock Listings Database
 *
 * This file contains the mock listing data that can be easily expanded.
 * Each listing has features that are used to match with quiz answers.
 *
 * To add new listings:
 * 1. Add a new object to the LISTINGS array
 * 2. Include relevant features from FEATURE_TAGS for vibe matching
 * 3. Use real-ish addresses for authenticity
 */

// Feature tags that can be used for vibe matching
const FEATURE_TAGS = {
  // Neighborhood vibes
  URBAN: 'urban',
  TRENDY: 'trendy',
  QUIET: 'quiet',
  ARTSY: 'artsy area',
  VILLAGE: 'village feel',
  FOODIE: 'foodie heaven',

  // Building characteristics
  MODERN: 'modern',
  HISTORIC: 'historic',
  INDUSTRIAL: 'industrial',
  VINTAGE: 'vintage charm',
  LUXURY: 'luxury',
  AFFORDABLE: 'affordable',

  // Amenities & features
  EXPOSED_BRICK: 'exposed brick',
  HIGH_CEILINGS: 'high ceilings',
  LAKE_VIEW: 'lake view',
  NEAR_PARK: 'near park',
  NEAR_NIGHTLIFE: 'near nightlife',
  TRANSIT_HUB: 'transit hub',
  GYM: 'gym',
  ROOFTOP: 'rooftop access',

  // Lifestyle
  WALKABLE: 'walkable',
  COMMUNITY: 'community',
  PROFESSIONAL: 'professional',
  STUDENT_FRIENDLY: 'student-friendly',
  FAMILY_FRIENDLY: 'family-friendly'
};

// Main listings database - easily expandable
const LISTINGS = [
  {
    id: 1,
    price: 2100,
    type: 'Apartment',
    address: '456 Queen Street West, Toronto',
    beds: 1,
    baths: 1,
    sqft: 650,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    features: ['exposed brick', 'near nightlife', 'coffee shops', 'urban'],
    neighborhood: 'Queen West'
  },
  {
    id: 2,
    price: 2400,
    type: 'Condo',
    address: '88 Harbour Street, Toronto',
    beds: 2,
    baths: 1,
    sqft: 850,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    features: ['lake view', 'gym', 'modern', 'quiet floors'],
    neighborhood: 'Harbourfront'
  },
  {
    id: 3,
    price: 1850,
    type: 'Apartment',
    address: '221 Ossington Avenue, Toronto',
    beds: 1,
    baths: 1,
    sqft: 580,
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=300&fit=crop',
    features: ['artsy area', 'vintage charm', 'hardwood', 'indie vibes'],
    neighborhood: 'Ossington'
  },
  {
    id: 4,
    price: 2800,
    type: 'Townhouse',
    address: '15 Sumach Street, Toronto',
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    features: ['private entrance', 'patio', 'quiet street', 'near park'],
    neighborhood: 'Corktown'
  },
  {
    id: 5,
    price: 1650,
    type: 'Studio',
    address: '372 College Street, Toronto',
    beds: 0,
    baths: 1,
    sqft: 420,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    features: ['minimalist', 'walkable', 'efficient', 'student-friendly'],
    neighborhood: 'Little Italy'
  },
  {
    id: 6,
    price: 2950,
    type: 'Loft',
    address: '55 Mill Street, Distillery District',
    beds: 1,
    baths: 1,
    sqft: 900,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
    features: ['high ceilings', 'industrial', 'creative space', 'historic'],
    neighborhood: 'Distillery'
  },
  {
    id: 7,
    price: 2200,
    type: 'Apartment',
    address: '180 Broadview Avenue, Toronto',
    beds: 2,
    baths: 1,
    sqft: 780,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop',
    features: ['sunrise views', 'near ravine', 'family-friendly', 'quiet'],
    neighborhood: 'Riverdale'
  },
  {
    id: 8,
    price: 1900,
    type: 'Apartment',
    address: '95 Bloor Street East, Toronto',
    beds: 1,
    baths: 1,
    sqft: 600,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    features: ['central location', 'transit hub', 'shopping', 'busy'],
    neighborhood: 'Yorkville'
  },
  {
    id: 9,
    price: 3200,
    type: 'Penthouse',
    address: '33 Bay Street, Toronto',
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&h=300&fit=crop',
    features: ['panoramic views', 'luxury', 'rooftop access', 'prestige'],
    neighborhood: 'Financial District'
  },
  {
    id: 10,
    price: 1750,
    type: 'Basement',
    address: '412 Danforth Avenue, Toronto',
    beds: 1,
    baths: 1,
    sqft: 550,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop',
    features: ['separate entrance', 'cozy', 'greektown', 'affordable'],
    neighborhood: 'The Danforth'
  },
  {
    id: 11,
    price: 2600,
    type: 'Apartment',
    address: '77 Wellesley Street, Toronto',
    beds: 2,
    baths: 1,
    sqft: 820,
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=400&h=300&fit=crop',
    features: ['central', 'modern amenities', 'concierge', 'professional'],
    neighborhood: 'Church-Wellesley'
  },
  {
    id: 12,
    price: 2050,
    type: 'Apartment',
    address: '288 Roncesvalles Avenue, Toronto',
    beds: 1,
    baths: 1,
    sqft: 680,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop',
    features: ['village feel', 'local shops', 'near high park', 'community'],
    neighborhood: 'Roncesvalles'
  },
  {
    id: 13,
    price: 1550,
    type: 'Bachelor',
    address: '505 Dundas Street West, Toronto',
    beds: 0,
    baths: 1,
    sqft: 380,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop',
    features: ['chinatown', 'foodie heaven', 'compact', 'character'],
    neighborhood: 'Chinatown'
  },
  {
    id: 14,
    price: 2750,
    type: 'Apartment',
    address: '25 The Esplanade, Toronto',
    beds: 2,
    baths: 2,
    sqft: 950,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop',
    features: ['st lawrence market', 'heritage', 'walkable', 'urban village'],
    neighborhood: 'St. Lawrence'
  },
  {
    id: 15,
    price: 1950,
    type: 'Apartment',
    address: '1001 Queen Street East, Toronto',
    beds: 1,
    baths: 1,
    sqft: 620,
    image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=400&h=300&fit=crop',
    features: ['leslieville', 'brunch spots', 'trendy', 'young professionals'],
    neighborhood: 'Leslieville'
  },
  // Add more listings here easily!
  {
    id: 16,
    price: 2300,
    type: 'Apartment',
    address: '150 Liberty Street, Toronto',
    beds: 1,
    baths: 1,
    sqft: 720,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    features: ['liberty village', 'dog-friendly', 'modern', 'young professionals'],
    neighborhood: 'Liberty Village'
  },
  {
    id: 17,
    price: 1800,
    type: 'Apartment',
    address: '890 Bathurst Street, Toronto',
    beds: 1,
    baths: 1,
    sqft: 560,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop',
    features: ['koreatown', 'late-night eats', 'walkable', 'urban'],
    neighborhood: 'Koreatown'
  },
  {
    id: 18,
    price: 2650,
    type: 'Condo',
    address: '12 York Street, Toronto',
    beds: 1,
    baths: 1,
    sqft: 680,
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&h=300&fit=crop',
    features: ['entertainment district', 'nightlife', 'luxury', 'transit hub'],
    neighborhood: 'Entertainment District'
  },
  {
    id: 19,
    price: 2150,
    type: 'Apartment',
    address: '45 Annette Street, Toronto',
    beds: 2,
    baths: 1,
    sqft: 850,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop',
    features: ['junction', 'artsy area', 'craft breweries', 'community'],
    neighborhood: 'The Junction'
  },
  {
    id: 20,
    price: 3500,
    type: 'Townhouse',
    address: '200 Spadina Road, Toronto',
    beds: 3,
    baths: 2,
    sqft: 1400,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    features: ['forest hill', 'prestigious', 'family-friendly', 'near park'],
    neighborhood: 'Forest Hill'
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LISTINGS, FEATURE_TAGS };
}
