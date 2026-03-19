# Claude Code Sprint: Property Taxonomy v3

## The goal

Replace the bloated `property-taxonomy-v2` docs site with a clean v3 project containing just three things: the taxonomy presentation, the amenities presentation, and the builder. No build system, no canonical JSON pipeline, no audit tool, no sections/reference folders. Two self-contained HTML docs and the builder tool.

When this is done:
- `property-taxonomy-v3` appears on the demo-vault homepage
- `property-taxonomy-v2` is removed from the homepage (deprecated)
- The v3 index page links to all three resources
- Both HTML presentations load and work with full interactivity (collapsible sections, tab switching, etc.)
- The builder loads and works from its new location
- v1 and v2 folders are **untouched** — leave them exactly as they are

---

## What NOT to change

- **Do NOT modify anything in `public/projects/property-taxonomy/`** (v1 — leave it alone)
- **Do NOT modify anything in `public/projects/property-taxonomy-v2/`** (v2 — leave it alone, just deprecate it in access-config)
- **Do NOT modify the two presentation HTML files** — copy them exactly as provided, no "improvements"
- **Do NOT restructure or refactor the builder** — copy it with its dependencies as-is
- **Do NOT create a build system, canonical JSON pipeline, or any generated files**

---

## Step 1: Create the v3 project folder

Create the directory structure:

```
public/projects/property-taxonomy-v3/
├── index.html              ← NEW: landing page linking to all 3 resources
├── taxonomy.html           ← COPY: from taxonomy-presentation.html (provided below)
├── amenities.html          ← COPY: from amenities-presentation.html (provided below)
└── playground/             ← COPY: builder + data from v2
    ├── builder.html
    ├── builder.css
    ├── builder.js
    ├── taxonomy-data.js
    └── amenities-data.js
```

### 1a. Copy the builder from v2

```bash
# Copy the entire playground folder from v2 to v3
cp -r public/projects/property-taxonomy-v2/playground/ public/projects/property-taxonomy-v3/playground/
```

After copying, open `playground/builder.html` and check ALL `<script src="...">` and `<link href="...">` tags. If any paths point to `../` or `../../property-taxonomy-v2/` or `../../property-taxonomy/`, fix them to be relative to the new location. The builder should load its CSS and JS from `./` (same directory).

Also check `builder.js` for any hardcoded paths. Run:

```bash
grep -rn "property-taxonomy-v2\|property-taxonomy/" public/projects/property-taxonomy-v3/playground/ --include="*.js" --include="*.html" --include="*.css"
```

Fix any matches to use relative paths within v3.

### 1b. Copy the two presentation files

The source files are **Rachel's files** — she will provide them. They go here:

- `taxonomy-presentation.html` → `public/projects/property-taxonomy-v3/taxonomy.html`
- `amenities-presentation.html` → `public/projects/property-taxonomy-v3/amenities.html`

**Do not modify these files.** Copy them exactly. They are fully self-contained (all CSS/JS inline, no external dependencies except one Google Fonts link in the amenities file).

### 1c. Create the index page

Create `public/projects/property-taxonomy-v3/index.html` with this content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Property Taxonomy v5 — The Bible</title>
<style>
:root {
  --bg: #FAFAF8; --surface: #FFFFFF; --text-1: #1A1A18;
  --text-2: #6B6B66; --text-3: #9E9E98; --border: #E8E7E3;
  --teal: #0d9488; --teal-bg: #E1F5EE; --teal-dark: #085041;
  --purple: #7c3aed; --purple-bg: #EEEDFE; --purple-dark: #3C3489;
  --amber: #b45309; --amber-bg: #FAEEDA; --amber-dark: #633806;
  --sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--sans); background: var(--bg); color: var(--text-1); line-height: 1.6; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.container { max-width: 640px; width: 100%; padding: 48px 24px; }
