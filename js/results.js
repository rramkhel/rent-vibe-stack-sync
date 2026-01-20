/**
 * RentVibes.ca - Results Module
 *
 * Handles all results page functionality:
 * - Displaying listings with vibe explanations
 * - Vibe adjustment sliders
 * - Recalibration and refreshing listings
 */

// ============================================
// VIBE EXPLANATIONS
// ============================================

/**
 * Feature-specific explanation templates
 * Keys match listing features, values are arrays of possible explanations
 */
const FEATURE_EXPLANATIONS = {
  'exposed brick': [
    `As a {starsign}, you appreciate authenticity. This exposed brick has been absorbing good energy since before Instagram existed.`,
    `Your quiz revealed a preference for character. This brick wall has stories—mostly about questionable '90s decor decisions, now thankfully reversed.`
  ],
  'near nightlife': [
    `You picked "{answer1}" for Friday nights. This location means you can stumble home in under 10 minutes—efficient.`,
    `For someone with your social energy, proximity to the action is non-negotiable. This place delivers without the Uber surge.`
  ],
  'lake view': [
    `Your {starsign} nature craves water elements. This lake view will either inspire productivity or enable hours of thoughtful staring. Both valid.`,
    `Based on your answers, you need space to contemplate existence. Lake views provide this essential service at no extra monthly cost.`
  ],
  'quiet': [
    `You value your peace. This building's soundproofing is the acoustic equivalent of noise-canceling headphones for your entire life.`,
    `Your neighbor tolerance level suggests you'd thrive here—the walls are thick enough for existential crises to remain private.`
  ],
  'artsy area': [
    `Your vibe screams "creative energy." This neighborhood's density of independent coffee shops confirms cosmic alignment.`,
    `As someone who picked {answer0}, you belong where people debate font choices unironically. Welcome home.`
  ],
  'near park': [
    `Your plant-related answer revealed nature compatibility. This spot is close enough to trees to feel outdoorsy without commitment.`,
    `For a {starsign}, green space is essential for recharging. This place delivers nature within "I should go outside" distance.`
  ],
  'minimalist': [
    `You chose efficiency over excess. This studio matches your "less stuff, more living" philosophy. Or your "less stuff because less money" reality.`,
    `Your answers suggest someone who values simplicity. This space won't judge you for owning exactly three bowls.`
  ],
  'high ceilings': [
    `Your {starsign} energy needs vertical room to expand. These ceilings understand the assignment.`,
    `Based on your quiz, you need space for big ideas. These ceilings provide metaphorical and literal room for growth.`
  ],
  'transit hub': [
    `Your coffee-only breakfast choice screams "always running somewhere." This location respects your chaos.`,
    `Efficiency is your vibe. Transit access here means more sleep, less waiting for the bus in Canadian winter.`
  ],
  'community': [
    `Your neighbor tolerance suggests you actually like people (rare). This village-y area rewards that.`,
    `You gave off "knows the barista's name" energy. This neighborhood is perfect for collecting acquaintances who remember your order.`
  ],
  'vintage charm': [
    `Your font choice revealed an appreciation for character. This place has the good kind of old—charm, not drafty windows.`,
    `As a {starsign}, you're drawn to spaces with history. This apartment's original details have more personality than most dating profiles.`
  ],
  'modern': [
    `Your answers suggest you appreciate when things work. This modern space delivers functioning outlets where you need them.`,
    `For someone with your practical streak, modern amenities aren't luxury—they're sanity. This place gets it.`
  ],
  'luxury': [
    `Based on your Taylor Swift era choice, you're ready for your main character moment. This listing provides the backdrop.`,
    `Your {starsign} deserves nice things. This space says "I have my life together" even when you don't.`
  ],
  'affordable': [
    `Your quiz answers suggest someone who knows that money spent on rent is money not spent on experiences (or avocado toast).`,
    `As a practical {starsign}, you understand that a home is what you make it. This place gives you room to make it yours.`
  ],
  'trendy': [
    `Your brunch preference revealed your true nature. This area has the avocado toast density your soul requires.`,
    `Based on your answers, you belong where "vintage" is a compliment and oat milk is assumed.`
  ],
  'foodie heaven': [
    `Your breakfast choice told us everything. This location puts world cuisines within "I don't feel like cooking" distance.`,
    `For someone with your tastes, living here means never eating the same thing twice. Your stomach thanks the algorithm.`
  ]
};

