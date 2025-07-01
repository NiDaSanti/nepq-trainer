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
    : 0;

  return `
    <div class="card border-0 shadow-sm p-4 mb-4" data-objection-id="${random.id}">
      <div class="card-body px-0">

        <h5 class="text-uppercase text-muted fw-semibold mb-2">Objection</h5>
        <p class="h4 text-danger fw-bold">${random.objection}</p>
        <p class="text-secondary mb-4">What would you say to that?</p>

        <div id="challenge-timer" class="text-center text-primary fw-semibold fs-5 mb-3">
          Get ready...
        </div>

        <div class="d-grid gap-2 d-md-flex justify-content-center mb-4">
          <button class="btn btn-primary px-4 py-2 fw-semibold"
                  id="reveal-btn"
                  hx-get="/api/response/${random.id}"
                  hx-target="#response"
                  hx-swap="innerHTML">
            👀 Reveal Response
          </button>
        </div>

        <div id="response" class="fs-5 fst-italic text-success text-center mb-4"></div>

        <div class="d-grid gap-2 d-md-flex justify-content-center mb-4">
          <button class="btn btn-success fw-semibold"
                  hx-post="/api/score"
                  hx-vals='{"id": ${random.id}, "score": 1}'
                  hx-target="#card-container"
                  hx-swap="innerHTML">
            ✅ Helpful
          </button>

          <button class="btn btn-outline-secondary fw-semibold"
                  hx-post="/api/score"
                  hx-vals='{"id": ${random.id}, "score": 0}'
                  hx-target="#card-container"
                  hx-swap="innerHTML">
            ⚠️ Needs Work
          </button>
        </div>

        <div class="bg-light border rounded p-3 text-center">
          <div class="fw-semibold text-muted mb-2">Session Stats</div>
          <div class="fs-6">
            Practiced: <strong>${stats.total}</strong> cards<br>
            Helpful: <strong>${stats.helpful}</strong><br>
            Success Rate: <strong>${percent}%</strong>
          </div>
        </div>

      </div>
    </div>
  `;
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
