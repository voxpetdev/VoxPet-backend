import { app } from '../src/app.js'

// Vercel necesita una función handler compatible con (req, res)
export default function handler(req, res) {
  return app(req, res)
}
