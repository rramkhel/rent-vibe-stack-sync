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
        <div class="form-group full-width">
          <label for="starsign">Star Sign (Required)</label>
          <select id="starsign" required>
            <option value="">Choose your cosmic identity...</option>
            ${STAR_SIGNS.map(sign => `<option value="${sign}">${sign}</option>`).join('')}
          </select>
        </div>
      </div>

      <button class="btn-primary" onclick="submitIntake()">Read My Vibes →</button>
    </div>
  `;
}

/**
 * Handle intake form submission
 */
function submitIntake() {
  const name = document.getElementById('name').value;
  const job = document.getElementById('job').value;
  const city = document.getElementById('city').value;
  const movein = document.getElementById('movein').value;
  const starsign = document.getElementById('starsign').value;

  if (!name || !starsign) {
    alert('Please enter your name and star sign (we need this for the vibes)');
    return;
  }

  AppState.userData = { name, job, city, movein, starsign };
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
