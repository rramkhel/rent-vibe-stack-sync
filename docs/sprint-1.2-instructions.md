# Milestone 01.2: Move Current Homepage to /rent-vibes

## Objective
Relocate the current homepage content to a new `/rent-vibes` route without breaking anything.

## Prerequisites
- Completed milestone 01.1 (know the framework and file structure)

## Instructions

### For Next.js App Router
```bash
# Create the rent-vibes route directory
mkdir -p app/rent-vibes

# Copy current homepage to new location
cp app/page.tsx app/rent-vibes/page.tsx
```

### For Next.js Pages Router
```bash
# Copy current homepage to new route
cp pages/index.js pages/rent-vibes.js
# OR if using folder structure:
mkdir -p pages/rent-vibes
cp pages/index.js pages/rent-vibes/index.js
```

### For Plain HTML
```bash
# Create directory and move
mkdir -p rent-vibes
cp index.html rent-vibes/index.html
```

## Post-Move Checklist

### Step 1: Update Internal Links
Search the moved file for any self-references and update if needed:
```bash
grep -r "href=\"/\"" app/rent-vibes/ 2>/dev/null
grep -r "href='\/'" app/rent-vibes/ 2>/dev/null
```

### Step 2: Check for Relative Imports
If the file imports components or assets with relative paths, these may need updating:
```bash
grep -r "from '\.\." app/rent-vibes/ 2>/dev/null
grep -r "from \"\.\." app/rent-vibes/ 2>/dev/null
```
Adjust paths as needed (e.g., `../components` → `../../components`)

### Step 3: Test the New Route
```bash
npm run dev
# or
yarn dev
```
Visit `http://localhost:3000/rent-vibes` and verify:
- [ ] Page loads without errors
- [ ] All styling intact
- [ ] All functionality works
- [ ] No console errors

## Do NOT Delete Original Yet
Keep the original homepage file for now. We'll replace it in milestone 01.3.

## Output Required
Confirm:
1. New route file created at correct location
2. Any import paths that needed updating
3. Test results from visiting /rent-vibes

Report status before proceeding to 01.3.
