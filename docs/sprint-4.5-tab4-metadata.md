# Sprint 4.5: Tab 4 — Metadata

## Overview

Build Tab 4 (`tabs/tab4-metadata.html`) and its supporting JavaScript (`js/community-demo.js`). Everything that orbits the taxonomy but isn't a classification dimension. 3 sub-tabs.

---

## Sub-tab bar

Centered pill bar: Ownership | Purpose | Community

---

## Sub-tab 1: Ownership

### Intro text
"Ownership describes *how* a property is held — not what the building looks like. A detached house can be freehold, condo, or co-op. A unit in a high-rise can be a condo or a rental. Ownership is tracked as a separate attribute, not as part of the taxonomy."

### Key Insight callout (Type 1, purple) — THE CONDO PROBLEM
This is one of the 2-3 callouts in the entire site that gets the full treatment:

Title: "The 'Condo Problem' — solved"
Text: "In the old system, 'Condo' was a property type alongside 'Apartment' and 'House.' But a condo isn't a type of building — it's a legal ownership model. A condo unit can be in a high-rise, a townhouse, or a detached house. By separating ownership from structure, we stop conflating two different questions: 'what does the building look like?' and 'who owns it?'"

### Ownership table (in a card)
Title: "Ownership Values" / Subtitle: "One per property — tracked independently from all 6 taxonomy dimensions"

| Value | Code | Description | Example | ILS Impact |
|---|---|---|---|---|
| Freehold | freehold | Own the land and building | 3BR detached house | No special filter |
| Condo | condo | Own unit, share common areas | 1BR in high-rise | ILS shows 'Condo' as searchable filter |
| Co-op | coop | Own shares in corporation | Unit in co-op building | Potentially |
| Leasehold | leasehold | Own building, lease the land | Commercial property | No |
| Rental | rental | Renting, no ownership | Most ILS listings | No (default — implied) |
| Lease-to-Own | lease_to_own | Lease ending in ownership | Niche commercial | Maps to lease |
| Rent-to-Own | rent_to_own | Rent ending in ownership | Niche residential | Maps to rent |

---

## Sub-tab 2: Purpose

### Intro text
"Purpose describes the audience or use case of a listing, not what the property physically is. A basement apartment near campus is structurally identical whether it's listed as 'student' or 'standard.' Purpose is a filter and tag, not a classification axis."

### Purpose values table

| Value | Code | Description |
|---|---|---|
| Standard | standard | Default — general market |
| Student | student | Near campuses, student-friendly |
| Senior | senior | Senior living, 55+ |
| Military/Veteran | military_veteran | Military housing |
| Corporate | corporate | Corporate housing/relocation |
| Vacation | vacation | Vacation rental |
| Short-Term | short_term | Short-term rental |

---

## Sub-tab 3: Community

### Simple explanation
"Community is a display wrapper that groups multiple buildings under one brand name. It bumps the building down one level in the ILS search results — the community becomes the top-level card instead of individual buildings."

### Three wrapping examples (in a card)
Show 3 simple before/after examples:

1. **Condo building** → "Maple Heights" community wraps 2 condo buildings
2. **Apartment buildings** → "Riverside Gardens" community wraps 3 apt buildings
3. **Townhouses** → "Oakwood Commons" community wraps a row of townhouses

For each, show:
- Without community: [Building card] → [Units]
- With community: [Community card] → [Buildings] → [Units]

### Visual hierarchy (reuse from existing file)
The existing `property-taxonomy-v4.html` has great "Without Community" and "With Community" visual hierarchy diagrams. Reuse those — they're the stacked card layouts showing search result → buildings → units. Just update the text to reference 6 dimensions instead of 7.

### Brief note
"Open questions around community (mixed property types, billing, who creates) are being worked through separately."

Do NOT include the 6 detailed community open questions that were in the old version — those are being handled elsewhere.

Do NOT include a "What Community Is Not" section or a community syndication comparison table — keep it simple.

---

## Community Demo (js/community-demo.js)

Port the community demo from the existing file. It has:
- Mock search results (clickable cards)
- Breadcrumb navigation
- "Without Community" side: Buildings → Units
- "With Community" side: Community → Buildings → Units
- Mock unit data (DEMO_UNITS object)

The existing implementation works well. Just update references from "7 dimensions" to "6 dimensions" in any text.

---

## Testing Checklist

- [ ] 3 sub-tabs: Ownership, Purpose, Community
- [ ] "The Condo Problem — solved" uses Key Insight callout (Type 1, purple) — not inline note
- [ ] Ownership table has all 7 values (freehold through rent-to-own)
- [ ] Purpose sub-tab explains why it's not a dimension
- [ ] Purpose table has 7 values
- [ ] Community sub-tab is SIMPLIFIED (not the 6 open questions from old version)
- [ ] Community demo with interactive breadcrumb navigation works
