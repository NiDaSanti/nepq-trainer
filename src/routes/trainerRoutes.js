import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let sessionStats = {
  total: 0,
  helpful: 0
}

function renderFlashcard(random, stats) {
  const percent = stats.total > 0
    ? Math.round((stats.helpful / stats.total) * 100)
    : 0

  return `
    <div class="border-0 mb-3" data-objection-id="${random.id}">
      <h2 class="h1 text">Objection:</h2>
      <p class="h2 text-danger fw-semibold">${random.objection}</p>
      <p class="text-muted">What would you say to that?</p>

      <div class="fs-5 text text-primary" id="challenge-timer">Get ready...</div>

      <button class="btn btn-danger mt-2"
              id="reveal-btn"
              hx-get="/api/response/${random.id}"
              hx-target="#response"
              hx-swap="innerHTML">
        Reveal Response
      </button>

      <div class="d-block fs-4 fst-italic lh-base text-success mt-3" id="response"></div>

      <div class="rating-buttons mt-3">
        <button class="btn btn-success"
                hx-post="/api/score"
                hx-vals='{"id": ${random.id}, "score": 1}'
                hx-target="#card-container"
                hx-swap="innerHTML">
          Helpful
        </button>
        <button class="btn btn-secondary needs-work-btn"
                hx-post="/api/score"
                hx-vals='{"id": ${random.id}, "score": 0}'
                hx-target="#card-container"
                hx-swap="innerHTML">
          Needs Work
        </button>
      </div>

      <div class="stats bg-primary-subtle p-2 fs-4 text mt-3 mb-3">
        Practiced: ${stats.total} cards<br>
        Helpful: ${stats.helpful}<br>
        Success Rate: ${percent}%
      </div>
    </div>
  `
}

// Routes
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

router.get('/flashcards', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/flashcards.html'))
})

router.get('/api/flashcard', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/objections.json'), 'utf-8'))
  const random = data[Math.floor(Math.random() * data.length)]
  res.send(renderFlashcard(random, sessionStats))
})

router.get('/api/response/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/objections.json'), 'utf-8'))
  const found = data.find(obj => obj.id === parseInt(req.params.id))
  res.send(`<p>${found.response}</p>`)
})

router.post('/api/score', (req, res) => {
  const { score } = req.body
  sessionStats.total++
  if (parseInt(score) === 1) sessionStats.helpful++

  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/objections.json'), 'utf-8'))
  const random = data[Math.floor(Math.random() * data.length)]
  res.send(renderFlashcard(random, sessionStats))
})

router.get('/api/stats', (req, res) => {
  const percent = sessionStats.total > 0
    ? Math.round((sessionStats.helpful / sessionStats.total) * 100)
    : 0

  res.send(`
    <div class="summary-container">
      <h3>📊 Session Summary</h3>
      <p>Total Flashcards Practiced: <strong>${sessionStats.total}</strong></p>
      <p>Helpful Responses: <strong>${sessionStats.helpful}</strong></p>
      <p>Success Rate: <strong>${percent}%</strong></p>
    </div>
  `)
})

export default router
