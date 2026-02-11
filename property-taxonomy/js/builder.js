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
        community: null
    };

    // DOM elements cache
    let elements = {};

    function initBuilder() {
        cacheElements();
        bindEvents();
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
            viewToggleBtns: document.querySelectorAll('.view-toggle-btn')
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

        return { bstk, ils, spacelist, mls };
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
