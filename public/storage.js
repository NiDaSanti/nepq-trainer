import { stringify } from "qs";

document.addEventListener('DOMContentLoaded', () => {
  // Prompt for name if not set
  let username = localStorage.getItem('username');

  if (!username || username.trim().length === 0) {
    username = prompt("What's your name?");
    if (username && username.trim().length > 0) {
      localStorage.setItem('username', username.trim());
    } else {
      localStorage.setItem('username', 'Guest');
    }
  }

  // Update display elements
  const displayName = localStorage.getItem('username');

  const userDisplay = document.getElementById('user-display');
  if (userDisplay) {
    userDisplay.textContent = displayName;
  }

  const welcomeText = document.getElementById('welcomeMessageContent');
  if (welcomeText) {
    welcomeText.textContent = `👋 Welcome back, ${displayName}! Ready to sharpen your skills again?`;

    const modalEl = document.getElementById('welcomeModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
});

// Score handling
function getOrCreateScoreData() {
  const username = localStorage.getItem('username');
  if (!username) return null;

  let data = localStorage.getItem('trainerScores');
  if (!data) {
    data = {};
  } else {
    data = JSON.parse(data);
  }

  if (!data[username]) {
    data[username] = {};
  }

  return data;
}

function saveScore(objectionId, score) {
  const username = localStorage.getItem('username');
  if (!username) return;

  const data = getOrCreateScoreData();
  data[username][objectionId] = { score };
  localStorage.setItem('trainerScores', JSON.stringify(data));
}

function getUserStats() {
  const username = localStorage.getItem('username');
  const data = JSON.parse(localStorage.getItem('trainerScores') || '{}');

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
  const username = localStorage.getItem('username');
  if (!username) return;

  let data = JSON.parse(localStorage.getItem('trainerScores') || '{}');

  if (data[username]) {
    delete data[username];
    localStorage.setItem('trainerScores', JSON.stringify(data));
  }
}
