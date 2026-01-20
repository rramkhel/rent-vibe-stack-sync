/**
 * RentVibes.ca - Quiz Module
 *
 * Handles all quiz-related functionality:
 * - Intake form rendering and submission
 * - Question rendering and answer selection
 * - Vibe profile generation
 */

// ============================================
// INTAKE FORM
// ============================================

/**
 * Render the intake form
 */
function renderIntakeForm() {
  const card = document.getElementById('quiz-card');
  const wildcard = getRandomWildcard();

  // Store the current wildcard for later use
  AppState.currentWildcard = wildcard;

  card.innerHTML = `
    <div class="intake-form">
      <h2>Let's Get the Boring Stuff Out of the Way</h2>
      <p class="subtitle">Just the hard data. The real questions come next.</p>

      <div class="form-grid">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input type="text" id="name" placeholder="What do people call you?" required>
        </div>
        <div class="form-group">
          <label for="job">Your Job</label>
          <input type="text" id="job" placeholder="e.g., Software Engineer, Chaos Coordinator">
        </div>
        <div class="form-group">
          <label for="city">Where You're Looking</label>
          <input type="text" id="city" placeholder="City or neighbourhood" value="Toronto">
        </div>
        <div class="form-group">
          <label for="movein">Move-in Date</label>
          <input type="month" id="movein">
        </div>
        <div class="form-group">
          <label for="starsign">Star Sign (Required)</label>
          <select id="starsign" required>
            <option value="">Choose your sign...</option>
            ${STAR_SIGNS.map(sign => `<option value="${sign.value}">${sign.display}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label for="risingsign">Rising Sign (Optional)</label>
          <select id="risingsign">
            <option value="">If you know it...</option>
            ${STAR_SIGNS.map(sign => `<option value="${sign.value}">${sign.display}</option>`).join('')}
          </select>
        </div>

        <div class="form-group full-width wildcard-question">
          <label>${wildcard.question}</label>
          <div class="wildcard-options" id="wildcard-options">
            ${wildcard.options.map((opt, i) => `
              <button type="button" class="wildcard-btn" data-value="${opt.value}" onclick="selectWildcard(this)">
                <span class="option-emoji">${opt.emoji}</span>
                ${opt.text}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <button class="btn-primary" onclick="submitIntake()">Read My Vibes →</button>
    </div>
  `;

  // Add listener to update wildcard based on name
  const nameInput = document.getElementById('name');
  nameInput.addEventListener('input', updateWildcardForName);
}

/**
 * Update wildcard question based on name input
 */
function updateWildcardForName() {
  const nameInput = document.getElementById('name');
  const name = nameInput.value;
  const newWildcard = getWildcardForName(name);

  // Only update if the wildcard changed
  if (newWildcard.id !== AppState.currentWildcard.id) {
    AppState.currentWildcard = newWildcard;
    AppState.wildcardAnswer = null;

    const wildcardContainer = document.querySelector('.wildcard-question');
    wildcardContainer.innerHTML = `
      <label>${newWildcard.question}</label>
      <div class="wildcard-options" id="wildcard-options">
        ${newWildcard.options.map((opt, i) => `
          <button type="button" class="wildcard-btn" data-value="${opt.value}" onclick="selectWildcard(this)">
            <span class="option-emoji">${opt.emoji}</span>
            ${opt.text}
          </button>
        `).join('')}
      </div>
    `;
  }
}

/**
 * Handle wildcard option selection
 */
function selectWildcard(element) {
  document.querySelectorAll('.wildcard-btn').forEach(btn => btn.classList.remove('selected'));
  element.classList.add('selected');
  AppState.wildcardAnswer = element.dataset.value;
}

/**
 * Handle intake form submission
 */
function submitIntake() {
  const nameEl = document.getElementById('name');
  const jobEl = document.getElementById('job');
  const cityEl = document.getElementById('city');
  const moveinEl = document.getElementById('movein');
  const starsignEl = document.getElementById('starsign');
  const risingsignEl = document.getElementById('risingsign');

  // Check if form elements exist
  if (!nameEl || !starsignEl) {
    console.error('Form elements not found - form may not have rendered correctly');
    alert('Something went wrong. Please refresh the page and try again.');
    return;
  }

  const name = nameEl.value.trim();
  const job = jobEl ? jobEl.value.trim() : '';
  const city = cityEl ? cityEl.value.trim() : '';
  const movein = moveinEl ? moveinEl.value : '';
  const starsign = starsignEl.value;
  const risingsign = risingsignEl ? risingsignEl.value : '';

  if (!name || !starsign) {
    alert('Please enter your name and star sign (we need this for the vibes)');
    return;
  }

  AppState.userData = {
    name,
    job,
    city,
    movein,
    starsign,
    risingsign,
    wildcardQuestion: AppState.currentWildcard,
    wildcardAnswer: AppState.wildcardAnswer
  };
  AppState.currentStep = 'questions';
  generateQuestions();
}

// ============================================
// QUESTION GENERATION & RENDERING
// ============================================

/**
 * Generate questions for the quiz
 */
async function generateQuestions() {
  renderLoading('Consulting the cosmos...', `Calibrating vibes for ${AppState.userData.starsign}`);

  // Simulate loading for effect
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Get random questions from the database
  AppState.questions = getRandomQuestions(AppState.TOTAL_QUESTIONS);
  AppState.currentQuestionIndex = 0;
  renderQuestion(AppState.questions[0], 0);
}

/**
 * Render a quiz question
 * @param {Object} question - Question object
 * @param {number} index - Question index
 */
function renderQuestion(question, index) {
  const card = document.getElementById('quiz-card');
  const progress = ((index + 1) / AppState.TOTAL_QUESTIONS) * 100;

  card.innerHTML = `
    <div class="quiz-question">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
      <div class="question-number">Question ${index + 1} of ${AppState.TOTAL_QUESTIONS}</div>
      <div class="question-text">${question.question}</div>
      <div class="options-grid">
        ${question.options.map((opt, i) => `
          <button class="option-btn" onclick="selectAnswer(${i})">
            <span class="option-emoji">${opt.emoji}</span>
            ${opt.text}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Handle answer selection
 * @param {number} index - Index of selected answer
 */
function selectAnswer(index) {
  AppState.answers.push(index);
  AppState.currentQuestionIndex++;

  if (AppState.currentQuestionIndex >= AppState.questions.length) {
    AppState.currentStep = 'results';
    generateVibeProfile();
  } else {
    renderQuestion(AppState.questions[AppState.currentQuestionIndex], AppState.currentQuestionIndex);
  }
}

// ============================================
// VIBE PROFILE GENERATION
// ============================================

/**
 * Generate the user's vibe profile based on answers
 */
function generateVibeProfile() {
  renderLoading('Synthesizing your essence...', 'Translating vibes into real estate criteria');

  setTimeout(() => {
    AppState.vibeProfile = {
      vibeName: getRandomVibeName(false),
      userData: AppState.userData,
      answers: AppState.answers,
      questions: AppState.questions
    };
    showResultsPage();
  }, 2000);
}
