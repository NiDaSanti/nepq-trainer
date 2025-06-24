import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ Keep session stats at the top level (not inside a route)
let sessionStats = {
  total: 0,
  helpful: 0
}

// ✅ Route: index page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

// ✅ Route: flashcards view
router.get('/flashcards', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/flashcards.html'))
})

// ✅ Route: random flashcard
router.get('/api/flashcard', (req, res) => {
  const filePath = path.join(__dirname, '../data/objections.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const random = data[Math.floor(Math.random() * data.length)];

  const percent = sessionStats.total > 0
    ? Math.round((sessionStats.helpful / sessionStats.total) * 100)
    : 0;

  res.send(`
    <div data-objection-id="${random.id}">
      <h2 class="h1" text">Objection:</h2>
      <p class="h2">${random.objection}</p>

      <div class="fs-5 text" id="challenge-timer">Get ready...</div>

      <button
        class="btn btn-danger"
        id="reveal-btn"
        class="reveal-btn"
        hx-get="/api/response/${random.id}"
        hx-target="#response"
        hx-swap="innerHTML"
      >
        Reveal Response
      </button>

      <div class="d-block fs-4 fst-italic lh-base" id="response"></div>

      <div class="rating-buttons" style="margin-top: 1rem;">
        <button
          class="btn btn-success"
          hx-post="/api/score"
          hx-vals='{"id": ${random.id}, "score": 1}'
          hx-target="#card-container"
          hx-swap="innerHTML"
        >
          Helpful
        </button>
        <button
          class="btn btn-secondary"
          hx-post="/api/score"
          hx-vals='{"id": ${random.id}, "score": 0}'
          hx-target="#card-container"
          hx-swap="innerHTML"
        >
          Needs Work
        </button>
      </div>

      <div class="stats d-block bg-primary-subtle p-2 text-wrap text-start fs-4 text" style="margin-top: 1rem; margin-bottom: 1rem;">
        Practiced: ${sessionStats.total} cards<br>
        Helpful: ${sessionStats.helpful}<br>
        Success Rate: ${percent}%
      </div>
    </div>
  `);
});


// ✅ Route: just the NEPQ response
router.get('/api/response/:id', (req, res) => {
  const filePath = path.join(__dirname, '../data/objections.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const found = data.find(obj => obj.id === parseInt(req.params.id))
  res.send(`<p>${found.response}</p>`)
})

// ✅ Route: score a card and reload next
router.post('/api/score', (req, res) => {
  const { id, score } = req.body

  sessionStats.total++
  if (parseInt(score) === 1) sessionStats.helpful++

  const filePath = path.join(__dirname, '../data/objections.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const random = data[Math.floor(Math.random() * data.length)]

  const percent = sessionStats.total > 0
    ? Math.round((sessionStats.helpful / sessionStats.total) * 100)
    : 0

  res.send(`
    <div data-objection-id="${random.id}">
      <h2 class="h4">Objection:</h2>
      <p>${random.objection}</p>

      <button
        class="btn btn-danger"
        hx-get="/api/response/${random.id}"
        hx-target="#response"
        hx-swap="innerHTML"
      >
        Reveal Response
      </button>
      <div id="response"></div>

      <div class="rating-buttons" style="margin-top: 1rem;">
        <button
          class="btn btn-success"
          hx-post="/api/score"
          hx-vals='{"id": ${random.id}, "score": 1}'
          hx-target="#card-container"
          hx-swap="innerHTML"
        >
          Helpful
        </button>
        <button
          class="btn btn-secondary"
          hx-post="/api/score"
          hx-vals='{"id": ${random.id}, "score": 0}'
          hx-target="#card-container"
          hx-swap="innerHTML"
        >
          Needs Work
        </button>
      </div>

      <div class="stats" style="margin-top: 1rem;">
        Practiced: ${sessionStats.total} cards<br>
        Helpful: ${sessionStats.helpful}<br>
        Success Rate: ${percent}%
      </div>
    </div>
  `)
})

router.get('/api/stats', (req, res) => {
  const { total, helpful } = sessionStats
  const percent = total > 0 ? Math.round((helpful / total) * 100) : 0

  res.send(`
    <div class="summary-container">
      <h3>📊 Session Summary</h3>
      <p>Total Flashcards Practiced: <strong>${total}</strong></p>
      <p>Helpful Responses: <strong>${helpful}</strong></p>
      <p>Success Rate: <strong>${percent}%</strong></p>
    </div>
  `)
})

export default router
