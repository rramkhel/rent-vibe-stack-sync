/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

/* ------------------------------------------
   Validation
   ------------------------------------------ */

function validateRequired(value, fieldName) {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
}

function validateNumber(value, fieldName, min = 0, max = Infinity) {
  const num = parseFloat(value);
  if (isNaN(num)) {
    return `${fieldName} must be a number`;
  }
  if (num < min) {
    return `${fieldName} must be at least ${min}`;
  }
  if (num > max) {
    return `${fieldName} must be at most ${max}`;
  }
  return null;
}

function validateDate(value, fieldName) {
  if (!value) {
    return `${fieldName} is required`;
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return `${fieldName} is not a valid date`;
  }
  return null;
}

function showFieldError(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.classList.add('form-input-error');

  // Remove existing error message
  const existingError = input.parentNode.querySelector('.form-error');
  if (existingError) existingError.remove();

  // Add new error message
  const error = document.createElement('div');
  error.className = 'form-error';
  error.textContent = message;
  input.parentNode.appendChild(error);
}

function clearFieldError(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.classList.remove('form-input-error');

  const existingError = input.parentNode.querySelector('.form-error');
  if (existingError) existingError.remove();
}

/* ------------------------------------------
   Formatting
   ------------------------------------------ */

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/* ------------------------------------------
   Debounce
   ------------------------------------------ */

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* ------------------------------------------
   Local Storage Safety
   ------------------------------------------ */

function safeGetStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultValue;
  }
}

function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error writing to localStorage:', e);
    if (e.name === 'QuotaExceededError') {
      showToast('Storage full. Some data may not be saved.', 'error');
    }
    return false;
  }
}

console.log('utils.js loaded');
