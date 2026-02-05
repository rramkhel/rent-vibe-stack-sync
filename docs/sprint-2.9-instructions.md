# Sprint 2.9: Polish, Testing, and Deploy

## Objective
Final polish, comprehensive testing, bug fixes, and deployment to production.

## Prerequisites
- Sprint 2.8 complete (All screens functional)

## Step 1: Visual Polish

### 1.1 Add Loading States

Add to `landlord-login/css/components.css`:

```css
/* ==========================================
   LOADING STATES
   ========================================== */

.skeleton {
  background: linear-gradient(90deg, var(--background-muted) 25%, var(--background-subtle) 50%, var(--background-muted) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: var(--radius-md);
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 1em;
  margin-bottom: 0.5em;
}

.skeleton-text:last-child {
  width: 60%;
}

.btn.loading {
  position: relative;
  color: transparent;
}

.btn.loading::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.btn.loading.btn-primary::after,
.btn.loading.btn-pink::after {
  border-top-color: white;
}
```

### 1.2 Add Smooth Transitions Between Screens

Update `landlord-login/css/screens.css`:

```css
/* Enhanced screen transitions */
.screen {
  display: none;
  opacity: 0;
  transform: translateX(20px);
}

.screen.active {
  display: block;
  animation: screenEnter 0.3s ease forwards;
}

.screen.exiting {
  animation: screenExit 0.2s ease forwards;
}

@keyframes screenEnter {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes screenExit {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-20px);
  }
}
```

### 1.3 Add Focus States for Accessibility

Add to `landlord-login/css/components.css`:

```css
/* ==========================================
   ACCESSIBILITY - FOCUS STATES
   ========================================== */

/* Global focus visible */
:focus-visible {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
}

/* Remove default outline when not using keyboard */
:focus:not(:focus-visible) {
  outline: none;
}

/* Button focus */
.btn:focus-visible {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
}

/* Form input focus */
.form-input:focus-visible {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Selection card focus */
.selection-card:focus-visible {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
}

/* Pill focus */
.pill:focus-visible {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
}

/* Skip to main content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-blue);
  color: white;
  padding: var(--space-sm) var(--space-md);
  z-index: 1001;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
```

### 1.4 Add Mobile Optimizations

Add to `landlord-login/css/screens.css`:

```css
/* ==========================================
   MOBILE OPTIMIZATIONS
   ========================================== */

@media (max-width: 640px) {
  /* Larger touch targets */
  .btn {
    min-height: 48px;
    padding: 14px 20px;
  }
  
  .form-input {
    min-height: 48px;
    font-size: 16px; /* Prevents iOS zoom */
  }
  
  .selection-card {
    padding: var(--space-md);
  }
  
  .pill {
    padding: 10px 16px;
  }
  
  /* Stack quick facts on mobile */
  .review-quick-facts {
    flex-wrap: wrap;
    gap: var(--space-md);
  }
  
  .review-quick-facts .review-fact {
    flex: 0 0 calc(50% - var(--space-sm));
  }
  
  /* Full width buttons in footer */
  .footer-nav-inner {
    flex-direction: column;
    gap: var(--space-sm);
  }
  
  .footer-nav-inner .btn {
    width: 100%;
  }
  
  #footer-back-btn {
    order: 2;
  }
  
  /* Adjust header for mobile */
  .header {
    padding: 0 var(--space-md);
  }
  
  .header-right {
    gap: var(--space-md);
  }
  
  .header-link {
    font-size: 0.75rem;
  }
  
  /* Smaller progress dots on mobile */
  .progress-dot {
    width: 6px;
    height: 6px;
  }
}

/* Safe area insets for notched devices */
@supports (padding: env(safe-area-inset-bottom)) {
  .footer-nav {
    padding-bottom: calc(var(--space-md) + env(safe-area-inset-bottom));
  }
  
  .screen-content {
    padding-bottom: calc(100px + env(safe-area-inset-bottom));
  }
}
```

## Step 2: Error Handling

### 2.1 Add Global Error Handler

Add to `landlord-login/js/app.js`:

```javascript
/* ------------------------------------------
   Error Handling
   ------------------------------------------ */

window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('Error:', msg, url, lineNo, columnNo, error);
  showToast('Something went wrong. Please try again.', 'error');
  return false;
};

window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
  showToast('Something went wrong. Please try again.', 'error');
});

/* ------------------------------------------
   Photo Upload Error Handling
   ------------------------------------------ */

function handlePhotoUploadWithValidation(e) {
  const files = Array.from(e.target.files);
  const maxSize = 10 * 1024 * 1024; // 10MB
  const maxPhotos = 15;
  
  const state = getState();
  const currentCount = state.photos.length;
  
  if (currentCount + files.length > maxPhotos) {
    showToast(`Maximum ${maxPhotos} photos allowed`, 'error');
    return;
  }
  
  files.forEach(file => {
    if (!file.type.startsWith('image/')) {
      showToast(`${file.name} is not an image`, 'error');
      return;
    }
    
    if (file.size > maxSize) {
      showToast(`${file.name} is too large (max 10MB)`, 'error');
      return;
    }
    
    const reader = new FileReader();
    reader.onerror = () => {
      showToast(`Failed to read ${file.name}`, 'error');
    };
    reader.onload = (event) => {
      addPhoto(event.target.result, file.name);
      renderPhotos(getState().photos);
    };
    reader.readAsDataURL(file);
  });
  
  e.target.value = '';
}
```

