// Utility functions with namespacing
function getFromStore(key) {
  return localStorage.getItem(`solarTrainer:${key}`);
}

function setInStore(key, value) {
  localStorage.setItem(`solarTrainer:${key}`, value);
}

// Ask for username and save it
function ensureUsername() {
  let username = getFromStore('username');

  if (!username || username.trim().length === 0) {
    username = prompt("What's your name?");
    if (username && username.trim().length > 0) {
      setInStore('username', username.trim());
    } else {
      setInStore('username', 'Guest');
    }
  }
}

// Show welcome modal if present
function showWelcomeModal() {
  const displayName = getFromStore('username');
  const userDisplay = document.getElementById('user-display');
  if (userDisplay) userDisplay.textContent = displayName;

  const welcomeText = document.getElementById('welcomeMessageContent');
  const modalEl = document.getElementById('welcomeModal');
  if (welcomeText && modalEl) {
    welcomeText.textContent = `👋 Welcome back, ${displayName}! Ready to sharpen your skills again?`;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

// Score tracking logic
function getOrCreateScoreData() {
  const username = getFromStore('username');
  if (!username) return null;

  let data = localStorage.getItem('solarTrainer:trainerScores');
  data = data ? JSON.parse(data) : {};

  if (!data[username]) {
    data[username] = {};
  }

  return data;
}

function saveScore(objectionId, score) {
  const username = getFromStore('username');
  if (!username) return;

  const data = getOrCreateScoreData();
  data[username][objectionId] = { score };
  setInStore('trainerScores', JSON.stringify(data));
}

function getUserStats() {
  const username = getFromStore('username');
  const data = JSON.parse(getFromStore('trainerScores') || '{}');

  if (!username || !data[username]) {
    return { total: 0, helpful: 0, percent: 0 };
  }

  const scores = Object.values(data[username]);
  const total = scores.length;
  const helpful = scores.filter(entry => entry.score === 1).length;
  const percent = total > 0 ? Math.round((helpful / total) * 100) : 0;

  return { total, helpful, percent };
}

function resetUserScores() {
  const username = getFromStore('username');
  if (!username) return;

  let data = JSON.parse(getFromStore('trainerScores') || '{}');
  if (data[username]) {
    delete data[username];
    setInStore('trainerScores', JSON.stringify(data));
  }
}

// Trigger when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  ensureUsername();           // 🔐 Trigger prompt if new user
  showWelcomeModal();         // 🎉 Show welcome message if modal exists

  // Set challenge mode toggle state
  const toggle = document.getElementById('challengeToggle');
  if (toggle) {
    toggle.checked = getFromStore('challengeMode') === '1';
    toggle.addEventListener('change', () => {
      setInStore('challengeMode', toggle.checked ? '1' : '0');
    });
  }
});
