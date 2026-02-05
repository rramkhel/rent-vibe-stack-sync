# Sprint 2.5: Polish & QA

## Goal

Add responsive styles, accessibility improvements, and final quality assurance. Ensure the demo works well across devices and meets accessibility standards.

---

## Deliverables

- [ ] Responsive design at tablet (768px) and mobile (480px)
- [ ] Keyboard navigation working throughout
- [ ] ARIA labels added where needed
- [ ] Cross-browser testing complete
- [ ] No console errors

---

## Tasks

### Task 1: Add Responsive Styles

Create `css/responsive.css` with tablet (768px) and mobile (480px) breakpoints. Key adjustments:

- Header stacks vertically on mobile
- Tabs scroll horizontally
- Card grids collapse to fewer columns
- Flow diagrams stack vertically
- Tables get horizontal scroll wrappers
- Code blocks and inference chains shrink font
- Architecture platform boxes get smaller

Include print styles that show all tabs.

### Task 2: Add Table Wrappers for Horizontal Scroll

Update tables in tab HTML files (`tabs/overview.html`, `tabs/data-model.html`, `tabs/syndication.html`) to wrap with scrollable container:

```html
<div class="table-wrapper">
    <table class="compare-table">
        <!-- table content -->
    </table>
</div>
```

### Task 3: Add Accessibility Improvements

**Update tab navigation in `index.html` with ARIA:**

```html
<nav class="tabs-container" role="tablist" aria-label="Demo sections">
    <button class="tab active"
            data-tab="overview"
            role="tab"
            aria-selected="true"
            aria-controls="overview"
            id="tab-overview">
        <span class="tab-icon" aria-hidden="true">🎯</span> Overview
    </button>
    <!-- ... other tabs with aria-selected="false" -->
</nav>
```

**Update tab content containers in `index.html` with ARIA:**

```html
<div id="overview"
     class="tab-content active"
     role="tabpanel"
     aria-labelledby="tab-overview"
     tabindex="0">
</div>
```

**Update `js/main.js` to manage ARIA states** — toggle `aria-selected` on tab switch, add Home/End key support.

### Task 4: Add Skip Link

Add at the beginning of `<body>` in `index.html`:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

Add `id="main-content"` to the `<main>` element.

Add skip link styles to `css/base.css`.

### Task 5: Focus Styles

Add to `css/base.css`:

- `:focus-visible` outline with canonical purple
- `.tab:focus-visible` with inset offset
- Remove outline on `:focus:not(:focus-visible)` for mouse users

### Task 6: Update index.html Head

Add the responsive CSS file:

```html
<link rel="stylesheet" href="css/responsive.css">
```

Full CSS load order:
```html
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/diagrams.css">
<link rel="stylesheet" href="css/code-blocks.css">
<link rel="stylesheet" href="css/responsive.css">
```

---

## Testing Checklist

### Functionality
- [ ] All 5 tabs switch correctly
- [ ] Example browser switches between all 5 examples
- [ ] No JavaScript console errors
- [ ] All links work (if any)

### Responsive Design
- [ ] Header stacks on mobile
- [ ] Tabs scroll horizontally on mobile
- [ ] Cards stack properly
- [ ] Tables scroll horizontally
- [ ] Flow diagrams stack vertically
- [ ] Text is readable at all sizes

### Accessibility
- [ ] Tab through entire page with keyboard
- [ ] Arrow keys navigate between tabs
- [ ] Focus indicators visible
- [ ] Skip link works
- [ ] Screen reader announces tab changes

### Cross-Browser
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Visual QA
- [ ] Fonts loading correctly
- [ ] Colors match design
- [ ] Spacing consistent
- [ ] No overflow/clipping issues
- [ ] Code blocks preserve formatting

---

## Final Cleanup

1. Remove any `console.log` statements
2. Remove any commented-out code
3. Ensure consistent indentation
4. Verify all file paths are correct
5. Test with cleared browser cache

---

## Definition of Done

- [ ] All tabs render correctly
- [ ] Interactive elements work
- [ ] Responsive at 768px and 480px
- [ ] Keyboard accessible
- [ ] No console errors
- [ ] Code is clean and documented

---

## Handoff

Once complete, the demo is ready for:
- Stakeholder review meetings
- Embedding in Confluence
- Sharing via direct link
