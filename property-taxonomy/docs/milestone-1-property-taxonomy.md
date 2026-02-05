# Claude Code Instructions: Add Property Taxonomy Project

Add a new project card to the main page of rent-vibe-stack-sync for tracking the Property Types Taxonomy simplification work.

## Project Details

**Project Name:** Property Types Taxonomy Simplification

**Status:** Discovery / In Progress

**Summary:** Redesigning the property type taxonomy to serve multiple stakeholders through progressive disclosure - one backend taxonomy with three frontend views (Renter, Ecommerce Landlord, Enterprise).

**Problem Statement:** Current taxonomy has 40+ property types creating cognitive overload for renters and friction for casual landlords, while enterprise clients need full granularity for portfolio management and Data team needs clean, accurate inputs for Rent Report.

**Proposed Solution:** Progressive Disclosure Model
- **Renter View:** 5 simplified categories (Apartments, Houses, Condos, Rooms, Townhouses) with filter-based refinement
- **Ecommerce Landlord View:** ~12 types via 2-step selection flow with smart defaults
- **Enterprise View:** Full 40+ taxonomy with 3-level hierarchy (Category → Building Type → Unit Type)
- **Data Model:** Backend always stores full taxonomy; Housing Types as separate cross-cutting dimension

**Stakeholders:**
- Renters (search experience)
- Ecommerce Landlords (1-3 properties, casual listers)
- Enterprise Landlords (large portfolios, hundreds of units)
- Data Team (Rent Report accuracy, clean logging)

**Key Decisions Pending:**
- [ ] Validate progressive disclosure architecture with eng
- [ ] Confirm Housing Types as separate dimension vs nested
- [ ] Prioritize ILS mappings (Rentals, RentBoard, RentCanada, RentFaster)
- [ ] Define migration path for existing listings

**Related Docs:**
- New_Property_Types_Mapping.xlsx (current taxonomy + ILS mappings)

## Implementation Notes

Add this as a project card on the main dashboard/projects page, following the existing card pattern in the codebase. Include:
- Project title
- Status badge (Discovery/In Progress)
- Brief description
- Link to project detail page if that pattern exists

If the app uses a data file or database for projects, add the appropriate entry there rather than hardcoding.
