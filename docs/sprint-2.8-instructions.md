```
  Verify:
  - Review screen shows all listing data
  - Photo gallery displays with thumbnails
  - Clicking thumbs changes main photo
  - Title, price, and meta render correctly
  - Quick facts show unit details
  - Description displays (or placeholder)
  - Amenities render as tags
  - Details grid shows all info
  - Quality score calculates and animates
  - Checklist items show completion state
  - Quick edit buttons navigate correctly
  - Publish button shows loading state
  - Success modal appears after "publishing"
  - Footer is hidden on review screen

  Ready for Sprint 2.9 (final sprint)!
```


---


# Sprint 2.8: Review Screen + Publish Flow

## Objective
Build the final review screen showing a complete listing preview, quality score, and publish flow.

## Prerequisites
- Sprint 2.7 complete (Pricing screen working)

## Step 1: Create Review Screen HTML

Create `landlord-login/screens/review.html`:

```html
<section class="screen" id="screen-review">
  <div class="content-wide screen-content">
    
    <div class="screen-header">
      <h1 class="screen-title">Your listing is ready!</h1>
      <p class="screen-subtitle">Here's what renters will see:</p>
    </div>
    
    <!-- Review Layout -->
    <div class="review-layout">
      
      <!-- Main Preview -->
      <div class="review-main">
        
        <!-- Photo Gallery -->
        <div class="review-gallery" id="reviewGallery">
          <div class="review-gallery-main" id="reviewMainPhoto">
            <!-- Primary photo -->
          </div>
          <div class="review-gallery-thumbs" id="reviewThumbs">
            <!-- Thumbnail grid -->
          </div>
        </div>
        
        <!-- Listing Header -->
        <div class="review-listing-header">
          <div class="review-listing-title" id="reviewTitle">Modern Apartment in Toronto</div>
          <div class="review-listing-price" id="reviewPrice">$2,400/mo</div>
        </div>
        
        <div class="review-listing-meta" id="reviewMeta">
          <span><i data-lucide="home" style="width: 14px; height: 14px;"></i> Apartment</span>
          <span><i data-lucide="map-pin" style="width: 14px; height: 14px;"></i> Toronto, ON</span>
        </div>
        
        <!-- Quick Facts -->
        <div class="review-quick-facts">
          <div class="review-fact">
            <i data-lucide="bed" style="width: 20px; height: 20px;"></i>
            <span id="reviewBeds">2 beds</span>
          </div>
          <div class="review-fact">
            <i data-lucide="bath" style="width: 20px; height: 20px;"></i>
            <span id="reviewBaths">1 bath</span>
          </div>
          <div class="review-fact">
            <i data-lucide="maximize" style="width: 20px; height: 20px;"></i>
            <span id="reviewSqft">850 sqft</span>
          </div>
          <div class="review-fact">
            <i data-lucide="calendar" style="width: 20px; height: 20px;"></i>
            <span id="reviewDate">Available Now</span>
          </div>
        </div>
        
        <!-- Description -->
        <div class="review-section">
          <h3>About This Property</h3>
          <p id="reviewDescription" class="review-description">
            No description provided.
          </p>
        </div>
        
        <!-- Amenities -->
        <div class="review-section">
          <h3>What this place offers</h3>
          <div class="review-amenities" id="reviewAmenities">
            <!-- Amenity tags -->
          </div>
        </div>
        
        <!-- Additional Details -->
        <div class="review-section">
          <h3>Details</h3>
          <div class="review-details-grid" id="reviewDetails">
            <!-- Detail rows -->
          </div>
        </div>
        
      </div>
      
      <!-- Sidebar -->
      <div class="review-sidebar">
        
        <!-- Quality Score -->
        <div class="card quality-score-card">
          <h4>Listing Quality Score</h4>
          <div class="quality-score" id="qualityScore">
            <svg viewBox="0 0 36 36" class="quality-score-ring">
              <path class="quality-score-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path class="quality-score-fill" id="qualityScoreFill"
                stroke-dasharray="0, 100"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span class="quality-score-value" id="qualityScoreValue">0%</span>
          </div>
          <p class="quality-score-label" id="qualityScoreLabel">Add more details to improve</p>
          
          <ul class="quality-checklist" id="qualityChecklist">
            <!-- Populated by JS -->
          </ul>
        </div>
        
        <!-- Edit Sections -->
        <div class="card edit-sections-card">
          <h4>Quick Edit</h4>
          <div class="edit-sections">
            <button class="edit-section-btn" onclick="goToScreen('address')">
              <i data-lucide="map-pin" style="width: 16px; height: 16px;"></i>
              Location
              <i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i>
            </button>
            <button class="edit-section-btn" onclick="goToScreen('units')">
              <i data-lucide="home" style="width: 16px; height: 16px;"></i>
              Unit Details
              <i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i>
            </button>
            <button class="edit-section-btn" onclick="goToScreen('details')">
              <i data-lucide="image" style="width: 16px; height: 16px;"></i>
              Photos & Amenities
              <i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i>
            </button>
            <button class="edit-section-btn" onclick="goToScreen('pricing')">
              <i data-lucide="dollar-sign" style="width: 16px; height: 16px;"></i>
              Pricing
              <i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
        </div>
        
        <!-- Publish Button -->
        <button class="btn btn-pink btn-lg publish-btn" id="publishBtn" style="width: 100%;">
          <i data-lucide="sparkles" style="width: 18px; height: 18px;"></i>
          Publish Listing
        </button>
        
      </div>
      
    </div>
    
  </div>
</section>

<!-- Success Modal -->
<div class="modal-overlay" id="publishSuccessModal">
  <div class="modal" style="text-align: center;">
    <div class="modal-body" style="padding: var(--space-2xl);">
      <div class="success-icon">
        <i data-lucide="check-circle" style="width: 64px; height: 64px; color: var(--success);"></i>
      </div>
      <h2 style="margin: var(--space-lg) 0 var(--space-sm);">Your listing is live! 🎉</h2>
      <p class="text-secondary" style="margin-bottom: var(--space-xl);">
        Renters can now find your property on Rentals.ca
      </p>
      <div class="success-actions">
        <button class="btn btn-primary" onclick="viewListing()">View Your Listing</button>
        <button class="btn btn-outline" onclick="createAnother()">Create Another</button>
      </div>
    </div>
  </div>
</div>
```