/**
 * Generic explanation templates when no specific feature matches
 */
const GENERIC_EXPLANATIONS = [
  `Your {starsign} chart aligns suspiciously well with this location's coordinates. We can't explain it, but the math (vibes) checks out.`,
  `Based on your quiz, this place matches your energy at a molecular level. Trust the algorithm—which is definitely just vibes.`,
  `Our highly scientific analysis of your {starsign} tendencies suggests this space will complement your lifestyle. The stars said so.`,
  `You answered "{randomAnswer}" which, according to our proprietary vibe matrix, makes this listing cosmically compatible.`,
  `The breakfast you chose and this building share an energy signature. Coincidence? The universe doesn't do those.`,
  `As a {job}, you need a space that supports your specific chaos. This one's got the right energy.`,
  `Your quiz responses paint a picture of someone who'd thrive here. We're not saying we're psychic, but we're not NOT saying that either.`
];

/**
 * Generate a personalized vibe explanation for a listing
 * @param {Object} listing - The listing object
 * @returns {string} A personalized explanation
 */
function generateVibeExplanation(listing) {
  // Check listing features for matching explanations
  for (const feature of listing.features) {
    if (FEATURE_EXPLANATIONS[feature]) {
      const explanations = FEATURE_EXPLANATIONS[feature];
      let explanation = explanations[Math.floor(Math.random() * explanations.length)];
      return formatExplanation(explanation);
    }
  }

  // Use generic fallback
  let explanation = GENERIC_EXPLANATIONS[Math.floor(Math.random() * GENERIC_EXPLANATIONS.length)];
  return formatExplanation(explanation);
}

/**
 * Format an explanation template with user data
 * @param {string} template - The explanation template
 * @returns {string} Formatted explanation
 */
function formatExplanation(template) {
  return template
    .replace(/{starsign}/g, AppState.userData.starsign || 'cosmic being')
    .replace(/{job}/g, AppState.userData.job || 'professional human')
    .replace(/{answer0}/g, getAnswerText(0))
    .replace(/{answer1}/g, getAnswerText(1))
    .replace(/{answer2}/g, getAnswerText(2))
    .replace(/{randomAnswer}/g, getAnswerText(Math.floor(Math.random() * Math.min(AppState.answers.length, 3))));
}

// ============================================
// RESULTS PAGE RENDERING
// ============================================

/**
 * Show the results page
 */
function showResultsPage() {
  document.getElementById('quiz-page').classList.add('hidden');
  document.getElementById('results-page').classList.add('active');

  // Set vibe name
  document.getElementById('vibe-name-display').textContent = AppState.vibeProfile.vibeName;
  document.getElementById('results-subtitle').textContent =
    `We consulted the cosmos and found these spots that match your ${AppState.userData.starsign} energy.`;

  // Generate listings
  generateListings();
}

/**
 * Generate and display listings
 */
function generateListings() {
  const grid = document.getElementById('listings-grid');
  grid.innerHTML = `
    <div class="listings-loading">
      <div class="spinner"></div>
      <div class="loading-text">Finding vibe-aligned spaces...</div>
      <div class="loading-subtext">Cross-referencing your aura with available listings</div>
    </div>
  `;

  // Simulate loading
  setTimeout(() => {
    // Get 5 random listings based on vibe adjustments
    const shuffled = [...LISTINGS].sort(() => Math.random() - 0.5);
    const startIndex = (AppState.listingBatch * 5) % LISTINGS.length;
    AppState.currentListings = [];

    for (let i = 0; i < 5; i++) {
      const index = (startIndex + i) % shuffled.length;
      AppState.currentListings.push(shuffled[index]);
    }

    renderListings(AppState.currentListings);
    document.getElementById('match-count').textContent = AppState.currentListings.length;
  }, 1500);
}

/**
 * Render listing cards
 * @param {Array} listings - Array of listing objects
 */
