/* ==========================================
   MOCK DATA
   Static data for the prototype
   ========================================== */

const MOCK_ADDRESSES = [
  { street: '123 Main Street', city: 'Toronto', province: 'ON', postal: 'M5V 2T6' },
  { street: '456 Queen Street West', city: 'Toronto', province: 'ON', postal: 'M5V 2A9' },
  { street: '789 King Street East', city: 'Toronto', province: 'ON', postal: 'M5A 1M4' },
  { street: '321 Yonge Street', city: 'Toronto', province: 'ON', postal: 'M5B 1R8' },
  { street: '555 Bloor Street West', city: 'Toronto', province: 'ON', postal: 'M5S 1Y6' },
  { street: '100 Front Street West', city: 'Toronto', province: 'ON', postal: 'M5J 1E3' },
  { street: '200 University Avenue', city: 'Toronto', province: 'ON', postal: 'M5H 3C6' },
  { street: '42 College Street', city: 'Toronto', province: 'ON', postal: 'M5G 1K2' },
  { street: '88 Harbord Street', city: 'Toronto', province: 'ON', postal: 'M5S 1G5' },
  { street: '150 Dundas Street West', city: 'Toronto', province: 'ON', postal: 'M5G 1C6' },
];

const PROPERTY_TYPES = {
  house: {
    label: 'House',
    icon: 'home',
    description: 'Detached house'
  },
  townhouse: {
    label: 'Townhouse',
    icon: 'warehouse',
    description: 'Adjacent homes split side-by-side or upper/lower'
  },
  apartment: {
    label: 'Apartment',
    icon: 'building',
    description: 'Single unit in a multi-unit building owned by a company'
  },
  condo: {
    label: 'Condo',
    icon: 'building-2',
    description: 'Single unit in a building owned by a landlord'
  },
  room: {
    label: 'Room',
    icon: 'door-open',
    description: 'Single room or unit in a building'
  },
  other: {
    label: 'Other',
    icon: 'layout-grid',
    description: 'Other units for rent'
  },
};

const PROPERTY_SUBTYPES = {
  house: [
    { value: 'single-family', label: 'Single Family House', description: 'Detached, single-family home' },
    { value: 'main-floor', label: 'Main Floor', description: 'Main floor of a house' },
    { value: 'basement', label: 'Basement', description: 'Basement suite in a house' },
  ],
  townhouse: [
    { value: 'townhouse', label: 'Townhouse', description: 'Multiple units sharing 1+ side walls with neighbours' },
    { value: 'duplex', label: 'Duplex', description: '2 units split upper/lower floors or side-to-side' },
    { value: 'triplex', label: 'Triplex', description: '3 units split upper/lower floors or side-to-side' },
    { value: 'multiplex', label: 'Multiplex', description: '4+ units split upper/lower floors or side-to-side' },
  ],
  apartment: [
    { value: 'studio', label: 'Studio', description: 'Combined living and sleeping space' },
    { value: 'loft', label: 'Loft', description: 'Open-concept with elevated space' },
  ],
  condo: [
    { value: 'studio', label: 'Studio', description: 'Combined living and sleeping space' },
    { value: 'loft', label: 'Loft', description: 'Open-concept with elevated space' },
  ],
  room: [
    { value: 'bedroom', label: 'Bedroom', description: 'Single bedroom with shared common areas' },
    { value: 'office', label: 'Office', description: 'Office space for rent' },
  ],
  other: [
    { value: 'parking-stall', label: 'Parking Stall', description: 'Parking space for rent' },
  ],
};

