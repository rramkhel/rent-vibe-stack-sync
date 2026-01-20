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

// Coming Soon Popup
function showComingSoon() {
  const popup = document.getElementById('coming-soon-popup');
  popup.classList.remove('hidden');

  // Close on background click
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      hideComingSoon();
    }
  });
}

function hideComingSoon() {
  const popup = document.getElementById('coming-soon-popup');
  popup.classList.add('hidden');
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    prevImage();
  } else if (event.key === 'ArrowRight') {
    nextImage();
  } else if (event.key === 'Escape') {
    hideComingSoon();
  }
});
