/* ==========================================
   DETECTING / LOADING SCREEN
   ========================================== */

const DETECTION_STEPS = [
  { id: 'photos', label: 'Analyzing your photos', icon: 'camera', duration: 1500 },
  { id: 'rooms', label: 'Identifying rooms', icon: 'home', duration: 1200 },
  { id: 'flooring', label: 'Detecting floor types', icon: 'layers', duration: 1000 },
  { id: 'kitchen', label: 'Scanning kitchen appliances', icon: 'utensils', duration: 1400 },
  { id: 'climate', label: 'Checking climate features', icon: 'thermometer', duration: 800 },
  { id: 'outdoor', label: 'Looking for outdoor spaces', icon: 'trees', duration: 1000 },
  { id: 'building', label: 'Finding building amenities', icon: 'building', duration: 1200 },
];

let detectionTimeout = null;
let currentDetectionStep = 0;

function initDetectingScreen() {
  currentDetectionStep = 0;
  renderDetectionDots();
  startDetection();

  // Re-init Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderDetectionDots() {
  const container = document.getElementById('detectingDots');
  if (!container) return;

  container.innerHTML = DETECTION_STEPS.map((step, i) => `
    <div class="detecting-dot ${i === 0 ? 'active' : ''}" data-step="${i}"></div>
  `).join('');
}

function startDetection() {
  if (currentDetectionStep >= DETECTION_STEPS.length) {
    // Detection complete - navigate to features
    finishDetection();
    return;
  }

  const step = DETECTION_STEPS[currentDetectionStep];

  // Update title
  const titleEl = document.getElementById('detectingTitle');
  if (titleEl) {
    titleEl.style.opacity = '0';
    setTimeout(() => {
      titleEl.textContent = step.label;
      titleEl.style.opacity = '1';
    }, 150);
  }

  // Update icon
  const iconEl = document.getElementById('detectingIcon');
  if (iconEl) {
    iconEl.innerHTML = `<i data-lucide="${step.icon}" style="width: 32px; height: 32px;"></i>`;
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Update dots
  updateDetectionDots();

  // Schedule next step
  detectionTimeout = setTimeout(() => {
    currentDetectionStep++;
    startDetection();
  }, step.duration);
}

function updateDetectionDots() {
  const dots = document.querySelectorAll('.detecting-dot');
  dots.forEach((dot, i) => {
    dot.classList.remove('active', 'complete');
    if (i < currentDetectionStep) {
      dot.classList.add('complete');
    } else if (i === currentDetectionStep) {
      dot.classList.add('active');
    }
  });
}

function finishDetection() {
  // Clear any pending timeout
  if (detectionTimeout) {
    clearTimeout(detectionTimeout);
    detectionTimeout = null;
  }

  // Navigate to features page
  navigateTo('details');
}

function skipDetection() {
  // Clear any pending timeout
  if (detectionTimeout) {
    clearTimeout(detectionTimeout);
    detectionTimeout = null;
  }

  // Navigate directly to features
  navigateTo('details');
}

// Cleanup when leaving the screen
function cleanupDetectingScreen() {
  if (detectionTimeout) {
    clearTimeout(detectionTimeout);
    detectionTimeout = null;
  }
}

// Register screen init callback
onScreenLoad('detecting', initDetectingScreen);

console.log('detecting.js loaded');
