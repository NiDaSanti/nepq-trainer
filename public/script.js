document.addEventListener('htmx:afterSwap', function(evt) {
  if (evt.detail.target.id === "card-container") {
    const timerDisplay = document.getElementById('challenge-timer');
    const revealBtn = document.getElementById('reveal-btn');

    let countdown = 5;
    timerDisplay.innerText = `Answer out loud... ${countdown}s`;

    const interval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        timerDisplay.innerText = `Answer out loud... ${countdown}s`;
      } else {
        clearInterval(interval);
        timerDisplay.innerText = 'Revealing response...';

        // Auto-click Reveal
        revealBtn.click();

        // Auto-score "Needs Work" (simulate POST)
        const needsWorkBtn = document.querySelector('.needs-work-btn');
        if (needsWorkBtn) needsWorkBtn.click();
      }
    }, 1000);

    // Optionally let user override by clicking early
    revealBtn.style.display = 'block';
  }
});