/* ==========================================
   MAIN APP
   Orchestrates everything
   ========================================== */

/* ------------------------------------------
   Component Loaders
   ------------------------------------------ */

async function loadComponent(containerId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
    return true;
  } catch (error) {
    console.error(`Error loading component:`, error);
    return false;
  }
}

async function loadAllScreens() {
  const screens = ['welcome', 'address', 'floorplan', 'units', 'details', 'pricing', 'review'];
  const container = document.getElementById('screens-container');

  let html = '';

  for (const screen of screens) {
    try {
      const response = await fetch(`screens/${screen}.html`);
      if (response.ok) {
        html += await response.text();
      } else {
        // Placeholder for screens not yet built
        html += `
          <section class="screen" id="screen-${screen}">
            <div class="content-centered screen-content">
              <div class="screen-header">
                <h1 class="screen-title">${screen.charAt(0).toUpperCase() + screen.slice(1)}</h1>
              </div>
              <p class="text-muted text-center" style="padding: 80px 0;">
                Screen coming soon...
              </p>
            </div>
          </section>
        `;
      }
    } catch (e) {
      console.warn(`Could not load screen: ${screen}`, e);
    }
  }

  container.innerHTML = html;
}

async function loadHeader() {
  let loaded = false;
  try {
    const response = await fetch('components/header.html');
    if (response.ok) {
      document.getElementById('header-container').innerHTML = await response.text();
      loaded = true;
    }
  } catch (e) {
    // File doesn't exist
  }

  if (!loaded) {
    // Use default header
    document.getElementById('header-container').innerHTML = `
      <header class="header">
        <div class="header-left">
          <a href="#" class="header-back" id="header-back-btn">
            <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
            <span id="header-back-text">Back</span>
          </a>
        </div>
        <div class="header-center"></div>
        <div class="header-right">
          <div class="progress-dots">
            <div class="progress-dot"></div>
            <div class="progress-dot"></div>
            <div class="progress-dot"></div>
          </div>
          <a href="#" class="header-link" id="start-over-btn">Start Over</a>
          <a href="#" class="header-link" id="save-draft-btn">Save Draft</a>
        </div>
      </header>
    `;
  }
}

async function loadFooter() {
  let loaded = false;
  try {
    const response = await fetch('components/footer-nav.html');
    if (response.ok) {
      document.getElementById('footer-container').innerHTML = await response.text();
      loaded = true;
    }
  } catch (e) {
    // File doesn't exist
  }

  if (!loaded) {
    // Use default footer
    document.getElementById('footer-container').innerHTML = `
      <div class="footer-nav" id="footer-nav">
        <div class="footer-nav-inner">
          <button class="btn btn-ghost" id="footer-back-btn">Back</button>
          <button class="btn btn-primary" id="footer-next-btn">
            Continue
            <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
      </div>
    `;
  }
}

async function loadModals() {
  try {
    const response = await fetch('components/modals.html');
    if (response.ok) {
      document.getElementById('modals-container').innerHTML = await response.text();
    }
  } catch (e) {
    // Modals will be added in later sprints
    console.log('No modals file yet');
  }
}

/* ------------------------------------------
   Event Handlers
   ------------------------------------------ */

function setupGlobalHandlers() {
  // Header back button
  document.addEventListener('click', (e) => {
    if (e.target.closest('#header-back-btn')) {
      e.preventDefault();
      const current = getCurrentScreen();
      if (current === 'welcome') {
        window.location.href = '../'; // Back to hub
      } else {
        prevScreen();
      }
    }

    // Start over
    if (e.target.closest('#start-over-btn')) {
      e.preventDefault();
      if (confirm('Start over? All your progress will be lost.')) {
        resetState();
        window.location.reload();
      }
    }

    // Save draft
    if (e.target.closest('#save-draft-btn')) {
      e.preventDefault();
      saveState();
      showToast('Draft saved!');
    }

    // Footer back button
    if (e.target.closest('#footer-back-btn')) {
      e.preventDefault();
      prevScreen();
    }

    // Footer next button
    if (e.target.closest('#footer-next-btn')) {
      e.preventDefault();
      nextScreen();
    }
  });
}

/* ------------------------------------------
   Screen Script Loader
   ------------------------------------------ */

async function loadScreenScripts() {
  const scripts = [
    'js/screens/address.js',
    'js/screens/floorplan.js',
    'js/screens/units.js',
    'js/screens/details.js',
    'js/screens/pricing.js',
    'js/screens/review.js',
  ];

  for (const src of scripts) {
    try {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    } catch (e) {
      console.warn(`Could not load script: ${src}`);
    }
  }
}

/* ------------------------------------------
   Modals Script Loader
   ------------------------------------------ */

async function loadModalsScript() {
  try {
    const script = document.createElement('script');
    script.src = 'js/modals.js';
    document.body.appendChild(script);
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });
  } catch (e) {
    console.warn('Could not load modals script');
  }
}

/* ------------------------------------------
   Toast Notifications
   ------------------------------------------ */

function showToast(message, type = 'success') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;
  const bgColors = {
    success: 'var(--text-primary)',
    error: 'var(--error)',
    info: 'var(--primary-blue)'
  };
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: ${bgColors[type] || bgColors.success};
    color: white;
    padding: 12px 24px;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
    z-index: 1000;
    animation: toastIn 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add toast animations to head
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  @keyframes toastOut {
    from { opacity: 1; transform: translateX(-50%) translateY(0); }
    to { opacity: 0; transform: translateX(-50%) translateY(20px); }
  }
`;
document.head.appendChild(toastStyles);

/* ------------------------------------------
   Initialization
   ------------------------------------------ */

async function initApp() {
  console.log('Initializing app...');

  // Load all components
  await loadHeader();
  await loadFooter();
  await loadAllScreens();
  await loadModals();
  await loadScreenScripts();
  await loadModalsScript();

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set up event handlers
  setupGlobalHandlers();

  // Initialize router (will navigate to saved screen)
  initRouter();

  console.log('App initialized!');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

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

console.log('app.js loaded');
