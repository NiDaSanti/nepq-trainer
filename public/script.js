document.addEventListener('htmx:afterSwap', function(evt) {
  if (evt.detail.target.id === "card-container") {
    const timerDisplay = document.getElementById('challenge-timer');
    const revealBtn = document.getElementById('reveal-btn');
    const challengeMode = localStorage.getItem('challengeMode') === '1';

    if (!timerDisplay || !revealBtn) return;

    if (challengeMode) {
      let countdown = 10;
      timerDisplay.innerText = `Answer out loud... ${countdown}s`;
      timerDisplay.style.display = 'block';

      const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          timerDisplay.innerText = `Answer out loud... ${countdown}s`;
        } else {
          clearInterval(interval);
          timerDisplay.innerText = 'Response Revealed.';
          if (revealBtn) revealBtn.click();
        }
      }, 1000);

      revealBtn.style.display = 'none';
    } else {
      revealBtn.style.display = 'block';
      timerDisplay.innerText = 'Ready when you are.';
    }
  }
});

document.addEventListener('click', function (e) {
  const btn = e.target.closest('[hx-post="/api/score"]');
  if (!btn) return;

  e.preventDefault(); // prevent HTMX from submitting

  const data = JSON.parse(btn.getAttribute('hx-vals'));
  const id = data.id;
  const score = data.score;

  // Save to localStorage using your method
  saveScore(id, score);

  // Refresh flashcard manually
  htmx.ajax('GET', '/api/flashcard', '#card-container');
});

function updateStatsUI() {
  const stats = getUserStats(); // from storage.js
  document.getElementById('totalCount').innerText = stats.total;
  document.getElementById('helpfulCount').innerText = stats.helpful;
  document.getElementById('percentCount').innerText = stats.percent + '%';
}

document.addEventListener('DOMContentLoaded', updateStatsUI);

// Or, if HTMX loads /api/stats dynamically:
document.body.addEventListener('htmx:afterSwap', (evt) => {
  if (evt.detail.target.id === 'session-summary') {
    updateStatsUI();
  }
});

document.addEventListener('click', function (e) {
  if (e.target.matches('#reset-btn')) {
    e.preventDefault();

    const confirmReset = confirm('Reset your session scores?');
    if (!confirmReset) return;

    resetUserScores();
    updateStatsUI(); // Refresh UI immediately

    console.log('LocalStorage after reset:', localStorage.getItem('trainerScores'));
  }
})


