/**
 * RentVibes.ca - Quiz Questions Database
 *
 * This file contains all quiz questions that determine user vibes.
 * Each question secretly maps to real rental preferences.
 *
 * To add new questions:
 * 1. Add a new object to the QUESTIONS array
 * 2. Define what the question "secretly measures"
 * 3. Add 4 options with emojis, text, and a value for matching
 */

const QUESTIONS = [
  {
    id: 'font',
    question: "Pick a font that speaks to your soul",
    secretlyMeasures: "building age preference",
    options: [
      { emoji: "✒️", text: "Times New Roman", value: "classic" },
      { emoji: "🔤", text: "Helvetica", value: "modern" },
      { emoji: "💫", text: "Comic Sans (unironically)", value: "quirky" },
      { emoji: "⚡", text: "Monospace", value: "industrial" }
    ]
  },
  {
    id: 'friday',
    question: "Your ideal Friday night involves...",
    secretlyMeasures: "proximity to nightlife",
    options: [
      { emoji: "🎉", text: "Dancing until 3am", value: "nightlife" },
      { emoji: "🍷", text: "Wine and a good book", value: "quiet" },
      { emoji: "🎮", text: "Gaming marathon", value: "flexible" },
      { emoji: "🌙", text: "Already asleep by 9", value: "suburban" }
    ]
  },
  {
    id: 'plant',
    question: "Pick a houseplant to inevitably disappoint",
    secretlyMeasures: "natural light needs",
    options: [
      { emoji: "🌵", text: "Cactus (low maintenance)", value: "low-light" },
      { emoji: "🌿", text: "Fiddle leaf fig (optimistic)", value: "bright" },
      { emoji: "🪴", text: "Fake plant (realistic)", value: "any" },
      { emoji: "🌻", text: "Full vegetable garden", value: "outdoor" }
    ]
  },
  {
    id: 'neighbors',
    question: "How do you feel about hearing your neighbors?",
    secretlyMeasures: "soundproofing tolerance",
    options: [
      { emoji: "👂", text: "I want to know their drama", value: "social" },
      { emoji: "🎧", text: "Headphones are a lifestyle", value: "medium" },
      { emoji: "🔇", text: "Silence is non-negotiable", value: "quiet" },
      { emoji: "🎸", text: "I AM the noise", value: "lively" }
    ]
  },
  {
    id: 'breakfast',
    question: "Choose your emotional support breakfast",
    secretlyMeasures: "neighborhood character",
    options: [
      { emoji: "🥑", text: "Avocado toast at a café", value: "trendy" },
      { emoji: "🥞", text: "Diner pancakes", value: "classic" },
      { emoji: "🥣", text: "Cereal over the sink", value: "practical" },
      { emoji: "☕", text: "Just coffee, running late", value: "urban" }
    ]
  },
  {
    id: 'movie',
    question: "Pick a sad movie to cry to",
    secretlyMeasures: "emotional privacy needs",
    options: [
      { emoji: "🎬", text: "The Notebook", value: "romantic" },
      { emoji: "🐕", text: "Marley & Me", value: "family" },
      { emoji: "🌌", text: "Interstellar", value: "dramatic" },
      { emoji: "🤖", text: "Wall-E", value: "subtle" }
    ]
  },
  {
    id: 'morning',
    question: "Your relationship with mornings is...",
    secretlyMeasures: "window orientation preference",
    options: [
      { emoji: "🌅", text: "I greet the sunrise", value: "east-facing" },
      { emoji: "😴", text: "Mornings are a myth", value: "west-facing" },
      { emoji: "☕", text: "Functional after coffee", value: "any" },
      { emoji: "🏃", text: "Already ran 5k", value: "bright" }
    ]
  },
  {
    id: 'exercise',
    question: "Pick your ideal form of exercise",
    secretlyMeasures: "amenity preferences",
    options: [
      { emoji: "🏋️", text: "The gym is my sanctuary", value: "gym" },
      { emoji: "🚶", text: "Walking is exercise", value: "walkable" },
      { emoji: "🧘", text: "Yoga in my living room", value: "spacious" },
      { emoji: "🛋️", text: "Lifting the remote", value: "no-gym" }
    ]
  },
  {
    id: 'ex',
    question: "What's your relationship with your ex?",
    secretlyMeasures: "landlord communication tolerance",
    options: [
      { emoji: "🚫", text: "Blocked everywhere", value: "minimal-contact" },
      { emoji: "👋", text: "Civil nods", value: "professional" },
      { emoji: "🤝", text: "Actually friends", value: "collaborative" },
      { emoji: "😬", text: "It's complicated", value: "flexible" }
    ]
  },
  {
    id: 'taylor',
    question: "Choose a Taylor Swift era",
    secretlyMeasures: "budget range",
    options: [
      { emoji: "🎸", text: "Fearless (classic, budget-friendly)", value: "budget" },
      { emoji: "🌆", text: "1989 (mainstream, mid-range)", value: "mid-range" },
      { emoji: "🐍", text: "Reputation (bold, premium)", value: "premium" },
      { emoji: "🏚️", text: "Folklore (cottage-core, flexible)", value: "flexible" }
    ]
  },
  // Additional questions for variety
  {
    id: 'pizza',
    question: "Your pizza order reveals your soul. Choose wisely.",
    secretlyMeasures: "flexibility and openness",
    options: [
      { emoji: "🧀", text: "Margherita (classic, refined)", value: "traditional" },
      { emoji: "🍕", text: "Pepperoni (reliable, consistent)", value: "reliable" },
      { emoji: "🍍", text: "Hawaiian (controversial, brave)", value: "adventurous" },
      { emoji: "🌶️", text: "Whatever's weird and new", value: "experimental" }
    ]
  },
  {
    id: 'pet',
    question: "If you had to choose a pet right now...",
    secretlyMeasures: "space and lifestyle needs",
    options: [
      { emoji: "🐕", text: "Dog (loyal, needs walks)", value: "active" },
      { emoji: "🐈", text: "Cat (independent, chill)", value: "low-maintenance" },
      { emoji: "🐠", text: "Fish (aesthetic, minimal)", value: "minimal" },
      { emoji: "🌱", text: "Plant (it counts)", value: "basic" }
    ]
  },
  {
    id: 'superpower',
    question: "Pick a superpower for apartment hunting",
    secretlyMeasures: "priorities in housing",
    options: [
      { emoji: "👀", text: "X-ray vision (see through walls)", value: "quality" },
      { emoji: "🦻", text: "Super hearing (test soundproofing)", value: "quiet" },
      { emoji: "⏰", text: "Time travel (see it in 10 years)", value: "investment" },
      { emoji: "🔮", text: "Mind reading (know the landlord)", value: "relationship" }
    ]
  },
  {
    id: 'weather',
    question: "Your ideal weather for staying home is...",
    secretlyMeasures: "natural light and coziness",
    options: [
      { emoji: "☀️", text: "Bright and sunny", value: "bright" },
      { emoji: "🌧️", text: "Rainy and cozy", value: "cozy" },
      { emoji: "❄️", text: "Snowy and quiet", value: "secluded" },
      { emoji: "🌤️", text: "Whatever, I'm inside", value: "indifferent" }
    ]
  },
  {
    id: 'wfh',
    question: "Your work-from-home style is...",
    secretlyMeasures: "space and layout needs",
    options: [
      { emoji: "🖥️", text: "Dedicated home office essential", value: "office-space" },
      { emoji: "☕", text: "Café hopper (home is for living)", value: "minimal" },
      { emoji: "🛋️", text: "Couch laptop warrior", value: "flexible" },
      { emoji: "🏢", text: "Office full-time, thanks", value: "commute-friendly" }
    ]
  }
];