## Step 2: Add Review Screen Styles

Add to `landlord-login/css/screens.css`:

```css
/* ==========================================
   REVIEW SCREEN
   ========================================== */

.review-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-xl);
}

@media (max-width: 900px) {
  .review-layout {
    grid-template-columns: 1fr;
  }
  
  .review-sidebar {
    order: -1;
  }
}

.review-main {
  min-width: 0;
}

.review-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* Gallery */
.review-gallery {
  margin-bottom: var(--space-xl);
}

.review-gallery-main {
  aspect-ratio: 16/9;
  background: var(--background-muted);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-md);
}

.review-gallery-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review-gallery-main.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.review-gallery-thumbs {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-sm);
}

.review-thumb {
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity var(--transition-fast);
}

.review-thumb:hover,
.review-thumb.active {
  opacity: 1;
}

.review-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Listing Header */
.review-listing-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-sm);
}

.review-listing-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.review-listing-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-pink);
}

.review-listing-meta {
  display: flex;
  gap: var(--space-lg);
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: var(--space-lg);
}

.review-listing-meta span {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

/* Quick Facts */
.review-quick-facts {
  display: flex;
  gap: var(--space-xl);
  padding: var(--space-lg) 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin-bottom: var(--space-xl);
}

.review-fact {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-primary);
}

.review-fact i {
  color: var(--text-muted);
}

/* Sections */
.review-section {
  margin-bottom: var(--space-xl);
}

.review-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--space-md);
}

.review-description {
  color: var(--text-secondary);
  line-height: 1.7;
}

.review-amenities {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.review-amenity {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background: var(--background-subtle);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
}

.review-amenity i {
  color: var(--success);
}

.review-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

@media (max-width: 640px) {
  .review-details-grid {
    grid-template-columns: 1fr;
  }
}

.review-detail-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--border);
}

.review-detail-label {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.review-detail-value {
  font-weight: 500;
  font-size: 0.875rem;
}

/* Quality Score */
.quality-score-card {
  text-align: center;
}

.quality-score-card h4 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: var(--space-md);
}

.quality-score {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto var(--space-md);
}

.quality-score-ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.quality-score-bg {
  fill: none;
  stroke: var(--background-muted);
  stroke-width: 3;
}

.quality-score-fill {
  fill: none;
  stroke: var(--teal);
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dasharray 0.5s ease;
}

.quality-score-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.quality-score-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}

.quality-checklist {
  list-style: none;
  text-align: left;
}

.quality-checklist li {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.875rem;
  padding: var(--space-xs) 0;
  color: var(--text-secondary);
}

.quality-checklist li.complete {
  color: var(--success);
}

.quality-checklist li::before {
  content: '';
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--border);
  flex-shrink: 0;
}

.quality-checklist li.complete::before {
  background: var(--success);
  border-color: var(--success);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
  background-size: 10px;
  background-position: center;
  background-repeat: no-repeat;
}

/* Edit Sections */
.edit-sections {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.edit-section-btn {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: 0.875rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.edit-section-btn:hover {
  background: var(--background-subtle);
  border-color: var(--text-muted);
}

.edit-section-btn i:last-child {
  margin-left: auto;
  color: var(--text-muted);
}

/* Publish Button */
.publish-btn {
  position: sticky;
  bottom: var(--space-lg);
}

/* Success Modal */
.success-icon {
  margin-bottom: var(--space-md);
}

.success-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
}
```