### 2.2 Add Form Validation Feedback

Create `landlord-login/js/utils.js`:

```javascript
/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

/* ------------------------------------------
   Validation
   ------------------------------------------ */

function validateRequired(value, fieldName) {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
}

function validateNumber(value, fieldName, min = 0, max = Infinity) {
  const num = parseFloat(value);
  if (isNaN(num)) {
    return `${fieldName} must be a number`;
  }
  if (num < min) {
    return `${fieldName} must be at least ${min}`;
  }
  if (num > max) {
    return `${fieldName} must be at most ${max}`;
  }
  return null;
}

function validateDate(value, fieldName) {
  if (!value) {
    return `${fieldName} is required`;
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return `${fieldName} is not a valid date`;
  }
  return null;
}

function showFieldError(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) return;
  
  input.classList.add('form-input-error');
  
  // Remove existing error message
  const existingError = input.parentNode.querySelector('.form-error');
  if (existingError) existingError.remove();
  
  // Add new error message
  const error = document.createElement('div');
  error.className = 'form-error';
  error.textContent = message;
  input.parentNode.appendChild(error);
}

function clearFieldError(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  
  input.classList.remove('form-input-error');
  
  const existingError = input.parentNode.querySelector('.form-error');
  if (existingError) existingError.remove();
}

/* ------------------------------------------
   Formatting
   ------------------------------------------ */

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/* ------------------------------------------
   Debounce
   ------------------------------------------ */

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* ------------------------------------------
   Local Storage Safety
   ------------------------------------------ */

function safeGetStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultValue;
  }
}

function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error writing to localStorage:', e);
    if (e.name === 'QuotaExceededError') {
      showToast('Storage full. Some data may not be saved.', 'error');
    }
    return false;
  }
}

console.log('utils.js loaded');
```

## Step 3: Comprehensive Testing Checklist

### 3.1 Functional Testing

Test each screen thoroughly:

#### Welcome Screen
- [ ] Page loads without errors
- [ ] "Get Started" button navigates to address
- [ ] Header/footer hidden on this screen

#### Address Screen
- [ ] Address autocomplete shows suggestions
- [ ] Keyboard navigation works (up/down/enter/escape)
- [ ] Selecting address shows map and reveals property types
- [ ] Property type cards selectable
- [ ] Subtypes appear based on property type
- [ ] Unit number toggle shows/hides input
- [ ] Continue disabled until address + type selected
- [ ] State persists on refresh

#### Units Screen
- [ ] Unit card displays all form fields
- [ ] All dropdowns populate correctly
- [ ] Utilities table radio buttons work
- [ ] Add unit creates new card
- [ ] Remove unit works (only with 2+ units)
- [ ] Unit cards collapse/expand
- [ ] Continue disabled until beds+baths selected

#### Details Screen
- [ ] Two-column layout renders
- [ ] Photo upload works
- [ ] Photos display in grid
- [ ] Remove photo works
- [ ] Amenities modal opens and saves
- [ ] Description textarea saves
- [ ] Progress card updates
- [ ] AI buttons open modals

#### AI Modals
- [ ] Amenities modal shows all categories
- [ ] Selection persists and saves
- [ ] AI detection shows loading then results
- [ ] Description generator shows options
- [ ] Can select, preview, edit description
- [ ] Smart pricing shows suggestion

#### Pricing Screen
- [ ] Market insight shows correct data
- [ ] Rent input works
- [ ] Smart pricing button opens modal
- [ ] Utilities toggle works
- [ ] Date picker works
- [ ] Quick date buttons work
- [ ] Lease term selection works
- [ ] Validation shows/hides correctly

#### Review Screen
- [ ] All data renders correctly
- [ ] Photo gallery works
- [ ] Quality score calculates correctly
- [ ] Quick edit buttons navigate
- [ ] Publish shows loading state
- [ ] Success modal appears

### 3.2 Cross-Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 3.3 Responsive Testing

Test at breakpoints:
- [ ] 320px (small mobile)
- [ ] 375px (iPhone)
- [ ] 414px (large phone)
- [ ] 768px (tablet)
- [ ] 1024px (small desktop)
- [ ] 1440px (large desktop)

### 3.4 Accessibility Testing

