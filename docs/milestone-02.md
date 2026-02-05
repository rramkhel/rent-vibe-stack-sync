# Milestone 02: Landlord Listing Creation Prototype

## Overview
Replace the "Coming Soon" placeholder at `/landlord-login` with a fully functional HTML prototype for AI-powered listing creation.

## Current State
- `/landlord-login/index.html` shows "Coming Soon" placeholder
- Design system exists in `/css/styles.css`
- Lovable prototype exists as reference (screenshots in project knowledge)

## Target State
- Modular, maintainable prototype structure
- Complete 6-screen flow: Welcome → Address → Units → Details → Pricing → Review
- State persistence via localStorage
- Photo upload simulation (base64 storage)
- Mock AI features (amenity detection, description generation, pricing suggestions)
- Matches Lovable prototype design system

## Architecture

### File Structure
```
/landlord-login/
├── index.html              # Shell - loads all modules
├── css/
│   ├── design-system.css   # Variables, typography, colors
│   ├── components.css      # Buttons, forms, cards, pills, modals
│   └── screens.css         # Screen-specific layouts
├── js/
│   ├── app.js              # Main orchestration + initialization
│   ├── state.js            # State management + localStorage
│   ├── router.js           # Screen navigation
│   └── utils.js            # Helper functions
├── screens/
│   ├── welcome.html        # Welcome screen content
│   ├── address.html        # Address entry
│   ├── units.html          # Unit details
│   ├── details.html        # Photos, amenities, description
│   ├── pricing.html        # Rent, availability, terms
│   └── review.html         # Final review + publish
├── components/
│   ├── header.html         # Reusable header
│   ├── footer-nav.html     # Footer navigation
│   └── modals.html         # All modal templates
└── data/
    └── mock-data.js        # Mock addresses, amenities list, etc.
```

### Why Modular?
- **Quick edits**: Change one screen without touching others
- **Claude Code friendly**: Small files = faster iterations
- **Reusable**: Components shared across screens
- **Testable**: Each piece can be verified independently

## Design Requirements
- Match Lovable prototype exactly (colors, spacing, typography)
- Lucide icons only (no emoji)
- Mobile responsive
- Smooth transitions between screens
- Form validation with helpful error states

## Sprints

| File | Description |
|------|-------------|
| `sprint-2.1-instructions.md` | Set up modular structure + design system CSS |
| `sprint-2.2-instructions.md` | Build state management + router |
| `sprint-2.3-instructions.md` | Welcome + Address screens |
| `sprint-2.4-instructions.md` | Unit Details screen |
| `sprint-2.5-instructions.md` | Property Details screen (photos, amenities) |
| `sprint-2.6-instructions.md` | AI modals (detection, description, pricing) |
| `sprint-2.7-instructions.md` | Pricing screen |
| `sprint-2.8-instructions.md` | Review screen + publish flow |
| `sprint-2.9-instructions.md` | Polish, testing, deploy |

## Execution Order
Complete each sprint in order. Test locally after each step.

## Success Criteria
- [ ] All 6 screens functional and navigable
- [ ] State persists across page refreshes
- [ ] Photos can be "uploaded" and displayed
- [ ] AI modals work (mock responses)
- [ ] Form validation prevents incomplete submissions
- [ ] Mobile responsive
- [ ] Matches Lovable prototype visually
- [ ] No console errors

## Reference Materials
- Lovable prototype screenshots (project knowledge)
- `hybrid_lovable_prompt_complete.md` (detailed specs)
- Airbnb listing flow (design inspiration)
