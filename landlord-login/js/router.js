/* ==========================================
   ROUTER
   Handles screen navigation and history
   ========================================== */

const SCREENS = ['welcome', 'address', 'floorplan', 'essentials', 'photos', 'detecting', 'details', 'pricing', 'review'];

// Screens that should skip on back navigation (go to previous-previous)
const SKIP_ON_BACK = ['detecting'];

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
    let prevIndex = currentIndex - 1;
    // Skip screens marked for skipping on back navigation
    while (prevIndex > 0 && SKIP_ON_BACK.includes(SCREENS[prevIndex])) {
      prevIndex--;
    }
    goToScreen(SCREENS[prevIndex]);
  }
}

function getCurrentScreen() {
  return currentScreen;
}

// Alias for goToScreen
function navigateTo(screenId) {
  goToScreen(screenId);
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
      essentials: 'Create Your Listing',
      photos: 'Create Your Listing',
      detecting: '',
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
  const header = document.querySelector('.header');
  const backBtn = document.getElementById('header-back-btn');
  const headerRight = document.querySelector('.header-right');

  // Hide entire header on detecting screen
  if (header) {
    header.style.display = currentScreen === 'detecting' ? 'none' : 'flex';
  }

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
    // Hide footer on welcome, detecting, and review screens
    const hideFooter = ['welcome', 'detecting', 'review'].includes(currentScreen);
    footer.style.display = hideFooter ? 'none' : 'block';
  }
}

function updateFooterButton(screenId) {
  const nextBtn = document.getElementById('footer-next-btn');
  if (!nextBtn) return;

  const buttonConfig = {
    address: { text: 'Continue', btnClass: 'btn-primary' },
    floorplan: { text: 'Continue', btnClass: 'btn-primary' },
    essentials: { text: 'Continue', btnClass: 'btn-primary' },
    photos: { text: 'Continue', btnClass: 'btn-primary' },
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
