# Milestone 01.3: Create New Hub Homepage

## Objective
Replace the original homepage with a portfolio-style hub page linking to all prototypes.

## Design Specifications

### Layout
- Clean, centered layout
- Header: "RentSync Prototypes" or similar
- Subtitle: Brief description (optional)
- Grid of project cards (responsive: 1 col mobile, 2 col desktop)

### Card Design
Each card should include:
- Lucide icon (NO emoji)
- Project title
- Brief description (1-2 sentences)
- Visual indication it's clickable (hover state)

### Projects to Include

**Card 1: Rent Vibes**
- Icon: `Home` or `Building2` from Lucide
- Title: "Rent Vibes"
- Description: "Rental listing experience and tools"
- Link: `/rent-vibes`

**Card 2: Landlord Login**
- Icon: `KeyRound` or `UserCheck` from Lucide
- Title: "Landlord Login"
- Description: "AI-powered listing creation for landlords"
- Link: `/landlord-login`
- Badge: "Coming Soon" (subtle, optional)

### Styling Guidelines
- Use existing design system if present (check for tailwind.config, globals.css, etc.)
- If Tailwind: Use utility classes
- Colors: Professional, clean (blues, grays, whites)
- Typography: Clean sans-serif
- Spacing: Generous padding and margins

## Implementation

### Step 1: Install Lucide (if not present)
```bash
npm install lucide-react
# or
yarn add lucide-react
```

### Step 2: Create New Homepage
Replace the content of the homepage file (identified in 01.1) with the new hub page.

### Code Template (React/Next.js)
```jsx
import { Home, KeyRound } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'Rent Vibes',
    description: 'Rental listing experience and tools',
    href: '/rent-vibes',
    icon: Home,
  },
  {
    title: 'Landlord Login',
    description: 'AI-powered listing creation for landlords',
    href: '/landlord-login',
    icon: KeyRound,
    comingSoon: true,
  },
];

export default function Hub() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          RentSync Prototypes
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Product explorations and proof of concepts
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.href}
              href={project.href}
              className="block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <project.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {project.title}
                    </h2>
                    {project.comingSoon && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
```

### Step 3: Adjust for Your Setup
- If NOT using Tailwind, convert to CSS modules or styled-components
- If using app router with layout, ensure styles don't conflict
- Match existing font and color choices if design system exists

### Step 4: Test
```bash
npm run dev
```
Visit `http://localhost:3000` and verify:
- [ ] Hub page loads at root
- [ ] Both cards display correctly
- [ ] Clicking "Rent Vibes" goes to /rent-vibes
- [ ] Clicking "Landlord Login" goes to /landlord-login (will 404 for now, that's okay)
- [ ] Responsive on mobile
- [ ] Hover states work

## Output Required
Confirm:
1. Hub page created and displaying
2. Navigation to /rent-vibes works
3. Screenshot or description of how it looks

Report status before proceeding to 01.4.
