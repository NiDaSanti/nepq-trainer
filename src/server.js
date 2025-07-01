import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import trainerRoutes from './routes/trainerRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', trainerRoutes)

app.listen(PORT, () => {
  console.log(`NEPQ Trainer running on ${PORT}`)
})