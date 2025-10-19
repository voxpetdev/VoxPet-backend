import App from '../src/app.js'

// Instancia tu clase
const server = new App()

// Vercel necesita una función handler compatible con (req, res)
export default function handler(req, res) {
  return server.getServer(req, res)
}
