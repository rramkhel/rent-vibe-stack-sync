# Milestone 01.1: Audit Current Structure

## Objective
Understand the current project structure before making changes.

## Instructions

### Step 1: Check Project Framework
Determine what framework is being used:
```bash
cat package.json
```
Look for: Next.js, React, Vite, or plain HTML/CSS/JS

### Step 2: Map File Structure
```bash
ls -la
ls -la src/ 2>/dev/null || ls -la pages/ 2>/dev/null || ls -la app/ 2>/dev/null
```

### Step 3: Identify Routing Pattern
Based on framework:
- **Next.js (pages router)**: Check `pages/` directory
- **Next.js (app router)**: Check `app/` directory  
- **Vite/React**: Check `src/` for React Router setup
- **Plain HTML**: Check for multiple `.html` files

### Step 4: Find Current Homepage
Locate the file serving the root URL (`/`):
- Next.js pages: `pages/index.js` or `pages/index.tsx`
- Next.js app: `app/page.js` or `app/page.tsx`
- Vite: `src/App.jsx` or `index.html`
- Plain: `index.html`

### Step 5: Document Existing Routes
List all current routes/pages and their file locations.

## Output Required
Before proceeding to 01.2, confirm:
1. Framework being used
2. Routing method
3. Location of current homepage file
4. List of existing routes/pages
5. Any shared components or layouts

## Example Output Format
```
Framework: Next.js (app router)
Homepage: app/page.tsx
Existing routes:
  - / (homepage)
  - /is-basement (quiz)
  - /presentation (vision slides)
Shared components: app/layout.tsx, components/
```

Report findings before proceeding.
