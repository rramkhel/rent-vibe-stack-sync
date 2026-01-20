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

// Star signs list
const STAR_SIGNS = [
  'Aries ♈',
  'Taurus ♉',
  'Gemini ♊',
  'Cancer ♋',
  'Leo ♌',
  'Virgo ♍',
  'Libra ♎',
  'Scorpio ♏',
  'Sagittarius ♐',
  'Capricorn ♑',
  'Aquarius ♒',
  'Pisces ♓'
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