- [ ] All interactive elements focusable with keyboard
- [ ] Tab order makes sense
- [ ] Focus visible on all elements
- [ ] Form labels associated with inputs
- [ ] Error messages announced
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader can navigate content

### 3.5 Performance Testing

- [ ] Page loads in < 3 seconds on 3G
- [ ] No layout shifts during load
- [ ] Smooth animations (60fps)
- [ ] No memory leaks during navigation

## Step 4: Bug Fixes

Create a bug tracking list and fix any issues found during testing:

```markdown
## Known Issues / Fixes Needed

| Issue | Screen | Priority | Status |
|-------|--------|----------|--------|
| Example: Photo upload slow on mobile | Details | Medium | Fixed |
| | | | |
```

## Step 5: Final Cleanup

### 5.1 Remove Console Logs (Production)

Search and remove or comment out debug console.log statements:

```bash
# Find all console.log statements
grep -rn "console.log" landlord-login/js/
```

### 5.2 Minify for Production (Optional)

For better performance, you can minify CSS/JS, but since this is a prototype, it's optional.

### 5.3 Add Meta Tags

Update `landlord-login/index.html` head:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Create your rental listing in minutes with AI-powered assistance">
  <meta name="theme-color" content="#3B82F6">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Create Your Listing | Rentals.ca">
  <meta property="og:description" content="Create professional rental listings in minutes">
  <meta property="og:type" content="website">
  
  <title>Create Your Listing | Rentals.ca</title>
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏠</text></svg>">
  
  <!-- ... rest of head -->
</head>
```

## Step 6: Deploy

### 6.1 Test Locally One More Time

```bash
cd /Users/jupiter/Projects/rent-vibe-stack-sync
python3 -m http.server 8080
```

Complete a full flow from welcome to publish.

### 6.2 Commit All Changes

```bash
git add .
git status

# Review changes
git diff --staged

git commit -m "Sprint 2.9: Polish, testing, and final fixes

- Add loading states and skeleton loaders
- Improve screen transitions
- Add accessibility focus states
- Mobile optimizations and safe area support
- Error handling for uploads and storage
- Utility functions for validation
- Meta tags and favicon
- Bug fixes from testing"
```

### 6.3 Push to Production

```bash
git push origin main
```

### 6.4 Verify Deployment

After Vercel deploys (1-2 minutes):

1. Visit https://rent-vibe-stack-sync.vercel.app/landlord-login/
2. Complete full flow from welcome to publish
3. Test on mobile device
4. Check for console errors

### 6.5 Update Hub Page

If needed, update the "Coming Soon" badge on the hub page since landlord-login is now live:

In `/index.html`, change the Landlord Login card to remove "Coming Soon" badge or update it to "New" or "Beta".

## Step 7: Documentation

### 7.1 Update README

Create or update `/landlord-login/README.md`:

```markdown
# Landlord Login Prototype

AI-powered rental listing creation prototype.

## Features
- 6-screen guided flow
- Photo upload with AI detection
- AI-generated descriptions
- Smart pricing suggestions
- Real-time listing preview
- Quality score tracking

## Tech Stack
- Vanilla HTML/CSS/JS
- Lucide icons
- localStorage for persistence

## Local Development
```bash
cd /path/to/rent-vibe-stack-sync
python3 -m http.server 8080
```
Visit http://localhost:8080/landlord-login/

## File Structure
```
landlord-login/
├── index.html          # Main shell
├── css/
│   ├── design-system.css
│   ├── components.css
│   └── screens.css
├── js/
│   ├── app.js          # Main orchestration
│   ├── state.js        # State management
│   ├── router.js       # Navigation
│   ├── modals.js       # Modal system
│   ├── utils.js        # Utilities
│   └── screens/        # Screen-specific logic
├── screens/            # Screen HTML templates
├── components/         # Reusable components
└── data/
    └── mock-data.js    # Static data
```

## State Management
State persists to localStorage under key `rentsync_listing_draft`.

Reset state: Open console, run `resetState()`
```

### 7.2 Archive Sprint Docs

Move completed sprint docs to archive:

```bash
mkdir -p docs/archive/milestone-02
mv docs/sprint-2.*.md docs/archive/milestone-02/
mv docs/milestone-02.md docs/archive/milestone-02/
```

## Completion Checklist

- [ ] All screens functional
- [ ] All tests passing
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Accessibility basics covered
- [ ] Deployed to production
- [ ] Tested on production
- [ ] Documentation updated

## 🎉 Milestone 02 Complete!

Congratulations! The Landlord Login prototype is now live.

### What's Next?

Potential future enhancements (Milestone 03+):
- Real AI integration (OpenAI for descriptions)
- Actual image upload to cloud storage
- Google Maps integration
- Real market data API
- User authentication
- Multi-language support
- Analytics tracking

### Feedback Collection

Share the prototype URL and collect feedback:
- https://rent-vibe-stack-sync.vercel.app/landlord-login/

Consider adding a feedback button or survey link in the success modal.