function renderListings(listings) {
  const grid = document.getElementById('listings-grid');

  grid.innerHTML = listings.map((listing, i) => {
    const explanation = generateVibeExplanation(listing);
    const matchPercent = 85 + Math.floor(Math.random() * 14);

    return `
    <div class="listing-card">
      <div class="listing-image">
        <img src="${listing.image}" alt="${listing.address}" onerror="this.src='https://via.placeholder.com/400x300/5BA4A4/ffffff?text=Vibes+Loading'">
        <div class="vibe-match-badge">✨ ${matchPercent}% Vibe Match</div>
        <div class="listing-heart">♡</div>
      </div>
      <div class="listing-content">
        <div class="listing-price-row">
          <div class="listing-price">$${listing.price.toLocaleString()}<span>/month</span></div>
          <div class="verified-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L13.09 8.26L22 9.27L17 14.14L18.18 22L12 18.27L5.82 22L7 14.14L2 9.27L10.91 8.26L12 2Z"/>
            </svg>
            Vibe Verified
          </div>
        </div>
        <div class="listing-type">${listing.type} · Just listed</div>
        <div class="listing-address">${listing.address}</div>
        <div class="listing-specs">
          <span>🛏️ ${listing.beds === 0 ? 'Studio' : listing.beds + ' bed'}</span>
          <span>🚿 ${listing.baths} bath</span>
          <span>📐 ${listing.sqft} ft²</span>
        </div>
        <div class="vibe-explanation">
          <div class="vibe-explanation-header">Why This Matches Your Vibe</div>
          <p>${explanation}</p>
        </div>
        <button class="btn-details">View Details</button>
      </div>
    </div>
  `}).join('');
}

// ============================================
// VIBE ADJUSTMENT
// ============================================

/**
 * Slider configuration for value display
 */
const SLIDER_CONFIGS = {
  'aura': ['Hermit mode', 'Chill vibes', 'Balanced', 'Social butterfly', 'Main character'],
  'space': ['Cozy cave', 'Compact', 'Cozy+', 'Spacious', 'Dance floor'],
  'neighbor': ['I am a ghost', 'Brief nods', 'Polite nods', 'Friendly chats', 'Block party'],
  'sunrise': ['Vampire hours', 'Night owl', 'It exists', 'Early bird', '5am yoga'],
  'nature': ['Full concrete', 'Some trees', 'Window plants', 'Near parks', 'Forest dweller']
};

/**
 * Set up slider event listeners
 */
function setupSliders() {
  Object.keys(SLIDER_CONFIGS).forEach(sliderId => {
    const slider = document.getElementById(`${sliderId}-slider`);
    const valueDisplay = document.getElementById(`${sliderId}-value`);

    if (slider && valueDisplay) {
      slider.addEventListener('input', () => {
        const index = Math.floor(slider.value / 25);
        valueDisplay.textContent = SLIDER_CONFIGS[sliderId][Math.min(index, 4)];
      });
    }
  });
}

/**
 * Handle bonus option selection
 * @param {HTMLElement} element - The clicked element
 */
function selectBonusOption(element) {
  document.querySelectorAll('.bonus-option').forEach(opt => opt.classList.remove('selected'));
  element.classList.add('selected');
  AppState.selectedBonusOption = element.dataset.value;
}

/**
 * Recalibrate vibes based on slider values
 */
function recalibrateVibes() {
  // Get slider values
  const aura = document.getElementById('aura-slider').value;
  const space = document.getElementById('space-slider').value;
  const neighbor = document.getElementById('neighbor-slider').value;
  const sunrise = document.getElementById('sunrise-slider').value;
  const nature = document.getElementById('nature-slider').value;

  // Store adjustments
  AppState.vibeProfile.adjustments = {
    aura,
    space,
    neighbor,
    sunrise,
    nature,
    bonusAnswer: AppState.selectedBonusOption
  };

  // Update vibe name
  AppState.vibeProfile.vibeName = getRandomVibeName(true);
  document.getElementById('vibe-name-display').textContent = AppState.vibeProfile.vibeName;

  // Get next batch
  AppState.listingBatch++;
  generateListings();
}
