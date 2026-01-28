# Milestone 01.4: Create Landlord Login Placeholder

## Objective
Create a placeholder page at `/landlord-login` that indicates the feature is coming soon.

## Design Specifications

### Layout
- Centered content
- Clean, professional appearance
- Matches hub page styling

### Content
- Lucide icon: `KeyRound` or `Sparkles` (AI theme)
- Title: "Landlord Login"
- Subtitle: "AI-Powered Listing Creation"
- Description: Brief explanation of what's coming
- "Coming Soon" indicator
- Back link to hub

### Key Features to Tease (optional)
Based on the planned feature:
- Conversational listing creation
- AI-assisted descriptions
- Real-time preview
- Quick 3-minute setup

## Implementation

### Step 1: Create Route Directory
```bash
# For Next.js app router
mkdir -p app/landlord-login

# For Next.js pages router
# Will create single file instead
```

### Step 2: Create Placeholder Page

#### For Next.js App Router
Create `app/landlord-login/page.tsx`:

```jsx
import { KeyRound, Sparkles, MessageSquare, Eye, Clock } from 'lucide-react';
import Link from 'next/link';

const features = [
  { icon: MessageSquare, text: 'Conversational listing creation' },
  { icon: Sparkles, text: 'AI-assisted descriptions' },
  { icon: Eye, text: 'Real-time preview' },
  { icon: Clock, text: 'Ready in under 3 minutes' },
];

export default function LandlordLogin() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Back link */}
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          ← Back to prototypes
        </Link>

        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
          <KeyRound className="w-8 h-8 text-purple-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Landlord Login
        </h1>
        <p className="text-lg text-purple-600 font-medium mb-4">
          AI-Powered Listing Creation
        </p>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
          Coming Soon
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-10 max-w-md mx-auto">
          Create professional rental listings in minutes through a simple conversation. 
          Our AI guides you through each step while building your listing in real-time.
        </p>

        {/* Feature Preview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-left">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            What's Coming
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <feature.icon className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
```

#### For Next.js Pages Router
Create `pages/landlord-login.js` with same content, adjusting imports as needed.

### Step 3: Test
```bash
npm run dev
```
Visit `http://localhost:3000/landlord-login` and verify:
- [ ] Page loads without errors
- [ ] Styling matches hub page aesthetic
- [ ] Back link works (returns to hub)
- [ ] Responsive on mobile
- [ ] "Coming Soon" badge visible

Also test from hub:
- [ ] Clicking "Landlord Login" card navigates correctly

## Output Required
Confirm:
1. Placeholder page created
2. Navigation from hub works
3. Back link to hub works
4. Page looks professional and matches design system

Report status before proceeding to 01.5.