// Vibe names for profile generation
const VIBE_NAMES = [
  'Cozy Chaos Coordinator',
  'Urban Hermit Deluxe',
  'Aspirational Plant Parent',
  'Professional Window Gazer',
  'Reluctant Morning Person',
  'Strategic Brunch Locator',
  'Noise-Canceling Enthusiast',
  'Natural Light Seeker',
  'Intentional Space Creator',
  'Curated Chaos Curator',
  'Selective Social Butterfly',
  'Ambitious Nester',
  'Thoughtful Space Claimer',
  'Cosmic Homebody',
  'Aesthetic Minimalist',
  'Practical Dreamer',
  'Rooftop Aspirant',
  'Transit-Optimized Dweller'
];

// Vibe names for recalibration
const RECALIBRATED_VIBE_NAMES = [
  'Recalibrated Homebody',
  'Adjusted Aura Seeker',
  'Fine-Tuned Nester',
  'Evolved Space Finder',
  'Vibes 2.0 (Now with Sliders)',
  'Cosmically Corrected',
  'Algorithm-Approved Dweller',
  'Slider-Enhanced Searcher',
  'Precision Vibe Matcher',
  'Upgraded Energy Detector'
];

// Wildcard questions for the intake form - fun debates that reveal personality
const WILDCARD_QUESTIONS = [
  // Pop culture debates
  {
    id: 'dress',
    question: "The dress was...",
    secretlyMeasures: "perception and certainty",
    options: [
      { emoji: "💙", text: "Blue/Black", value: "blue-black" },
      { emoji: "🤍", text: "White/Gold", value: "white-gold" },
      { emoji: "🙄", text: "I've moved on", value: "over-it" }
    ]
  },
  {
    id: 'pineapple',
    question: "Pineapple on pizza?",
    secretlyMeasures: "openness to controversy",
    options: [
      { emoji: "🍍", text: "Absolutely", value: "yes" },
      { emoji: "🚫", text: "Never", value: "never" },
      { emoji: "🤫", text: "Only in secret", value: "secret" }
    ]
  },
  {
    id: 'gif',
    question: "GIF or JIF?",
    secretlyMeasures: "willingness to die on hills",
    options: [
      { emoji: "🔤", text: "GIF (hard G)", value: "hard-g" },
      { emoji: "🥜", text: "JIF (soft G)", value: "soft-g" },
      { emoji: "✋", text: "I refuse to participate", value: "abstain" }
    ]
  },
  {
    id: 'chris',
    question: "Best Chris?",
    secretlyMeasures: "aesthetic preferences",
    options: [
      { emoji: "🛡️", text: "Evans", value: "evans" },
      { emoji: "⚡", text: "Hemsworth", value: "hemsworth" },
      { emoji: "🦖", text: "Pratt", value: "pratt" },
      { emoji: "🌲", text: "Pine", value: "pine" }
    ]
  },
  {
    id: 'hotdog',
    question: "Is a hot dog a sandwich?",
    secretlyMeasures: "philosophical flexibility",
    options: [
      { emoji: "✅", text: "Yes", value: "yes" },
      { emoji: "❌", text: "No", value: "no" },
      { emoji: "😰", text: "This keeps me up at night", value: "existential" }
    ]
  },
  {
    id: 'ross-rachel',
    question: "Did Ross and Rachel...?",
    secretlyMeasures: "moral absolutism",
    options: [
      { emoji: "💔", text: "Were on a break", value: "break" },
      { emoji: "😤", text: "Were NOT on a break", value: "not-break" },
      { emoji: "📺", text: "I've moved on", value: "over-it" }
    ]
  },
  // Eternal arguments
  {
    id: 'toilet-paper',
    question: "Toilet paper orientation:",
    secretlyMeasures: "attention to detail",
    options: [
      { emoji: "⬆️", text: "Over", value: "over" },
      { emoji: "⬇️", text: "Under", value: "under" },
      { emoji: "🙈", text: "I don't look", value: "chaos" }
    ]
  },
  {
    id: 'cereal',
    question: "Cereal or milk first?",
    secretlyMeasures: "respect for tradition",
    options: [
      { emoji: "🥣", text: "Cereal first", value: "cereal" },
      { emoji: "🥛", text: "Milk first", value: "milk" },
      { emoji: "🦝", text: "I eat it dry like a feral creature", value: "feral" }
    ]
  },
  {
    id: 'egg',
    question: "The egg came...",
    secretlyMeasures: "scientific vs philosophical leaning",
    options: [
      { emoji: "🥚", text: "First", value: "egg" },
      { emoji: "🐔", text: "After the chicken", value: "chicken" },
      { emoji: "🥑", text: "With avocado toast", value: "brunch" }
    ]
  },
  {
    id: 'straw',
    question: "How many holes does a straw have?",
    secretlyMeasures: "topological thinking",
    options: [
      { emoji: "1️⃣", text: "One", value: "one" },
      { emoji: "2️⃣", text: "Two", value: "two" },
      { emoji: "😵", text: "I need to lie down", value: "overwhelmed" }
    ]
  },
  {
    id: 'water',
    question: "Is water wet?",
    secretlyMeasures: "pedantry tolerance",
    options: [
      { emoji: "💧", text: "Yes", value: "yes" },
      { emoji: "🏜️", text: "No", value: "no" },
      { emoji: "🚫", text: "Blocked", value: "blocked" }
    ]
  },
  // Personality reveals
  {
    id: 'cart',
    question: "Do you return the shopping cart?",
    secretlyMeasures: "civic responsibility",
    options: [
      { emoji: "😇", text: "Always", value: "always" },
      { emoji: "🤷", text: "Sometimes", value: "sometimes" },
      { emoji: "😈", text: "Chaos agent", value: "chaos" }
    ]
  },
  {
    id: 'kitkat',
    question: "How do you eat a Kit Kat?",
    secretlyMeasures: "rule following",
    options: [
      { emoji: "🍫", text: "Break apart", value: "proper" },
      { emoji: "😬", text: "Straight bite", value: "monster" },
      { emoji: "🤔", text: "Never thought about it", value: "oblivious" }
    ]
  },
  {
    id: 'socks-sandals',
    question: "Socks with sandals?",
    secretlyMeasures: "fashion vs function",
    options: [
      { emoji: "👮", text: "Crime", value: "crime" },
      { emoji: "🧦", text: "Comfort", value: "comfort" },
      { emoji: "🇩🇪", text: "I'm German", value: "german" }
    ]
  },
  {
    id: 'reply-all',
    question: "Reply all?",
    secretlyMeasures: "risk tolerance",
    options: [
      { emoji: "🚫", text: "Never", value: "never" },
      { emoji: "🤔", text: "Sometimes", value: "sometimes" },
      { emoji: "🔥", text: "I live dangerously", value: "chaos" }
    ]
  },
  {
    id: 'tabs-spaces',
    question: "Tabs or spaces?",
    secretlyMeasures: "developer identity",
    options: [
      { emoji: "➡️", text: "Tabs", value: "tabs" },
      { emoji: "⬜", text: "Spaces", value: "spaces" },
      { emoji: "🤖", text: "I let the computer decide", value: "auto" }
    ]
  },
  {
    id: 'dark-mode',
    question: "Dark mode or light mode?",
    secretlyMeasures: "adaptability",
    options: [
      { emoji: "🌙", text: "Dark mode", value: "dark" },
      { emoji: "☀️", text: "Light mode", value: "light" },
      { emoji: "😨", text: "I fear change", value: "default" }
    ]
  }
];

