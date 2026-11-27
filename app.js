import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

const dbData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'))
let anecdotes = dbData.anecdotes || []

app.use(express.json())
app.use(express.static('dist'))

app.get('/health', (_req, res) => {
  res.send('ok')
})

app.get('/version', (_req, res) => {
  res.send('2')
})

app.get('/anecdotes', (_req, res) => {
  res.json(anecdotes)
})

app.post('/anecdotes', (req, res) => {
  const { content, votes = 0 } = req.body
  const newAnecdote = {
    id: String(Math.floor(Math.random() * 100000)),
    content,
    votes,
  }
  anecdotes = anecdotes.concat(newAnecdote)
  res.status(201).json(newAnecdote)
})

app.put('/anecdotes/:id', (req, res) => {
  const { id } = req.params
  const existing = anecdotes.find((a) => a.id === id)
  if (!existing) {
    return res.status(404).end()
  }
  const updated = { ...existing, ...req.body, id }
  anecdotes = anecdotes.map((a) => (a.id === id ? updated : a))
  res.json(updated)
})

app.delete('/anecdotes/:id', (req, res) => {
  const { id } = req.params
  anecdotes = anecdotes.filter((a) => a.id !== id)
  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
