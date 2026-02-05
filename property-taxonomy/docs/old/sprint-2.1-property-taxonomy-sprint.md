# Property Taxonomy Demo — Implementation Sprint

## Overview

Implement the Property Classification System demo as a React application in the `property-taxonomy` project within the `rent-vibe-stack-sync` monorepo.

**Reference file:** `property-taxonomy-demo.html` (provided separately)

The HTML file is a working prototype. Your job is to convert it into a well-organized React application with proper component structure, shared styles, and data separation.

---

## Project Structure

```
property-taxonomy/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css                    # Global styles, CSS variables
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Page header with title and badge
│   │   │   ├── TabNavigation.tsx    # Sticky tab bar
│   │   │   └── Page.tsx             # Page wrapper with max-width
│   │   │
│   │   ├── shared/
│   │   │   ├── BigIdea.tsx          # Purple gradient callout box
│   │   │   ├── Card.tsx             # Generic card component
│   │   │   ├── CardGrid.tsx         # Grid layout for cards
│   │   │   ├── CodeBlock.tsx        # Syntax-highlighted code display
│   │   │   ├── Callout.tsx          # Warning/info callout with icon
│   │   │   ├── PlatformBadge.tsx    # Colored badge for platforms
│   │   │   ├── CompareTable.tsx     # Comparison table component
│   │   │   └── SectionHeading.tsx   # h3 with colored bar
│   │   │
│   │   └── diagrams/
│   │       ├── ArchitectureDiagram.tsx    # The vision diagram
│   │       ├── FlowDiagram.tsx            # Inbound/outbound flow
│   │       └── InferenceChain.tsx         # Code-style inference display
│   │
│   ├── tabs/
│   │   ├── OverviewTab.tsx          # Tab 1: The Vision
│   │   ├── DataModelTab.tsx         # Tab 2: Dimensional Model
│   │   ├── InputFlowsTab.tsx        # Tab 3: Input Strategies
│   │   ├── SyndicationTab.tsx       # Tab 4: Inbound/Outbound
│   │   └── ExamplesTab.tsx          # Tab 5: Live Examples
│   │
│   ├── data/
│   │   ├── dimensions.ts            # Dimension definitions and values
│   │   ├── platforms.ts             # Platform definitions and colors
│   │   ├── examples.ts              # Example scenarios with canonical data
│   │   └── mappings.ts              # Platform mapping tables
│   │
│   └── styles/
│       └── variables.css            # CSS custom properties (imported by index.css)
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Phase 1: Project Setup & Foundation

### 1.1 Initialize Project

If not already initialized:
```bash
npm create vite@latest property-taxonomy -- --template react-ts
cd property-taxonomy
npm install
```

### 1.2 Set Up CSS Variables

Create `src/styles/variables.css`:

```css
:root {
  /* Base colors */
  --ink: #1c1917;
  --paper: #fafaf9;
  --cream: #f5f5f4;
  --warm-gray: #78716c;
  --border: #e7e5e4;

  /* Platform colors - BSTK and RentSync are aligned (same color) */
  --rentals: #2563eb;
  --rentals-light: #dbeafe;
  --bstk: #0d9488;
  --bstk-light: #ccfbf1;
  --rentsync: #0d9488;
  --rentsync-light: #ccfbf1;
  --spacelist: #ea580c;
  --spacelist-light: #ffedd5;
  --woodcabins: #d97706;
  --woodcabins-light: #fef3c7;
  --canonical: #7c3aed;
  --canonical-light: #ede9fe;

  /* Semantic colors */
  --success: #10b981;
  --success-light: #d1fae5;
  --warning: #f59e0b;
  --warning-light: #fef3c7;

  /* Typography */
  --font-body: 'Commissioner', sans-serif;
  --font-display: 'Fraunces', Georgia, serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
```

### 1.3 Set Up Global Styles

Create `src/index.css` that imports variables and sets up base styles. Reference the HTML file for typography, spacing, and component styles.

### 1.4 Add Google Fonts

In `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Commissioner:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## Phase 2: Data Layer

### 2.1 Create `src/data/platforms.ts`

```typescript
export type PlatformId = 'rentals' | 'bstk' | 'rentsync' | 'spacelist' | 'woodcabins' | 'canonical';

export interface Platform {
  id: PlatformId;
  name: string;
  subtitle: string;
  color: string;
  lightColor: string;
}

export const platforms: Record<PlatformId, Platform> = {
  rentals: {
    id: 'rentals',
    name: 'Rentals.ca',
    subtitle: 'Consumer ILS',
    color: 'var(--rentals)',
    lightColor: 'var(--rentals-light)',
  },
  bstk: {
    id: 'bstk',
    name: 'BSTK',
    subtitle: 'Enterprise · Unit-based',
    color: 'var(--bstk)',
    lightColor: 'var(--bstk-light)',
  },
  // ... etc
};
```

### 2.2 Create `src/data/dimensions.ts`

```typescript
export interface Dimension {
  id: string;
  name: string;
  grouping: 'field' | 'building' | 'contract' | 'theme';
  question: string;
  exampleValues: string[];
}

export const dimensions: Dimension[] = [
  {
    id: 'sector',
    name: 'Sector',
    grouping: 'field',
    question: 'What industry?',
    exampleValues: ['Residential', 'Commercial', 'Recreation'],
  },
  // ... etc
];
```

### 2.3 Create `src/data/examples.ts`

```typescript
export interface CanonicalData {
  sector: string;
  scope: string;
  structureType: string;
  structureSubtype: string;
  unitType: string;
  listingType: string;
  purpose: string;
  amenities: string[];
  commercialFields?: {
    sqft?: number;
    pricePerSqft?: number;
    leaseType?: string;
  };
}

export interface PlatformView {
  display: string;
  filters: string[];
  hidden: string[];
  notes: string;
}

export interface Example {
  id: string;
  category: 'rentals' | 'enterprise' | 'commercial' | 'niche' | 'edge';
  title: string;
  icon: string;
  scenario: string;
  canonical: CanonicalData;
  platformViews: Record<string, PlatformView>;
}

export const examples: Example[] = [
  {
    id: 'sarahs-basement',
    category: 'rentals',
    title: "Sarah's Basement",
    icon: '🏠',
    scenario: 'Sarah is renting out the basement of her detached house. She just wants to post and go.',
    canonical: {
      sector: 'Residential',
      scope: 'Unit',
      structureType: 'House',
      structureSubtype: 'Detached',
      unitType: 'Basement Suite',
      listingType: 'For Rent',
      purpose: 'Conventional',
      amenities: ['Separate Entrance', 'In-unit Laundry', 'Parking'],
    },
    platformViews: {
      rentals: {
        display: 'Basement · House',
        filters: ['Basement', 'Utilities Included'],
        hidden: ['Freehold', 'Detached'],
        notes: 'Simplified for consumer search. "Detached" hidden — renters don\'t filter by house style.',
      },
      // ... other platforms
    },
  },
  // ... more examples
];
```

### 2.4 Create `src/data/mappings.ts`

Store the inbound/outbound mapping tables referenced in the Syndication tab.

---

## Phase 3: Shared Components

Build these components first as they're used across multiple tabs.

### 3.1 Layout Components

**Header.tsx**
- Dark gradient background
- Title + subtitle on left
- Badge on right ("Internal Review")

**TabNavigation.tsx**
- Sticky positioning
- Tab items with icons
- Active state with bottom border
- Props: `tabs: Tab[]`, `activeTab: string`, `onTabChange: (id: string) => void`

**Page.tsx**
- Max-width container
- Standard padding
- Wraps tab content

### 3.2 Shared UI Components

**PlatformBadge.tsx**
```typescript
interface Props {
  platform: PlatformId | PlatformId[];  // Support single or multiple (for "BSTK / RentSync")
  size?: 'sm' | 'md';
}
```

**BigIdea.tsx**
- Purple gradient background
- Small label + large quote text
- Props: `label: string`, `children: ReactNode`

**Card.tsx**
- White background, border, hover shadow
- Optional icon, title, description

**CodeBlock.tsx**
- Dark theme (VS Code-style)
- Syntax highlighting for JSON
- Preserves whitespace
- Props: `code: string`, `language?: 'json' | 'typescript'`

**Callout.tsx**
- Warning/info box with icon
- Props: `type: 'info' | 'warning'`, `title: string`, `children: ReactNode`

**SectionHeading.tsx**
- h3 with colored bar above
- Props: `children: ReactNode`, `color?: string`

**CompareTable.tsx**
- Styled table with header row
- Hover states on rows
- Props: `columns: Column[]`, `rows: Row[]`

### 3.3 Diagram Components

**ArchitectureDiagram.tsx**
- The "Vision" diagram showing Canonical → Mapping Layer → Platforms
- Self-contained, no props needed (or accept `platforms` array)

**FlowDiagram.tsx**
- Three-column layout: Inbound → Canonical → Outbound
- Used in Syndication tab

**InferenceChain.tsx**
- Monospace code-style display
- Shows user input → inferred values
- Props: `input: string`, `inferences: Inference[]`

---

## Phase 4: Tab Components

Each tab should be its own file importing shared components and data.

### 4.1 OverviewTab.tsx

Content:
- Doc label ("The Vision")
- Page title + subtitle
- BigIdea component with core principle quote
- ArchitectureDiagram
- "Why This Matters" section with 3 cards
- "The Four Use Cases" comparison table

### 4.2 DataModelTab.tsx

Content:
- Doc label ("The Bible")
- Page title + subtitle
- Sentence formula box (dark background)
- Dimensions table
- Callout about Condo/Community resolution
- Hierarchy visualization (CodeBlock)
- "Extensibility in Action" section with 2 cards

### 4.3 InputFlowsTab.tsx

Content:
- Doc label ("Data Collection")
- Page title + subtitle
- BigIdea with "Sarah picks Basement" quote
- Three strategy cards:
  1. Inference from Minimal Input (with InferenceChain)
  2. AI / Photo Analysis (with InferenceChain)
  3. Full Taxonomy Access (with mock dropdowns)
- Architecture diagram showing three paths → canonical

### 4.4 SyndicationTab.tsx

Content:
- Doc label ("Data Flow")
- Page title + subtitle
- FlowDiagram (Inbound → Canonical → Outbound)
- "Inbound Challenge" table
- "Inbound Mapping Strategies" cards
- Yardi → Canonical mapping table
- "Outbound: Platform-Specific Display" section
- CodeBlock showing mapping examples
- Callout with open questions

### 4.5 ExamplesTab.tsx

Content:
- Doc label ("Interactive")
- Page title + subtitle
- Example browser component:
  - Tab bar with example names
  - Scenario box
  - Canonical data display (CodeBlock with JSON)
  - Platform mappings grid (4 cards)
- BigIdea with key takeaway

**Component structure:**
```typescript
// Consider breaking into sub-components:
// - ExampleBrowser.tsx (container with tab state)
// - ExampleScenario.tsx (scenario box)
// - CanonicalDisplay.tsx (JSON code block)
// - PlatformMappingsGrid.tsx (4 mapping cards)
// - MappingCard.tsx (individual platform mapping)
```

---

## Phase 5: App Assembly

### 5.1 App.tsx

```typescript
import { useState } from 'react';
import Header from './components/layout/Header';
import TabNavigation from './components/layout/TabNavigation';
import OverviewTab from './tabs/OverviewTab';
import DataModelTab from './tabs/DataModelTab';
import InputFlowsTab from './tabs/InputFlowsTab';
import SyndicationTab from './tabs/SyndicationTab';
import ExamplesTab from './tabs/ExamplesTab';

const tabs = [
  { id: 'overview', label: 'Overview', icon: '🎯' },
  { id: 'data-model', label: 'Data Model', icon: '📐' },
  { id: 'input-flows', label: 'Input Flows', icon: '📥' },
  { id: 'syndication', label: 'Syndication', icon: '🔄' },
  { id: 'examples', label: 'Live Examples', icon: '💡' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="app">
      <Header />
      <TabNavigation 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      <main>
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'data-model' && <DataModelTab />}
        {activeTab === 'input-flows' && <InputFlowsTab />}
        {activeTab === 'syndication' && <SyndicationTab />}
        {activeTab === 'examples' && <ExamplesTab />}
      </main>
    </div>
  );
}
```

---

## Phase 6: Polish & QA

### 6.1 Responsive Design
- Test at mobile, tablet, desktop widths
- Tab bar should scroll horizontally on mobile
- Card grids collapse to single column
- Flow diagrams stack vertically on mobile

### 6.2 Accessibility
- Proper heading hierarchy
- Tab navigation keyboard accessible
- Color contrast meets WCAG AA
- Focus states visible

### 6.3 Code Quality
- No TypeScript errors
- Components properly typed
- Data files have complete types
- No hardcoded strings that should be in data files

---

## Acceptance Criteria

### Must Have
- [ ] All 5 tabs render correctly
- [ ] Tab navigation works
- [ ] Example browser switches between examples
- [ ] All diagrams display correctly
- [ ] Code blocks preserve whitespace
- [ ] Platform badges show correct colors
- [ ] BSTK and RentSync use same color (teal)

### Should Have
- [ ] Responsive at 768px and 480px breakpoints
- [ ] Smooth tab transitions
- [ ] Hover states on interactive elements

### Nice to Have
- [ ] URL routing for tabs (e.g., `/taxonomy/data-model`)
- [ ] Keyboard navigation for example browser
- [ ] Print-friendly styles

---

## Reference

The `property-taxonomy-demo.html` file contains:
- All content (copy from there)
- All styling (reference for CSS)
- Working interactions (reference for behavior)

When in doubt, match the HTML prototype exactly, then improve organization.

---

## Estimated Effort

| Phase | Effort |
|-------|--------|
| Phase 1: Setup | 1 hour |
| Phase 2: Data Layer | 1-2 hours |
| Phase 3: Shared Components | 2-3 hours |
| Phase 4: Tab Components | 3-4 hours |
| Phase 5: App Assembly | 30 min |
| Phase 6: Polish | 1-2 hours |
| **Total** | **8-12 hours** |

---

## Notes for Claude Code

1. **Start with data layer** — Get the types and data structures right first
2. **Build bottom-up** — Shared components before tabs
3. **Match the prototype** — The HTML file is the source of truth for content and styling
4. **Keep components small** — If a component exceeds ~100 lines, consider splitting
5. **Use CSS modules or styled-components** — Avoid global CSS conflicts
6. **Test each tab independently** — Render just that tab during development