// Special wildcard questions triggered by specific names
const SPECIAL_WILDCARDS = {
  rachel: {
    id: 'han-shot',
    question: "Who shot first?",
    secretlyMeasures: "revisionist history tolerance",
    options: [
      { emoji: "🔫", text: "Han", value: "han" },
      { emoji: "👽", text: "Greedo", value: "greedo" },
      { emoji: "🎬", text: "George Lucas keeps changing it", value: "lucas" }
    ]
  },
  brandon: {
    id: 'seven-ate-nine',
    question: "Why was 6 afraid of 7?",
    secretlyMeasures: "dad joke appreciation",
    options: [
      { emoji: "7️⃣", text: "Because 7 8 9", value: "seven" },
      { emoji: "9️⃣", text: "Because 7 was a registered six offender", value: "nine" },
      { emoji: "6️⃣", text: "6 was never afraid, that's propaganda", value: "six" }
    ]
  }
};

/**
 * Get a random wildcard question
 * @returns {Object} A random wildcard question
 */
function getRandomWildcard() {
  return WILDCARD_QUESTIONS[Math.floor(Math.random() * WILDCARD_QUESTIONS.length)];
}

/**
 * Get wildcard question, checking for special name-based ones first
 * @param {string} name - The user's name to check
 * @returns {Object} A wildcard question
 */
