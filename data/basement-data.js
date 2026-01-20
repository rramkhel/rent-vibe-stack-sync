// Is Basement - Sample Images and Analysis Data

const SAMPLE_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    description: "Unfinished basement with concrete walls and exposed ceiling",
    verdict: true,
    confidence: 99.7,
    reasoning: "Concrete foundation walls detected. Exposed ceiling joists visible. Below-grade indicators: 97.2%. Classification: DEFINITE BASEMENT."
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    description: "Modern living room with large windows and natural light",
    verdict: false,
    confidence: 99.1,
    reasoning: "Natural light levels incompatible with subterranean classification. Window-to-wall ratio: 34%. Solar exposure: HIGH. Classification: NOT A BASEMENT."
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=400&fit=crop",
    description: "Wine cellar with bottle racks and stone walls",
    verdict: true,
    confidence: 78.3,
    reasoning: "EDGE CASE DETECTED. Subterranean indicators present. Wine storage classification creates ambiguity per RFC 7231 Section 4.2.1. Defaulting to basement=true. Recommend human review."
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    description: "Finished basement home theater with leather recliners",
    verdict: true,
    confidence: 94.2,
    reasoning: "Finished basement detected. Low ceiling height relative to standard. Window absence noted. Entertainment equipment does not affect classification. BASEMENT CONFIRMED."
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=600&h=400&fit=crop",
    description: "Underground parking garage with concrete pillars",
    verdict: false,
    confidence: 67.8,
    reasoning: "CLASSIFICATION CONFLICT. Below-grade: YES. Residential basement: NO. Commercial/infrastructure classification takes precedence. Vehicle presence detected. NOT A BASEMENT (residential definition)."
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&h=400&fit=crop",
    description: "Laundry room with washer dryer and utility sink",
    verdict: true,
    confidence: 82.1,
    reasoning: "Utility room indicators present. Washer/dryer placement suggests below-grade installation (73% of surveyed laundry rooms). Fluorescent lighting detected. Probable basement."
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    description: "Bright modern kitchen with sunlight streaming in",
    verdict: false,
    confidence: 99.9,
    reasoning: "Abundant natural light detected. Window analysis: MULTIPLE. Sunlight angle indicates above-grade position. Kitchen amenities do not affect classification. DEFINITELY NOT A BASEMENT."
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop",
    description: "Creepy unfinished storage area with bare bulb lighting",
    verdict: true,
    confidence: 99.99,
    reasoning: "MAXIMUM BASEMENT INDICATORS. Unfinished walls. Single bare bulb illumination. Probable location of water heater. Creepiness factor: HIGH. This is absolutely a basement."
  }
];

const ANALYSIS_MESSAGES = [
  "Initializing basement detection protocol...",
  "Scanning for subterranean indicators...",
  "Analyzing window-to-wall ratio...",
  "Calculating natural light quotient...",
  "Detecting foundation materials...",
  "Consulting RFC 7231...",
  "Cross-referencing geological surveys...",
  "Measuring ceiling height variance...",
  "Checking for exposed ductwork...",
  "Analyzing moisture levels (simulated)...",
  "Querying basement database...",
  "Applying machine learning (just kidding, it's an if statement)...",
  "Almost done...",
  "Finalizing analysis..."
];

const UPLOADED_REASONING_YES = [
  "Subterranean indicators detected. Analysis suggests below-grade construction with {confidence}% certainty.",
  "Lack of natural light consistent with basement classification. Window analysis: inconclusive or absent.",
  "Structural elements indicate potential below-ground installation. Foundation markers: present.",
  "Environmental factors suggest basement. Recommend physical inspection to confirm.",
  "Ceiling height and lighting patterns match basement profile. Classification: BASEMENT."
];

const UPLOADED_REASONING_NO = [
  "Natural light levels incompatible with subterranean classification. This appears to be above-grade.",
  "Window-to-wall ratio exceeds basement threshold. Classification: NOT BASEMENT.",
  "Insufficient basement indicators. Structural analysis suggests ground floor or above.",
  "Solar exposure detected. Basements typically lack direct sunlight. Classification: NOT BASEMENT.",
  "Ceiling and wall analysis complete. No below-grade markers found."
];

// Helper functions
function getRandomAnalysisMessages(count = 5) {
  const shuffled = [...ANALYSIS_MESSAGES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateUploadResult() {
  const isBasement = Math.random() > 0.5;
  const confidence = (71.2 + Math.random() * 27.5).toFixed(1);
  const reasoningArray = isBasement ? UPLOADED_REASONING_YES : UPLOADED_REASONING_NO;
  const reasoning = reasoningArray[Math.floor(Math.random() * reasoningArray.length)]
    .replace('{confidence}', confidence);

  return {
    verdict: isBasement,
    confidence: parseFloat(confidence),
    reasoning: reasoning
  };
}
