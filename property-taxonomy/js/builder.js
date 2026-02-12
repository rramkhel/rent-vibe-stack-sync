/**
 * Interactive Listing Builder
 * Handles path switching, cascading dropdowns, and live output updates
 */

(function() {
    'use strict';

    // Current state
    let currentPath = 'unit-first';
    let state = {
        sector: null,
        propertyType: null,
        subtype: null,
        variant: null,
        unitType: null,
        transaction: null,
        purpose: 'standard',
        ownership: 'rental',
        community: null,
        // Amenities state
        amenities: {
            property: {},  // { 'Elevators': true, 'Furnishing Status': 'Furnished', ... }
            unit: {},      // { 'Dishwasher': true, 'Air Conditioning Type': 'Central', ... }
            parking: {
                availability: null,
                types: [],
                spotsIncluded: null,
                extraCostPerMonth: null
            },
            pets: {
                policy: null,
                types: [],
                sizeRestriction: null,
                deposit: null,
                monthlyFee: null
            },
            utilities: {}  // { 'Electricity': 'Included in rent', 'Gas': 'Tenant pays', ... }
        }
    };

    // DOM elements cache
    let elements = {};

    function initBuilder() {
        cacheElements();
        bindEvents();
        initAmenities();
        updateOutput();
    }

    function cacheElements() {
        elements = {
            // Path buttons
            pathUnitFirst: document.getElementById('path-unit-first'),
            pathStructureFirst: document.getElementById('path-structure-first'),

            // Input containers
            unitFirstInputs: document.getElementById('unit-first-inputs'),
            structureFirstInputs: document.getElementById('structure-first-inputs'),

            // Unit-first inputs
            ufUnitType: document.getElementById('uf-unit-type'),
            ufBuildingToggleGroup: document.getElementById('uf-building-toggle-group'),
            ufKnowBuilding: document.getElementById('uf-know-building'),
            ufBuildingDetails: document.getElementById('uf-building-details'),
            ufPropertyType: document.getElementById('uf-property-type'),
            ufSubtypeGroup: document.getElementById('uf-subtype-group'),
            ufSubtype: document.getElementById('uf-subtype'),
            ufVariantGroup: document.getElementById('uf-variant-group'),
            ufVariant: document.getElementById('uf-variant'),

            // Structure-first inputs
            sfSector: document.getElementById('sf-sector'),
            sfPropertyTypeGroup: document.getElementById('sf-property-type-group'),
            sfPropertyType: document.getElementById('sf-property-type'),
            sfSubtypeGroup: document.getElementById('sf-subtype-group'),
            sfSubtype: document.getElementById('sf-subtype'),
            sfVariantGroup: document.getElementById('sf-variant-group'),
            sfVariant: document.getElementById('sf-variant'),
            sfUnitTypeGroup: document.getElementById('sf-unit-type-group'),
            sfUnitType: document.getElementById('sf-unit-type'),

            // Common inputs
            transaction: document.getElementById('transaction'),
            purpose: document.getElementById('purpose'),
            ownership: document.getElementById('ownership'),
            communityToggle: document.getElementById('community-toggle'),
            communityNameGroup: document.getElementById('community-name-group'),
            communityName: document.getElementById('community-name'),

            // Output elements
            sentenceText: document.getElementById('sentence-text'),
            sentenceMeta: document.getElementById('sentence-meta'),
            canonicalVisual: document.getElementById('canonical-visual'),
            canonicalJson: document.getElementById('canonical-json'),
            jsonOutput: document.getElementById('json-output'),

            // Canonical visual values
            cvSector: document.getElementById('cv-sector'),
            cvPropertyType: document.getElementById('cv-property-type'),
            cvSubtype: document.getElementById('cv-subtype'),
            cvVariant: document.getElementById('cv-variant'),
            cvUnitType: document.getElementById('cv-unit-type'),
            cvTransaction: document.getElementById('cv-transaction'),
            cvPurpose: document.getElementById('cv-purpose'),
            cvOwnership: document.getElementById('cv-ownership'),
            cvCommunity: document.getElementById('cv-community'),

            // Platform outputs
            platformBstk: document.getElementById('platform-bstk'),
            platformIls: document.getElementById('platform-ils'),
            platformSpacelist: document.getElementById('platform-spacelist'),
            platformMls: document.getElementById('platform-mls'),

            // View toggle
            viewToggleBtns: document.querySelectorAll('.view-toggle-btn'),

            // Amenities elements
            amenitiesCounter: document.getElementById('amenities-counter'),
            amenitiesContextNotice: document.getElementById('amenities-context-notice'),
            expandAllAmenities: document.getElementById('expand-all-amenities'),
            collapseAllAmenities: document.getElementById('collapse-all-amenities'),
            propertyAmenitiesContainer: document.getElementById('property-amenities-container'),
            unitAmenitiesContainer: document.getElementById('unit-amenities-container'),
            // Parking
            parkingAvailability: document.getElementById('parking-availability'),
            parkingTypesContainer: document.getElementById('parking-types'),
            parkingTypesGrid: document.getElementById('parking-types-grid'),
            parkingPerUnit: document.getElementById('parking-per-unit'),
            parkingSpots: document.getElementById('parking-spots'),
            parkingCost: document.getElementById('parking-cost'),
            // Pets
            petPolicy: document.getElementById('pet-policy'),
            petTypesContainer: document.getElementById('pet-types'),
            petTypesGrid: document.getElementById('pet-types-grid'),
            petRestrictions: document.getElementById('pet-restrictions'),
            dogSize: document.getElementById('dog-size'),
            petFees: document.getElementById('pet-fees'),
            petDeposit: document.getElementById('pet-deposit'),
            petMonthly: document.getElementById('pet-monthly'),
            // Utilities
            utilitiesGrid: document.getElementById('utilities-grid')
        };
    }

    function bindEvents() {
        // Path switching
        if (elements.pathUnitFirst) {
            elements.pathUnitFirst.addEventListener('click', () => switchPath('unit-first'));
        }
        if (elements.pathStructureFirst) {
            elements.pathStructureFirst.addEventListener('click', () => switchPath('structure-first'));
        }

        // Unit-first inputs
        if (elements.ufUnitType) {
            elements.ufUnitType.addEventListener('change', onUfUnitTypeChange);
        }
        if (elements.ufKnowBuilding) {
            elements.ufKnowBuilding.addEventListener('change', onUfKnowBuildingChange);
        }
        if (elements.ufPropertyType) {
            elements.ufPropertyType.addEventListener('change', onUfPropertyTypeChange);
        }
        if (elements.ufSubtype) {
            elements.ufSubtype.addEventListener('change', onUfSubtypeChange);
        }
        if (elements.ufVariant) {
            elements.ufVariant.addEventListener('change', () => {
                state.variant = elements.ufVariant.value || null;
                updateOutput();
            });
        }

        // Structure-first inputs
        if (elements.sfSector) {
            elements.sfSector.addEventListener('change', onSfSectorChange);
        }
        if (elements.sfPropertyType) {
            elements.sfPropertyType.addEventListener('change', onSfPropertyTypeChange);
        }
        if (elements.sfSubtype) {
            elements.sfSubtype.addEventListener('change', onSfSubtypeChange);
        }
        if (elements.sfVariant) {
            elements.sfVariant.addEventListener('change', () => {
                state.variant = elements.sfVariant.value || null;
                updateOutput();
            });
        }
        if (elements.sfUnitType) {
            elements.sfUnitType.addEventListener('change', () => {
                state.unitType = elements.sfUnitType.value || null;
                updateOutput();
            });
        }

        // Common inputs
        if (elements.transaction) {
            elements.transaction.addEventListener('change', () => {
                state.transaction = elements.transaction.value || null;
                updateOutput();
            });
        }
        if (elements.purpose) {
            elements.purpose.addEventListener('change', () => {
                state.purpose = elements.purpose.value || 'standard';
                updateOutput();
                updateAmenitiesApplicability();
            });
        }
        if (elements.ownership) {
            elements.ownership.addEventListener('change', () => {
                state.ownership = elements.ownership.value || 'rental';
                updateOutput();
            });
        }
        if (elements.communityToggle) {
            elements.communityToggle.addEventListener('change', onCommunityToggleChange);
        }
        if (elements.communityName) {
            elements.communityName.addEventListener('input', () => {
                state.community = elements.communityName.value || null;
                updateOutput();
            });
        }

        // View toggle
        elements.viewToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.viewToggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const view = btn.dataset.view;
                if (view === 'visual') {
                    elements.canonicalVisual.style.display = 'block';
                    elements.canonicalJson.style.display = 'none';
                } else {
                    elements.canonicalVisual.style.display = 'none';
                    elements.canonicalJson.style.display = 'block';
                }
            });
        });

        // Amenities expand/collapse all
        if (elements.expandAllAmenities) {
            elements.expandAllAmenities.addEventListener('click', () => expandAllAmenitySections(true));
        }
        if (elements.collapseAllAmenities) {
            elements.collapseAllAmenities.addEventListener('click', () => expandAllAmenitySections(false));
        }

        // Amenity section headers (toggle open/close)
        document.querySelectorAll('.amenity-section-header').forEach(header => {
            header.addEventListener('click', () => {
                const section = header.closest('.amenity-section');
                section.classList.toggle('open');
            });
        });

        // Parking events
        if (elements.parkingAvailability) {
            elements.parkingAvailability.addEventListener('change', onParkingAvailabilityChange);
        }
        if (elements.parkingSpots) {
            elements.parkingSpots.addEventListener('input', onParkingInputChange);
        }
        if (elements.parkingCost) {
            elements.parkingCost.addEventListener('input', onParkingInputChange);
        }

        // Pet events
        if (elements.petPolicy) {
            elements.petPolicy.addEventListener('change', onPetPolicyChange);
        }
        if (elements.dogSize) {
            elements.dogSize.addEventListener('change', () => {
                state.amenities.pets.sizeRestriction = elements.dogSize.value || null;
                updateAmenitiesCounter();
                updateCanonicalJson();
                updatePlatformDisplay();
            });
        }
        if (elements.petDeposit) {
            elements.petDeposit.addEventListener('input', onPetInputChange);
        }
        if (elements.petMonthly) {
            elements.petMonthly.addEventListener('input', onPetInputChange);
        }

        // Reset button
        const resetBtn = document.getElementById('builder-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetBuilder);
        }
    }

    function switchPath(path) {
        currentPath = path;

        // Update button states
        elements.pathUnitFirst.classList.toggle('active', path === 'unit-first');
        elements.pathStructureFirst.classList.toggle('active', path === 'structure-first');

        // Show/hide input containers
        elements.unitFirstInputs.style.display = path === 'unit-first' ? 'block' : 'none';
        elements.structureFirstInputs.style.display = path === 'structure-first' ? 'block' : 'none';

        // Reset state
        resetState();
        resetInputs();
        updateOutput();
    }

    function resetState() {
        state.sector = null;
        state.propertyType = null;
        state.subtype = null;
        state.variant = null;
        state.unitType = null;
        // Keep transaction, purpose, ownership, community
    }

    function resetInputs() {
        if (currentPath === 'unit-first') {
            elements.ufUnitType.value = '';
            elements.ufBuildingToggleGroup.style.display = 'none';
            elements.ufKnowBuilding.checked = false;
            elements.ufBuildingDetails.style.display = 'none';
            elements.ufPropertyType.innerHTML = '<option value="">Select property type...</option>';
            elements.ufSubtypeGroup.style.display = 'none';
            elements.ufVariantGroup.style.display = 'none';
        } else {
            elements.sfSector.value = '';
            elements.sfPropertyTypeGroup.style.display = 'none';
            elements.sfSubtypeGroup.style.display = 'none';
            elements.sfVariantGroup.style.display = 'none';
            elements.sfUnitTypeGroup.style.display = 'none';
        }
    }

    function resetBuilder() {
        // Reset full state including amenities
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

        // Reset classification form elements
        elements.transaction.value = '';
        elements.purpose.value = 'standard';
        elements.ownership.value = 'rental';
        elements.communityToggle.checked = false;
        elements.communityNameGroup.style.display = 'none';
        elements.communityName.value = '';

        // Reset unit-first inputs
        elements.ufUnitType.value = '';
        elements.ufBuildingToggleGroup.style.display = 'none';
        elements.ufKnowBuilding.checked = false;
        elements.ufBuildingDetails.style.display = 'none';
        elements.ufPropertyType.innerHTML = '<option value="">Select property type...</option>';
        elements.ufSubtypeGroup.style.display = 'none';
        elements.ufVariantGroup.style.display = 'none';

        // Reset structure-first inputs
        elements.sfSector.value = '';
        elements.sfPropertyTypeGroup.style.display = 'none';
        elements.sfSubtypeGroup.style.display = 'none';
        elements.sfVariantGroup.style.display = 'none';
        elements.sfUnitTypeGroup.style.display = 'none';

        // Reset parking section
        if (elements.parkingAvailability) elements.parkingAvailability.value = '';
        if (elements.parkingTypesContainer) elements.parkingTypesContainer.classList.add('hidden');
        if (elements.parkingPerUnit) elements.parkingPerUnit.classList.add('hidden');
        if (elements.parkingSpots) elements.parkingSpots.value = '';
        if (elements.parkingCost) elements.parkingCost.value = '';
        if (elements.parkingTypesGrid) {
            elements.parkingTypesGrid.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        }

        // Reset pet section
        if (elements.petPolicy) elements.petPolicy.value = '';
        if (elements.petTypesContainer) elements.petTypesContainer.classList.add('hidden');
        if (elements.petRestrictions) elements.petRestrictions.classList.add('hidden');
        if (elements.petFees) elements.petFees.classList.add('hidden');
        if (elements.dogSize) elements.dogSize.value = '';
        if (elements.petDeposit) elements.petDeposit.value = '';
        if (elements.petMonthly) elements.petMonthly.value = '';
        if (elements.petTypesGrid) {
            elements.petTypesGrid.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        }

        // Reset utilities
        if (elements.utilitiesGrid) {
            elements.utilitiesGrid.querySelectorAll('.utility-toggle button').forEach(btn => {
                btn.classList.remove('active-included', 'active-tenant', 'active-na');
            });
        }

        // Reset all amenity checkboxes and enums
        if (elements.propertyAmenitiesContainer) {
            elements.propertyAmenitiesContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            elements.propertyAmenitiesContainer.querySelectorAll('select').forEach(sel => sel.selectedIndex = 0);
        }
        if (elements.unitAmenitiesContainer) {
            elements.unitAmenitiesContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            elements.unitAmenitiesContainer.querySelectorAll('select').forEach(sel => sel.selectedIndex = 0);
        }

        // Collapse all amenity sections
        expandAllAmenitySections(false);

        // Switch to unit-first path (default)
        currentPath = 'unit-first';
        elements.pathUnitFirst.classList.add('active');
        elements.pathStructureFirst.classList.remove('active');
        elements.unitFirstInputs.style.display = 'block';
        elements.structureFirstInputs.style.display = 'none';

        // Update all outputs
        updateAmenitiesCounter();
        updateAmenitiesApplicability();
        updateOutput();
    }

    // Unit-First Handlers
    function onUfUnitTypeChange() {
        const unitType = elements.ufUnitType.value;
        state.unitType = unitType || null;

        if (unitType && SELF_SUFFICIENT[unitType]) {
            state.sector = SELF_SUFFICIENT[unitType].sector;
            elements.ufBuildingToggleGroup.style.display = 'block';

            // If building checkbox is checked, populate property types
            if (elements.ufKnowBuilding.checked) {
                populateUfPropertyTypes();
            }
        } else {
            state.sector = null;
            elements.ufBuildingToggleGroup.style.display = 'none';
            elements.ufBuildingDetails.style.display = 'none';
        }

        // Reset building details
        state.propertyType = null;
        state.subtype = null;
        state.variant = null;

        updateOutput();
    }

    function onUfKnowBuildingChange() {
        if (elements.ufKnowBuilding.checked) {
            elements.ufBuildingDetails.style.display = 'block';
            populateUfPropertyTypes();
        } else {
            elements.ufBuildingDetails.style.display = 'none';
            state.propertyType = null;
            state.subtype = null;
            state.variant = null;
            updateOutput();
        }
    }

    function populateUfPropertyTypes() {
        const sector = state.sector;
        if (!sector || !TAXONOMY[sector]) return;

        const types = TAXONOMY[sector].types;
        let html = '<option value="">Select property type...</option>';
        for (const [key, type] of Object.entries(types)) {
            html += `<option value="${key}">${type.label}</option>`;
        }
        elements.ufPropertyType.innerHTML = html;
        elements.ufSubtypeGroup.style.display = 'none';
        elements.ufVariantGroup.style.display = 'none';
    }

    function onUfPropertyTypeChange() {
        const propertyType = elements.ufPropertyType.value;
        state.propertyType = propertyType || null;
        state.subtype = null;
        state.variant = null;

        if (propertyType && TAXONOMY[state.sector]?.types[propertyType]) {
            const subtypes = TAXONOMY[state.sector].types[propertyType].subtypes;
            let html = '<option value="">Select subtype...</option>';
            for (const [key, subtype] of Object.entries(subtypes)) {
                html += `<option value="${key}">${subtype.label}</option>`;
            }
            elements.ufSubtype.innerHTML = html;
            elements.ufSubtypeGroup.style.display = 'block';
        } else {
            elements.ufSubtypeGroup.style.display = 'none';
        }
        elements.ufVariantGroup.style.display = 'none';

        updateOutput();
    }

    function onUfSubtypeChange() {
        const subtype = elements.ufSubtype.value;
        state.subtype = subtype || null;
        state.variant = null;

        if (subtype && state.propertyType) {
            const subtypeData = TAXONOMY[state.sector]?.types[state.propertyType]?.subtypes[subtype];
            if (subtypeData && subtypeData.variants.length > 0) {
                let html = '<option value="">None</option>';
                subtypeData.variants.forEach(v => {
                    html += `<option value="${v}">${VARIANT_LABELS[v] || v}</option>`;
                });
                elements.ufVariant.innerHTML = html;
                elements.ufVariantGroup.style.display = 'block';
            } else {
                elements.ufVariantGroup.style.display = 'none';
            }
        } else {
            elements.ufVariantGroup.style.display = 'none';
        }

        updateOutput();
    }

    // Structure-First Handlers
    function onSfSectorChange() {
        const sector = elements.sfSector.value;
        state.sector = sector || null;
        state.propertyType = null;
        state.subtype = null;
        state.variant = null;
        state.unitType = null;

        if (sector && TAXONOMY[sector]) {
            const types = TAXONOMY[sector].types;
            let html = '<option value="">Select property type...</option>';
            for (const [key, type] of Object.entries(types)) {
                html += `<option value="${key}">${type.label}</option>`;
            }
            elements.sfPropertyType.innerHTML = html;
            elements.sfPropertyTypeGroup.style.display = 'block';
        } else {
            elements.sfPropertyTypeGroup.style.display = 'none';
        }

        elements.sfSubtypeGroup.style.display = 'none';
        elements.sfVariantGroup.style.display = 'none';
        elements.sfUnitTypeGroup.style.display = 'none';

        updateOutput();
    }

    function onSfPropertyTypeChange() {
        const propertyType = elements.sfPropertyType.value;
        state.propertyType = propertyType || null;
        state.subtype = null;
        state.variant = null;
        state.unitType = null;

        if (propertyType && TAXONOMY[state.sector]?.types[propertyType]) {
            const subtypes = TAXONOMY[state.sector].types[propertyType].subtypes;
            let html = '<option value="">Select subtype...</option>';
            for (const [key, subtype] of Object.entries(subtypes)) {
                html += `<option value="${key}">${subtype.label}</option>`;
            }
            elements.sfSubtype.innerHTML = html;
            elements.sfSubtypeGroup.style.display = 'block';
        } else {
            elements.sfSubtypeGroup.style.display = 'none';
        }

        elements.sfVariantGroup.style.display = 'none';
        elements.sfUnitTypeGroup.style.display = 'none';

        updateOutput();
    }

    function onSfSubtypeChange() {
        const subtype = elements.sfSubtype.value;
        state.subtype = subtype || null;
        state.variant = null;
        state.unitType = null;

        if (subtype && state.propertyType) {
            const subtypeData = TAXONOMY[state.sector]?.types[state.propertyType]?.subtypes[subtype];

            // Variants
            if (subtypeData && subtypeData.variants.length > 0) {
                let html = '<option value="">None</option>';
                subtypeData.variants.forEach(v => {
                    html += `<option value="${v}">${VARIANT_LABELS[v] || v}</option>`;
                });
                elements.sfVariant.innerHTML = html;
                elements.sfVariantGroup.style.display = 'block';
            } else {
                elements.sfVariantGroup.style.display = 'none';
            }

            // Unit types
            if (subtypeData && subtypeData.unitTypes.length > 0) {
                let html = '<option value="">Select unit type...</option>';
                subtypeData.unitTypes.forEach(u => {
                    html += `<option value="${u}">${UNIT_LABELS[u] || u}</option>`;
                });
                elements.sfUnitType.innerHTML = html;
                elements.sfUnitTypeGroup.style.display = 'block';
            } else {
                elements.sfUnitTypeGroup.style.display = 'none';
            }
        } else {
            elements.sfVariantGroup.style.display = 'none';
            elements.sfUnitTypeGroup.style.display = 'none';
        }

        updateOutput();
    }

    // Community toggle
    function onCommunityToggleChange() {
        if (elements.communityToggle.checked) {
            elements.communityNameGroup.style.display = 'block';
        } else {
            elements.communityNameGroup.style.display = 'none';
            state.community = null;
            elements.communityName.value = '';
        }
        updateOutput();
    }

    // Output update
    function updateOutput() {
        updateSentence();
        updateCanonicalVisual();
        updateCanonicalJson();
        updatePlatformDisplay();
        updateAmenitiesApplicability();
    }

    function updateSentence() {
        if (!state.unitType || !state.transaction) {
            elements.sentenceText.innerHTML = '<span class="text-muted">Select a unit type and transaction to see your listing...</span>';
            elements.sentenceMeta.innerHTML = '';
            return;
        }

        let sentence = buildSentence();
        elements.sentenceText.innerHTML = sentence;

        // Meta line
        let meta = [];
        if (state.sector) meta.push(capitalize(state.sector));
        if (state.ownership && state.ownership !== 'rental') meta.push(OWNERSHIP_VALUES[state.ownership]);
        if (state.purpose && state.purpose !== 'standard') meta.push(PURPOSE_VALUES[state.purpose]);
        elements.sentenceMeta.innerHTML = meta.join(' · ');
    }

    function buildSentence() {
        const unitLabel = UNIT_LABELS[state.unitType] || state.unitType;
        const variantLabel = state.variant ? (VARIANT_LABELS[state.variant] || state.variant) : null;
        const transLabel = TRANSACTION_TYPES[state.transaction] || state.transaction;

        if (currentPath === 'unit-first') {
            // Unit-first: just show unit type (and variant if present)
            if (variantLabel) {
                return `<span class="dim dim-variant">${variantLabel}</span> <span class="dim dim-unit">${unitLabel}</span> for <span class="dim dim-transaction">${transLabel.toLowerCase()}</span>`;
            } else {
                return `<span class="dim dim-unit">${unitLabel}</span> for <span class="dim dim-transaction">${transLabel.toLowerCase()}</span>`;
            }
        } else {
            // Structure-first
            const subtypeLabel = state.subtype ? getSubtypeLabel(state.sector, state.propertyType, state.subtype) : null;
            const propTypeLabel = state.propertyType ? getPropertyTypeLabel(state.sector, state.propertyType) : null;

            if (state.unitType === 'entire') {
                // Hide unit type, show subtype/variant
                if (variantLabel) {
                    return `<span class="dim dim-variant">${variantLabel}</span> for <span class="dim dim-transaction">${transLabel.toLowerCase()}</span>`;
                } else if (subtypeLabel) {
                    // Check if subtype alone is clear (like "Townhouse")
                    const clearSubtypes = ['townhouse', 'duplex', 'triplex', 'fourplex', 'multiplex', 'semi', 'warehouse', 'hotel', 'motel'];
                    if (clearSubtypes.includes(state.subtype)) {
                        return `<span class="dim dim-subtype">${subtypeLabel}</span> for <span class="dim dim-transaction">${transLabel.toLowerCase()}</span>`;
                    } else {
                        return `<span class="dim dim-subtype">${subtypeLabel}</span> <span class="dim dim-structure">${propTypeLabel || ''}</span> for <span class="dim dim-transaction">${transLabel.toLowerCase()}</span>`;
                    }
                }
            } else {
                // Show unit type in/at subtype
                if (subtypeLabel) {
                    return `<span class="dim dim-unit">${unitLabel}</span> in <span class="dim dim-subtype">${subtypeLabel}</span> for <span class="dim dim-transaction">${transLabel.toLowerCase()}</span>`;
                } else {
                    return `<span class="dim dim-unit">${unitLabel}</span> for <span class="dim dim-transaction">${transLabel.toLowerCase()}</span>`;
                }
            }
        }

        return `<span class="dim dim-unit">${unitLabel}</span> for <span class="dim dim-transaction">${transLabel.toLowerCase()}</span>`;
    }

    function updateCanonicalVisual() {
        updateVisualValue(elements.cvSector, state.sector, capitalize);
        updateVisualValue(elements.cvPropertyType, state.propertyType);
        updateVisualValue(elements.cvSubtype, state.subtype);
        updateVisualValue(elements.cvVariant, state.variant);
        updateVisualValue(elements.cvUnitType, state.unitType);
        updateVisualValue(elements.cvTransaction, state.transaction);
        updateVisualValue(elements.cvPurpose, state.purpose);
        updateVisualValue(elements.cvOwnership, state.ownership);
        updateVisualValue(elements.cvCommunity, state.community);
    }

    function updateVisualValue(el, value, transform) {
        if (!el) return;
        if (value) {
            el.textContent = transform ? transform(value) : value;
            el.classList.remove('null');
        } else {
            el.textContent = 'null';
            el.classList.add('null');
        }
    }

    function updateCanonicalJson() {
        // Build amenities object only if there are selections
        let amenities = null;
        const hasPropertyAmenities = Object.keys(state.amenities.property).length > 0;
        const hasUnitAmenities = Object.keys(state.amenities.unit).length > 0;
        const hasParking = state.amenities.parking.availability || state.amenities.parking.types.length > 0;
        const hasPets = state.amenities.pets.policy || state.amenities.pets.types.length > 0;
        const hasUtilities = Object.keys(state.amenities.utilities).length > 0;

        if (hasPropertyAmenities || hasUnitAmenities || hasParking || hasPets || hasUtilities) {
            amenities = {};

            if (hasPropertyAmenities) {
                amenities.property = { ...state.amenities.property };
            }
            if (hasUnitAmenities) {
                amenities.unit = { ...state.amenities.unit };
            }
            if (hasParking) {
                amenities.parking = {
                    availability: state.amenities.parking.availability,
                    types: state.amenities.parking.types.length > 0 ? [...state.amenities.parking.types] : undefined,
                    spots_included: state.amenities.parking.spotsIncluded,
                    extra_cost_per_month: state.amenities.parking.extraCostPerMonth
                };
                // Clean undefined values
                Object.keys(amenities.parking).forEach(k => {
                    if (amenities.parking[k] === undefined || amenities.parking[k] === null) {
                        delete amenities.parking[k];
                    }
                });
            }
            if (hasPets) {
                amenities.pet_policy = {
                    policy: state.amenities.pets.policy,
                    types_allowed: state.amenities.pets.types.length > 0 ? [...state.amenities.pets.types] : undefined,
                    dog_size_restriction: state.amenities.pets.sizeRestriction,
                    deposit: state.amenities.pets.deposit,
                    monthly_fee: state.amenities.pets.monthlyFee
                };
                // Clean undefined values
                Object.keys(amenities.pet_policy).forEach(k => {
                    if (amenities.pet_policy[k] === undefined || amenities.pet_policy[k] === null) {
                        delete amenities.pet_policy[k];
                    }
                });
            }
            if (hasUtilities) {
                amenities.utilities = { ...state.amenities.utilities };
            }
        }

        const json = {
            sector: state.sector,
            property_type: state.propertyType,
            subtype: state.subtype,
            variant: state.variant,
            unit_type: state.unitType,
            transaction: state.transaction,
            metadata: {
                purpose: state.purpose,
                ownership: state.ownership,
                community: state.community
            }
        };

        if (amenities) {
            json.amenities = amenities;
        }

        elements.jsonOutput.textContent = JSON.stringify(json, null, 2);
    }

    function updatePlatformDisplay() {
        if (!state.unitType || !state.transaction) {
            const placeholder = '<span class="text-muted">Select a listing type to see output</span>';
            elements.platformBstk.innerHTML = placeholder;
            elements.platformIls.innerHTML = placeholder;
            elements.platformSpacelist.innerHTML = placeholder;
            elements.platformMls.innerHTML = placeholder;
            return;
        }

        const display = getPlatformDisplay();
        elements.platformBstk.innerHTML = display.bstk;
        elements.platformIls.innerHTML = display.ils;
        elements.platformSpacelist.innerHTML = display.spacelist;
        elements.platformMls.innerHTML = display.mls;
    }

    function getPlatformDisplay() {
        const unitLabel = UNIT_LABELS[state.unitType] || capitalize(state.unitType);
        const variantLabel = state.variant ? (VARIANT_LABELS[state.variant] || capitalize(state.variant)) : null;
        const subtypeLabel = state.subtype ? getSubtypeLabel(state.sector, state.propertyType, state.subtype) : null;
        const propTypeLabel = state.propertyType ? getPropertyTypeLabel(state.sector, state.propertyType) : null;
        const transLabel = TRANSACTION_TYPES[state.transaction] || capitalize(state.transaction);
        const purposeLabel = state.purpose !== 'standard' ? PURPOSE_VALUES[state.purpose] : null;
        const isResidential = state.sector === 'residential';
        const isCommercial = state.sector === 'commercial' || state.sector === 'recreation' || state.sector === 'other';

        let bstk = '', ils = '', spacelist = '', mls = '';

        // Community wrapper
        const communityPrefix = state.community ? `<div class="platform-note" style="margin-bottom: 4px;">Community: ${state.community}</div>` : '';

        // BSTK / RentSync
        if (propTypeLabel && subtypeLabel) {
            bstk = `${propTypeLabel} — ${subtypeLabel}`;
            if (variantLabel) bstk += ` (${variantLabel})`;
        } else if (propTypeLabel) {
            bstk = propTypeLabel;
        } else {
            bstk = unitLabel;
        }
        bstk = communityPrefix + bstk;

        // ILS (Rentals.ca / RentFaster)
        if (isResidential) {
            if (propTypeLabel) {
                ils = `Property Type: ${propTypeLabel}`;
            } else {
                ils = `Property Type: ${unitLabel}`;
            }
            if (variantLabel) {
                ils += `<div class="platform-note">Apt Type: "${variantLabel}"</div>`;
            }
            if (purposeLabel) {
                ils += `<div class="platform-note">+ ${purposeLabel} Housing filter</div>`;
            }
            ils = communityPrefix + ils;
        } else {
            ils = '<span class="platform-note">Not displayed (commercial)</span>';
        }

        // Spacelist
        if (isCommercial) {
            if (propTypeLabel && subtypeLabel) {
                spacelist = `${propTypeLabel} — ${subtypeLabel}`;
            } else if (propTypeLabel) {
                spacelist = propTypeLabel;
            } else {
                spacelist = unitLabel;
            }
            spacelist += `<div class="platform-note">${transLabel} — ${unitLabel}</div>`;
            spacelist = communityPrefix + spacelist;
        } else {
            spacelist = '<span class="platform-note">Not displayed (residential)</span>';
        }

        // MLS / Roomies
        if (state.unitType === 'entire' && state.propertyType === 'house' && state.subtype === 'detached') {
            mls = 'Single Family Detached';
        } else if (propTypeLabel) {
            mls = `Maps to: ${propTypeLabel}`;
            if (variantLabel) mls += ` + ${variantLabel.toLowerCase()} tag`;
        } else {
            mls = `Maps to: ${unitLabel}`;
        }
        mls = communityPrefix + mls;

        // Add amenities section to each platform
        const amenitiesHtml = {
            bstk: getAmenityDisplayHtml('bstk'),
            ils: getAmenityDisplayHtml('rentals'),
            spacelist: getAmenityDisplayHtml('spacelist'),
            mls: getAmenityDisplayHtml('mls')
        };

        if (amenitiesHtml.bstk) bstk += amenitiesHtml.bstk;
        if (amenitiesHtml.ils && isResidential) ils += amenitiesHtml.ils;
        if (amenitiesHtml.spacelist && isCommercial) spacelist += amenitiesHtml.spacelist;
        if (amenitiesHtml.mls) mls += amenitiesHtml.mls;

        return { bstk, ils, spacelist, mls };
    }

    function getAmenityDisplayHtml(platform) {
        if (typeof PLATFORM_AMENITY_RULES === 'undefined') return '';

        const rules = PLATFORM_AMENITY_RULES[platform];
        if (!rules) return '';

        const amenityDisplay = getAmenityDisplayForPlatform(platform);

        // Check if there's anything to display
        const hasContent = amenityDisplay.property.length > 0 ||
                          amenityDisplay.unit.length > 0 ||
                          amenityDisplay.rollups.length > 0 ||
                          amenityDisplay.parking ||
                          amenityDisplay.pets ||
                          amenityDisplay.utilities ||
                          amenityDisplay.note;

        if (!hasContent) return '';

        let html = '<div class="platform-amenities">';

        // Roll-ups (show first as filters)
        if (amenityDisplay.rollups.length > 0) {
            html += '<div class="platform-amenity-group">';
            amenityDisplay.rollups.forEach(r => {
                html += `<span class="amenity-tag rollup">${r}</span>`;
            });
            html += '</div>';
        }

        // Property amenities
        if (amenityDisplay.property.length > 0) {
            html += '<div class="platform-amenity-group">';
            html += '<span class="amenity-group-label">Building:</span>';
            amenityDisplay.property.forEach(a => {
                html += `<span class="amenity-tag">${a}</span>`;
            });
            html += '</div>';
        }

        // Unit amenities
        if (amenityDisplay.unit.length > 0) {
            html += '<div class="platform-amenity-group">';
            html += '<span class="amenity-group-label">Unit:</span>';
            amenityDisplay.unit.forEach(a => {
                html += `<span class="amenity-tag">${a}</span>`;
            });
            html += '</div>';
        }

        // Parking
        if (amenityDisplay.parking) {
            html += `<div class="platform-amenity-structured">${amenityDisplay.parking}</div>`;
        }

        // Pets
        if (amenityDisplay.pets) {
            html += `<div class="platform-amenity-structured">${amenityDisplay.pets}</div>`;
        }

        // Utilities
        if (amenityDisplay.utilities) {
            html += `<div class="platform-amenity-structured">${amenityDisplay.utilities}</div>`;
        }

        // Note (for MLS inbound)
        if (amenityDisplay.note) {
            html += `<div class="platform-amenity-structured"><em>${amenityDisplay.note}</em></div>`;
        }

        html += '</div>';
        return html;
    }

    function getAmenityDisplayForPlatform(platform) {
        const rules = PLATFORM_AMENITY_RULES[platform];
        const result = {
            property: [],
            unit: [],
            parking: null,
            pets: null,
            utilities: null,
            rollups: [],
            note: null
        };

        if (!rules) return result;

        // Handle MLS (inbound only)
        if (rules.inboundOnly) {
            const hasAny = Object.keys(state.amenities.property).length > 0 ||
                          Object.keys(state.amenities.unit).length > 0 ||
                          state.amenities.parking.availability ||
                          state.amenities.pets.policy;
            if (hasAny) {
                result.note = 'Inbound data limited — would receive: ' + rules.limitedFields.join(', ');
            }
            return result;
        }

        // Handle Spacelist (commercial only)
        if (rules.commercialOnly) {
            const isCommercial = state.sector === 'commercial' || state.sector === 'recreation' || state.sector === 'other';
            if (!isCommercial) {
                return result;
            }
            // Only show commercial categories
            Object.entries(state.amenities.property).forEach(([name, val]) => {
                if (val) {
                    const amenity = findAmenityByName(name, 'property');
                    if (amenity && rules.showCategories.includes(amenity.category)) {
                        result.property.push(name);
                    }
                }
            });
            Object.entries(state.amenities.unit).forEach(([name, val]) => {
                if (val) {
                    const amenity = findAmenityByName(name, 'unit');
                    if (amenity && rules.showCategories.includes(amenity.category)) {
                        result.unit.push(name);
                    }
                }
            });
            // Still show parking for commercial
            result.parking = formatParkingDisplay(state.amenities.parking, platform);
            return result;
        }

        // Track consumed amenities (for roll-ups)
        const consumed = new Set();

        // Check roll-ups first
        if (rules.rollups) {
            Object.entries(rules.rollups).forEach(([key, rollup]) => {
                const triggered = rollup.trigger.some(amenityName => {
                    return state.amenities.property[amenityName] ||
                           state.amenities.unit[amenityName];
                });
                if (triggered) {
                    result.rollups.push(rollup.display);
                    rollup.trigger.forEach(t => consumed.add(t));
                }
            });
        }

        // Process property amenities
        Object.entries(state.amenities.property).forEach(([name, val]) => {
            if (!val || consumed.has(name)) return;

            // Check if hidden
            if (rules.hidden && rules.hidden.includes(name)) return;

            // Check nearby whitelist
            const amenity = findAmenityByName(name, 'property');
            if (amenity && amenity.category === 'Nearby Services' && rules.nearbyWhitelist) {
                if (!rules.nearbyWhitelist.includes(name)) return;
            }

            // Get display name
            let displayName = name;
            if (rules.renames && rules.renames[name]) {
                displayName = rules.renames[name];
                if (displayName === null) return; // Explicitly hidden
            }

            // Avoid duplicates
            if (!result.property.includes(displayName)) {
                result.property.push(displayName);
            }
        });

        // Process unit amenities
        Object.entries(state.amenities.unit).forEach(([name, val]) => {
            if (!val || consumed.has(name)) return;

            // Check if hidden
            if (rules.hidden && rules.hidden.includes(name)) return;

            // Get display name
            let displayName = name;
            if (rules.renames && rules.renames[name]) {
                displayName = rules.renames[name];
                if (displayName === null) return;
            }

            // For enum values, include the value
            if (typeof val === 'string') {
                displayName = `${displayName}: ${val}`;
            }

            if (!result.unit.includes(displayName)) {
                result.unit.push(displayName);
            }
        });

        // Format parking
        result.parking = formatParkingDisplay(state.amenities.parking, platform);

        // Format pets
        result.pets = formatPetDisplay(state.amenities.pets, platform, rules);

        // Format utilities
        result.utilities = formatUtilitiesDisplay(state.amenities.utilities, platform);

        return result;
    }

    function findAmenityByName(name, level) {
        if (!AMENITIES_DATA) return null;
        const list = level === 'property' ? AMENITIES_DATA.propertyAmenities : AMENITIES_DATA.unitAmenities;
        return list.find(a => a.name === name);
    }

    function formatParkingDisplay(parking, platform) {
        if (!parking.availability) return null;

        let parts = [];
        parts.push(parking.availability);

        if (parking.types.length > 0) {
            parts.push(parking.types.join(', '));
        }

        if (parking.spotsIncluded) {
            parts.push(`${parking.spotsIncluded} spot${parking.spotsIncluded > 1 ? 's' : ''}`);
        }

        if (parking.extraCostPerMonth) {
            parts.push(`+$${parking.extraCostPerMonth}/mo`);
        }

        return 'Parking: ' + parts.join(' — ');
    }

    function formatPetDisplay(pets, platform, rules) {
        if (!pets.policy) return null;

        // RentBoard shows simple yes/no
        if (rules && rules.petDisplay === 'simple') {
            return pets.policy.startsWith('Yes') ? 'Pets: Allowed' : 'Pets: Not Allowed';
        }

        let parts = [];
        parts.push(pets.policy);

        if (pets.types.length > 0) {
            const typeStr = pets.types.join(', ');
            if (pets.sizeRestriction && pets.types.includes('Dog')) {
                const size = pets.sizeRestriction.replace(/.*\((.+)\).*/, '$1');
                parts.push(`Dog (${size}), ` + pets.types.filter(t => t !== 'Dog').join(', '));
            } else {
                parts.push(typeStr);
            }
        }

        if (pets.deposit) {
            parts.push(`Deposit: $${pets.deposit}`);
        }

        if (pets.monthlyFee) {
            parts.push(`$${pets.monthlyFee}/mo`);
        }

        return 'Pets: ' + parts.filter(p => p).join(' | ');
    }

    function formatUtilitiesDisplay(utilities, platform) {
        const entries = Object.entries(utilities);
        if (entries.length === 0) return null;

        const parts = entries.map(([name, val]) => {
            if (val === 'Included in rent') {
                return `${name} ✓`;
            } else if (val === 'Tenant pays') {
                return `${name} (tenant)`;
            }
            return null;
        }).filter(p => p);

        if (parts.length === 0) return null;
        return parts.join(' · ');
    }

    // Helper functions
    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');
    }

    function getPropertyTypeLabel(sector, propertyType) {
        return TAXONOMY[sector]?.types[propertyType]?.label || propertyType;
    }

    function getSubtypeLabel(sector, propertyType, subtype) {
        return TAXONOMY[sector]?.types[propertyType]?.subtypes[subtype]?.label || subtype;
    }

    // =========================================================================
    // AMENITIES FUNCTIONS
    // =========================================================================

    function initAmenities() {
        if (typeof AMENITIES_DATA === 'undefined') return;

        renderPropertyAmenities();
        renderUnitAmenities();
        renderParkingTypes();
        renderPetTypes();
        renderUtilities();
        updateAmenitiesApplicability();
        updateAmenitiesCounter();
    }

    function getStructureTypeKey() {
        // Maps current state to one of the 11 applicability keys
        const sector = state.sector;
        const propertyType = state.propertyType;
        const subtype = state.subtype;

        if (!sector && !propertyType) {
            // No selection, return all residential keys as applicable
            return ['house', 'townhouse_plex', 'apt_low', 'apt_mid_high', 'other_res'];
        }

        if (sector === 'residential') {
            if (propertyType === 'house') return ['house'];
            if (propertyType === 'townhouse_plex') return ['townhouse_plex'];
            if (propertyType === 'apartment_bldg') {
                if (subtype === 'low_rise' || subtype === 'walkup') return ['apt_low'];
                if (subtype === 'mid_rise' || subtype === 'high_rise') return ['apt_mid_high'];
                return ['apt_low', 'apt_mid_high'];
            }
            return ['other_res'];
        }
        if (sector === 'commercial') {
            if (propertyType === 'office') return ['office'];
            if (propertyType === 'retail') return ['retail'];
            if (propertyType === 'industrial') return ['industrial'];
            return ['office', 'retail', 'industrial'];
        }
        if (sector === 'recreation') {
            if (propertyType === 'hospitality') return ['hospitality'];
            if (propertyType === 'leisure') return ['leisure'];
            return ['hospitality', 'leisure'];
        }
        return ['land_other'];
    }

    function isAmenityApplicable(amenity) {
        const structureKeys = getStructureTypeKey();
        const purpose = state.purpose || 'standard';

        // Check structure applicability
        const structureApplies = structureKeys.some(key => amenity.applies[key]);
        if (!structureApplies) return false;

        // Check purpose applicability
        if (amenity.purpose[purpose]) return true;
        if (amenity.purpose.standard) return true;

        return false;
    }

    function renderPropertyAmenities() {
        if (!elements.propertyAmenitiesContainer || !AMENITIES_DATA) return;

        const amenities = AMENITIES_DATA.propertyAmenities;
        const categories = [...new Set(amenities.map(a => a.category))];

        let html = '';
        categories.forEach(cat => {
            const catAmenities = amenities.filter(a => a.category === cat);
            const slug = slugify(cat);

            html += `<div class="amenity-section" id="section-prop-${slug}" data-level="property" data-category="${cat}">
                <button type="button" class="amenity-section-header">
                    <span class="section-name">${cat}</span>
                    <span class="section-count" id="prop-${slug}-count"></span>
                    <span class="section-chevron">&#9656;</span>
                </button>
                <div class="amenity-section-body">`;

            catAmenities.forEach(amenity => {
                if (amenity.type === 'bool') {
                    html += `<label class="amenity-checkbox" data-amenity="${amenity.name}" data-level="property">
                        <input type="checkbox" data-amenity="${amenity.name}" data-level="property">
                        <span class="amenity-name">${amenity.name}</span>
                        <span class="amenity-tier tier-${amenity.tier}"></span>
                    </label>`;
                } else if (amenity.type === 'enum') {
                    html += `<div class="amenity-enum" data-amenity="${amenity.name}" data-level="property">
                        <label class="form-label-sm">${amenity.name}</label>
                        <select class="form-select-sm" data-amenity="${amenity.name}" data-level="property">
                            ${amenity.values.map(v => `<option value="${v}">${v}</option>`).join('')}
                        </select>
                    </div>`;
                }
            });

            html += '</div></div>';
        });

        elements.propertyAmenitiesContainer.innerHTML = html;
        bindAmenityEvents('property');
    }

    function renderUnitAmenities() {
        if (!elements.unitAmenitiesContainer || !AMENITIES_DATA) return;

        const amenities = AMENITIES_DATA.unitAmenities;
        const categories = [...new Set(amenities.map(a => a.category))];

        let html = '';
        categories.forEach(cat => {
            const catAmenities = amenities.filter(a => a.category === cat);
            const slug = slugify(cat);

            html += `<div class="amenity-section" id="section-unit-${slug}" data-level="unit" data-category="${cat}">
                <button type="button" class="amenity-section-header">
                    <span class="section-name">${cat}</span>
                    <span class="section-count" id="unit-${slug}-count"></span>
                    <span class="section-chevron">&#9656;</span>
                </button>
                <div class="amenity-section-body">`;

            catAmenities.forEach(amenity => {
                if (amenity.type === 'bool') {
                    html += `<label class="amenity-checkbox" data-amenity="${amenity.name}" data-level="unit">
                        <input type="checkbox" data-amenity="${amenity.name}" data-level="unit">
                        <span class="amenity-name">${amenity.name}</span>
                        <span class="amenity-tier tier-${amenity.tier}"></span>
                    </label>`;
                } else if (amenity.type === 'enum') {
                    html += `<div class="amenity-enum" data-amenity="${amenity.name}" data-level="unit">
                        <label class="form-label-sm">${amenity.name}</label>
                        <select class="form-select-sm" data-amenity="${amenity.name}" data-level="unit">
                            ${amenity.values.map(v => `<option value="${v}">${v}</option>`).join('')}
                        </select>
                    </div>`;
                }
            });

            html += '</div></div>';
        });

        elements.unitAmenitiesContainer.innerHTML = html;
        bindAmenityEvents('unit');
    }

    function renderParkingTypes() {
        if (!elements.parkingTypesGrid || !AMENITIES_DATA) return;

        let html = '';
        AMENITIES_DATA.parking.types.forEach(type => {
            html += `<label class="amenity-checkbox" data-parking-type="${type.name}">
                <input type="checkbox" data-parking-type="${type.name}">
                <span class="amenity-name">${type.name}</span>
            </label>`;
        });
        elements.parkingTypesGrid.innerHTML = html;

        // Bind events
        elements.parkingTypesGrid.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', onParkingTypeChange);
        });
    }

    function renderPetTypes() {
        if (!elements.petTypesGrid || !AMENITIES_DATA) return;

        let html = '';
        AMENITIES_DATA.petPolicy.petTypes.forEach(type => {
            html += `<label class="amenity-checkbox" data-pet-type="${type.name}">
                <input type="checkbox" data-pet-type="${type.name}">
                <span class="amenity-name">${type.name}</span>
            </label>`;
        });
        elements.petTypesGrid.innerHTML = html;

        // Bind events
        elements.petTypesGrid.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', onPetTypeChange);
        });
    }

    function renderUtilities() {
        if (!elements.utilitiesGrid || !AMENITIES_DATA) return;

        let html = '';
        AMENITIES_DATA.utilities.items.forEach(util => {
            html += `<div class="utility-row" data-utility="${util.name}">
                <span class="utility-name">${util.name}</span>
                <div class="utility-toggle">
                    <button type="button" data-utility="${util.name}" data-value="Included in rent">Inc</button>
                    <button type="button" data-utility="${util.name}" data-value="Tenant pays">Tenant</button>
                    <button type="button" data-utility="${util.name}" data-value="Not available">N/A</button>
                </div>
            </div>`;
        });
        elements.utilitiesGrid.innerHTML = html;

        // Bind events
        elements.utilitiesGrid.querySelectorAll('.utility-toggle button').forEach(btn => {
            btn.addEventListener('click', onUtilityToggle);
        });
    }

    function bindAmenityEvents(level) {
        const container = level === 'property' ? elements.propertyAmenitiesContainer : elements.unitAmenitiesContainer;
        if (!container) return;

        // Section header toggles
        container.querySelectorAll('.amenity-section-header').forEach(header => {
            header.addEventListener('click', () => {
                const section = header.closest('.amenity-section');
                section.classList.toggle('open');
            });
        });

        // Checkbox amenities
        container.querySelectorAll('.amenity-checkbox input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', () => {
                const name = cb.dataset.amenity;
                const lvl = cb.dataset.level;
                if (cb.checked) {
                    state.amenities[lvl][name] = true;
                } else {
                    delete state.amenities[lvl][name];
                }
                updateAmenitiesCounter();
                updateCanonicalJson();
                updatePlatformDisplay();
            });
        });

        // Enum amenities
        container.querySelectorAll('.amenity-enum select').forEach(sel => {
            sel.addEventListener('change', () => {
                const name = sel.dataset.amenity;
                const lvl = sel.dataset.level;
                const val = sel.value;
                // Only store if not the first (default) value
                if (val && sel.selectedIndex > 0) {
                    state.amenities[lvl][name] = val;
                } else {
                    delete state.amenities[lvl][name];
                }
                updateAmenitiesCounter();
                updateCanonicalJson();
                updatePlatformDisplay();
            });
        });
    }

    function updateAmenitiesApplicability() {
        if (typeof AMENITIES_DATA === 'undefined') return;

        const structureKeys = getStructureTypeKey();
        const purpose = state.purpose || 'standard';

        // Update context notice
        if (elements.amenitiesContextNotice) {
            if (!state.sector && !state.propertyType) {
                elements.amenitiesContextNotice.innerHTML = '<span class="text-muted">Select a property type above to see applicable amenities.</span>';
            } else {
                const label = getStructureLabel();
                elements.amenitiesContextNotice.innerHTML = `<span class="text-muted">Showing amenities for: <strong>${label}</strong></span>`;
            }
        }

        // Update property amenities visibility
        if (elements.propertyAmenitiesContainer) {
            AMENITIES_DATA.propertyAmenities.forEach(amenity => {
                const applicable = isAmenityApplicable(amenity);
                const el = elements.propertyAmenitiesContainer.querySelector(`[data-amenity="${amenity.name}"][data-level="property"]`);
                if (el) {
                    if (amenity.type === 'bool') {
                        el.classList.toggle('not-applicable', !applicable);
                    } else {
                        el.classList.toggle('not-applicable', !applicable);
                    }
                }
            });

            // Hide empty categories
            elements.propertyAmenitiesContainer.querySelectorAll('.amenity-section').forEach(section => {
                const visibleItems = section.querySelectorAll('.amenity-checkbox:not(.not-applicable), .amenity-enum:not(.not-applicable)');
                section.classList.toggle('not-applicable', visibleItems.length === 0);
            });
        }

        // Update unit amenities visibility
        if (elements.unitAmenitiesContainer) {
            AMENITIES_DATA.unitAmenities.forEach(amenity => {
                const applicable = isAmenityApplicable(amenity);
                const el = elements.unitAmenitiesContainer.querySelector(`[data-amenity="${amenity.name}"][data-level="unit"]`);
                if (el) {
                    if (amenity.type === 'bool') {
                        el.classList.toggle('not-applicable', !applicable);
                    } else {
                        el.classList.toggle('not-applicable', !applicable);
                    }
                }
            });

            // Hide empty categories
            elements.unitAmenitiesContainer.querySelectorAll('.amenity-section').forEach(section => {
                const visibleItems = section.querySelectorAll('.amenity-checkbox:not(.not-applicable), .amenity-enum:not(.not-applicable)');
                section.classList.toggle('not-applicable', visibleItems.length === 0);
            });
        }

        // Update parking types visibility
        if (elements.parkingTypesGrid) {
            AMENITIES_DATA.parking.types.forEach(type => {
                const applicable = structureKeys.some(key => type.applies[key]);
                const el = elements.parkingTypesGrid.querySelector(`[data-parking-type="${type.name}"]`);
                if (el) el.classList.toggle('not-applicable', !applicable);
            });
        }

        // Update utilities visibility
        if (elements.utilitiesGrid) {
            AMENITIES_DATA.utilities.items.forEach(util => {
                const applicable = structureKeys.some(key => util.applies[key]);
                const row = elements.utilitiesGrid.querySelector(`[data-utility="${util.name}"]`);
                if (row) row.classList.toggle('not-applicable', !applicable);
            });
        }
    }

    function getStructureLabel() {
        if (state.propertyType && state.subtype) {
            const subtypeLabel = getSubtypeLabel(state.sector, state.propertyType, state.subtype);
            const propLabel = getPropertyTypeLabel(state.sector, state.propertyType);
            return `${propLabel} (${subtypeLabel})`;
        } else if (state.propertyType) {
            return getPropertyTypeLabel(state.sector, state.propertyType);
        } else if (state.sector) {
            return capitalize(state.sector);
        }
        return 'All Types';
    }

    function expandAllAmenitySections(expand) {
        document.querySelectorAll('.amenity-section').forEach(section => {
            if (expand) {
                section.classList.add('open');
            } else {
                section.classList.remove('open');
            }
        });
    }

    function onParkingAvailabilityChange() {
        const val = elements.parkingAvailability.value;
        state.amenities.parking.availability = val || null;

        const showTypes = val && val !== 'No parking available' && val !== '';
        elements.parkingTypesContainer.classList.toggle('hidden', !showTypes);
        elements.parkingPerUnit.classList.toggle('hidden', !showTypes || state.amenities.parking.types.length === 0);

        updateAmenitiesCounter();
        updateCanonicalJson();
        updatePlatformDisplay();
    }

    function onParkingTypeChange(e) {
        const name = e.target.dataset.parkingType;
        if (e.target.checked) {
            if (!state.amenities.parking.types.includes(name)) {
                state.amenities.parking.types.push(name);
            }
        } else {
            state.amenities.parking.types = state.amenities.parking.types.filter(t => t !== name);
        }

        // Show per-unit fields if any type is selected
        const hasTypes = state.amenities.parking.types.length > 0;
        elements.parkingPerUnit.classList.toggle('hidden', !hasTypes);

        updateAmenitiesCounter();
        updateCanonicalJson();
        updatePlatformDisplay();
    }

    function onParkingInputChange() {
        state.amenities.parking.spotsIncluded = elements.parkingSpots.value ? parseInt(elements.parkingSpots.value) : null;
        state.amenities.parking.extraCostPerMonth = elements.parkingCost.value ? parseFloat(elements.parkingCost.value) : null;
        updateCanonicalJson();
        updatePlatformDisplay();
    }

    function onPetPolicyChange() {
        const val = elements.petPolicy.value;
        state.amenities.pets.policy = val || null;

        const showTypes = val && val.startsWith('Yes');
        elements.petTypesContainer.classList.toggle('hidden', !showTypes);
        elements.petFees.classList.toggle('hidden', !showTypes);

        // Reset restrictions visibility based on dog selection
        const hasDog = state.amenities.pets.types.includes('Dog');
        elements.petRestrictions.classList.toggle('hidden', !showTypes || !hasDog);

        updateAmenitiesCounter();
        updateCanonicalJson();
        updatePlatformDisplay();
    }

    function onPetTypeChange(e) {
        const name = e.target.dataset.petType;
        if (e.target.checked) {
            if (!state.amenities.pets.types.includes(name)) {
                state.amenities.pets.types.push(name);
            }
        } else {
            state.amenities.pets.types = state.amenities.pets.types.filter(t => t !== name);
        }

        // Show size restriction if Dog is selected
        const hasDog = state.amenities.pets.types.includes('Dog');
        elements.petRestrictions.classList.toggle('hidden', !hasDog);

        updateAmenitiesCounter();
        updateCanonicalJson();
        updatePlatformDisplay();
    }

    function onPetInputChange() {
        state.amenities.pets.deposit = elements.petDeposit.value ? parseFloat(elements.petDeposit.value) : null;
        state.amenities.pets.monthlyFee = elements.petMonthly.value ? parseFloat(elements.petMonthly.value) : null;
        updateCanonicalJson();
        updatePlatformDisplay();
    }

    function onUtilityToggle(e) {
        const name = e.target.dataset.utility;
        const val = e.target.dataset.value;

        // Remove active class from siblings
        e.target.parentElement.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('active-included', 'active-tenant', 'active-na');
        });

        // If clicking same button, deselect
        if (state.amenities.utilities[name] === val) {
            delete state.amenities.utilities[name];
        } else {
            state.amenities.utilities[name] = val;
            // Add active class
            if (val === 'Included in rent') {
                e.target.classList.add('active-included');
            } else if (val === 'Tenant pays') {
                e.target.classList.add('active-tenant');
            } else {
                e.target.classList.add('active-na');
            }
        }

        updateAmenitiesCounter();
        updateCanonicalJson();
        updatePlatformDisplay();
    }

    function updateAmenitiesCounter() {
        let count = 0;

        // Count property amenities
        count += Object.keys(state.amenities.property).length;

        // Count unit amenities
        count += Object.keys(state.amenities.unit).length;

        // Count parking (if availability set)
        if (state.amenities.parking.availability) count++;
        count += state.amenities.parking.types.length;

        // Count pets (if policy set)
        if (state.amenities.pets.policy) count++;
        count += state.amenities.pets.types.length;

        // Count utilities
        count += Object.keys(state.amenities.utilities).length;

        if (elements.amenitiesCounter) {
            elements.amenitiesCounter.textContent = `${count} selected`;
            elements.amenitiesCounter.classList.toggle('empty', count === 0);
        }

        // Update section counts
        updateSectionCounts();
    }

    function updateSectionCounts() {
        // Parking count
        const parkingEl = document.getElementById('parking-count');
        if (parkingEl) {
            let pc = 0;
            if (state.amenities.parking.availability) pc++;
            pc += state.amenities.parking.types.length;
            parkingEl.textContent = pc > 0 ? `${pc} selected` : '';
            parkingEl.classList.toggle('has-selected', pc > 0);
        }

        // Pets count
        const petsEl = document.getElementById('pets-count');
        if (petsEl) {
            let pec = 0;
            if (state.amenities.pets.policy) pec++;
            pec += state.amenities.pets.types.length;
            petsEl.textContent = pec > 0 ? `${pec} selected` : '';
            petsEl.classList.toggle('has-selected', pec > 0);
        }

        // Utilities count
        const utilEl = document.getElementById('utilities-count');
        if (utilEl) {
            const uc = Object.keys(state.amenities.utilities).length;
            utilEl.textContent = uc > 0 ? `${uc} selected` : '';
            utilEl.classList.toggle('has-selected', uc > 0);
        }
    }

    function slugify(str) {
        return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    // Initialize when builder tab is loaded
    document.addEventListener('tabloaded', (e) => {
        if (e.target.id === 'builder') {
            initBuilder();
        }
    });

    // Also try to initialize immediately if already on builder tab
    if (document.getElementById('uf-unit-type')) {
        initBuilder();
    }
})();
