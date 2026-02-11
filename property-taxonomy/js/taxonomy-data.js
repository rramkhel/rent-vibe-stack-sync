/**
 * Taxonomy Data Model v4.2
 * Canonical data for the 6-dimension property classification system
 *
 * This file will be populated in Sprint 4.3 (Tab 2: Listing Builder)
 */

const TAXONOMY = {
    version: '4.2',
    dimensions: 6,

    // Dimension 1: Sector
    sectors: [],

    // Dimension 2: Property Type
    propertyTypes: [],

    // Dimension 3: Subtype
    subtypes: {},

    // Dimension 4: Variant
    variants: {},

    // Dimension 5: Unit Type
    unitTypes: [],

    // Dimension 6: Transaction Type
    transactionTypes: []
};

// Export for use in builder
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TAXONOMY;
}