.badge { display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; padding: 4px 12px; border-radius: 4px; background: var(--teal-bg); color: var(--teal-dark); margin-bottom: 16px; }
h1 { font-size: 32px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 8px; }
.sub { font-size: 15px; color: var(--text-2); margin-bottom: 40px; max-width: 500px; }
.cards { display: flex; flex-direction: column; gap: 12px; }
a.card { display: block; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 20px 24px; text-decoration: none; color: inherit; transition: all 0.15s; }
a.card:hover { border-color: var(--teal); box-shadow: 0 2px 8px rgba(0,0,0,0.04); transform: translateY(-1px); }
.card .label { font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; display: inline-block; padding: 2px 8px; border-radius: 4px; margin-bottom: 6px; }
.card .label.teal { background: var(--teal-bg); color: var(--teal-dark); }
.card .label.purple { background: var(--purple-bg); color: var(--purple-dark); }
.card .label.amber { background: var(--amber-bg); color: var(--amber-dark); }
.card h2 { font-size: 17px; font-weight: 600; margin-bottom: 4px; }
.card p { font-size: 13px; color: var(--text-2); margin: 0; }
.foot { margin-top: 40px; text-align: center; color: var(--text-3); font-size: 12px; }
</style>
</head>
<body>
<div class="container">
  <div class="badge">Property Taxonomy v5.1</div>
  <h1>The Bible</h1>
  <p class="sub">Canonical property classification and amenities system for the RentSync platform ecosystem.</p>
  <div class="cards">
    <a class="card" href="taxonomy.html">
      <span class="label teal">Documentation</span>
      <h2>Property Taxonomy</h2>
      <p>The canonical classification model — sectors, building types, subtypes, units, transactions, and the full cascade for residential, commercial, and mixed-use properties.</p>
    </a>
    <a class="card" href="amenities.html">
      <span class="label purple">Documentation</span>
      <h2>Amenities System</h2>
      <p>How amenities, utilities, and custom features are structured, stored, and searched. Includes data types, category shortlists, AI detection mapping, and the custom-to-canonical promotion pipeline.</p>
    </a>
    <a class="card" href="playground/builder.html">
      <span class="label amber">Tool</span>
      <h2>Listing Builder</h2>
      <p>Interactive tool for building and validating listing data against the canonical taxonomy. Select fields, see the cascade, review the output.</p>
    </a>
  </div>
  <div class="foot">RentSync · March 2026</div>
</div>
</body>
</html>
```

---

## Step 2: Create the Next.js route page

Create `src/app/property-taxonomy-v3/page.tsx`:

```tsx
import { ProjectShell } from '@/components/project-shell';

export default function PropertyTaxonomyV3Page() {
  return (
    <ProjectShell
      title="Property Taxonomy v5"
      iframeSrc="/projects/property-taxonomy-v3/index.html"
    />
  );
}
```

---

## Step 3: Update access-config.ts

File: `src/lib/access-config.ts`

### 3a. Deprecate v2

Find the `property-taxonomy-v2` entry in the `projects` array and change its status from `'live'` to `'deprecated'`.

Before:
```ts
  {
    slug: 'property-taxonomy-v2',
    title: 'Property Taxonomy v4.2',
    description: 'Universal property classification system — docs, reference, and tools',
    icon: 'BookOpen',
    color: 'blue',
    status: 'live',
    allowedRoles: ['admin', 'leadership', 'ils-team', 'data-team', 'pm-team'],
  },
```

After:
```ts
  {
    slug: 'property-taxonomy-v2',
    title: 'Property Taxonomy v4.2',
    description: 'Universal property classification system — docs, reference, and tools',
    icon: 'BookOpen',
    color: 'blue',
    status: 'deprecated',
    allowedRoles: ['admin', 'leadership', 'ils-team', 'data-team', 'pm-team'],
  },
```

### 3b. Add v3

Add a new entry to the `projects` array (put it after the v2 entry):

```ts
  {
    slug: 'property-taxonomy-v3',
    title: 'Property Taxonomy v5',
    description: 'The Bible — canonical property classification and amenities system',
    icon: 'BookOpen',
    color: 'emerald',
    status: 'live',
    allowedRoles: ['admin', 'leadership', 'ils-team', 'data-team', 'pm-team'],
  },
