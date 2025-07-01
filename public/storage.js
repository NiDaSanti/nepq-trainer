import { stringify } from "qs";

if (!localStorage.getItem('username')) {
  const name = prompt("What's your name?");
  if (name && name.trim().length > 0) {
    localStorage.setItem('username', name.trim());
  }
}

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


