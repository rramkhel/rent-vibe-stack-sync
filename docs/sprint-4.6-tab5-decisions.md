# Sprint 4.6: Tab 5 — Decisions & Open Questions

## Overview

Build Tab 5 (`tabs/tab5-decisions.html`). Documents problems solved and open questions needing PM input.

---

## Section 1: Problems Solved & Tradeoffs

Title: "Problems Solved & Tradeoffs"
Subtitle: "The thinking behind the model. Each row is a real problem we hit and how v4.2 resolves it."

Table in a card (title: "10 Problems, 10 Solutions" + badge "All resolved in v4.2"):

| Problem | Solution | Rationale |
|---|---|---|
| "Apartment" was both a building type and a listing concept | Split: Apt Bldg = property type, Apartment = self-sufficient unit type | Renters search for "apartment," not "apartment building → mid rise → entire" |
| Loft/Studio were unit types but describe layouts, not portions | Moved to Property Variant | A loft is a style of apartment, not a portion of a building like "basement" |
| Garden Suite/Garage Suite were unit types but are accessory dwellings | Moved to Property Variant of House | They describe a secondary structure on the property, not a portion |
| Rooms don't care about building type | Room is self-sufficient — property type optional | Nobody listing a room cares if it's in a house or townhouse |
| Cabin/Cottage had its own Property Type for just 2 values | Merged as House subtypes | Physically standalone dwellings. Only 2 values doesn't justify top-level type |
| Some listings are "building-first," others "unit-first" | Unit Types split into self-sufficient vs structure-dependent | Same model — property type just becomes nullable |
| 47+ inconsistent property types across platforms | 6 orthogonal dimensions + platform mapping layer | Store canonically, display per-platform via configuration |
| Regional naming (cabin vs cottage, townhouse vs rowhouse) | Synonym groups concept (future) | Same thing for search, landlord picks their label |
| Purpose was a classification dimension but doesn't describe physical properties | Moved to metadata alongside Ownership | A basement is structurally identical whether "student" or "standard" |
| "Condo" was treated as a property type on some platforms | Condo is an Ownership value, not a property type | A condo can be in a high-rise, townhouse, or detached house |

### Key Insight callout (Type 1, teal) — THE PATTERN
Second of the 2-3 key insight callouts in the entire site:

Title: "The Pattern"
Text: "Most of these problems came from conflating different concepts into a single 'property type' field. The fix is always the same: separate the concepts into distinct dimensions, each answering one question. Property Type tells you what the building is. Unit Type tells you what you're renting. Variant tells you the style. They're orthogonal."

---

## Section 2: Open Questions

Title: "Open Questions"
Subtitle: "Items that need PM input before finalizing. Each includes a recommendation — flag anything you disagree with."

Summary stats: two cards side by side
- "11" — Open questions (teal bg)
- "3" — Categories (gray bg)

### Grouped by category:

**Category: Structure & Classification**

1. **Multiplex — subtype or container?**
   Options: A) Sibling subtype (standalone 5+ plex) / B) Parent container for all plexes
   Rec: A — standalone subtype. Keeps tree flat and predictable.
   Needs: Su, Steven

2. **Luxury — where does it live?**
   Options: A) Variant of Apt Bldg subtypes / B) Quality attribute on any structure / C) Remove
   Rec: B — attribute, not structural
   Needs: Product team

3. **Construction/New Dev — building type or lifecycle attribute?**
   Options: A) Keep under Industrial / B) Move to Other / C) Lifecycle attribute
   Rec: C — it's a state, not a building type. Parked under Industrial for now.
   Needs: Product team

4. **Specialty category — what goes here?**
   Rec: Keep as placeholder, define values as encountered.
   Needs: Pablo, Su

5. **'Other' at every level?**
   Options: A) Every dimension gets Other / B) Only Property Type + Subtype / C) Case by case
   Rec: A — needed for backwards compat + futureproofing
   Needs: Stan, dev team

**Category: Transaction & Lifecycle**

6. **Sublet — add back or keep removed?**
   Options: A) Add as Transaction Type / B) Keep removed / C) Purpose flag
   Rec: B — keep removed for now
   Needs: Pablo

7. **Lease-to-Own / Rent-to-Own — deprecate?**
   Options: A) Add as Transaction Types / B) Deprecate / C) Composite flag
   Rec: B — deprecate (low volume)
   Needs: Steven, data team

**Category: Ownership & Metadata**

8. **Co-op — where does it live?**
   Options: A) Ownership attribute (like Condo) / B) Purpose / C) Structure attribute
   Rec: A — ownership model
   Needs: Su

9. **Condo Association — deprecate or remap?**
   Options: A) Deprecate / B) Map to Community wrapper + ownership=condo
   Rec: A — unclear use case, likely legacy
   Needs: Su, Steven

10. **Purpose cardinality — 1:1 or 1:N?**
    Options: A) One purpose per listing / B) Multiple (e.g., Student + Short-Term)
    Rec: TBD — defer until Purpose is more fleshed out
    Needs: Product team

11. **Synonym implementation — how?**
    Options: A) Metadata on subtypes / B) Separate synonym table / C) Defer
    Rec: C — concept agreed, implementation deferred
    Needs: Dev team

### Each question card format:
- Card with title = question number + text
- Badge: "Needs sign-off" (amber) or "Needs PM input" (gray)
- Body: Brief context paragraph, option pills (A/B/C), recommendation in a teal-bg strip, "Needs input from: **Names**" at bottom

### After all questions:

**Utility Bar (Type 4, amber):**
"None of these open questions block the taxonomy model itself. Questions 1, 2, 3, 4, 5 should be resolved before implementation begins. The rest can be addressed during migration mapping or deferred."

---

## Testing Checklist

- [ ] Problems Solved table has 10 rows (not 8)
- [ ] "Purpose moved to metadata" is one of the 10 problems solved
- [ ] "Condo as ownership" is one of the 10 problems solved
- [ ] "The Pattern" uses Key Insight callout (Type 1, teal) — not inline note
- [ ] 11 open questions organized in 3 categories
- [ ] Each question has options, recommendation, and "needs input from" names
- [ ] "What's Blocking Launch" utility bar at bottom