```

---

## Step 4: Copy the two HTML presentation files

**PREREQUISITE:** Before running this sprint, Rachel will place two files in the repo root:
- `taxonomy-presentation.html` (1027 lines, title: "RentSync Property Taxonomy — The Bible")
- `amenities-presentation.html` (953 lines, title: "Amenities System — RentSync Property Taxonomy")

Copy them into position:

```bash
cp taxonomy-presentation.html public/projects/property-taxonomy-v3/taxonomy.html
cp amenities-presentation.html public/projects/property-taxonomy-v3/amenities.html
```

**Do not modify these files in any way.** No formatting changes, no path fixes, no restructuring. They are fully self-contained.

If the files are NOT in the repo root, check these alternative locations:
- `docs/taxonomy-presentation.html`
- `_source/taxonomy-presentation.html`

If you truly cannot find them, stop and tell Rachel. Do NOT create placeholder files.

---

## Step 5: Verify

Run these checks:

```bash
# 1. v3 folder exists with all expected files
ls -la public/projects/property-taxonomy-v3/
ls -la public/projects/property-taxonomy-v3/playground/

# 2. No references to v2 paths in v3 files
grep -rn "property-taxonomy-v2" public/projects/property-taxonomy-v3/ --include="*.html" --include="*.js" --include="*.css"
# Expected: 0 results

# 3. No references to v1 paths in v3 files
grep -rn "property-taxonomy/" public/projects/property-taxonomy-v3/ --include="*.html" --include="*.js" --include="*.css" | grep -v "property-taxonomy-v3"
# Expected: 0 results

# 4. Route page exists
cat src/app/property-taxonomy-v3/page.tsx

# 5. v2 is deprecated in access-config
grep -A2 "property-taxonomy-v2" src/lib/access-config.ts | grep status
# Expected: status: 'deprecated'

# 6. v3 is live in access-config
grep -A2 "property-taxonomy-v3" src/lib/access-config.ts | grep status
# Expected: status: 'live'

# 7. v1 and v2 folders are untouched
git diff --stat public/projects/property-taxonomy/
git diff --stat public/projects/property-taxonomy-v2/
# Expected: nothing changed in either
```

Then start the dev server and verify:

```bash
npm run dev -- -p 3001
```

- Visit `http://localhost:3001` — v3 should appear on the homepage, v2 should NOT
- Visit `http://localhost:3001/property-taxonomy-v3` — should show the index page in ProjectShell iframe
- Click "Property Taxonomy" link — taxonomy.html loads with working collapsible cascades
- Click "Amenities System" link — amenities.html loads with working tab switching and category shortlist demo
- Click "Listing Builder" link — builder loads and works (dropdowns populate, cascade works)

---

## Execution order

1. Create the `public/projects/property-taxonomy-v3/` folder
2. Copy playground/ from v2 to v3
3. Fix any path references in the copied builder files
4. Copy (or create placeholders for) taxonomy.html and amenities.html
5. Create index.html
6. Create the route page
7. Update access-config.ts (deprecate v2, add v3)
8. Run verification checks
9. Commit with message: `feat: add property-taxonomy-v3 — clean two-doc presentation + builder`

---

## Files created

| File | What it is |
|------|-----------|
| `public/projects/property-taxonomy-v3/index.html` | Landing page linking to all 3 resources |
| `public/projects/property-taxonomy-v3/taxonomy.html` | Property taxonomy presentation (The Bible) |
| `public/projects/property-taxonomy-v3/amenities.html` | Amenities system presentation |
| `public/projects/property-taxonomy-v3/playground/builder.html` | Listing builder (copied from v2) |
| `public/projects/property-taxonomy-v3/playground/builder.css` | Builder styles (copied from v2) |
| `public/projects/property-taxonomy-v3/playground/builder.js` | Builder logic (copied from v2) |
| `public/projects/property-taxonomy-v3/playground/taxonomy-data.js` | Builder data (copied from v2) |
| `public/projects/property-taxonomy-v3/playground/amenities-data.js` | Builder data (copied from v2) |
| `src/app/property-taxonomy-v3/page.tsx` | Next.js route page |

## Files modified

| File | Change |
|------|--------|
| `src/lib/access-config.ts` | Deprecate v2, add v3 entry |

## Files NOT modified (confirm these are untouched)

| File/Folder | Why |
|-------------|-----|
| `public/projects/property-taxonomy/` | v1 — leave alone |
| `public/projects/property-taxonomy-v2/` | v2 — leave alone, just deprecated in config |
| Everything else | Not relevant to this sprint |