## Step 3: Create Review Screen Logic

Create `landlord-login/js/screens/review.js`:

```javascript
/* ==========================================
   REVIEW SCREEN LOGIC
   ========================================== */

function initReviewScreen() {
  const state = getState();
  
  renderReviewContent(state);
  calculateQualityScore(state);
  setupReviewListeners();
}

function renderReviewContent(state) {
  const unit = state.units[0] || {};
  const amenities = Object.values(state.amenities).flat();
  
  // Gallery
  renderGallery(state.photos);
  
  // Title
  const propertyType = PROPERTY_TYPES[state.propertyType]?.label || 'Property';
  const subType = state.subType || propertyType;
  document.getElementById('reviewTitle').textContent = 
    `${subType} in ${state.address.city || 'Toronto'}`;
  
  // Price
  const price = state.rent ? `$${parseInt(state.rent).toLocaleString()}/mo` : 'Price TBD';
  document.getElementById('reviewPrice').textContent = price;
  
  // Meta
  document.getElementById('reviewMeta').innerHTML = `
    <span><i data-lucide="home" style="width: 14px; height: 14px;"></i> ${subType}</span>
    <span><i data-lucide="map-pin" style="width: 14px; height: 14px;"></i> ${state.address.city || 'Toronto'}, ${state.address.province || 'ON'}</span>
  `;
  
  // Quick facts
  document.getElementById('reviewBeds').textContent = 
    unit.bedrooms === 'studio' ? 'Studio' : `${unit.bedrooms || '--'} beds`;
  document.getElementById('reviewBaths').textContent = `${unit.bathrooms || '--'} bath`;
  document.getElementById('reviewSqft').textContent = unit.sqft ? `${unit.sqft} sqft` : '-- sqft';
  document.getElementById('reviewDate').textContent = formatAvailableDate(state.availableDate);
  
  // Description
  document.getElementById('reviewDescription').textContent = 
    state.description || 'No description provided. Add one to attract more renters!';
  
  // Amenities
  renderReviewAmenities(amenities);
  
  // Details
  renderReviewDetails(state, unit);
  
  lucide.createIcons();
}

function renderGallery(photos) {
  const mainContainer = document.getElementById('reviewMainPhoto');
  const thumbsContainer = document.getElementById('reviewThumbs');
  
  if (photos.length === 0) {
    mainContainer.classList.add('empty');
    mainContainer.innerHTML = `
      <div>
        <i data-lucide="image" style="width: 48px; height: 48px;"></i>
        <p style="margin-top: var(--space-md);">No photos uploaded</p>
      </div>
    `;
    thumbsContainer.innerHTML = '';
    return;
  }
  
  mainContainer.classList.remove('empty');
  mainContainer.innerHTML = `<img src="${photos[0].dataUrl}" alt="Primary photo">`;
  
  thumbsContainer.innerHTML = photos.slice(0, 5).map((photo, i) => `
    <div class="review-thumb ${i === 0 ? 'active' : ''}" onclick="setMainPhoto(${i})">
      <img src="${photo.dataUrl}" alt="Photo ${i + 1}">
    </div>
  `).join('');
  
  if (photos.length > 5) {
    thumbsContainer.innerHTML += `
      <div class="review-thumb" style="display: flex; align-items: center; justify-content: center; background: var(--background-muted);">
        +${photos.length - 5}
      </div>
    `;
  }
}

function setMainPhoto(index) {
  const state = getState();
  const mainContainer = document.getElementById('reviewMainPhoto');
  
  if (state.photos[index]) {
    mainContainer.innerHTML = `<img src="${state.photos[index].dataUrl}" alt="Photo">`;
    
    document.querySelectorAll('.review-thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }
}

function renderReviewAmenities(amenities) {
  const container = document.getElementById('reviewAmenities');
  
  if (amenities.length === 0) {
    container.innerHTML = '<p class="text-muted">No amenities added yet</p>';
    return;
  }
  
  container.innerHTML = amenities.map(a => `
    <span class="review-amenity">
      <i data-lucide="check" style="width: 14px; height: 14px;"></i>
      ${a}
    </span>
  `).join('');
}

function renderReviewDetails(state, unit) {
  const container = document.getElementById('reviewDetails');
  
  const details = [
    { label: 'Property Type', value: state.subType || PROPERTY_TYPES[state.propertyType]?.label || '--' },
    { label: 'Bedrooms', value: unit.bedrooms === 'studio' ? 'Studio' : unit.bedrooms || '--' },
    { label: 'Bathrooms', value: unit.bathrooms || '--' },
    { label: 'Square Feet', value: unit.sqft || '--' },
    { label: 'Furnished', value: FURNISHED_OPTIONS.find(o => o.value === unit.furnished)?.label || '--' },
    { label: 'Laundry', value: LAUNDRY_OPTIONS.find(o => o.value === unit.laundry)?.label || '--' },
    { label: 'Parking', value: PARKING_OPTIONS.find(o => o.value === unit.parkingType)?.label || '--' },
    { label: 'Lease Term', value: LEASE_TERMS.find(o => o.value === state.leaseTerm)?.label || '--' },
  ];
  
  container.innerHTML = details.map(d => `
    <div class="review-detail-row">
      <span class="review-detail-label">${d.label}</span>
      <span class="review-detail-value">${d.value}</span>
    </div>
  `).join('');
}

function formatAvailableDate(dateStr) {
  if (!dateStr) return 'Not specified';
  
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (date <= today) {
    return 'Available Now';
  }
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function calculateQualityScore(state) {
  const unit = state.units[0] || {};
  const amenities = Object.values(state.amenities).flat();
  
  const criteria = [
    { label: '5+ photos', complete: state.photos.length >= 5 },
    { label: 'All unit details', complete: unit.bedrooms && unit.bathrooms && unit.sqft },
    { label: 'Description added', complete: state.description && state.description.length > 50 },
    { label: '3+ amenities', complete: amenities.length >= 3 },
    { label: 'Price set', complete: !!state.rent },
  ];
  
  const completedCount = criteria.filter(c => c.complete).length;
  const percentage = Math.round((completedCount / criteria.length) * 100);
  
  // Update score display
  document.getElementById('qualityScoreValue').textContent = `${percentage}%`;
  document.getElementById('qualityScoreFill').setAttribute('stroke-dasharray', `${percentage}, 100`);
  
  // Update label
  const labels = {
    100: 'Excellent! Your listing is fully optimized',
    80: 'Great! Just a few more details',
    60: 'Good start! Add more to stand out',
    40: 'Getting there! Keep adding details',
    20: 'Add more details to attract renters',
    0: 'Let\'s add some details to your listing',
  };
  
  const labelKey = Math.floor(percentage / 20) * 20;
  document.getElementById('qualityScoreLabel').textContent = labels[labelKey] || labels[0];
  
  // Update checklist
  const checklist = document.getElementById('qualityChecklist');
  checklist.innerHTML = criteria.map(c => `
    <li class="${c.complete ? 'complete' : ''}">${c.label}</li>
  `).join('');
  
  // Update publish button
  const publishBtn = document.getElementById('publishBtn');
  const canPublish = state.photos.length > 0 && state.rent && unit.bedrooms;
  publishBtn.disabled = !canPublish;
}

function setupReviewListeners() {
  document.getElementById('publishBtn')?.addEventListener('click', publishListing);
}

function publishListing() {
  const btn = document.getElementById('publishBtn');
  btn.disabled = true;
  btn.innerHTML = `
    <div class="ai-loading-spinner" style="width: 18px; height: 18px; border-width: 2px;"></div>
    Publishing...
  `;
  
  // Simulate publish delay
  setTimeout(() => {
    openModal('publishSuccessModal');
    btn.disabled = false;
    btn.innerHTML = `
      <i data-lucide="sparkles" style="width: 18px; height: 18px;"></i>
      Publish Listing
    `;
    lucide.createIcons();
  }, 2000);
}

function viewListing() {
  showToast('In production, this would open your live listing!', 'info');
  closeModal('publishSuccessModal');
}

function createAnother() {
  if (confirm('Start a new listing? Your current listing has been published.')) {
    resetState();
    window.location.reload();
  }
}

// Register screen init callback
onScreenLoad('review', initReviewScreen);
```

