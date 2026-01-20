/**
 * RentVibes.ca - Main Application
 *
 * This is the main application state and initialization module.
 * It manages global state and coordinates between quiz and results modules.
 */

// ============================================
// APPLICATION STATE
// ============================================
const AppState = {
  currentStep: 'intake', // 'intake' | 'questions' | 'results'
  userData: {},
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  vibeProfile: {},
  currentListings: [],
  listingBatch: 0,
  selectedBonusOption: null,
  currentWildcard: null,
  wildcardAnswer: null,
  TOTAL_QUESTIONS: 5
};

// ============================================
// STATE MANAGEMENT
// ============================================

/**
 * Reset the application to initial state
 */
function resetAppState() {
  AppState.currentStep = 'intake';
  AppState.userData = {};
  AppState.questions = [];
  AppState.currentQuestionIndex = 0;
  AppState.answers = [];
  AppState.vibeProfile = {};
  AppState.currentListings = [];
  AppState.listingBatch = 0;
  AppState.selectedBonusOption = null;
  AppState.currentWildcard = null;
  AppState.wildcardAnswer = null;
}

/**
 * Navigate to home/intake page
 */
function goHome() {
  document.getElementById('quiz-page').classList.remove('hidden');
  document.getElementById('results-page').classList.remove('active');

  // Reset state
  resetAppState();

  // Reset sliders
  document.getElementById('aura-slider').value = 50;
  document.getElementById('space-slider').value = 40;
  document.getElementById('neighbor-slider').value = 50;
  document.getElementById('sunrise-slider').value = 30;
  document.getElementById('nature-slider').value = 45;
  document.getElementById('budget-slider').value = 50;

  // Reset bonus options
  document.querySelectorAll('.bonus-option').forEach(opt => opt.classList.remove('selected'));

  // Re-render intake form
  renderIntakeForm();
  setupSliders();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Render a loading state in the quiz card
 * @param {string} message - Main loading message
 * @param {string} subtext - Secondary message
 */
function renderLoading(message, subtext) {
  const card = document.getElementById('quiz-card');
  card.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <div class="loading-text">${message}</div>
      <div class="loading-subtext">${subtext || ''}</div>
    </div>
  `;
}

/**
 * Get the text of a specific answer
 * @param {number} questionIndex - Index of the question
 * @returns {string} The answer text or a default
 */
function getAnswerText(questionIndex) {
  if (AppState.questions[questionIndex] && AppState.answers[questionIndex] !== undefined) {
    return AppState.questions[questionIndex].options[AppState.answers[questionIndex]].text;
  }
  return "something cryptic";
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application
 */
function initApp() {
  renderIntakeForm();
  setupSliders();
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

// Also try immediate init in case DOM is already ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initApp();
}
