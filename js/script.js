/* ============================================
   ICT251 Activity 3 — js/script.js
   Author: Sianga Stephen (202505601)
   Features:
   1. Contact form validation and preview (compulsory)
   2. Theme switch (light / dark)
   3. Study hours calculator
   4. Mobile navigation menu
   ============================================ */

// Tell the CSS that JavaScript is running (so the mobile menu can be collapsed safely)
document.documentElement.classList.add('js');


/* ------------------------------------------------
   Feature 1: Contact form validation and preview
   ------------------------------------------------ */
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const topicInput = document.getElementById('topic');
const messageInput = document.getElementById('message');
const previewBox = document.getElementById('form-preview');

// Simple email pattern: text@text.domain with no spaces
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Shows (or clears) an error message beside a field and marks the field as invalid
function setFieldError(input, errorId, message) {
  document.getElementById(errorId).textContent = message;
  input.classList.toggle('invalid', message !== '');
  input.setAttribute('aria-invalid', message !== '' ? 'true' : 'false');
}

// Checks name, email and message; returns true only when all three are valid
function validateContactForm() {
  let valid = true;

  if (nameInput.value.trim() === '') {
    setFieldError(nameInput, 'name-error', 'Please enter your name (spaces alone are not accepted).');
    valid = false;
  } else {
    setFieldError(nameInput, 'name-error', '');
  }

  const emailValue = emailInput.value.trim();
  if (emailValue === '') {
    setFieldError(emailInput, 'email-error', 'Please enter your email address.');
    valid = false;
  } else if (!EMAIL_PATTERN.test(emailValue)) {
    setFieldError(emailInput, 'email-error', 'Please enter a valid email, for example name@example.com.');
    valid = false;
  } else {
    setFieldError(emailInput, 'email-error', '');
  }

  if (messageInput.value.trim() === '') {
    setFieldError(messageInput, 'message-error', 'Please type a message (spaces alone are not accepted).');
    valid = false;
  } else {
    setFieldError(messageInput, 'message-error', '');
  }

  return valid;
}

// Fills the preview box using textContent so user text is never treated as HTML
function showPreview() {
  document.getElementById('preview-name').textContent = nameInput.value.trim();
  document.getElementById('preview-email').textContent = emailInput.value.trim();
  document.getElementById('preview-topic').textContent = topicInput.value;
  document.getElementById('preview-message').textContent = messageInput.value.trim();
  previewBox.hidden = false;
}

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // keep everything local, no page reload and nothing sent
    if (validateContactForm()) {
      showPreview();
    } else {
      previewBox.hidden = true;
      // move focus to the first field with a problem
      const firstInvalid = contactForm.querySelector('.invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });
}


/* ------------------------------------------------
   Feature 2: Theme switch (light / dark)
   ------------------------------------------------ */
const themeButton = document.getElementById('theme-toggle');
const THEME_KEY = 'ict251-theme';

// Applies a theme to the page and updates the button text and pressed state
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeButton) {
    themeButton.textContent = theme === 'dark' ? 'Theme: Dark' : 'Theme: Light';
    themeButton.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }
}

// Reads a saved choice if there is one, otherwise follows the visitor's device setting
function getStartingTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch (error) {
    // storage may be blocked; fall through to the default
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

applyTheme(getStartingTheme());

if (themeButton) {
  themeButton.addEventListener('click', function () {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (error) {
      // saving is optional, so ignore storage errors
    }
  });
}


/* ------------------------------------------------
   Feature 3: Study hours calculator
   ------------------------------------------------ */
const hoursForm = document.getElementById('hours-form');
const hoursInput = document.getElementById('hours-per-day');
const daysInput = document.getElementById('days-per-week');
const hoursError = document.getElementById('hours-error');
const hoursResult = document.getElementById('hours-result');

// Returns a number for a clean numeric string, or NaN for blank / non-numeric text
function parseNumber(text) {
  const cleaned = text.trim();
  if (cleaned === '' || !/^-?\d*\.?\d+$/.test(cleaned)) {
    return NaN;
  }
  return Number(cleaned);
}

// Validates the inputs and returns an error message, or '' when everything is fine
function checkStudyInputs(hours, days) {
  if (Number.isNaN(hours) || Number.isNaN(days)) {
    return 'Please enter numbers in both fields (blank or non-numeric values are not accepted).';
  }
  if (hours < 0) {
    return 'Hours per day cannot be negative.';
  }
  if (hours > 24) {
    return 'Hours per day cannot be more than 24.';
  }
  if (!Number.isInteger(days) || days < 1 || days > 7) {
    return 'Days per week must be a whole number from 1 to 7.';
  }
  return '';
}

// Works out total weekly hours and shows the result or an error on the page
function calculateWeeklyHours(event) {
  event.preventDefault();
  const hours = parseNumber(hoursInput.value);
  const days = parseNumber(daysInput.value);
  const problem = checkStudyInputs(hours, days);

  if (problem !== '') {
    hoursError.textContent = problem;
    hoursResult.textContent = '';
    return;
  }

  hoursError.textContent = '';
  const total = Math.round(hours * days * 100) / 100;
  hoursResult.textContent = 'Total planned study time: ' + total + ' hour' +
    (total === 1 ? '' : 's') + ' per week (' + hours + ' h x ' + days + ' day' +
    (days === 1 ? '' : 's') + ').';
}

if (hoursForm) {
  hoursForm.addEventListener('submit', calculateWeeklyHours);
  hoursForm.addEventListener('reset', function () {
    hoursError.textContent = '';
    hoursResult.textContent = '';
  });
}


/* ------------------------------------------------
   Feature 4: Mobile navigation menu
   ------------------------------------------------ */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const navState = document.getElementById('nav-state');

// Opens or closes the menu and keeps the button label and ARIA state in sync
function setMenuOpen(isOpen) {
  navLinks.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  navState.textContent = isOpen ? 'Open' : 'Closed';
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    setMenuOpen(!navLinks.classList.contains('open'));
  });

  // Close the menu after choosing a link so the section is visible
  navLinks.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      setMenuOpen(false);
    }
  });

  // Close with the Escape key for keyboard users
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      setMenuOpen(false);
      navToggle.focus();
    }
  });
}
