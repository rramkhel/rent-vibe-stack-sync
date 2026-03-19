# Sprint 3.2.3: Fix Example Card Layout

**File:** `property-taxonomy/tabs/data-model.html`

Replace the 3 example cards with this. The key fix: each row is a single `label: value` line, no 2-column grid within the card. Inline styles override whatever `.example-breakdown` / `.example-row` is doing.

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">

    <div class="card">
        <div class="card-header" style="padding: 12px 16px;">
            <div class="card-title" style="font-size: 13px;">🏠 Student Basement Rental</div>
        </div>
        <div class="card-body" style="padding: 12px 16px;">
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
                <div><span style="color: var(--gray-500);">Sector:</span> <strong>Residential</strong></div>
                <div><span style="color: var(--gray-500);">Structure:</span> <strong>House → Detached</strong></div>
                <div><span style="color: var(--gray-500);">Unit Type:</span> <strong>Basement</strong></div>
                <div><span style="color: var(--gray-500);">Transaction:</span> <strong>Rent</strong></div>
                <div><span style="color: var(--gray-500);">Purpose:</span> <strong>Student</strong></div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header" style="padding: 12px 16px;">
            <div class="card-title" style="font-size: 13px;">🏢 Corporate Office Lease</div>
        </div>
        <div class="card-body" style="padding: 12px 16px;">
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
                <div><span style="color: var(--gray-500);">Sector:</span> <strong>Commercial</strong></div>
                <div><span style="color: var(--gray-500);">Structure:</span> <strong>Office → Class A</strong></div>
                <div><span style="color: var(--gray-500);">Unit Type:</span> <strong>Floor</strong></div>
                <div><span style="color: var(--gray-500);">Transaction:</span> <strong>Lease</strong></div>
                <div><span style="color: var(--gray-500);">Purpose:</span> <strong>Corporate</strong></div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header" style="padding: 12px 16px;">
            <div class="card-title" style="font-size: 13px;">🏕 Vacation Cabin Rental</div>
        </div>
        <div class="card-body" style="padding: 12px 16px;">
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
                <div><span style="color: var(--gray-500);">Sector:</span> <strong>Residential</strong></div>
                <div><span style="color: var(--gray-500);">Structure:</span> <strong>Cabin → A-Frame</strong></div>
                <div><span style="color: var(--gray-500);">Unit Type:</span> <strong>Entire</strong></div>
                <div><span style="color: var(--gray-500);">Transaction:</span> <strong>Rent</strong></div>
                <div><span style="color: var(--gray-500);">Purpose:</span> <strong>Vacation</strong></div>
            </div>
        </div>
    </div>

</div>
```

Replace everything between the sentence formula section and the next `<hr>` or `<section>` that contains the current 3 example cards. Remove any `.example-breakdown` / `.example-row` markup — this replaces it entirely with plain inline styles so there's no CSS class interference.
