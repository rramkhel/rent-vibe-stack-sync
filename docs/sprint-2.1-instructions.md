# Sprint 2.1: Set Up Modular Structure + Design System

## Objective
Create the folder structure and foundational CSS for the landlord listing prototype.

## Prerequisites
- Milestone 01 complete (hub + placeholder exist)
- Local dev server working (`python3 -m http.server 8080`)

## Step 1: Create Folder Structure

```bash
cd /Users/jupiter/Projects/rent-vibe-stack-sync/landlord-login

# Create directories
mkdir -p css js screens components data

# Verify structure
ls -la
```

Expected:
```
landlord-login/
├── index.html          # Existing placeholder (will replace)
├── css/
├── js/
├── screens/
├── components/
└── data/
```

## Step 2: Create Design System CSS

Create `landlord-login/css/design-system.css`:

```css
/* ==========================================
   DESIGN SYSTEM - Landlord Login Prototype
   Extracted from Lovable prototype
   ========================================== */

:root {
  /* Primary Colors */
  --primary-blue: #3B82F6;
  --primary-blue-hover: #2563EB;
  --primary-blue-light: #EFF6FF;
  
  /* Pink/Coral - CTAs and AI features */
  --primary-pink: #EC4899;
  --primary-pink-hover: #DB2777;
  --primary-pink-light: #FDF2F8;
  
  /* Teal - Progress and success */
  --teal: #14B8A6;
  --teal-light: #CCFBF1;
  
  /* Neutrals */
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  --border: #E5E7EB;
  --border-dark: #D1D5DB;
  --background: #FFFFFF;
  --background-subtle: #F9FAFB;
  --background-muted: #F3F4F6;
  
  /* Semantic */
  --success: #10B981;
  --success-light: #D1FAE5;
  --warning: #F59E0B;
  --warning-light: #FEF3C7;
  --error: #EF4444;
  --error-light: #FEE2E2;
  
  /* AI Accent */
  --ai-purple: #8B5CF6;
  --ai-purple-light: #EDE9FE;
  
  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}

/* ==========================================
   RESET & BASE
   ========================================== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-family);
  color: var(--text-primary);
  background: var(--background);
  line-height: 1.5;
  min-height: 100vh;
}

/* ==========================================
   TYPOGRAPHY
   ========================================== */
h1, h2, h3, h4 {
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-primary);
}

h1 { font-size: 1.875rem; }
h2 { font-size: 1.5rem; }
h3 { font-size: 1.25rem; }
h4 { font-size: 1rem; }

p { color: var(--text-secondary); }

a {
  color: var(--primary-blue);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* ==========================================
   UTILITIES
   ========================================== */
.hidden { display: none !important; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* Spacing utilities */
.mt-xs { margin-top: var(--space-xs); }
.mt-sm { margin-top: var(--space-sm); }
.mt-md { margin-top: var(--space-md); }
.mt-lg { margin-top: var(--space-lg); }
.mt-xl { margin-top: var(--space-xl); }

.mb-xs { margin-bottom: var(--space-xs); }
.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }
.mb-xl { margin-bottom: var(--space-xl); }

/* Text utilities */
.text-center { text-align: center; }
.text-muted { color: var(--text-muted); }
.text-secondary { color: var(--text-secondary); }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
```

## Step 3: Create Components CSS

Create `landlord-login/css/components.css`:

