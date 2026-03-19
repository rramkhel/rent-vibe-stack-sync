# HOTFIX: Sub-tabs broken on Tab 3 (Full Reference) and Tab 4 (Metadata)

## Problem

Clicking the sub-tab pills on Tab 3 (Property Hierarchy / Unit Types / Transaction Types / Platform Mappings) and Tab 4 (Ownership / Purpose / Community) does nothing. The content is there but unreachable.

## Root Cause (two issues compounding)

### Issue 1: `innerHTML` doesn't execute `<script>` tags

`nav.js` loads tab HTML via:
```javascript
panel.innerHTML = await response.text();
```

Both `tab3-reference.html` and `tab4-metadata.html` contain inline `<script>` blocks that set up sub-tab click handlers. But `innerHTML` silently drops script execution — those handlers never attach.

### Issue 2: CSS class mismatch in `nav.js`

`nav.js` has a backup `initSubTabs()` that runs after loading, but it looks for the wrong classes:

```javascript
// nav.js currently looks for:
container.querySelectorAll('.sub-tab-btn')
container.querySelectorAll('.sub-tab-panel')
```

The actual HTML uses:
```html
<button class="sub-tab active" data-subtab="meta-ownership">
<div class="sub-panel active" id="meta-ownership">
```

So the backup also finds zero elements and silently exits.

## Fix

**File: `property-taxonomy/js/nav.js`**

### Change 1: Fix `initSubTabs()` class selectors

Replace:
```javascript
function initSubTabs(container) {
    const subTabBtns = container.querySelectorAll('.sub-tab-btn');
    const subTabPanels = container.querySelectorAll('.sub-tab-panel');
```

With:
```javascript
function initSubTabs(container) {
    const subTabBtns = container.querySelectorAll('.sub-tab');
    const subTabPanels = container.querySelectorAll('.sub-panel');
```

The rest of the function body stays the same.

### Change 2: Execute inline scripts after innerHTML

In the `loadTabContent()` function, after the line:
```javascript
initSubTabs(panel);
```

Add:
```javascript
// Execute any inline scripts from the loaded HTML
// (innerHTML doesn't run <script> tags automatically)
panel.querySelectorAll('script').forEach(oldScript => {
    const newScript = document.createElement('script');
    newScript.textContent = oldScript.textContent;
    oldScript.parentNode.replaceChild(newScript, oldScript);
});
```

This ensures the reference tree generator and any other inline init code also runs.

## Verification

After the fix:
- [ ] Click "Metadata" tab → Ownership content visible (already was the default)
- [ ] Click "Purpose" pill → Purpose table appears
- [ ] Click "Community" pill → Community hierarchy demo appears
- [ ] Click "Ownership" pill → Returns to ownership content
- [ ] Click "Full Reference" tab → Property Hierarchy tree renders
- [ ] Click "Unit Types" pill → Unit types content appears
- [ ] Click "Transaction Types" pill → Transaction types content appears
- [ ] Click "Platform Mappings" pill → Platform mappings placeholder appears
- [ ] No console errors
