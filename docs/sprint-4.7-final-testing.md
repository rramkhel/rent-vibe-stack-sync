# Sprint 4.7: Final Testing & Polish

## Overview

Final verification pass after all tabs are built. No new features — just testing, fixes, and polish.

---

## Testing Checklist

### Model accuracy (CRITICAL)
- [ ] 6 dimensions throughout (NOT 7)
- [ ] "Property Type" naming used everywhere (NOT "Structure Type")
- [ ] Property Type is Dim 2, not "Structure Type"
- [ ] Purpose does NOT appear as a dimension — it's under Metadata tab
- [ ] Sector values: residential, commercial, recreation, other (4 total)
- [ ] Bachelor variant present under Low Rise, Mid Rise, High Rise, Walk-up
- [ ] "Other" catch-all exists at every level (property type, subtype)
- [ ] Cottage is a variant of Cabin (not a separate subtype)
- [ ] Manufactured is a variant of Mobile (not a separate subtype)
- [ ] Garden Suite variant is under House → Other (not its own thing)

### Callout treatment
- [ ] Only 2-3 Key Insight callouts (Type 1) in entire site: "Condo Problem" + "The Pattern"
- [ ] All technical clarifications use Inline Notes (Type 2) — no colored background
- [ ] Unit-First vs Structure-First uses Comparison Cards (Type 3)
- [ ] Spreadsheet link and "What's Blocking Launch" use Utility Bars (Type 4)
- [ ] NO old-style uniform teal/purple/amber callouts used anywhere

### Visual / Design
- [ ] No emojis in platform card headers (clean text labels only)
- [ ] Consistent badge colors throughout
- [ ] Property hierarchy tree is the primary place color is used extensively
- [ ] Professional, restrained — no flashy or AI-generic aesthetics
- [ ] System font stack used (no Inter, Roboto, etc.)

### Technical
- [ ] Tab lazy-loading works (Tab 1 loads on page open, others on first click)
- [ ] Sub-tab navigation works within Tabs 3 and 4
- [ ] All JS runs without console errors
- [ ] TAXONOMY data model is consistent across builder and reference tree
- [ ] No broken links or placeholder text left unintentionally

---

## What NOT to change

- Don't "redesign" the existing component styles (badges, cards, tables, platform cards, sentence boxes). They work and they're intentional.
- Don't add animations, transitions, or motion effects beyond what exists.
- Don't add responsive/mobile layouts — this is a desktop internal tool.
- Don't add a dark mode.
- Don't add a search feature.
- Don't make the hierarchy tree collapsible/expandable — show it all open.
- Don't add tooltips or popovers.
- Don't use any external fonts (Google Fonts etc).
- Don't use any framework (React, Vue, etc) — vanilla HTML/CSS/JS only.
- Don't use localStorage or sessionStorage.

---

## What to reference

The existing `property-taxonomy-v4.html` file in the repo is your design reference. Extract CSS from it. The components, color system, and overall visual language are established — you're updating the CONTENT and MODEL, not redesigning the interface.

The `taxonomy-validation-v4.2.xlsx` spreadsheet (8 tabs) is the canonical data source. If anything in these instructions conflicts with the spreadsheet, the spreadsheet wins.

---

## Execution

```bash
# After all fixes
git add .
git commit -m "Property Taxonomy v4.2 presentation site complete

5-tab structure:
- Tab 1: The Solution (6-dimension model explanation)
- Tab 2: Interactive Listing Builder
- Tab 3: Full Reference (property hierarchy, unit types, transactions)
- Tab 4: Metadata (ownership, purpose, community)
- Tab 5: Decisions & Open Questions

Key changes from v4.1:
- 6 dimensions (Purpose moved to metadata)
- Property Type replaces Structure Type naming
- 4 callout types (insight, inline note, comparison, utility)
- Bachelor variant added to Apt Bldg subtypes
- 'Other' catch-all at every level"
git push origin main
```