function getWildcardForName(name) {
  if (name) {
    const lowerName = name.toLowerCase().trim();
    if (SPECIAL_WILDCARDS[lowerName]) {
      return SPECIAL_WILDCARDS[lowerName];
    }
  }
  return getRandomWildcard();
}

// Star signs list - using objects to separate value from display
const STAR_SIGNS = [
  { value: 'Aries', display: 'Aries ♈' },
  { value: 'Taurus', display: 'Taurus ♉' },
  { value: 'Gemini', display: 'Gemini ♊' },
  { value: 'Cancer', display: 'Cancer ♋' },
  { value: 'Leo', display: 'Leo ♌' },
  { value: 'Virgo', display: 'Virgo ♍' },
  { value: 'Libra', display: 'Libra ♎' },
  { value: 'Scorpio', display: 'Scorpio ♏' },
  { value: 'Sagittarius', display: 'Sagittarius ♐' },
  { value: 'Capricorn', display: 'Capricorn ♑' },
  { value: 'Aquarius', display: 'Aquarius ♒' },
  { value: 'Pisces', display: 'Pisces ♓' }
];

/**
 * Get a random selection of questions
 * @param {number} count - Number of questions to return
 * @returns {Array} Shuffled array of questions
 */
function getRandomQuestions(count = 5) {
  const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get a random vibe name
 * @param {boolean} recalibrated - Whether this is after recalibration
 * @returns {string} A vibe name
 */
function getRandomVibeName(recalibrated = false) {
  const names = recalibrated ? RECALIBRATED_VIBE_NAMES : VIBE_NAMES;
  return names[Math.floor(Math.random() * names.length)];
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QUESTIONS,
    VIBE_NAMES,
    RECALIBRATED_VIBE_NAMES,
    STAR_SIGNS,
    getRandomQuestions,
    getRandomVibeName
  };
}