## Step 4: Update App.js

Add to `loadScreenScripts`:

```javascript
async function loadScreenScripts() {
  const scripts = [
    'js/screens/address.js',
    'js/screens/units.js',
    'js/screens/details.js',
    'js/screens/pricing.js',
    'js/screens/review.js',  // ADD THIS
  ];
  // ...
}
```

## Step 5: Hide Footer on Review Screen

Update `updateFooterVisibility` in `router.js`:

```javascript
function updateFooterVisibility() {
  const footer = document.getElementById('footer-nav');
  
  if (footer) {
    // Hide footer on welcome and review screens
    const hideFooter = ['welcome', 'review'].includes(currentScreen);
    footer.style.display = hideFooter ? 'none' : 'block';
  }
}
```

## Step 6: Test

### Verify:
- [ ] Review screen shows all listing data
- [ ] Photo gallery displays with thumbnails
- [ ] Clicking thumbs changes main photo
- [ ] Title, price, and meta render correctly
- [ ] Quick facts show unit details
- [ ] Description displays (or placeholder)
- [ ] Amenities render as tags
- [ ] Details grid shows all info
- [ ] Quality score calculates correctly
- [ ] Score ring animates
- [ ] Checklist items show completion state
- [ ] Quick edit buttons navigate to correct screens
- [ ] Publish button shows loading state
- [ ] Success modal appears after "publishing"
- [ ] View Listing and Create Another buttons work

## Step 7: Commit

```bash
git add .
git commit -m "Sprint 2.8: Review screen + publish flow

- Full listing preview
- Photo gallery with thumbnails
- Quality score with animated ring
- Completion checklist
- Quick edit navigation
- Publish flow with loading state
- Success modal"
```

## Output Required
Confirm:
1. Review screen renders all data
2. Quality score calculates correctly
3. Publish flow works
4. Success modal displays
5. No console errors

Report status before proceeding to Sprint 2.9.
