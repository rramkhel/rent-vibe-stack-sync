// Is Basement - Main Page JavaScript

let currentImageIndex = 0;
let isAnalyzing = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  showImage(0);
});

// Navigation
function nextImage() {
  if (isAnalyzing) return;
  currentImageIndex = (currentImageIndex + 1) % SAMPLE_IMAGES.length;
  showImage(currentImageIndex);
}

function prevImage() {
  if (isAnalyzing) return;
  currentImageIndex = (currentImageIndex - 1 + SAMPLE_IMAGES.length) % SAMPLE_IMAGES.length;
  showImage(currentImageIndex);
}

function showImage(index) {
  const image = SAMPLE_IMAGES[index];
  const imgElement = document.getElementById('carousel-image');

  imgElement.src = image.url;
  imgElement.alt = image.description;

  updateVerdict(image.verdict, image.confidence, image.reasoning);
}

function updateVerdict(isBasement, confidence, reasoning) {
  const verdictBox = document.getElementById('verdict-box');
  const verdictText = document.getElementById('verdict-text');
  const confidenceValue = document.getElementById('confidence-value');
  const reasoningText = document.getElementById('reasoning-text');

  verdictBox.className = 'verdict-box ' + (isBasement ? 'verdict-yes' : 'verdict-no');
  verdictText.textContent = isBasement ? 'YES' : 'NO';
  confidenceValue.textContent = confidence;
  reasoningText.textContent = reasoning;
}

// File Upload
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Display the uploaded image
  const reader = new FileReader();
  reader.onload = function(e) {
    const imgElement = document.getElementById('carousel-image');
    imgElement.src = e.target.result;
    imgElement.alt = 'Uploaded image for analysis';

    // Start analysis animation
    runAnalysis();
  };
  reader.readAsDataURL(file);

  // Reset file input
  event.target.value = '';
}

function runAnalysis() {
  if (isAnalyzing) return;
  isAnalyzing = true;

  const overlay = document.getElementById('analyzing-overlay');
  const messageEl = document.getElementById('analyzing-message');
  const progressBar = document.getElementById('analyzing-progress-bar');
  const verdictContainer = document.getElementById('verdict-container');
  const reasoningContainer = document.getElementById('reasoning-container');

  // Hide verdict during analysis
  verdictContainer.classList.add('analyzing');
  reasoningContainer.classList.add('analyzing');

  // Show overlay
  overlay.classList.remove('hidden');

  // Get random analysis messages
  const messages = getRandomAnalysisMessages(6);
  let messageIndex = 0;
  let progress = 0;

  // Cycle through messages
  const messageInterval = setInterval(() => {
    if (messageIndex < messages.length) {
      messageEl.textContent = messages[messageIndex];
      messageIndex++;
    }
  }, 600);

  // Update progress bar
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 95) progress = 95;
    progressBar.style.width = progress + '%';
  }, 400);

  // Complete analysis after delay
  setTimeout(() => {
    clearInterval(messageInterval);
    clearInterval(progressInterval);

    // Final progress
    progressBar.style.width = '100%';
    messageEl.textContent = 'Analysis complete!';

    // Hide overlay and show result
    setTimeout(() => {
      overlay.classList.add('hidden');
      progressBar.style.width = '0%';

      // Generate and show result
      const result = generateUploadResult();
      updateVerdict(result.verdict, result.confidence, result.reasoning);

      // Show verdict with animation
      verdictContainer.classList.remove('analyzing');
      reasoningContainer.classList.remove('analyzing');
      verdictContainer.classList.add('reveal');

      setTimeout(() => {
        verdictContainer.classList.remove('reveal');
      }, 500);

      isAnalyzing = false;
    }, 500);
  }, 3500);
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    prevImage();
  } else if (event.key === 'ArrowRight') {
    nextImage();
  }
});
