# Milestone 01: Restructure to Multi-Prototype Hub

## Overview
Transform rent-vibe-stack-sync from a single-project site into a hub for multiple prototypes.

## Current State
- Homepage is a PM Portfolio-style page for "Rent Vibes"
- Various sub-pages exist (Is Basement quiz, vision presentation, etc.)
- Single-project structure

## Target State
- New homepage = portfolio-style hub with project cards
- `/rent-vibes` = current homepage content (moved)
- `/landlord-login` = placeholder page for future AI listing creator
- All existing sub-routes continue to work

## Design Requirements
- Clean, portfolio-style cards on hub page
- Lucide icons only (no emoji)
- Consistent styling with existing design system
- Mobile responsive

## Sprints

| File | Description |
|------|-------------|
| `sprint-1.1-instructions.md` | Audit current structure |
| `sprint-1.2-instructions.md` | Move homepage to /rent-vibes |
| `sprint-1.3-instructions.md` | Create new hub homepage |
| `sprint-1.4-instructions.md` | Create /landlord-login placeholder |
| `sprint-1.5-instructions.md` | Test and verify |

## Execution Order
Complete each sprint in order. Test after each step before proceeding.

## Success Criteria
- [ ] Hub page loads at root URL with project cards
- [ ] Clicking "Rent Vibes" card navigates to /rent-vibes
- [ ] Clicking "Landlord Login" card navigates to /landlord-login
- [ ] All existing functionality preserved
- [ ] No broken links or references