const BEDROOM_OPTIONS = [
  { value: 'studio', label: 'Studio' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5+', label: '5+' },
];

const BATHROOM_OPTIONS = [
  { value: '1', label: '1' },
  { value: '1.5', label: '1.5' },
  { value: '2', label: '2' },
  { value: '2.5', label: '2.5' },
  { value: '3', label: '3' },
  { value: '3+', label: '3+' },
];

const FURNISHED_OPTIONS = [
  { value: 'unfurnished', label: 'Unfurnished' },
  { value: 'partially', label: 'Partially Furnished' },
  { value: 'fully', label: 'Fully Furnished' },
];

const LAUNDRY_OPTIONS = [
  { value: 'in-unit', label: 'In-unit' },
  { value: 'in-building', label: 'In building' },
  { value: 'none', label: 'None' },
];

const PARKING_OPTIONS = [
  { value: 'underground', label: 'Underground' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'covered', label: 'Covered' },
  { value: 'surface', label: 'Surface' },
  { value: 'garage', label: 'Garage' },
  { value: 'none', label: 'No Parking' },
];

const UTILITIES = [
  { id: 'electricity', label: 'Electricity/Power', icon: 'zap' },
  { id: 'gas', label: 'Gas', icon: 'flame' },
  { id: 'water', label: 'Water', icon: 'droplet' },
  { id: 'heat', label: 'Heat', icon: 'thermometer' },
  { id: 'internet', label: 'Internet', icon: 'wifi' },
  { id: 'ac', label: 'Air Conditioning', icon: 'snowflake' },
];

const UNIT_AMENITIES = [
  'In-unit Laundry',
  'Air Conditioning',
  'Dishwasher',
  'Updated Kitchen',
  'Stainless Appliances',
  'Hardwood Floors',
  'Walk-in Closet',
  'Balcony/Patio',
  'Fireplace',
  'Storage',
];

const BUILDING_AMENITIES = [
  'Gym/Fitness',
  'Pool',
  'Rooftop Terrace',
  'Concierge',
  'Elevator',
  'Party Room',
  'Bike Storage',
  'Package Lockers',
  'Security',
  'Visitor Parking',
];

const AREA_HIGHLIGHTS = [
  'Near Transit',
  'Shopping Nearby',
  'Restaurants',
  'Parks',
  'Schools',
  'Quiet Street',
  'Waterfront',
  'Downtown',
];

const LEASE_TERMS = [
  { value: 'month-to-month', label: 'Month-to-month' },
  { value: '6-months', label: '6 months minimum' },
  { value: '1-year', label: '1 year minimum' },
];

// AI-generated description templates
const AI_DESCRIPTION_TEMPLATES = [
  "Welcome to this stunning {bedrooms}-bedroom, {bathrooms}-bathroom {propertyType} with modern finishes throughout. This move-in ready space offers the perfect blend of comfort and style, with natural light flooding through the spacious living areas. Located in a desirable neighborhood with easy access to public transit, shopping, and dining. Don't miss this opportunity to make this beautiful space your new home!",
  "Discover this beautifully maintained {bedrooms}-bedroom {propertyType} in the heart of {city}. Featuring {amenity1} and {amenity2}, this home offers everything you need for comfortable urban living. The open-concept layout creates a welcoming atmosphere, perfect for both relaxing and entertaining. Schedule a viewing today!",
  "This charming {bedrooms}-bedroom {propertyType} is ready for its next resident! Enjoy {amenity1}, {amenity2}, and convenient access to local amenities. The bright, airy spaces and thoughtful layout make this an ideal choice for anyone seeking quality living in {city}.",
];

// Mock market data for pricing suggestions
const MARKET_DATA = {
  'Toronto': {
    'studio': { min: 1600, max: 2100 },
    '1': { min: 1900, max: 2500 },
    '2': { min: 2400, max: 3200 },
    '3': { min: 2900, max: 4000 },
    '4': { min: 3500, max: 5000 },
    '5+': { min: 4200, max: 6500 },
  },
  'default': {
    'studio': { min: 1200, max: 1600 },
    '1': { min: 1400, max: 1900 },
    '2': { min: 1800, max: 2400 },
    '3': { min: 2200, max: 3000 },
    '4': { min: 2800, max: 3800 },
    '5+': { min: 3400, max: 4500 },
  }
};

console.log('mock-data.js loaded');
