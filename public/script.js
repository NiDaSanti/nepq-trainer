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