```css
/* ==========================================
   COMPONENTS - Buttons, Forms, Cards, etc.
   ========================================== */

/* ==========================================
   BUTTONS
   ========================================== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  border: none;
  line-height: 1;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-primary {
  background: var(--primary-blue);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-blue-hover);
}

.btn-primary:disabled {
  background: var(--background-muted);
  color: var(--text-muted);
}

.btn-pink {
  background: var(--primary-pink);
  color: white;
}

.btn-pink:hover:not(:disabled) {
  background: var(--primary-pink-hover);
}

.btn-outline {
  background: var(--background);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-outline:hover:not(:disabled) {
  border-color: var(--text-primary);
}

.btn-outline-pink {
  background: var(--background);
  color: var(--primary-pink);
  border: 1px solid var(--primary-pink);
}

.btn-outline-pink:hover:not(:disabled) {
  background: var(--primary-pink-light);
}

.btn-ghost {
  background: transparent;
  color: var(--text-primary);
  text-decoration: underline;
  padding: var(--space-sm);
}

.btn-ghost:hover {
  color: var(--text-secondary);
}

.btn-sm {
  padding: 8px 16px;
  font-size: 0.875rem;
}

.btn-lg {
  padding: 16px 32px;
  font-size: 1rem;
}

.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: var(--radius-md);
}

/* ==========================================
   FORM ELEMENTS
   ========================================== */
.form-group {
  margin-bottom: var(--space-lg);
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.form-label .required {
  color: var(--primary-pink);
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: 1rem;
  color: var(--text-primary);
  background: var(--background);
  transition: all var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--text-primary);
  box-shadow: 0 0 0 1px var(--text-primary);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input:disabled {
  background: var(--background-muted);
  cursor: not-allowed;
}

.form-input-error {
  border-color: var(--error);
}

.form-input-error:focus {
  box-shadow: 0 0 0 1px var(--error);
}

.form-error {
  font-size: 0.875rem;
  color: var(--error);
  margin-top: var(--space-xs);
}

.form-hint {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: var(--space-xs);
}

/* Input with icon */
.form-input-with-icon {
  position: relative;
}

.form-input-with-icon .form-input {
  padding-left: 44px;
}

.form-input-with-icon .input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

/* Select */
.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 44px;
}

/* Checkbox */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.875rem;
  color: var(--text-secondary);
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--primary-blue);
  cursor: pointer;
}

/* Radio */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.radio-label {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.875rem;
  color: var(--text-primary);
  cursor: pointer;
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}

.radio-label:hover {
  background: var(--background-subtle);
}

.radio-label input[type="radio"] {
  width: 18px;
  height: 18px;
  accent-color: var(--primary-blue);
  cursor: pointer;
}

/* ==========================================
   SELECTION CARDS
   ========================================== */
.selection-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}

@media (max-width: 640px) {
  .selection-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.selection-card {
  position: relative;
  padding: var(--space-lg) var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--background);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
}

.selection-card:hover {
  border-color: var(--text-primary);
}

.selection-card.selected {
  border-color: var(--text-primary);
  border-width: 2px;
}

.selection-card-icon {
  width: 32px;
  height: 32px;
  margin: 0 auto var(--space-sm);
  color: var(--text-secondary);
}

.selection-card.selected .selection-card-icon {
  color: var(--text-primary);
}

.selection-card-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

/* ==========================================
   PILLS
   ========================================== */
.pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.pill {
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  background: var(--background);
  color: var(--text-primary);
}

.pill:hover {
  border-color: var(--text-primary);
}

.pill.selected {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

/* ==========================================
   CARDS
   ========================================== */
.card {
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
}

.card-header {
  margin-bottom: var(--space-md);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.card-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: var(--space-xs);
}

/* ==========================================
   BADGES
   ========================================== */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-blue {
  background: var(--primary-blue-light);
  color: var(--primary-blue);
}

.badge-pink {
  background: var(--primary-pink-light);
  color: var(--primary-pink);
}

.badge-success {
  background: var(--success-light);
  color: var(--success);
}

.badge-warning {
  background: var(--warning-light);
  color: var(--warning);
}

.badge-ai {
  background: var(--ai-purple-light);
  color: var(--ai-purple);
}
```

## Step 4: Create Screens CSS

Create `landlord-login/css/screens.css`:

