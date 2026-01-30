/* ==========================================
   ROUTER
   Handles screen navigation and history
   ========================================== */

const SCREENS = ['welcome', 'address', 'floorplan', 'amenities', 'details', 'pricing', 'review'];

let currentScreen = 'welcome';
let screenLoadCallbacks = {};

/* ------------------------------------------
   Navigation
   ------------------------------------------ */

function goToScreen(screenId, updateHash = true) {
  if (!SCREENS.includes(screenId)) {
    console.error(`Unknown screen: ${screenId}`);
    return;
  }

  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });

  // Show target screen
  const target = document.getElementById(`screen-${screenId}`);
  if (target) {
    target.classList.add('active');
    currentScreen = screenId;

    // Update URL hash
    if (updateHash) {
      window.location.hash = screenId;
    }

    // Update state
    updateState('currentScreen', screenId);

    // Update UI elements
    updateProgressDots();
    updateHeader();
    updateFooter();
    updateHeaderVisibility();
    updateFooterVisibility();
    updateFooterButton(screenId);

    // Scroll to top
    window.scrollTo(0, 0);

    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Call screen-specific init if registered
    if (screenLoadCallbacks[screenId]) {
      screenLoadCallbacks[screenId]();
    }

    console.log(`Navigated to: ${screenId}`);
  } else {
    console.error(`Screen element not found: screen-${screenId}`);
  }
}

function nextScreen() {
  const currentIndex = SCREENS.indexOf(currentScreen);
  if (currentIndex < SCREENS.length - 1) {
    goToScreen(SCREENS[currentIndex + 1]);
  }
}

function prevScreen() {
  const currentIndex = SCREENS.indexOf(currentScreen);
  if (currentIndex > 0) {
    goToScreen(SCREENS[currentIndex - 1]);
  }
}

function getCurrentScreen() {
  return currentScreen;
}

function getScreenIndex(screenId) {
  return SCREENS.indexOf(screenId || currentScreen);
}

/* ------------------------------------------
   Screen Registration
   ------------------------------------------ */

function onScreenLoad(screenId, callback) {
  screenLoadCallbacks[screenId] = callback;
}

/* ------------------------------------------
   UI Updates
   ------------------------------------------ */

function updateProgressDots() {
  const currentIndex = getScreenIndex();

  document.querySelectorAll('.progress-dot').forEach((dot, i) => {
    dot.classList.remove('active', 'completed');

    if (i < currentIndex) {
      dot.classList.add('completed');
    } else if (i === currentIndex) {
      dot.classList.add('active');
    }
  });
}

function updateHeader() {
  const headerTitle = document.querySelector('.header-center');
  if (headerTitle) {
    const titles = {
      welcome: '',
      address: 'Create Your Listing',
      floorplan: 'Create Your Listing',
      amenities: 'Create Your Listing',
      details: 'Create Your Listing',
      pricing: 'Set Your Price',
      review: 'Review Your Listing',
    };
    headerTitle.textContent = titles[currentScreen] || 'Create Your Listing';
  }
}

function updateFooter() {
  // Footer visibility and buttons handled by individual screens
}

function updateHeaderVisibility() {
  const backBtn = document.getElementById('header-back-btn');
  const headerRight = document.querySelector('.header-right');

  if (currentScreen === 'welcome') {
    if (backBtn) backBtn.style.visibility = 'hidden';
    if (headerRight) headerRight.style.visibility = 'hidden';
  } else {
    if (backBtn) backBtn.style.visibility = 'visible';
    if (headerRight) headerRight.style.visibility = 'visible';
  }
}

function updateFooterVisibility() {
  const footer = document.getElementById('footer-nav');

  if (footer) {
    // Hide footer on welcome and review screens
    const hideFooter = ['welcome', 'review'].includes(currentScreen);
    footer.style.display = hideFooter ? 'none' : 'block';
  }
}

function updateFooterButton(screenId) {
  const nextBtn = document.getElementById('footer-next-btn');
  if (!nextBtn) return;

  const buttonConfig = {
    address: { text: 'Continue', btnClass: 'btn-primary' },
    floorplan: { text: 'Continue', btnClass: 'btn-primary' },
    amenities: { text: 'Continue', btnClass: 'btn-primary' },
    details: { text: 'Continue to Pricing', btnClass: 'btn-pink' },
    pricing: { text: 'Continue to Review', btnClass: 'btn-pink' },
    review: { text: 'Publish Listing', btnClass: 'btn-pink' },
  };

  const config = buttonConfig[screenId] || { text: 'Continue', btnClass: 'btn-primary' };

  // Update button text (keeping the icon)
  nextBtn.innerHTML = `
    ${config.text}
    <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
  `;

  // Update button class
  nextBtn.className = `btn ${config.btnClass}`;

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ------------------------------------------
   Hash-based Navigation
   ------------------------------------------ */

function getScreenFromHash() {
  const hash = window.location.hash.slice(1); // Remove the #
  return SCREENS.includes(hash) ? hash : null;
}

function handleHashChange() {
  const screenFromHash = getScreenFromHash();
  if (screenFromHash && screenFromHash !== currentScreen) {
    goToScreen(screenFromHash, false); // Don't update hash again
  }
}

/* ------------------------------------------
   Initialization
   ------------------------------------------ */

function initRouter() {
  // Check URL hash first, then fall back to state
  const screenFromHash = getScreenFromHash();
  const state = getState();
  currentScreen = screenFromHash || state.currentScreen || 'welcome';

  // Listen for browser back/forward
  window.addEventListener('hashchange', handleHashChange);

  // Set up initial screen
  goToScreen(currentScreen);

  console.log('Router initialized');
}

console.log('router.js loaded');