```css
/* ==========================================
   SCREEN LAYOUTS
   ========================================== */

/* App Container */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: var(--background);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-lg);
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.header-back {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  padding: var(--space-sm);
  margin-left: calc(-1 * var(--space-sm));
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}

.header-back:hover {
  background: var(--background-subtle);
  text-decoration: none;
}

.header-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  color: var(--text-primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.header-link {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.header-link:hover {
  color: var(--text-primary);
  text-decoration: none;
}

/* Progress Dots */
.progress-dots {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
  transition: all var(--transition-normal);
}

.progress-dot.active,
.progress-dot.completed {
  background: var(--primary-blue);
}

/* Main Content */
.main-content {
  flex: 1;
  padding-top: 64px;
}

/* Screen */
.screen {
  display: none;
  min-height: calc(100vh - 64px);
  animation: fadeIn var(--transition-normal);
}

.screen.active {
  display: block;
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Content Containers */
.content-centered {
  max-width: 560px;
  margin: 0 auto;
  padding: var(--space-2xl) var(--space-lg);
}

.content-wide {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-2xl) var(--space-lg);
}

@media (max-width: 640px) {
  .content-centered,
  .content-wide {
    padding: var(--space-xl) var(--space-md);
  }
  
  .header-center {
    display: none;
  }
}

/* Screen Header */
.screen-header {
  margin-bottom: var(--space-xl);
}

.screen-title {
  font-size: 1.5rem;
  margin-bottom: var(--space-xs);
  position: relative;
  display: inline-block;
}

.screen-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 40px;
  height: 3px;
  background: var(--primary-blue);
  border-radius: 2px;
}

.screen-subtitle {
  color: var(--text-secondary);
  margin-top: var(--space-sm);
}

/* Section */
.section {
  margin-bottom: var(--space-xl);
}

.section-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.section-divider {
  height: 1px;
  background: var(--border);
  margin: var(--space-xl) 0;
}

/* Footer Navigation */
.footer-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--background);
  border-top: 1px solid var(--border);
  padding: var(--space-md) var(--space-lg);
  z-index: 100;
}

.footer-nav-inner {
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Ensure content doesn't get hidden behind fixed footer */
.screen-content {
  padding-bottom: 100px;
}
```

## Step 5: Create Shell HTML

Replace `landlord-login/index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Create Your Listing | Rentals.ca</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
  
  <!-- Styles -->
  <link rel="stylesheet" href="css/design-system.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/screens.css">
</head>
<body>
  <div id="app" class="app-container">
    <!-- Header injected by JS -->
    <div id="header-container"></div>
    
    <!-- Main Content -->
    <main class="main-content">
      <!-- Screens injected by JS -->
      <div id="screens-container"></div>
    </main>
    
    <!-- Footer Nav injected by JS -->
    <div id="footer-container"></div>
    
    <!-- Modals injected by JS -->
    <div id="modals-container"></div>
  </div>
  
  <!-- Scripts -->
  <script src="data/mock-data.js"></script>
  <script src="js/state.js"></script>
  <script src="js/router.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```

## Step 6: Create Placeholder JS Files

Create empty placeholder files (we'll fill these in Sprint 2.2):

**`landlord-login/js/state.js`:**
```javascript
// State management - Sprint 2.2
console.log('state.js loaded');
```

**`landlord-login/js/router.js`:**
```javascript
// Router - Sprint 2.2
console.log('router.js loaded');
```

**`landlord-login/js/app.js`:**
```javascript
// Main app - Sprint 2.2
console.log('app.js loaded');

// Temporary: show that it's working
document.getElementById('screens-container').innerHTML = `
  <div style="padding: 100px 20px; text-align: center;">
    <h1>🚧 Landlord Login Prototype</h1>
    <p style="color: #6B7280; margin-top: 16px;">
      Modular structure set up! Check console for loaded files.
    </p>
    <p style="color: #9CA3AF; margin-top: 8px; font-size: 14px;">
      Sprint 2.1 complete. Continue to Sprint 2.2.
    </p>
  </div>
`;
```

**`landlord-login/data/mock-data.js`:**
```javascript
// Mock data - Sprint 2.2
console.log('mock-data.js loaded');

const MOCK_DATA = {
  // Will be populated in later sprints
};
```

## Step 7: Test Locally

```bash
cd /Users/jupiter/Projects/rent-vibe-stack-sync
python3 -m http.server 8080
```

Visit `http://localhost:8080/landlord-login/`

### Verify:
- [ ] Page loads without errors
- [ ] Console shows all 4 JS files loaded
- [ ] "Modular structure set up!" message displays
- [ ] No 404s in Network tab for CSS/JS files

## Step 8: Commit

```bash
git add .
git status
git commit -m "Sprint 2.1: Set up modular structure for landlord-login

- Create folder structure (css, js, screens, components, data)
- Add design-system.css with color/typography variables
- Add components.css with buttons, forms, cards, pills
- Add screens.css with layout and screen transitions
- Replace placeholder with modular shell HTML
- Add placeholder JS files"

# Don't push yet - continue to Sprint 2.2
```

## Output Required
Confirm:
1. All folders created
2. All CSS files created and loading
3. Shell HTML working
4. Console shows JS files loading
5. No errors

Report status before proceeding to Sprint 2.2.
